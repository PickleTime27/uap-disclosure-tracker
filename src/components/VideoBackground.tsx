'use client';

export default function VideoBackground() {
  return (
    <>
      {/* YouTube iframe — full viewport, behind everything */}
      <iframe
        src="https://www.youtube.com/embed/bTGRK9a-oHQ?autoplay=1&mute=1&loop=1&playlist=bTGRK9a-oHQ&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&playsinline=1"
        title="USS Omaha UAP footage"
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          minWidth: '100vw',
          minHeight: '100vh',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          pointerEvents: 'none',
          border: 'none',
          aspectRatio: '16 / 9',
        }}
      />

      {/* Gradient overlay for readability */}
      <div
        className="bg-gradient-to-b from-gray-950/95 via-gray-950/70 to-gray-950/95"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
