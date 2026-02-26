// src/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '◉' },
  { href: '/hearings', label: 'Hearings', icon: '⊞' },
  { href: '/documents', label: 'Documents', icon: '⊟' },
  { href: '/legislation', label: 'Legislation', icon: '⊠' },
  { href: '/timeline', label: 'Timeline', icon: '⊡' },
  { href: '/whistleblowers', label: 'Key Players', icon: '⊕' },
  { href: '/videos', label: 'Videos', icon: '▶' },
  { href: '/videos', label: 'Videos', icon: '⊕' },
  { href: '/videos', label: 'Videos', icon: '⊕' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-void-600/40 bg-void-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-signal-500/20 border border-signal-500/40 flex items-center justify-center group-hover:bg-signal-500/30 transition-colors">
              <span className="text-signal-400 font-mono text-sm font-bold">U</span>
            </div>
            <div>
              <span className="font-display font-semibold text-white tracking-tight">
                UAP Tracker
              </span>
              <span className="hidden sm:inline ml-2 text-xs font-mono text-signal-500/70">
                DISCLOSURE MONITOR
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'text-signal-400 bg-signal-500/10 border border-signal-500/20'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-void-700/50'
                    }
                  `}
                >
                  <span className="font-mono text-xs mr-1.5 opacity-50">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-verified-500/10 border border-verified-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-verified-500 animate-pulse-slow" />
              <span className="text-xs font-mono text-verified-400">LIVE</span>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden overflow-x-auto gap-1 pb-2 -mx-4 px-4 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                  ${isActive
                    ? 'text-signal-400 bg-signal-500/10 border border-signal-500/20'
                    : 'text-gray-500 hover:text-gray-300 bg-void-800/50'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
