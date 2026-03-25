import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { IMAGES, STATS } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const labelRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const lineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const imgBoxRef = useRef(null);
  const marqueeRef = useRef(null);
  const accentBoxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax image
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

      // Photo box reveal from right
      gsap.fromTo(imgBoxRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut', delay: 0.6 }
      );

      // Accent box scale
      gsap.fromTo(accentBoxRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)', delay: 1.4 }
      );

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo(title1Ref.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.2'
      )
      .fromTo(title2Ref.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.75'
      )
      .fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: 'power3.out', transformOrigin: 'left' }, '-=0.4'
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4'
      )
      .fromTo(statsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3'
      )
      .fromTo(marqueeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }, '-=0.3'
      );
    });
    return () => ctx.revert();
  }, []);

  const marqueeText = 'CONSTRUÇÃO CIVIL · REFORMAS · OBRAS INDUSTRIAIS · INCORPORAÇÃO IMOBILIÁRIA · GERENCIAMENTO DE OBRAS · INFRAESTRUTURA · ';

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: '#F7F4EF', minHeight: '100vh' }}>

      {/* Right accent band */}
      <div className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:block" style={{ background: '#EDE9E3' }} />

      {/* Photo box - overlapping layout */}
      <div
        ref={imgBoxRef}
        className="absolute hidden lg:block overflow-hidden z-10"
        style={{
          top: '10%',
          right: '3%',
          width: '40%',
          height: '70%',
          clipPath: 'inset(0 100% 0 0)',
        }}
      >
        <div
          ref={imgRef}
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${IMAGES.heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(237,233,227,0.3))' }} />
      </div>

      {/* Accent corner box */}
      <div
        ref={accentBoxRef}
        className="absolute hidden lg:block z-20"
        style={{
          top: '8%',
          right: 'calc(3% + 38%)',
          width: '60px',
          height: '60px',
          background: '#cc5500',
          transform: 'scale(0)',
        }}
      />

      {/* Mobile background */}
      <div className="absolute inset-0 lg:hidden">
        <img
          src={IMAGES.heroBg}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.12 }}
          loading="eager"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-36 pb-10">

        {/* Label */}
        <div ref={labelRef} className="flex items-center gap-3 mb-10 opacity-0">
          <div className="w-8 h-px" style={{ background: '#cc5500' }} />
          <span className="font-cormorantSC text-[11px] tracking-[0.35em]" style={{ color: '#cc5500' }}>
            CONSTRUÇÃO CIVIL DE ALTO PADRÃO
          </span>
        </div>

        {/* Giant title */}
        <div className="overflow-hidden mb-1">
          <h1
            ref={title1Ref}
            className="font-cormorant font-light leading-[0.88] opacity-0"
            style={{
              fontSize: 'clamp(72px, 10vw, 148px)',
              color: '#0A0A0A',
              letterSpacing: '-0.02em',
            }}
          >
            Construindo
          </h1>
        </div>
        <div className="overflow-hidden mb-8">
          <h1
            ref={title2Ref}
            className="font-cormorant font-light leading-[0.88] opacity-0"
            style={{
              fontSize: 'clamp(72px, 10vw, 148px)',
              color: '#0A0A0A',
              letterSpacing: '-0.02em',
            }}
          >
            o <em style={{ color: '#cc5500', fontStyle: 'italic' }}>Futuro.</em>
          </h1>
        </div>

        {/* Accent line */}
        <div
          ref={lineRef}
          className="mb-7 origin-left"
          style={{ height: '2px', background: '#cc5500', width: '80px', transform: 'scaleX(0)' }}
        />

        {/* Subtitle */}
        <p
          ref={subRef}
          className="font-dm font-light leading-relaxed mb-10 opacity-0"
          style={{ fontSize: '16px', color: 'rgba(10,10,10,0.55)', maxWidth: '380px' }}
        >
          Obras residenciais, industriais, reformas e incorporações em São José do Rio Preto
          e região com excelência, tecnologia e compromisso.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 items-center opacity-0">
          <Link
            to="/portfolio"
            className="group flex items-center gap-3 font-dm font-medium text-sm px-7 py-4 rounded-sm transition-all duration-300"
            style={{ background: '#cc5500', color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#b34a00')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#cc5500')}
          >
            Ver Portfólio
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/sobre"
            className="font-dm font-light text-sm transition-all duration-300 border-b"
            style={{ color: '#0A0A0A', borderColor: 'rgba(10,10,10,0.25)', paddingBottom: '2px' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#cc5500')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(10,10,10,0.25)')}
          >
            Conheça a RTL
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div
        ref={statsRef}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pb-0 mt-16 opacity-0"
      >
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ borderTop: '1px solid rgba(10,10,10,0.1)' }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="py-6 pr-6"
              style={{ borderRight: i < 3 ? '1px solid rgba(10,10,10,0.06)' : 'none' }}
            >
              <div
                className="font-cormorant font-light leading-none mb-1"
                style={{ fontSize: 'clamp(36px, 4vw, 52px)', color: '#0A0A0A' }}
              >
                {stat.prefix}<span>{stat.value}</span>{stat.suffix}
              </div>
              <p className="font-dm font-light text-xs" style={{ color: 'rgba(10,10,10,0.4)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee band */}
      <div
        ref={marqueeRef}
        className="relative z-10 overflow-hidden mt-0 opacity-0"
        style={{ background: '#0A0A0A', padding: '14px 0', marginTop: '40px' }}
      >
        <div className="marquee-track flex gap-0 whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-cormorantSC text-[11px] tracking-[0.28em] px-6"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {marqueeText.split(' · ').map((item, j) => (
                <span key={j}>
                  {item}
                  {j < marqueeText.split(' · ').length - 1 && (
                    <span style={{ color: '#cc5500', margin: '0 16px' }}>·</span>
                  )}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10">
        <span className="font-cormorantSC text-[9px] tracking-[0.35em]" style={{ color: 'rgba(10,10,10,0.3)' }}>SCROLL</span>
        <div className="w-px h-10 relative overflow-hidden" style={{ background: 'rgba(10,10,10,0.1)' }}>
          <div className="scroll-line absolute top-0 w-full h-1/2" style={{ background: '#cc5500' }} />
        </div>
      </div>
    </section>
  );
}
