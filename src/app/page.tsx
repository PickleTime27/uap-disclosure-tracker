// src/app/page.tsx
// Dashboard — Main landing page for UAP Disclosure Tracker

import HeroBackground from "@/components/HeroBackground";
import Navbar from '@/components/layout/Navbar';

// Placeholder data — will be replaced with real DB queries
const stats = [
  { label: 'Congressional Hearings', value: '12', change: '+2 in 2025', icon: '⊞' },
  { label: 'Declassified Documents', value: '621+', change: 'NARA transfers ongoing', icon: '⊟' },
  { label: 'Active Legislation', value: '4', change: '119th Congress', icon: '⊠' },
  { label: 'AARO Obligations Met', value: '0 / 3', change: 'OVERDUE', alert: true, icon: '⚠' },
];

const breakingAlerts = [
  {
    id: '1',
    title: 'Trump directs Pentagon to begin releasing UAP/UFO files',
    date: 'Feb 20, 2026',
    importance: 'CRITICAL' as const,
    description: 'President Trump announced on Truth Social that he is directing the Secretary of Defense and other agencies to begin identifying and releasing government files related to aliens, UAP, and UFOs.',
  },
  {
    id: '2',
    title: 'NARA silent on UAP record transfers — deadline passed',
    date: 'Feb 2026',
    importance: 'HIGH' as const,
    description: 'Agencies were required to transfer UAP records to NARA by Sept 30, 2025. NARA has gone silent with unanswered emails since December 2025.',
  },
  {
    id: '3',
    title: 'AARO has not released required 2025 annual report',
    date: 'Ongoing',
    importance: 'HIGH' as const,
    description: 'AARO has yet to fulfill statutory obligations including Volume 2 of its historical review and the FY2025 annual report.',
  },
];

const recentTimeline = [
  { date: 'Feb 20, 2026', event: 'Trump announces UFO/UAP file declassification directive', category: 'EXECUTIVE_ACTION' },
  { date: 'Feb 19, 2026', event: 'Obama states aliens are "real" on podcast, later clarifies', category: 'MEDIA' },
  { date: 'Sep 9, 2025', event: 'House Task Force hearing: "Restoring Public Trust Through UAP Transparency"', category: 'HEARING' },
  { date: 'Sep 30, 2025', event: 'NARA deadline for agency UAP record transfers (status: unclear)', category: 'DOCUMENT_RELEASE' },
  { date: 'Nov 19, 2024', event: 'Senate Armed Services hearing — AARO Director Kosloski testifies', category: 'HEARING' },
  { date: 'Nov 13, 2024', event: 'House Oversight hearing — "Immaculate Constellation" program alleged', category: 'HEARING' },
  { date: 'Nov 14, 2024', event: 'AARO FY2024 annual report: 757 new cases, 21 "truly anomalous"', category: 'DOCUMENT_RELEASE' },
];

const categoryColors: Record<string, string> = {
  EXECUTIVE_ACTION: 'text-alert-400',
  HEARING: 'text-signal-400',
  DOCUMENT_RELEASE: 'text-verified-400',
  MEDIA: 'text-purple-400',
  WHISTLEBLOWER: 'text-critical-400',
  LEGISLATION: 'text-blue-400',
};

const categoryDots: Record<string, string> = {
  EXECUTIVE_ACTION: 'bg-alert-400',
  HEARING: 'bg-signal-400',
  DOCUMENT_RELEASE: 'bg-verified-400',
  MEDIA: 'bg-purple-400',
  WHISTLEBLOWER: 'bg-critical-400',
  LEGISLATION: 'bg-blue-400',
};

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <HeroBackground />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Hero / Breaking Alert */}
        <section className="mb-8">
          <div className="card p-6 border-critical-500/30 bg-critical-500/5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-3 h-3 rounded-full bg-critical-500 animate-pulse-slow" />
              </div>
              <div>
                <p className="text-xs font-mono text-critical-400 mb-1">BREAKING — {breakingAlerts[0].date}</p>
                <h2 className="font-display text-lg font-semibold text-white mb-2">
                  {breakingAlerts[0].title}
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {breakingAlerts[0].description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="mb-10">
          <h2 className="section-header mb-4">Disclosure Status</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`card p-4 ${stat.alert ? 'border-alert-500/30 bg-alert-500/5' : ''}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-gray-500">{stat.icon}</span>
                  <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                </div>
                <p className={`font-display text-2xl font-bold ${stat.alert ? 'text-alert-400' : 'text-white'}`}>
                  {stat.value}
                </p>
                <p className={`text-xs mt-1 font-mono ${stat.alert ? 'text-alert-500' : 'text-gray-500'}`}>
                  {stat.change}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Timeline — wider column */}
          <section className="lg:col-span-3">
            <h2 className="section-header mb-4">Recent Disclosure Events</h2>
            <div className="space-y-1">
              {recentTimeline.map((item, i) => (
                <div
                  key={i}
                  className="card p-4 flex items-start gap-3 animate-fade-in"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex-shrink-0 mt-1.5">
                    <div className={`w-2 h-2 rounded-full ${categoryDots[item.category] || 'bg-gray-500'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-200 leading-relaxed">{item.event}</p>
                    <p className={`text-xs font-mono mt-1 ${categoryColors[item.category] || 'text-gray-500'}`}>
                      {item.date} · {item.category.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Alerts sidebar */}
          <section className="lg:col-span-2">
            <h2 className="section-header mb-4">Active Alerts</h2>
            <div className="space-y-3">
              {breakingAlerts.map((alert) => (
                <div key={alert.id} className="card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`badge ${
                      alert.importance === 'CRITICAL' ? 'badge-critical' :
                      alert.importance === 'HIGH' ? 'badge-high' : 'badge-medium'
                    }`}>
                      {alert.importance}
                    </span>
                    <span className="text-xs font-mono text-gray-500">{alert.date}</span>
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">{alert.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{alert.description}</p>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="mt-6">
              <h2 className="section-header mb-4">Data Sources</h2>
              <div className="space-y-1.5">
                {[
                  { name: 'NARA UAP Records', url: 'https://catalog.archives.gov', status: 'SILENT' },
                  { name: 'AARO Reports', url: 'https://www.aaro.mil', status: 'OVERDUE' },
                  { name: 'House Oversight', url: 'https://oversight.house.gov', status: 'ACTIVE' },
                  { name: 'Congress.gov', url: 'https://congress.gov', status: 'ACTIVE' },
                  { name: 'The Black Vault', url: 'https://theblackvault.com', status: 'ACTIVE' },
                ].map((source) => (
                  <a
                    key={source.name}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card p-3 flex items-center justify-between group cursor-pointer block"
                  >
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      {source.name}
                    </span>
                    <span className={`badge ${
                      source.status === 'ACTIVE' ? 'badge-completed' :
                      source.status === 'OVERDUE' ? 'badge-critical' : 'badge-high'
                    }`}>
                      {source.status}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-void-600/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600 font-mono">
              UAP DISCLOSURE TRACKER v0.1.0 — DATA FROM PUBLIC GOVERNMENT SOURCES
            </p>
            <p className="text-xs text-gray-600">
              Not affiliated with any government agency. All data sourced from public records.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
