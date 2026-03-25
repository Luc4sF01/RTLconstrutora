import { Suspense, lazy, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { IMAGES } from '../data/content';

const BuildingModel = lazy(() => import('../components/3d/BuildingModel'));

gsap.registerPlugin(ScrollTrigger);

export default function Building3D() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const hintRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label aparece
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: -10 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
      // Overlay sai (revela o canvas)
      gsap.fromTo(overlayRef.current,
        { opacity: 1 },
        {
          opacity: 0, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
          delay: 0.4,
        }
      );
      // Hint aparece
      gsap.fromTo(hintRef.current,
        { opacity: 0, y: 8 },
        {
          opacity: 1, y: 0, duration: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
          delay: 1.0,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-3d"
      style={{
        background: '#0A0A0A',
        height: '100vh',
        minHeight: 600,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Label topo */}
      <div
        ref={labelRef}
        style={{
          position: 'absolute',
          top: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          opacity: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          pointerEvents: 'none',
        }}
      >
        <div style={{ width: 16, height: 1, background: '#cc5500' }} />
        <span style={{
          fontFamily: 'Cormorant SC, serif',
          fontSize: 9,
          letterSpacing: '0.42em',
          color: 'rgba(255,255,255,0.4)',
          whiteSpace: 'nowrap',
        }}>
          MODELO 3D INTERATIVO
        </span>
        <div style={{ width: 16, height: 1, background: '#cc5500' }} />
      </div>

      {/* Overlay escuro que some ao revelar o canvas */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#0A0A0A',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* Canvas ocupa 100% */}
      <div style={{ flex: 1, position: 'relative' }}>
        {isMobile ? (
          /* Mobile: imagem estática */
          <div style={{ width: '100%', height: '100%', position: 'relative', minHeight: 400 }}>
            <img
              src={IMAGES.heroBg}
              alt="RTL – Modelo 3D"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, display: 'block' }}
              loading="lazy"
            />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: '#fff', fontWeight: 300, letterSpacing: '-0.02em' }}>
                Modelo 3D
              </span>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
                Disponível na versão desktop
              </span>
            </div>
          </div>
        ) : (
          <Suspense
            fallback={
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: '#0A0A0A' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(204,85,0,0.2)', borderTopColor: '#cc5500', animation: 'spin 1s linear infinite' }} />
                <span style={{ fontFamily: 'Cormorant SC, serif', fontSize: 9, letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)' }}>CARREGANDO</span>
              </div>
            }
          >
            <BuildingModel />
          </Suspense>
        )}
      </div>

      {/* Hint de interação (rodapé centralizado) */}
      {!isMobile && (
        <div
          ref={hintRef}
          style={{
            position: 'absolute',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            display: 'flex',
            gap: 28,
            alignItems: 'center',
            background: 'rgba(10,10,10,0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '9px 22px',
          }}>
            {[
              { icon: '⟳', label: 'Arrastar para girar' },
              { icon: '⊕', label: 'Scroll para zoom' },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: '#cc5500', lineHeight: 1 }}>{icon}</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Marca RTL canto inferior direito */}
      <div style={{ position: 'absolute', bottom: 28, right: 32, zIndex: 10, pointerEvents: 'none' }}>
        <span style={{ fontFamily: 'Cormorant SC, serif', fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.1)' }}>RTL</span>
      </div>
    </section>
  );
}
