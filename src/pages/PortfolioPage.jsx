import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Maximize2, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Modal from '../components/Modal';
import { PORTFOLIO, IMAGES } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const FILTERS = ['Todos', 'Residencial', 'Industrial', 'Alto Padrão'];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedItem, setSelectedItem] = useState(null);
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bgRef.current,
        { yPercent: -10 },
        { yPercent: 10, ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } }
      );
    });
    return () => ctx.revert();
  }, []);

  const filtered = activeFilter === 'Todos'
    ? PORTFOLIO
    : PORTFOLIO.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Page Hero */}
      <section ref={heroRef} className="relative h-[60vh] flex items-end overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 scale-110"
          style={{ backgroundImage: `url(${IMAGES.heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2))' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pb-20 w-full">
          <p className="font-cormorantSC text-[12px] tracking-[0.25em] mb-3" style={{ color: '#cc5500' }}>NOSSAS OBRAS</p>
          <div className="flex items-end justify-between">
            <h1 className="font-cormorant font-light text-white leading-tight" style={{ fontSize: 'clamp(44px, 6vw, 72px)', letterSpacing: '-0.02em' }}>
              Portfólio de Projetos
            </h1>
            <span className="font-cormorant text-white/30 hidden lg:block" style={{ fontSize: '80px', lineHeight: 1 }}>
              {PORTFOLIO.length}
            </span>
          </div>
        </div>
      </section>

      {/* Intro strip - LIGHT */}
      <section style={{ padding: '60px 0', background: '#FAFAF8', borderBottom: '1px solid rgba(10,10,10,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <p className="font-dm font-light text-base leading-relaxed max-w-xl" style={{ color: 'rgba(10,10,10,0.55)' }}>
              Cada projeto é o resultado de planejamento cuidadoso, tecnologia avançada e uma equipe dedicada.
              Confira obras executadas em São José do Rio Preto e região.
            </p>
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="font-dm text-xs px-4 py-2 rounded-sm transition-all duration-300"
                  style={{
                    background: activeFilter === f ? '#cc5500' : 'transparent',
                    color: activeFilter === f ? '#fff' : 'rgba(10,10,10,0.45)',
                    border: `1px solid ${activeFilter === f ? '#cc5500' : 'rgba(10,10,10,0.12)'}`,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid - LIGHT */}
      <section style={{ padding: '80px 0 140px', background: '#F7F4EF' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="overflow-hidden rounded-sm relative mb-4" style={{ aspectRatio: '4/3' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-sm" style={{ background: 'rgba(250,250,248,0.9)' }}>
                      <span className="font-cormorantSC text-[10px] tracking-[0.2em]" style={{ color: '#cc5500' }}>
                        {item.category}
                      </span>
                    </div>
                    <div
                      className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.3) 60%, transparent)' }}
                    >
                      <p className="font-cormorant font-light text-white text-lg">{item.title}</p>
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className="font-cormorant font-light text-lg mb-2 transition-colors group-hover:text-[#cc5500]"
                        style={{ color: '#0A0A0A' }}
                      >
                        {item.title}
                      </h3>
                      <div className="flex items-center flex-wrap gap-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={11} style={{ color: '#cc5500' }} />
                          <span className="font-dm font-light text-xs" style={{ color: 'rgba(10,10,10,0.45)' }}>{item.city}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={11} style={{ color: '#cc5500' }} />
                          <span className="font-dm font-light text-xs" style={{ color: 'rgba(10,10,10,0.45)' }}>{item.year}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Maximize2 size={11} style={{ color: '#cc5500' }} />
                          <span className="font-dm font-light text-xs" style={{ color: 'rgba(10,10,10,0.45)' }}>{item.area}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight
                      size={15}
                      className="flex-shrink-0 mt-1 transition-all group-hover:text-[#cc5500] group-hover:translate-x-1"
                      style={{ color: 'rgba(10,10,10,0.2)' }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA - DARK accent section */}
      <section style={{ padding: '120px 0', background: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
          <p className="font-cormorantSC text-[12px] tracking-[0.25em] mb-4" style={{ color: '#cc5500' }}>
            PRÓXIMO PROJETO
          </p>
          <h2 className="font-cormorant font-light text-white mb-6" style={{ fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '-0.01em' }}>
            Seu projeto pode ser o próximo
          </h2>
          <p className="font-dm font-light text-base mb-10 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Entre em contato e vamos transformar sua visão em realidade com qualidade e excelência.
          </p>
          <Link
            to="/contato"
            className="inline-flex items-center gap-3 font-dm font-medium text-sm px-10 py-4 rounded-sm transition-all duration-300"
            style={{ background: '#cc5500', color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#b34a00')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#cc5500')}
          >
            Solicitar Orçamento
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}
