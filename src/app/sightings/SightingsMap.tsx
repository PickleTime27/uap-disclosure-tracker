'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';

// ── Shape → color mapping ───────────────────────────────────────────────
const shapeColors: Record<string, string> = {
  Orb: '#22d3ee',       // cyan-400
  Triangle: '#f87171',  // red-400
  Disk: '#a78bfa',      // violet-400
  Cylinder: '#fb923c',  // orange-400
  Fireball: '#facc15',  // yellow-400
  Light: '#e2e8f0',     // slate-200
  Sphere: '#34d399',    // emerald-400
  Rectangle: '#f472b6', // pink-400
  Cigar: '#c084fc',     // purple-400
  Other: '#94a3b8',     // slate-400
};

export interface Sighting {
  id: string;
  date: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  shape: string;
  summary: string;
  duration: string;
}

interface SightingsMapProps {
  sightings: Sighting[];
}

export default function SightingsMap({ sightings }: SightingsMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  // Initialize map once
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const map = L.map(containerRef.current, {
      center: [39.5, -98.35],
      zoom: 4,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;
    markersRef.current = L.layerGroup().addTo(map);

    // Cleanup on unmount
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update markers when sightings change
  useEffect(() => {
    if (!markersRef.current) return;
    markersRef.current.clearLayers();

    sightings.forEach((s) => {
      const color = shapeColors[s.shape] || '#94a3b8';
      const dateStr = new Date(s.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      const marker = L.circleMarker([s.lat, s.lng], {
        radius: 6,
        fillColor: color,
        color: color,
        weight: 1,
        opacity: 0.9,
        fillOpacity: 0.7,
      });

      marker.bindPopup(
        `<div style="font-family:ui-monospace,monospace;min-width:200px">
          <div style="font-weight:700;font-size:13px;color:#e2e8f0;margin-bottom:6px">${s.city}, ${s.state}</div>
          <div style="font-size:11px;color:#94a3b8;margin-bottom:4px">${dateStr}</div>
          <div style="display:flex;gap:6px;margin-bottom:8px">
            <span style="background:${color}22;color:${color};border:1px solid ${color}44;padding:1px 6px;border-radius:4px;font-size:10px">${s.shape}</span>
            <span style="color:#64748b;font-size:10px;padding:2px 0">${s.duration}</span>
          </div>
          <div style="font-size:11px;color:#cbd5e1;line-height:1.5">${s.summary}</div>
        </div>`,
        {
          className: 'dark-popup',
          maxWidth: 280,
        }
      );

      marker.addTo(markersRef.current!);
    });
  }, [sightings]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-lg border border-gray-800/50 overflow-hidden"
      style={{ height: '600px' }}
    />
  );
}
