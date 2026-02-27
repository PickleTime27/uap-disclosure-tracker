'use client';

import { useState, useCallback } from 'react';

// ── US States ───────────────────────────────────────────────────────────
const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
];

const SHAPES = ['Orb','Triangle','Disk','Cylinder','Fireball','Light','Sphere','Rectangle','Cigar','Other'];

// ── Fallback state-center coordinates ───────────────────────────────────
const STATE_CENTERS: Record<string, [number, number]> = {
  AL:[32.8,-86.8],AK:[64.2,-152.5],AZ:[34.0,-111.1],AR:[35.0,-92.4],CA:[36.8,-119.4],
  CO:[39.1,-105.4],CT:[41.6,-72.7],DE:[39.0,-75.5],FL:[27.8,-81.7],GA:[32.2,-83.4],
  HI:[19.9,-155.6],ID:[44.1,-114.7],IL:[40.6,-89.4],IN:[40.3,-86.1],IA:[42.0,-93.2],
  KS:[38.5,-98.8],KY:[37.7,-84.7],LA:[30.9,-91.9],ME:[45.3,-69.4],MD:[39.0,-76.6],
  MA:[42.4,-71.4],MI:[44.3,-84.5],MN:[46.4,-94.6],MS:[32.7,-89.7],MO:[38.5,-92.3],
  MT:[46.8,-110.4],NE:[41.5,-99.9],NV:[38.8,-116.4],NH:[43.2,-71.6],NJ:[40.1,-74.5],
  NM:[34.5,-106.0],NY:[43.0,-75.5],NC:[35.4,-79.1],ND:[47.5,-100.5],OH:[40.4,-82.9],
  OK:[35.6,-96.9],OR:[43.8,-120.6],PA:[41.2,-77.2],RI:[41.6,-71.5],SC:[33.9,-81.2],
  SD:[43.9,-99.9],TN:[35.9,-86.6],TX:[31.2,-99.3],UT:[39.3,-111.1],VT:[44.6,-72.6],
  VA:[37.4,-78.7],WA:[47.7,-120.7],WV:[38.6,-80.6],WI:[43.8,-89.4],WY:[43.1,-107.6],
  DC:[38.9,-77.0],
};

interface ReportFormProps {
  onSightingAdded: () => void;
}

export default function ReportForm({ onSightingAdded }: ReportFormProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Form fields
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [shape, setShape] = useState('');
  const [duration, setDuration] = useState('');
  const [summary, setSummary] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');

  const resetForm = useCallback(() => {
    setDate('');
    setCity('');
    setState('');
    setShape('');
    setDuration('');
    setSummary('');
    setReporterName('');
    setReporterEmail('');
    setErrors([]);
    setSuccess(false);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    if (success) resetForm();
  }, [success, resetForm]);

  // ── Geocode city + state via Nominatim, fall back to state center ───
  async function geocode(city: string, state: string): Promise<{ lat: number; lng: number }> {
    try {
      const params = new URLSearchParams({
        city,
        state,
        country: 'US',
        format: 'json',
        limit: '1',
      });
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?${params}`,
        { headers: { 'User-Agent': 'UAP-Disclosure-Tracker/1.0' } },
      );
      const data = await res.json();
      if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
    } catch {
      // fall through to fallback
    }
    // Fallback: use state center
    const center = STATE_CENTERS[state];
    if (center) return { lat: center[0], lng: center[1] };
    return { lat: 39.5, lng: -98.35 }; // US center
  }

  // ── Submit ────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);

    // Client-side validation
    const clientErrors: string[] = [];
    if (!date) clientErrors.push('Date is required');
    if (!city.trim()) clientErrors.push('City is required');
    if (!state) clientErrors.push('State is required');
    if (!shape) clientErrors.push('Shape is required');
    if (!summary.trim() || summary.trim().length < 10) clientErrors.push('Description must be at least 10 characters');

    if (clientErrors.length > 0) {
      setErrors(clientErrors);
      setSubmitting(false);
      return;
    }

    try {
      const coords = await geocode(city.trim(), state);

      const res = await fetch('/api/sightings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: new Date(date).toISOString(),
          city: city.trim(),
          state,
          lat: coords.lat,
          lng: coords.lng,
          shape,
          duration: duration.trim() || undefined,
          summary: summary.trim(),
          reporterName: reporterName.trim() || undefined,
          reporterEmail: reporterEmail.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors(data.errors || ['Failed to submit sighting. Please try again.']);
        setSubmitting(false);
        return;
      }

      setSuccess(true);
      setSubmitting(false);
      onSightingAdded();
    } catch {
      setErrors(['Network error. Please check your connection and try again.']);
      setSubmitting(false);
    }
  }

  // ── Shared input classes ──────────────────────────────────────────────
  const inputCls =
    'w-full bg-gray-800/60 text-sm text-gray-200 border border-gray-700/50 rounded-md px-3 py-2 font-mono placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50';
  const labelCls = 'block text-xs font-mono text-gray-500 mb-1';

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => { resetForm(); setOpen(true); }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 text-sm font-mono hover:bg-cyan-500/25 transition-all cursor-pointer"
      >
        <span className="text-base leading-none">+</span>
        Report a Sighting
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

          {/* Modal */}
          <div className="relative bg-gray-900 border border-gray-800 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
              <h2 className="font-display text-lg font-semibold text-white">Report a UAP Sighting</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-300 transition-colors text-xl leading-none cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Success state */}
            {success ? (
              <div className="px-6 py-12 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <span className="text-emerald-400 text-xl">&#10003;</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Sighting Reported!</h3>
                <p className="text-sm text-gray-400 mb-6">
                  Thank you for your report. It will appear on the map shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-md bg-gray-800 text-gray-300 text-sm font-mono hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                {/* Errors */}
                {errors.length > 0 && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3">
                    {errors.map((err, i) => (
                      <p key={i} className="text-xs text-red-400 font-mono">{err}</p>
                    ))}
                  </div>
                )}

                {/* Date */}
                <div>
                  <label className={labelCls}>DATE OF SIGHTING *</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className={inputCls}
                    required
                  />
                </div>

                {/* City + State row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>CITY *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Phoenix"
                      className={inputCls}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelCls}>STATE *</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className={inputCls + ' cursor-pointer'}
                      required
                    >
                      <option value="">Select...</option>
                      {US_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Shape + Duration row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>SHAPE *</label>
                    <select
                      value={shape}
                      onChange={(e) => setShape(e.target.value)}
                      className={inputCls + ' cursor-pointer'}
                      required
                    >
                      <option value="">Select...</option>
                      {SHAPES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>DURATION</label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g. 2 minutes"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <label className={labelCls}>DESCRIPTION *</label>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Describe what you saw in detail..."
                    rows={4}
                    className={inputCls + ' resize-none'}
                    required
                  />
                  <p className="text-xs text-gray-600 mt-1 font-mono">Min 10 characters</p>
                </div>

                {/* Optional reporter info */}
                <div className="border-t border-gray-800 pt-4">
                  <p className="text-xs font-mono text-gray-600 mb-3">OPTIONAL — YOUR INFO (NOT PUBLICLY DISPLAYED)</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>NAME</label>
                      <input
                        type="text"
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                        placeholder="Your name"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>EMAIL</label>
                      <input
                        type="email"
                        value={reporterEmail}
                        onChange={(e) => setReporterEmail(e.target.value)}
                        placeholder="your@email.com"
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2.5 rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-sm font-mono font-semibold hover:bg-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    {submitting ? 'Submitting…' : 'Submit Sighting Report'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
