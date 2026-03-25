import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Modal from '../components/Modal';
import { PORTFOLIO } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const FILTERS = ['Todos', 'Residencial', 'Industrial', 'Alto Padrão'];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedItem, setSelectedItem] = useState(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  const filtered = activeFilter === 'Todos'
    ? PORTFOLIO
    : PORTFOLIO.filter((p) => p.category === activeFilter);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section id="obras" style={{ padding: '140px 0', background: '#FAFAF8' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <div ref={titleRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 opacity-0">
          <div>
            <p className="font-cormorantSC text-[11px] tracking-[0.3em] mb-4" style={{ color: '#cc5500' }}>PORTFÓLIO</p>
            <h2 className="font-cormorant font-light" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', color: '#0A0A0A', letterSpacing: '-0.01em' }}>
              Obras que falam por si
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 lg:mb-2">
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

        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {/* Featured project */}
            {featured && (
              <motion.div
                layout
                className="group relative overflow-hidden rounded-sm cursor-pointer mb-4"
                style={{ height: 'clamp(300px, 50vh, 520px)' }}
                onClick={() => setSelectedItem(featured)}
              >
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 transition-opacity duration-400" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 50%, transparent)' }} />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-cormorantSC text-[10px] tracking-[0.2em] px-3 py-1.5 rounded-sm" style={{ background: 'rgba(204,85,0,0.9)', color: '#fff' }}>
                        {featured.category}
                      </span>
                      <span className="font-dm font-light text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {featured.year}
                      </span>
                    </div>
                    <h3 className="font-cormorant font-light text-white" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
                      {featured.title}
                    </h3>
                    <p className="font-dm font-light text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {featured.city} · {featured.area}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-white/50 group-hover:text-[#cc5500] transition-colors">
                    <span className="font-cormorantSC text-[10px] tracking-[0.2em]">VER PROJETO</span>
                    <div className="w-8 h-px" style={{ background: 'currentColor' }} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Rest grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {rest.map((item, i) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="group relative overflow-hidden cursor-pointer rounded-sm"
                      style={{ aspectRatio: '4/3' }}
                      onClick={() => setSelectedItem(item)}
                    >
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
                        <h3 className="font-cormorant font-light text-white text-xl leading-tight">{item.title}</h3>
                        <p className="font-dm font-light text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                          {item.city} · {item.year}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
}
