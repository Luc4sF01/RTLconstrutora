import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';
import { COMPANY, IMAGES } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

// ─── RTL Brand Animation ─────────────────────────────────────────────────────
function RTLBrand() {
  const brandRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: brandRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      tl.fromTo('.brand-bar',
        { scaleY: 0, transformOrigin: 'bottom center' },
        { scaleY: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out' },
        0
      )
      .fromTo('.brand-letter',
        { yPercent: 110 },
        { yPercent: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' },
        0.2
      )
      .fromTo('.brand-sub',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        0.7
      )
      .fromTo('.brand-line',
        { scaleX: 0, transformOrigin: 'center' },
        { scaleX: 1, duration: 0.7, ease: 'power3.out' },
        0.65
      )
      .fromTo('.brand-tagline',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.9
      );
    }, brandRef);
    return () => ctx.revert();
  }, []);

  const bars = [22, 40, 66, 100, 88, 58, 38, 24, 14];

  return (
    <div
      ref={brandRef}
      style={{
        background: '#0F2340',
        padding: 'clamp(72px,9vh,110px) clamp(24px,6vw,80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '55%', height: '70%', background: 'radial-gradient(ellipse, rgba(204,85,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Skyline */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 40, height: 90 }}>
        {bars.map((h, i) => (
          <div
            key={i}
            className="brand-bar"
            style={{
              width: i === 3 ? 14 : i === 2 || i === 4 ? 10 : 6,
              height: h,
              background: i === 3 ? '#cc5500' : i === 2 || i === 4 ? 'rgba(204,85,0,0.38)' : 'rgba(255,255,255,0.07)',
              transform: 'scaleY(0)',
            }}
          />
        ))}
      </div>

      {/* RTL */}
      <div style={{ display: 'flex', overflow: 'hidden', marginBottom: 10 }}>
        {'RTL'.split('').map((l, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <span
              className="brand-letter"
              style={{
                display: 'block',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(88px, 15vw, 190px)',
                fontWeight: 300,
                color: '#fff',
                lineHeight: 0.88,
                letterSpacing: '-0.03em',
              }}
            >
              {l}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        className="brand-line"
        style={{ width: '100%', maxWidth: 480, height: 1, background: 'linear-gradient(to right, transparent, rgba(204,85,0,0.55), transparent)', marginBottom: 18 }}
      />

      {/* Sub */}
      <p
        className="brand-sub"
        style={{ fontFamily: 'Cormorant SC, serif', fontSize: 'clamp(12px, 1.3vw, 15px)', letterSpacing: '0.42em', color: 'rgba(255,255,255,0.32)', textAlign: 'center', opacity: 0 }}
      >
        CONSTRUÇÃO DE EDIFÍCIOS
      </p>

      {/* Tagline */}
      <p
        className="brand-tagline"
        style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(16px, 1.6vw, 20px)', color: 'rgba(204,85,0,0.65)', textAlign: 'center', marginTop: 10, fontWeight: 300, opacity: 0 }}
      >
        "Construir com excelência, entregar com confiança."
      </p>

      {/* City */}
      <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 18, height: 1, background: 'rgba(204,85,0,0.35)' }} />
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, letterSpacing: '0.32em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}>
          São José do Rio Preto — SP
        </span>
        <div style={{ width: 18, height: 1, background: 'rgba(204,85,0,0.35)' }} />
      </div>
    </div>
  );
}

// ─── Main About ──────────────────────────────────────────────────────────────
export default function About() {
  const leftRef = useRef(null);
  const imgRef = useRef(null);
  const imgWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: leftRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(imgWrapRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: imgWrapRef.current, start: 'top 85%' } }
      );
      gsap.to(imgRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: imgWrapRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  const points = [
    'Habilitada para licitações municipais, estaduais e federais',
    'Engenheiros CREA com ART emitida em cada obra',
    'Tecnologia BIM e gestão técnica avançada',
    'NR-18, PCMAT e documentação completa ao contratante',
  ];

  return (
    <section id="sobre" style={{ background: '#FAFAF8', overflow: 'hidden' }}>

      {/* RTL Brand Animation */}
      <RTLBrand />

      {/* Content */}
      <div className="max-w-7xl mx-auto" style={{ padding: '90px clamp(24px,6vw,80px)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 12, letterSpacing: '0.38em', color: '#cc5500', marginBottom: 18 }}>SOBRE A RTL</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4.2vw, 58px)', fontWeight: 300, color: '#0A0A0A', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 18 }}>
              Obras públicas e privadas<br />com{' '}
              <span style={{ color: '#cc5500' }}>excelência técnica</span>
            </h2>
            <div style={{ width: 44, height: 2, background: '#cc5500', marginBottom: 24 }} />
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 17, color: 'rgba(10,10,10,0.55)', fontWeight: 300, lineHeight: 1.7, marginBottom: 28, maxWidth: 420 }}>
              Da licitação pública ao residencial de alto padrão, a RTL executa obras
              com rigor técnico, documentação completa e transparência total — do contrato
              à entrega das chaves.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {points.map((pt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle2 size={15} style={{ color: '#cc5500', flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'rgba(10,10,10,0.6)', fontWeight: 300, lineHeight: 1.5 }}>{pt}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(10,10,10,0.2)', marginTop: 30, letterSpacing: '0.04em' }}>CNPJ {COMPANY.cnpj}</p>
          </div>

          {/* Right – foto */}
          <div style={{ position: 'relative' }}>
            <div className="hidden lg:block" style={{ position: 'absolute', top: -16, right: -16, width: 52, height: 52, background: '#cc5500', zIndex: 2 }} />
            <div ref={imgWrapRef} style={{ overflow: 'hidden', aspectRatio: '3/4', clipPath: 'inset(100% 0 0 0)', position: 'relative' }}>
              <img
                ref={imgRef}
                src={IMAGES.about}
                alt="RTL Construção"
                style={{ width: '100%', height: '115%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                loading="lazy"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(10,10,10,0.4))' }} />
              <div style={{ position: 'absolute', bottom: 24, left: 24, background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(8px)', padding: '12px 20px', borderLeft: '2px solid #cc5500' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, color: '#fff', fontWeight: 300, lineHeight: 1 }}>{COMPANY.founded.split(' ').pop()}</p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.18em', marginTop: 4 }}>FUNDAÇÃO</p>
              </div>
            </div>
            <div className="hidden lg:block" style={{ position: 'absolute', bottom: -12, left: -12, width: 18, height: 18, background: '#0F2340' }} />
          </div>

        </div>
      </div>
    </section>
  );
}
