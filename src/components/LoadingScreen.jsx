import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const screenRef = useRef(null);
  const progressRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Prevent scroll during load
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(screenRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.85,
          ease: 'power3.inOut',
          onComplete: () => {
            document.body.style.overflow = '';
            onComplete();
          },
        });
      },
    });

    // Building bars animate up
    tl.fromTo('.load-bar',
      { scaleY: 0, transformOrigin: 'bottom center' },
      { scaleY: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
      0
    );

    // RTL letters slide up
    tl.fromTo('.load-letter',
      { yPercent: 110 },
      { yPercent: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' },
      0.15
    );

    // Tagline fade in
    tl.fromTo('.load-tagline',
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      0.55
    );

    // Progress counter
    const progress = { val: 0 };
    tl.to(progress, {
      val: 100,
      duration: 2.0,
      ease: 'power1.inOut',
      onUpdate: () => {
        const v = Math.round(progress.val);
        setCount(v);
        if (progressRef.current) progressRef.current.style.width = `${v}%`;
      },
    }, 0.25);

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const bars = [28, 52, 80, 100, 72, 58, 38, 20];

  return (
    <div
      ref={screenRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0F2340',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        clipPath: 'inset(0 0 0% 0)',
      }}
    >
      {/* City skyline silhouette */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 3,
          marginBottom: 52,
          height: 110,
        }}
      >
        {bars.map((h, i) => (
          <div
            key={i}
            className="load-bar"
            style={{
              width: i === 3 ? 14 : i === 2 || i === 4 ? 10 : 7,
              height: h,
              background:
                i === 3
                  ? '#cc5500'
                  : i === 2 || i === 4
                  ? 'rgba(204,85,0,0.35)'
                  : 'rgba(255,255,255,0.07)',
              transform: 'scaleY(0)',
            }}
          />
        ))}
      </div>

      {/* RTL */}
      <div style={{ display: 'flex', gap: '0.02em', overflow: 'hidden' }}>
        {'RTL'.split('').map((l, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <span
              className="load-letter"
              style={{
                display: 'block',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(88px, 14vw, 160px)',
                color: '#fff',
                lineHeight: 0.88,
                letterSpacing: '-0.02em',
                fontWeight: 300,
              }}
            >
              {l}
            </span>
          </div>
        ))}
      </div>

      {/* Tagline */}
      <p
        className="load-tagline"
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 9,
          letterSpacing: '0.42em',
          color: 'rgba(255,255,255,0.22)',
          marginTop: 14,
          opacity: 0,
          textTransform: 'uppercase',
        }}
      >
        CONSTRUÇÃO DE EDIFÍCIOS
      </p>

      {/* Progress bar */}
      <div style={{ marginTop: 68, width: 200 }}>
        <div
          style={{
            height: 1,
            background: 'rgba(255,255,255,0.07)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            ref={progressRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              background: '#cc5500',
              width: '0%',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 9,
          }}
        >
          <span
            style={{
              color: 'rgba(255,255,255,0.15)',
              fontSize: 9,
              fontFamily: 'DM Sans, sans-serif',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
            }}
          >
            Carregando
          </span>
          <span
            style={{
              color: '#cc5500',
              fontSize: 10,
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
            }}
          >
            {count}%
          </span>
        </div>
      </div>
    </div>
  );
}