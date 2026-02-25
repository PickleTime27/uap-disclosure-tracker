// src/app/timeline/page.tsx
import Navbar from '@/components/layout/Navbar';

const timelineEvents = [
  { date: 'Feb 20, 2026', title: 'Trump announces UFO/UAP file declassification directive', category: 'EXECUTIVE_ACTION', importance: 'CRITICAL', description: 'President Trump directed the Secretary of Defense and other agencies to begin identifying and releasing government files related to aliens, UAP, and UFOs.' },
  { date: 'Feb 19, 2026', title: 'Obama states aliens are "real" on podcast', category: 'MEDIA', importance: 'HIGH', description: 'Former President Obama said on Brian Tyler Cohen\'s podcast that aliens are "real," though he later clarified he hadn\'t seen evidence of contact. Trump accused him of disclosing classified information.' },
  { date: 'Sep 9, 2025', title: 'House Task Force hearing: "Restoring Public Trust Through UAP Transparency"', category: 'HEARING', importance: 'HIGH', description: 'House Task Force on Declassification held hearing with witnesses including George Knapp and military veterans on whistleblower protection and transparency failures.' },
  { date: 'Sep 30, 2025', title: 'NARA deadline for agency UAP record transfers', category: 'DOCUMENT_RELEASE', importance: 'CRITICAL', description: 'Agencies were required to transfer UAP records to NARA by this date. Status remains unclear — NARA has gone silent with unanswered emails since December 2025.' },
  { date: 'Nov 19, 2024', title: 'AARO Director Kosloski testifies before Senate', category: 'HEARING', importance: 'HIGH', description: 'Jon Kosloski revealed "Gremlin" sensor technology for UAP detection. Stated no evidence of extraterrestrial technology found. Sen. Gillibrand demanded progress report.' },
  { date: 'Nov 14, 2024', title: 'AARO FY2024 annual report: 757 new cases', category: 'DOCUMENT_RELEASE', importance: 'HIGH', description: '757 new UAP cases reported. 118 resolved (70% balloons, 16% drones). 21 cases remain "truly anomalous" with no explanation.' },
  { date: 'Nov 13, 2024', title: 'House Oversight: "Immaculate Constellation" program alleged', category: 'HEARING', importance: 'CRITICAL', description: 'Michael Shellenberger testified about an alleged secret DoD UAP program called "Immaculate Constellation." Anonymous whistleblower report submitted to Congress.' },
  { date: 'Jul 26, 2023', title: 'David Grusch testifies before House Oversight', category: 'WHISTLEBLOWER', importance: 'CRITICAL', description: 'Former intelligence officer David Grusch testified under oath that the US government possesses craft of non-human origin and that a secret reverse-engineering program exists.' },
  { date: 'Jul 2023', title: 'Schumer-Rounds UAP Disclosure Act introduced', category: 'LEGISLATION', importance: 'CRITICAL', description: 'The most ambitious UAP transparency legislation ever proposed, modeled on the JFK Assassination Records Act. Key provisions later stripped from final NDAA by House leadership.' },
  { date: 'Apr 19, 2023', title: 'AARO Director Kirkpatrick testifies: "metallic orbs"', category: 'HEARING', importance: 'MEDIUM', description: 'Sean Kirkpatrick described common UAP sightings including "metallic orbs" but did not confirm extraterrestrial technology.' },
  { date: 'Dec 22, 2023', title: 'FY2024 NDAA signed with UAP provisions', category: 'LEGISLATION', importance: 'HIGH', description: 'Despite stripping the full Disclosure Act, the NDAA included mandates for agencies to transfer UAP records to NARA and strengthened AARO reporting.' },
  { date: 'May 17, 2022', title: 'First public UAP hearing in 50+ years', category: 'HEARING', importance: 'CRITICAL', description: 'House Intelligence Subcommittee held the first public congressional hearing on UFOs since 1969. Scott Bray and Ronald Moultrie testified. ~400 sightings reported.' },
  { date: 'Jun 25, 2021', title: 'ODNI preliminary UAP assessment released', category: 'DOCUMENT_RELEASE', importance: 'CRITICAL', description: 'Office of the Director of National Intelligence released preliminary assessment reviewing 144 military encounters (2004-2021). Most lacked sufficient data for conclusions.' },
  { date: 'Apr 2020', title: 'Pentagon officially releases three UAP videos', category: 'DOCUMENT_RELEASE', importance: 'CRITICAL', description: 'Pentagon declassified and released three Navy pilot UAP videos ("FLIR1", "Gimbal", "GoFast") filmed in 2004 and 2015, confirming their authenticity.' },
  { date: 'Dec 2017', title: 'NY Times breaks AATIP story', category: 'MEDIA', importance: 'CRITICAL', description: 'New York Times revealed the existence of the Advanced Aerospace Threat Identification Program (AATIP), a secret Pentagon UFO program run by Luis Elizondo from 2007-2012.' },
];

const categoryColors: Record<string, string> = {
  EXECUTIVE_ACTION: 'bg-alert-400',
  HEARING: 'bg-signal-400',
  DOCUMENT_RELEASE: 'bg-verified-400',
  LEGISLATION: 'bg-blue-400',
  WHISTLEBLOWER: 'bg-critical-400',
  MEDIA: 'bg-purple-400',
};

const categoryLabels: Record<string, string> = {
  EXECUTIVE_ACTION: 'Executive Action',
  HEARING: 'Congressional Hearing',
  DOCUMENT_RELEASE: 'Document Release',
  LEGISLATION: 'Legislation',
  WHISTLEBLOWER: 'Whistleblower',
  MEDIA: 'Media',
};

const importanceBorder: Record<string, string> = {
  CRITICAL: 'border-l-critical-400',
  HIGH: 'border-l-alert-400',
  MEDIUM: 'border-l-signal-400',
  LOW: 'border-l-gray-400',
};

export default function TimelinePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-white mb-2">
            Disclosure Timeline
          </h1>
          <p className="text-sm text-gray-400">
            A chronological history of major UAP disclosure events — from the 2017 NY Times bombshell to today.
          </p>
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className={"w-2.5 h-2.5 rounded-full " + (categoryColors[key] || 'bg-gray-400')} />
              <span className="text-xs text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-void-600/50" />

          <div className="space-y-1">
            {timelineEvents.map((event, i) => (
              <div
                key={i}
                className={"relative pl-12 animate-slide-up"}
                style={{ animationDelay: i * 60 + "ms" }}
              >
                {/* Dot on timeline */}
                <div className={"absolute left-2.5 top-6 w-3 h-3 rounded-full border-2 border-void-950 " + (categoryColors[event.category] || 'bg-gray-400')} />

                <div className={"card p-5 border-l-2 " + (importanceBorder[event.importance] || 'border-l-gray-600')}>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-gray-500">{event.date}</span>
                    <span className="text-xs font-mono text-gray-600">·</span>
                    <span className="flex items-center gap-1">
                      <span className={"w-1.5 h-1.5 rounded-full " + (categoryColors[event.category] || 'bg-gray-400')} />
                      <span className="text-xs text-gray-400">{categoryLabels[event.category] || event.category}</span>
                    </span>
                    {event.importance === 'CRITICAL' && (
                      <span className="badge bg-critical-400/15 text-critical-400 border border-critical-500/30">CRITICAL</span>
                    )}
                  </div>
                  <h3 className="font-display text-base font-semibold text-white mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
