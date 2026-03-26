import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BLOG_POSTS } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
      );
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 88%' } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ background: '#F7F4EF', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <div
          ref={titleRef}
          style={{ opacity: 0, marginBottom: 56 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <p style={{
                fontFamily: 'Cormorant SC, serif',
                fontSize: 10, letterSpacing: '0.38em',
                color: '#cc5500', marginBottom: 14,
              }}>
                CONTEÚDO TÉCNICO
              </p>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(34px, 4vw, 52px)',
                fontWeight: 300, color: '#0A0A0A',
                letterSpacing: '-0.01em', lineHeight: 1.05,
              }}>
                Artigos e<br />
                <span style={{ color: '#cc5500' }}>conhecimento técnico</span>
              </h2>
            </div>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13, fontWeight: 300,
              color: 'rgba(10,10,10,0.4)', maxWidth: 260, lineHeight: 1.65,
            }}>
              Publicações sobre licitações, engenharia civil e gestão de obras para gestores públicos e privados.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <Link
              key={post.id}
              to={`/artigos/${post.slug}`}
              ref={el => (cardsRef.current[i] = el)}
              style={{ opacity: 0, display: 'flex', flexDirection: 'column', textDecoration: 'none' }}
              onMouseEnter={e => {
                const img = e.currentTarget.querySelector('.blog-img');
                if (img) img.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={e => {
                const img = e.currentTarget.querySelector('.blog-img');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {/* Image */}
              <div style={{ overflow: 'hidden', aspectRatio: '16/9', marginBottom: 20 }}>
                <div
                  className="blog-img"
                  style={{
                    width: '100%', height: '100%',
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    transition: 'transform 0.6s ease',
                  }}
                />
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{
                  fontFamily: 'Cormorant SC, serif', fontSize: 8,
                  letterSpacing: '0.3em', color: '#cc5500',
                }}>
                  {post.category.toUpperCase()}
                </span>
                <div style={{ width: 1, height: 10, background: 'rgba(10,10,10,0.15)' }} />
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 11,
                  fontWeight: 300, color: 'rgba(10,10,10,0.35)',
                }}>
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(18px, 1.8vw, 22px)',
                fontWeight: 300, color: '#0A0A0A',
                letterSpacing: '-0.005em', lineHeight: 1.2,
                marginBottom: 10,
              }}>
                {post.title}
              </h3>

              {/* Excerpt */}
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13, fontWeight: 300,
                color: 'rgba(10,10,10,0.45)', lineHeight: 1.65,
                flex: 1,
              }}>
                {post.excerpt}
              </p>

              {/* Bottom accent */}
              <div style={{
                marginTop: 18, paddingTop: 16,
                borderTop: '1px solid rgba(10,10,10,0.08)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <div style={{ width: 20, height: 1, background: '#cc5500' }} />
                <span style={{
                  fontFamily: 'Cormorant SC, serif', fontSize: 8,
                  letterSpacing: '0.28em', color: 'rgba(10,10,10,0.3)',
                }}>
                  LER ARTIGO
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
