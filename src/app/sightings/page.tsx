'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import type { Sighting } from './SightingsMap';

// ── Dynamically load map (Leaflet requires window) ─────────────────────
const SightingsMap = dynamic(() => import('./SightingsMap'), { ssr: false });

// ── Constants ───────────────────────────────────────────────────────────
const shapes = ['All', 'Orb', 'Triangle', 'Disk', 'Cylinder', 'Fireball', 'Light', 'Sphere', 'Rectangle', 'Cigar', 'Other'];
const years = ['All', '2020', '2021', '2022', '2023', '2024', '2025'];

const shapeColors: Record<string, string> = {
  Orb: 'bg-cyan-400',
  Triangle: 'bg-red-400',
  Disk: 'bg-violet-400',
  Cylinder: 'bg-orange-400',
  Fireball: 'bg-yellow-400',
  Light: 'bg-slate-200',
  Sphere: 'bg-emerald-400',
  Rectangle: 'bg-pink-400',
  Cigar: 'bg-purple-400',
  Other: 'bg-slate-400',
};

export default function SightingsPage() {
  const [all, setAll] = useState<Sighting[]>([]);
  const [shapeFilter, setShapeFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [stateSearch, setStateSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch sightings data
  useEffect(() => {
    fetch('/sightings-data.json')
      .then((r) => r.json())
      .then((data: Sighting[]) => {
        setAll(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Apply filters
  const filtered = useMemo(() => {
    return all.filter((s) => {
      if (shapeFilter !== 'All' && s.shape !== shapeFilter) return false;
      if (yearFilter !== 'All' && !s.date.startsWith(yearFilter)) return false;
      if (stateSearch && !s.state.toLowerCase().includes(stateSearch.toLowerCase()) && !s.city.toLowerCase().includes(stateSearch.toLowerCase())) return false;
      return true;
    });
  }, [all, shapeFilter, yearFilter, stateSearch]);

  return (
    <>
      <Navbar />
      {/* Leaflet CSS */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      {/* Dark popup styles for Leaflet */}
      <style>{`
        .dark-popup .leaflet-popup-content-wrapper {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }
        .dark-popup .leaflet-popup-tip {
          background: #1e293b;
          border-right: 1px solid #334155;
          border-bottom: 1px solid #334155;
        }
        .dark-popup .leaflet-popup-close-button {
          color: #94a3b8 !important;
        }
        .dark-popup .leaflet-popup-close-button:hover {
          color: #e2e8f0 !important;
        }
      `}</style>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-white mb-2">UAP Sightings Map</h1>
          <p className="text-sm text-gray-400">
            Interactive map of {all.length} reported UAP/UFO sightings across the United States (2020–2025). Filter by shape, year, or location.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Shape filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-mono text-gray-500">SHAPE</label>
            <select
              value={shapeFilter}
              onChange={(e) => setShapeFilter(e.target.value)}
              className="bg-gray-800/60 text-sm text-gray-200 border border-gray-700/50 rounded-md px-3 py-1.5 font-mono focus:outline-none focus:border-cyan-500/50 cursor-pointer"
            >
              {shapes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Year filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-mono text-gray-500">YEAR</label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="bg-gray-800/60 text-sm text-gray-200 border border-gray-700/50 rounded-md px-3 py-1.5 font-mono focus:outline-none focus:border-cyan-500/50 cursor-pointer"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* State / city search */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-mono text-gray-500">LOCATION</label>
            <input
              type="text"
              value={stateSearch}
              onChange={(e) => setStateSearch(e.target.value)}
              placeholder="State or city..."
              className="bg-gray-800/60 text-sm text-gray-200 border border-gray-700/50 rounded-md px-3 py-1.5 font-mono placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 w-40"
            />
          </div>

          {/* Count badge */}
          <div className="ml-auto flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
              {loading ? '...' : `${filtered.length} sightings`}
            </span>
          </div>
        </div>

        {/* Map */}
        <div className="mb-6">
          {loading ? (
            <div className="w-full rounded-lg border border-gray-800/50 flex items-center justify-center" style={{ height: '600px' }}>
              <span className="text-gray-500 font-mono text-sm animate-pulse">Loading sightings data…</span>
            </div>
          ) : (
            <SightingsMap sightings={filtered} />
          )}
        </div>

        {/* Legend */}
        <div className="card p-5">
          <h2 className="font-display text-sm font-semibold text-white mb-3">Shape Legend</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(shapeColors).map(([shape, colorClass]) => (
              <button
                key={shape}
                onClick={() => setShapeFilter(shapeFilter === shape ? 'All' : shape)}
                className={
                  'flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ' +
                  (shapeFilter === shape
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'bg-gray-800/30 text-gray-400 border border-gray-700/30 hover:border-gray-500')
                }
              >
                <span className={'w-2.5 h-2.5 rounded-full ' + colorClass} />
                {shape}
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
