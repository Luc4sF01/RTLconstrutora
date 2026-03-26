import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DIFFERENTIALS } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  Building2: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
    </svg>
  ),
  Users: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Cpu: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  Shield: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

export default function Differentials() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const rowsRef = useRef([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(row,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%' },
            delay: i * 0.1,
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: '#F7F4EF', overflow: 'hidden' }}
    >
      {/* Dark header band */}
      <div style={{ background: '#0F2340', padding: '80px clamp(24px,6vw,80px) 60px' }}>
        <div className="max-w-7xl mx-auto">
          <div
            ref={titleRef}
            style={{ opacity: 0 }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
          >
            <div>
              <p
                style={{
                  fontFamily: 'Cormorant SC, serif',
                  fontSize: 12,
                  letterSpacing: '0.38em',
                  color: '#cc5500',
                  marginBottom: 16,
                }}
              >
                DIFERENCIAIS
              </p>
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(38px, 5vw, 68px)',
                  fontWeight: 300,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                  lineHeight: 0.95,
                }}
              >
                Por que<br />
                <span style={{ color: '#cc5500' }}>escolher a RTL?</span>
              </h2>
            </div>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 15,
                color: 'rgba(255,255,255,0.3)',
                fontWeight: 300,
                maxWidth: 260,
                lineHeight: 1.7,
              }}
            >
              4 razões que colocam a RTL acima da média no mercado da construção civil.
            </p>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div style={{ borderTop: '1px solid rgba(10,10,10,0.06)' }}>
        {DIFFERENTIALS.map((d, i) => {
          const isHovered = hovered === i;
          return (
            <div
              key={d.number}
              ref={(el) => (rowsRef.current[i] = el)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderBottom: '1px solid rgba(10,10,10,0.06)',
                background: isHovered ? '#0A0A0A' : 'transparent',
                transition: 'background 0.35s',
                cursor: 'default',
                opacity: 0,
              }}
            >
              <div
                className="max-w-7xl mx-auto"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  alignItems: 'center',
                  gap: 'clamp(20px, 4vw, 56px)',
                  padding: '40px clamp(24px,6vw,80px)',
                }}
              >
                {/* Left: number + icon */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 80 }}>
                  <span
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(52px, 6vw, 80px)',
                      fontWeight: 300,
                      lineHeight: 1,
                      color: isHovered ? 'rgba(204,85,0,0.2)' : 'rgba(10,10,10,0.06)',
                      transition: 'color 0.35s',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {d.number}
                  </span>
                  <div
                    style={{
                      color: isHovered ? '#cc5500' : 'rgba(10,10,10,0.25)',
                      transition: 'color 0.35s',
                    }}
                  >
                    {ICONS[d.icon] || ICONS.Users}
                  </div>
                </div>

                {/* Center: content */}
                <div>
                  {/* Accent bar on hover */}
                  <div
                    style={{
                      width: isHovered ? 40 : 0,
                      height: 2,
                      background: '#cc5500',
                      marginBottom: 14,
                      transition: 'width 0.35s',
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(26px, 3.2vw, 42px)',
                      fontWeight: 300,
                      color: isHovered ? '#fff' : '#0A0A0A',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.1,
                      marginBottom: 10,
                      transition: 'color 0.35s',
                    }}
                  >
                    {d.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 15,
                      fontWeight: 300,
                      color: isHovered ? 'rgba(255,255,255,0.45)' : 'rgba(10,10,10,0.45)',
                      lineHeight: 1.65,
                      maxWidth: 440,
                      transition: 'color 0.35s',
                    }}
                  >
                    {d.description}
                  </p>
                </div>

                {/* Right: large italic word */}
                <div
                  className="hidden lg:block"
                  style={{ textAlign: 'right' }}
                >
                  <span
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(16px, 2.2vw, 22px)',
                      color: isHovered ? '#cc5500' : 'rgba(10,10,10,0.12)',
                      letterSpacing: '0.02em',
                      transition: 'color 0.35s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {['Especializada', 'Pontual', 'Inovadora', 'Segura'][i]}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA band */}
      <div
        style={{
          background: '#cc5500',
          padding: '40px clamp(24px,6vw,80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              fontWeight: 300,
              color: '#fff',
              lineHeight: 1.1,
            }}
          >
            Pronto para começar sua obra?
          </p>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 15,
              color: 'rgba(255,255,255,0.7)',
              marginTop: 6,
              fontWeight: 300,
            }}
          >
            Entre em contato e receba um orçamento sem compromisso.
          </p>
        </div>
        <a
          href="/contato"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: '#fff',
            color: '#cc5500',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 15,
            fontWeight: 500,
            padding: '14px 28px',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            flexShrink: 0,
            transition: 'background 0.25s, color 0.25s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#cc5500'; }}
        >
          Falar com a RTL
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
