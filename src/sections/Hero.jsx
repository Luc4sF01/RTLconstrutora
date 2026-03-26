import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { IMAGES, STATS } from '../data/content';
import HeroCanvas from '../components/HeroCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on photo
      gsap.to(imgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Entrance
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo('.hero-label',
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo('.hero-word',
        { yPercent: 110, rotateX: 12 },
        { yPercent: 0, rotateX: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo('.hero-divider',
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo('.hero-sub',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo('.hero-cta',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo('.hero-img-panel',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut' },
        0.4
      )
      .fromTo('.hero-stat-item',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo('.hero-marquee',
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.2'
      );
    });
    return () => ctx.revert();
  }, []);

  const marqueeItems = [
    'CONSTRUÇÃO CIVIL',
    'OBRAS INDUSTRIAIS',
    'REFORMAS',
    'INCORPORAÇÃO IMOBILIÁRIA',
    'GERENCIAMENTO DE OBRAS',
    'INFRAESTRUTURA',
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#0F2340',
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Three.js animated background */}
      <HeroCanvas />

      {/* Right photo panel */}
      <div
        className="hero-img-panel hidden lg:block absolute"
        style={{
          top: 0,
          right: 0,
          bottom: 0,
          width: '46%',
          clipPath: 'inset(0 100% 0 0)',
          zIndex: 1,
        }}
      >
        <div
          ref={imgRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${IMAGES.heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1.14)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0A0A0A 0%, rgba(10,10,10,0.2) 40%, transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.15)' }} />
      </div>

      {/* Mobile background */}
      <div className="absolute inset-0 lg:hidden" style={{ zIndex: 0 }}>
        <img src={IMAGES.heroBg} alt="" className="w-full h-full object-cover" style={{ opacity: 0.07 }} loading="eager" />
      </div>

      {/* ── Main content ── */}
      <div
        className="relative flex-1 flex flex-col justify-center"
        style={{ zIndex: 10, maxWidth: 1400, width: '100%', margin: '0 auto', padding: 'clamp(110px,14vh,160px) clamp(24px,6vw,80px) 0' }}
      >

        {/* Label row */}
        <div className="hero-label flex items-center gap-3 mb-8" style={{ opacity: 0 }}>
          <div style={{ width: 24, height: 1, background: '#cc5500' }} />
          <span style={{ fontFamily: 'Cormorant SC, serif', fontSize: 10, letterSpacing: '0.38em', color: '#cc5500' }}>
            CONSTRUÇÃO CIVIL DE ALTO PADRÃO
          </span>
        </div>

        {/* ── Headline ── each word wraps in an overflow:hidden clipper */}
        <div style={{ marginBottom: 32, perspective: '800px' }}>
          {['Construindo', 'com', 'Excelência.'].map((word, i) => (
            <div key={word} style={{ overflow: 'hidden', lineHeight: 0.93 }}>
              <span
                className="hero-word"
                style={{
                  display: 'block',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(52px, 9.8vw, 148px)',
                  fontWeight: 300,
                  letterSpacing: '-0.025em',
                  color: i === 2 ? '#cc5500' : '#ffffff',
                  fontStyle: 'normal',
                  lineHeight: 0.93,
                }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="hero-divider" style={{ width: 60, height: 2, background: '#cc5500', marginBottom: 24 }} />

        {/* Subtitle */}
        <p
          className="hero-sub"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            color: 'rgba(255,255,255,0.7)',
            maxWidth: 380,
            lineHeight: 1.75,
            fontWeight: 300,
            marginBottom: 32,
            opacity: 0,
          }}
        >
          Construção civil de alto padrão — obras públicas, pontes, escolas,
          infraestrutura e edificações privadas em toda a região.
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-wrap gap-4 items-center" style={{ opacity: 0 }}>
          <Link
            to="/portfolio"
            className="group flex items-center gap-3"
            style={{ background: '#cc5500', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500, padding: '14px 28px', letterSpacing: '0.03em', textDecoration: 'none', transition: 'background 0.3s' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#b34a00')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#cc5500')}
          >
            Ver Portfólio
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/contato"
            style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 300, borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: 2, textDecoration: 'none', transition: 'color 0.3s, border-color 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
          >
            Solicitar Orçamento
          </Link>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div
        className="relative"
        style={{ zIndex: 10, maxWidth: 1400, width: '100%', margin: '52px auto 0', padding: '0 clamp(24px,6vw,80px)' }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="hero-stat-item py-6 pr-4 lg:pr-6"
              style={{ borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none', opacity: 0 }}
            >
              {/* Big number */}
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.02em' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '68%' }}>{stat.prefix}</span>
                {stat.value}
                {stat.suffix && (
                  <span style={{ color: '#cc5500', fontSize: '52%', marginLeft: 2 }}>{stat.suffix}</span>
                )}
              </div>
              {/* Label */}
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 300, marginTop: 5, letterSpacing: '0.02em' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Marquee ── */}
      <div
        className="hero-marquee relative overflow-hidden"
        style={{ background: '#cc5500', padding: '11px 0', marginTop: 40, opacity: 0, zIndex: 10 }}
      >
        <div className="marquee-track flex whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...Array(6)].map((_, ri) => (
            <span key={ri} style={{ fontFamily: 'Cormorant SC, serif', fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.8)', padding: '0 0' }}>
              {marqueeItems.map((item, j) => (
                <span key={j}>
                  <span style={{ padding: '0 20px' }}>{item}</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '8px' }}>◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll line */}
      <div className="hidden lg:flex absolute" style={{ bottom: 112, right: 'clamp(24px,6vw,80px)', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10 }}>
        <div style={{ width: 1, height: 52, background: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
          <div className="scroll-line" style={{ position: 'absolute', top: 0, width: '100%', height: '50%', background: '#cc5500' }} />
        </div>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 9, letterSpacing: '0.32em', color: 'rgba(255,255,255,0.25)', writingMode: 'vertical-rl', textTransform: 'uppercase' }}>Scroll</span>
      </div>

    </section>
  );
}
