import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Services from '../sections/Services';
import { IMAGES } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bgRef.current,
        { yPercent: -10 },
        {
          yPercent: 10, ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Page Hero */}
      <section ref={heroRef} className="relative h-[65vh] flex items-end overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.18))' }}
        />

        {/* Accent bar top */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: '#cc5500' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pb-20 w-full">
          <p
            style={{
              fontFamily: 'Cormorant SC, serif',
              fontSize: 11,
              letterSpacing: '0.3em',
              color: '#cc5500',
              marginBottom: 14,
            }}
          >
            SOLUÇÕES COMPLETAS
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h1
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(42px, 6vw, 78px)',
                fontWeight: 300,
                color: '#fff',
                letterSpacing: '-0.025em',
                lineHeight: 0.95,
              }}
            >
              Nossos<br />
              <span style={{ color: '#cc5500' }}>Serviços</span>
            </h1>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                color: 'rgba(255,255,255,0.45)',
                fontWeight: 300,
                maxWidth: 320,
                lineHeight: 1.7,
              }}
            >
              Do contrato público à obra entregue — capacidade técnica em todas as frentes da construção civil.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Services hideHeader />

      {/* CTA */}
      <section style={{ padding: '120px 0', background: '#0F2340' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
          <p
            style={{
              fontFamily: 'Cormorant SC, serif',
              fontSize: 11,
              letterSpacing: '0.3em',
              color: '#cc5500',
              marginBottom: 16,
            }}
          >
            SOLICITE SEU ORÇAMENTO
          </p>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(36px, 4vw, 54px)',
              fontWeight: 300,
              color: '#fff',
              letterSpacing: '-0.01em',
              marginBottom: 20,
              lineHeight: 1.1,
            }}
          >
            Pronto para iniciar<br />sua obra?
          </h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.45)',
              fontWeight: 300,
              maxWidth: 400,
              margin: '0 auto 40px',
              lineHeight: 1.7,
            }}
          >
            Entre em contato com a RTL e receba um orçamento detalhado sem compromisso.
          </p>
          <Link
            to="/contato"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: '#cc5500',
              color: '#fff',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13,
              fontWeight: 500,
              padding: '15px 36px',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#b34a00')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#cc5500')}
          >
            Falar com a RTL
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
