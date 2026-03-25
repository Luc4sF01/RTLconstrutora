import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Clock, Cpu, Shield } from 'lucide-react';
import { DIFFERENTIALS } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = { Users, Clock, Cpu, Shield };

export default function Differentials() {
  const blocksRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      blocksRef.current.forEach((block, i) => {
        if (!block) return;
        gsap.fromTo(block,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: block, start: 'top 88%' },
            delay: i * 0.1 }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ padding: '120px 0', background: '#F7F4EF' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <p className="font-cormorantSC text-[11px] tracking-[0.3em] mb-4" style={{ color: '#cc5500' }}>DIFERENCIAIS</p>
            <h2 className="font-cormorant font-light" style={{ fontSize: 'clamp(36px, 4vw, 52px)', color: '#0A0A0A' }}>
              Por que escolher a RTL?
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0" style={{ border: '1px solid rgba(10,10,10,0.08)' }}>
          {DIFFERENTIALS.map((d, i) => {
            const Icon = ICON_MAP[d.icon] || Users;
            return (
              <div
                key={d.number}
                ref={(el) => (blocksRef.current[i] = el)}
                className="relative p-8 lg:p-10 opacity-0 group hover:bg-[#0A0A0A] transition-colors duration-300"
                style={{ borderRight: i < DIFFERENTIALS.length - 1 ? '1px solid rgba(10,10,10,0.08)' : 'none' }}
              >
                {/* Big background number */}
                <span
                  className="absolute top-4 right-5 font-cormorant font-light select-none transition-opacity duration-300"
                  style={{ fontSize: '90px', color: 'rgba(10,10,10,0.04)', lineHeight: 1 }}
                >
                  {d.number}
                </span>

                <div className="relative z-10">
                  <div className="mb-5 w-10 h-10 rounded-sm flex items-center justify-center" style={{ background: 'rgba(204,85,0,0.08)' }}>
                    <Icon size={18} style={{ color: '#cc5500' }} />
                  </div>
                  <h3 className="font-cormorant font-light text-xl mb-3 transition-colors duration-300 group-hover:text-white" style={{ color: '#0A0A0A' }}>
                    {d.title}
                  </h3>
                  <p className="font-dm font-light text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/40" style={{ color: 'rgba(10,10,10,0.45)', fontSize: '13px' }}>
                    {d.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
