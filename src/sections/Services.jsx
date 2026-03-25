import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
      );
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(item,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 88%' },
            delay: i * 0.06 }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="servicos" ref={sectionRef} style={{ padding: '140px 0', background: '#F7F4EF' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <div ref={titleRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 opacity-0">
          <div>
            <p className="font-cormorantSC text-[11px] tracking-[0.3em] mb-4" style={{ color: '#cc5500' }}>NOSSOS SERVIÇOS</p>
            <h2
              className="font-cormorant font-light leading-tight"
              style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', color: '#0A0A0A', letterSpacing: '-0.01em' }}
            >
              Soluções completas<br />para cada etapa
            </h2>
          </div>
          <p className="font-dm font-light text-sm max-w-xs lg:mb-2" style={{ color: 'rgba(10,10,10,0.45)' }}>
            Do projeto ao acabamento, com tecnologia BIM e equipe especializada em cada frente de trabalho.
          </p>
        </div>

        {/* Services list */}
        <div style={{ borderTop: '1px solid rgba(10,10,10,0.08)' }}>
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => (itemsRef.current[i] = el)}
              className="group flex items-center gap-6 lg:gap-12 py-7 lg:py-8 opacity-0 cursor-default"
              style={{ borderBottom: '1px solid rgba(10,10,10,0.08)', transition: 'background 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#0A0A0A'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              {/* Number */}
              <span
                className="font-cormorant font-light flex-shrink-0 transition-colors duration-300 group-hover:text-[#cc5500]"
                style={{ fontSize: 'clamp(18px, 2vw, 26px)', color: 'rgba(10,10,10,0.15)', minWidth: '48px' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Content */}
              <div className="flex-1 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-12">
                <h3
                  className="font-cormorant font-light transition-colors duration-300 group-hover:text-white lg:w-[35%] flex-shrink-0"
                  style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#0A0A0A', letterSpacing: '-0.01em' }}
                >
                  {service.title}
                </h3>
                <p
                  className="font-dm font-light text-sm leading-relaxed flex-1 transition-colors duration-300 group-hover:text-white/50"
                  style={{ color: 'rgba(10,10,10,0.5)', fontSize: '14px' }}
                >
                  {service.description}
                </p>
              </div>

              {/* Arrow */}
              <ArrowRight
                size={18}
                className="flex-shrink-0 transition-all duration-300 group-hover:text-[#cc5500] group-hover:translate-x-1"
                style={{ color: 'rgba(10,10,10,0.15)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
