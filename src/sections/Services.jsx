import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const SERVICE_IMAGES = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', // obras públicas / governo
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',   // infraestrutura / ponte
  'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800&q=80', // edificação institucional
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', // construção civil
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',   // reforma / revitalização
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', // gerenciamento
];

export default function Services({ hideHeader = false }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const rowsRef = useRef([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(row,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 90%' },
            delay: i * 0.07,
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicos"
      ref={sectionRef}
      style={{ background: '#F7F4EF', padding: '120px 0 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <div
          ref={titleRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
          style={{ opacity: 0, display: hideHeader ? 'none' : undefined }}
        >
          <div>
            <p
              style={{
                fontFamily: 'Cormorant SC, serif',
                fontSize: 10,
                letterSpacing: '0.38em',
                color: '#cc5500',
                marginBottom: 16,
                textTransform: 'uppercase',
              }}
            >
              Soluções Completas
            </p>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                fontWeight: 300,
                color: '#0A0A0A',
                letterSpacing: '-0.01em',
                lineHeight: 1.05,
              }}
            >
              Do contrato público<br />à obra entregue
            </h2>
          </div>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13,
              color: 'rgba(10,10,10,0.4)',
              fontWeight: 300,
              maxWidth: 280,
              lineHeight: 1.65,
            }}
          >
            Obras públicas, infraestrutura, edificações institucionais e construção civil — capacidade técnica em todas as frentes.
          </p>
        </div>
      </div>

      {/* Services rows */}
      <div
        style={{
          borderTop: '1px solid rgba(10,10,10,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background image that follows hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            transition: 'opacity 0.5s',
            opacity: hovered !== null ? 1 : 0,
          }}
        >
          {SERVICES.map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${SERVICE_IMAGES[i]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: hovered === i ? 0.06 : 0,
                transition: 'opacity 0.4s',
              }}
            />
          ))}
        </div>

        {SERVICES.map((service, i) => (
          <div
            key={service.id}
            ref={(el) => (rowsRef.current[i] = el)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderBottom: '1px solid rgba(10,10,10,0.08)',
              cursor: 'default',
              opacity: 0,
              position: 'relative',
              zIndex: 1,
              transition: 'background 0.35s',
              background: hovered === i ? '#0A0A0A' : 'transparent',
            }}
          >
            <div
              className="max-w-7xl mx-auto px-6 lg:px-16"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(16px, 4vw, 64px)',
                padding: '28px clamp(24px,6vw,80px)',
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(16px, 2vw, 24px)',
                  fontWeight: 300,
                  color: hovered === i ? 'rgba(204,85,0,0.7)' : 'rgba(10,10,10,0.12)',
                  minWidth: 44,
                  flexShrink: 0,
                  transition: 'color 0.35s',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Accent bar */}
              <div
                style={{
                  width: 2,
                  height: 36,
                  background: '#cc5500',
                  flexShrink: 0,
                  opacity: hovered === i ? 1 : 0,
                  transition: 'opacity 0.35s',
                }}
              />

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(22px, 2.5vw, 32px)',
                  fontWeight: 300,
                  color: hovered === i ? '#fff' : '#0A0A0A',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.35s',
                  flex: '0 0 clamp(180px, 28%, 320px)',
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="hidden lg:block"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13,
                  fontWeight: 300,
                  color: hovered === i ? 'rgba(255,255,255,0.45)' : 'rgba(10,10,10,0.45)',
                  flex: 1,
                  lineHeight: 1.65,
                  transition: 'color 0.35s',
                }}
              >
                {service.description}
              </p>

            </div>
          </div>
        ))}
      </div>

      {/* Bottom strip */}
      <div
        style={{
          background: '#0A0A0A',
          padding: '28px clamp(24px,6vw,80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(16px, 2vw, 22px)',
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 300,
            fontStyle: 'italic',
          }}
        >
          "Cada obra é única — e tratamos assim."
        </p>
        <Link
          to="/portfolio"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
            transition: 'opacity 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <span
            style={{
              fontFamily: 'Cormorant SC, serif',
              fontSize: 10,
              letterSpacing: '0.35em',
              color: '#cc5500',
            }}
          >
            VER PORTFÓLIO COMPLETO
          </span>
          <div style={{ width: 20, height: 1, background: '#cc5500' }} />
        </Link>
      </div>
    </section>
  );
}
