import { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '../data/content';
import { ARTICLES } from '../data/articles';

gsap.registerPlugin(ScrollTrigger);

// ── Renders structured content blocks ────────────────────────────────────
function ContentBlock({ block }) {
  const S = {
    p: {
      fontFamily: 'DM Sans, sans-serif', fontSize: 16,
      fontWeight: 300, color: 'rgba(10,10,10,0.7)',
      lineHeight: 1.8, marginBottom: 24,
    },
    h2: {
      fontFamily: 'Cormorant Garamond, serif',
      fontSize: 'clamp(22px, 2.5vw, 30px)',
      fontWeight: 300, color: '#0A0A0A',
      letterSpacing: '-0.01em', lineHeight: 1.1,
      marginTop: 48, marginBottom: 16,
    },
    lead: {
      fontFamily: 'Cormorant Garamond, serif',
      fontSize: 'clamp(18px, 2vw, 22px)',
      fontWeight: 300, color: 'rgba(10,10,10,0.65)',
      lineHeight: 1.55, marginBottom: 40,
      fontStyle: 'italic',
    },
  };

  if (block.type === 'lead') return <p style={S.lead}>{block.text}</p>;
  if (block.type === 'p')    return <p style={S.p}>{block.text}</p>;
  if (block.type === 'h2')   return <h2 style={S.h2}>{block.text}</h2>;

  if (block.type === 'ul') return (
    <ul style={{ marginBottom: 28, paddingLeft: 0, listStyle: 'none' }}>
      {block.items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 14, marginBottom: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#cc5500', flexShrink: 0, marginTop: 8 }} />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 300, color: 'rgba(10,10,10,0.65)', lineHeight: 1.7 }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );

  if (block.type === 'blockquote') return (
    <blockquote style={{
      borderLeft: '3px solid #cc5500',
      paddingLeft: 24, margin: '36px 0',
    }}>
      <p style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(18px, 2vw, 22px)',
        fontWeight: 300, color: 'rgba(10,10,10,0.55)',
        lineHeight: 1.4, fontStyle: 'italic',
      }}>
        {block.text}
      </p>
    </blockquote>
  );

  return null;
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function BlogPostPage() {
  const { slug } = useParams();
  const heroRef  = useRef(null);
  const bodyRef  = useRef(null);

  const post    = BLOG_POSTS.find(p => p.slug === slug);
  const article = ARTICLES.find(a => a.slug === slug);

  if (!post || !article) return <Navigate to="/artigos" replace />;

  const otherPosts = BLOG_POSTS.filter(p => p.slug !== slug);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.post-hero-text > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.2 }
      );
      gsap.fromTo(bodyRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: bodyRef.current, start: 'top 88%' } }
      );
    });
    return () => ctx.revert();
  }, [slug]);

  return (
    <>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{ position: 'relative', height: '60vh', minHeight: 400, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${post.image})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.2))' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#cc5500' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 pb-16 w-full post-hero-text">
          {/* Back link */}
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'DM Sans, sans-serif', fontSize: 12,
              fontWeight: 300, color: 'rgba(255,255,255,0.45)',
              textDecoration: 'none', marginBottom: 20,
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#cc5500')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
          >
            <ArrowLeft size={13} /> Voltar ao início
          </Link>

          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: 'Cormorant SC, serif', fontSize: 9, letterSpacing: '0.3em', color: '#cc5500' }}>
              {post.category.toUpperCase()}
            </span>
            <div style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>
              {post.date}
            </span>
            <div style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>
              {article.readTime} de leitura
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 300, color: '#fff',
            letterSpacing: '-0.02em', lineHeight: 1.05,
            maxWidth: 760,
          }}>
            {post.title}
          </h1>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <section style={{ background: '#F7F4EF', padding: '80px 0 100px' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-16">

          {/* Article content */}
          <div ref={bodyRef} style={{ opacity: 0 }}>
            {article.content.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(10,10,10,0.08)', margin: '56px 0 48px' }} />

          {/* CTA */}
          <div style={{
            background: '#0F2340', padding: '36px 40px',
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 9, letterSpacing: '0.3em', color: '#cc5500' }}>
              FALE COM A RTL
            </p>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(22px, 2.5vw, 30px)',
              fontWeight: 300, color: '#fff', lineHeight: 1.1,
            }}>
              Tem um projeto de obra pública?<br />
              <span style={{ color: '#cc5500' }}>Entre em contato.</span>
            </p>
            <div style={{ marginTop: 8 }}>
              <Link
                to="/contato"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 12,
                  background: '#cc5500', color: '#fff',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13,
                  fontWeight: 500, padding: '13px 28px',
                  textDecoration: 'none', transition: 'background 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#b34a00')}
                onMouseLeave={e => (e.currentTarget.style.background = '#cc5500')}
              >
                Solicitar Orçamento
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER ARTICLES ── */}
      {otherPosts.length > 0 && (
        <section style={{ background: '#fff', padding: '80px 0 100px' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-16">
            <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 9, letterSpacing: '0.32em', color: '#cc5500', marginBottom: 32 }}>
              OUTROS ARTIGOS
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherPosts.map(p => (
                <Link
                  key={p.id}
                  to={`/artigos/${p.slug}`}
                  style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  <div style={{ overflow: 'hidden', aspectRatio: '16/9' }}>
                    <div
                      style={{
                        width: '100%', height: '100%',
                        backgroundImage: `url(${p.image})`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        transition: 'transform 0.5s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>
                  <span style={{ fontFamily: 'Cormorant SC, serif', fontSize: 8, letterSpacing: '0.28em', color: '#cc5500' }}>
                    {p.category}
                  </span>
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(17px, 1.8vw, 21px)',
                    fontWeight: 300, color: '#0A0A0A',
                    lineHeight: 1.2, letterSpacing: '-0.005em',
                    transition: 'color 0.3s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#cc5500')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#0A0A0A')}
                  >
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
