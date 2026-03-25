import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const FILTERS = ['Todos', 'Institucional', 'Infraestrutura', 'Governamental', 'Residencial'];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [hovered, setHovered] = useState(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const filtered = activeFilter === 'Todos'
    ? PORTFOLIO
    : PORTFOLIO.filter((p) => p.category === activeFilter);

  return (
    <section id="obras" style={{ padding: '120px 0', background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <div
          ref={titleRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            marginBottom: 56,
            opacity: 0,
          }}
          className="lg:flex-row lg:items-end lg:justify-between"
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
              Portfólio
            </p>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                fontWeight: 300,
                color: '#fff',
                letterSpacing: '-0.01em',
                lineHeight: 1.05,
              }}
            >
              Projetos em<br />
              <em style={{ color: '#cc5500', fontStyle: 'italic' }}>destaque</em>
            </h2>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  padding: '8px 18px',
                  background: activeFilter === f ? '#cc5500' : 'transparent',
                  color: activeFilter === f ? '#fff' : 'rgba(255,255,255,0.35)',
                  border: `1px solid ${activeFilter === f ? '#cc5500' : 'rgba(255,255,255,0.1)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== f) e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== f) e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Numbered horizontal list */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    cursor: 'default',
                    background: hovered === item.id ? 'rgba(255,255,255,0.03)' : 'transparent',
                    transition: 'background 0.3s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(12px, 3vw, 40px)',
                      padding: '24px 0',
                    }}
                  >
                    {/* Number */}
                    <span
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: 'clamp(14px, 1.8vw, 20px)',
                        fontWeight: 300,
                        color: hovered === item.id ? '#cc5500' : 'rgba(255,255,255,0.15)',
                        minWidth: 40,
                        flexShrink: 0,
                        transition: 'color 0.3s',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Thumbnail */}
                    <div
                      style={{
                        width: 'clamp(60px, 8vw, 96px)',
                        height: 'clamp(44px, 6vw, 68px)',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s',
                          transform: hovered === item.id ? 'scale(1.08)' : 'scale(1)',
                        }}
                        loading="lazy"
                      />
                    </div>

                    {/* Title */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: 'clamp(18px, 2.5vw, 28px)',
                          fontWeight: 300,
                          color: '#fff',
                          letterSpacing: '-0.01em',
                          lineHeight: 1.1,
                          transition: 'color 0.3s',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: 11,
                          color: 'rgba(255,255,255,0.3)',
                          fontWeight: 300,
                          marginTop: 4,
                        }}
                      >
                        {item.city}
                      </p>
                    </div>

                    {/* Category */}
                    <span
                      className="hidden md:block"
                      style={{
                        fontFamily: 'Cormorant SC, serif',
                        fontSize: 9,
                        letterSpacing: '0.28em',
                        color: '#cc5500',
                        border: '1px solid rgba(204,85,0,0.25)',
                        padding: '5px 12px',
                        flexShrink: 0,
                      }}
                    >
                      {item.category}
                    </span>

                    {/* Year + Area */}
                    <div
                      className="hidden lg:flex"
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: 3,
                        flexShrink: 0,
                        minWidth: 80,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: 12,
                          color: 'rgba(255,255,255,0.45)',
                          fontWeight: 300,
                        }}
                      >
                        {item.year}
                      </span>
                      <span
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: 11,
                          color: 'rgba(255,255,255,0.2)',
                          fontWeight: 300,
                        }}
                      >
                        {item.area}
                      </span>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 48,
              }}
            >
              <a
                href="/portfolio"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontFamily: 'Cormorant SC, serif',
                  fontSize: 11,
                  letterSpacing: '0.32em',
                  color: 'rgba(255,255,255,0.4)',
                  transition: 'color 0.3s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                VER TODOS OS PROJETOS
                <div style={{ width: 28, height: 1, background: 'currentColor' }} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
}
