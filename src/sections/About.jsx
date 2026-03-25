import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STATS, COMPANY, IMAGES } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

function StatBox({ stat, index }) {
  const numRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(boxRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: boxRef.current, start: 'top 88%' },
          delay: index * 0.08,
        }
      );
      const counter = { val: 0 };
      gsap.to(counter, {
        val: stat.value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: boxRef.current, start: 'top 88%' },
        onUpdate: () => { if (numRef.current) numRef.current.textContent = Math.round(counter.val); },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={boxRef} className="p-5 opacity-0" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}>
      <div className="font-cormorant font-light leading-none mb-1" style={{ fontSize: '48px', color: '#0A0A0A' }}>
        {stat.prefix}<span ref={numRef}>0</span><span style={{ fontSize: '24px' }}>{stat.suffix}</span>
      </div>
      <p className="font-dm font-light text-xs" style={{ color: 'rgba(10,10,10,0.45)' }}>{stat.label}</p>
    </div>
  );
}

export default function About() {
  const leftRef = useRef(null);
  const imgRef = useRef(null);
  const accentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(imgRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 1 },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'power3.inOut',
          scrollTrigger: { trigger: imgRef.current, start: 'top 85%' } }
      );
      gsap.fromTo(accentRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)',
          scrollTrigger: { trigger: imgRef.current, start: 'top 80%' }, delay: 0.5 }
      );
      // Parallax on image
      gsap.to(imgRef.current?.querySelector('.parallax-img'), {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: imgRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" style={{ padding: '140px 0', background: '#FAFAF8', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Left - text */}
          <div ref={leftRef} className="opacity-0 lg:pt-10">
            <p className="font-cormorantSC text-[11px] tracking-[0.3em] mb-5" style={{ color: '#cc5500' }}>
              SOBRE A RTL
            </p>
            <h2
              className="font-cormorant font-light leading-tight mb-6"
              style={{ fontSize: 'clamp(38px, 4.5vw, 56px)', color: '#0A0A0A', letterSpacing: '-0.01em' }}
            >
              Construindo com<br />propósito desde<br />{COMPANY.founded.split(' ').pop()}
            </h2>
            <div className="mb-7" style={{ width: '60px', height: '2px', background: '#cc5500' }} />

            <p className="font-dm font-light text-base leading-relaxed mb-5" style={{ color: 'rgba(10,10,10,0.55)', fontSize: '15px' }}>
              A RTL Construção de Edifícios nasceu em {COMPANY.founded} com uma missão clara:
              entregar obras com excelência técnica, dentro do prazo e com total transparência.
              Atuamos em construção civil, obras industriais, reformas e incorporação imobiliária
              na região de São José do Rio Preto - SP.
            </p>
            <p className="font-dm font-light text-base leading-relaxed mb-8" style={{ color: 'rgba(10,10,10,0.55)', fontSize: '15px' }}>
              Do projeto à entrega, nossa equipe de engenheiros e mestres de obra certificados
              garante padrão de qualidade e segurança em cada fase da construção.
            </p>

            <p className="font-cormorant italic mb-4" style={{ fontSize: '22px', color: '#cc5500', fontWeight: 400 }}>
              "Construir com excelência, entregar com confiança"
            </p>
            <p className="font-dm font-light text-xs" style={{ color: 'rgba(10,10,10,0.25)' }}>
              CNPJ: {COMPANY.cnpj}
            </p>
          </div>

          {/* Right — photo with overlapping stats */}
          <div className="relative">
            {/* Accent square top-right */}
            <div
              ref={accentRef}
              className="absolute -top-5 -right-5 w-16 h-16 z-10 hidden lg:block"
              style={{ background: '#cc5500', opacity: 0 }}
            />

            {/* Main image */}
            <div
              ref={imgRef}
              className="relative overflow-hidden"
              style={{ aspectRatio: '3/4', clipPath: 'inset(100% 0 0 0)' }}
            >
              <img
                className="parallax-img w-full h-full object-cover scale-110"
                src={IMAGES.about}
                alt="RTL Construção - Obras"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.3))' }} />
            </div>

            {/* Stats overlapping bottom of image */}
            <div
              className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-px"
              style={{ background: 'rgba(10,10,10,0.06)' }}
            >
              {STATS.map((stat, i) => (
                <StatBox key={stat.label} stat={stat} index={i} />
              ))}
            </div>

            {/* Small accent dot bottom-left */}
            <div
              className="absolute -bottom-3 -left-3 w-6 h-6 hidden lg:block"
              style={{ background: '#0A0A0A' }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
