import { Suspense, lazy, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { RotateCcw, Layers, Cpu } from 'lucide-react';
import { IMAGES } from '../data/content';

const BuildingModel = lazy(() => import('../components/3d/BuildingModel'));

gsap.registerPlugin(ScrollTrigger);

function Spinner() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <div
        className="w-12 h-12 rounded-full border-2 animate-spin"
        style={{ borderColor: 'rgba(204,85,0,0.15)', borderTopColor: '#cc5500' }}
      />
      <span className="font-cormorantSC text-[10px] tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
        CARREGANDO MODELO
      </span>
    </div>
  );
}

export default function Building3D() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' } }
      );
      gsap.fromTo(canvasRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }, delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-3d"
      style={{ background: '#0A0A0A', minHeight: '100vh', overflow: 'hidden', position: 'relative' }}
    >
      {/* Full layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* Left text panel - 30% */}
        <div
          ref={textRef}
          className="opacity-0 flex flex-col justify-center w-full lg:w-[30%] px-8 lg:px-14 py-20 lg:py-0 flex-shrink-0 z-10"
          style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="font-cormorantSC text-[11px] tracking-[0.3em] mb-5" style={{ color: '#cc5500' }}>
            TECNOLOGIA & VISÃO
          </p>
          <h2
            className="font-cormorant font-light text-white leading-tight mb-5"
            style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', letterSpacing: '-0.01em' }}
          >
            Cada detalhe<br />
            <em style={{ color: '#cc5500', fontStyle: 'italic' }}>planejado.</em>
          </h2>
          <div className="w-10 h-px mb-6" style={{ background: '#cc5500' }} />
          <p className="font-dm font-light leading-relaxed mb-10" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>
            Utilizamos tecnologia BIM e modelagem 3D para planejar cada empreendimento
            com precisão milimétrica antes do primeiro tijolo ser assentado.
            Explore o modelo interativo ao lado.
          </p>

          {/* Tech features */}
          <div className="space-y-4">
            {[
              { icon: Layers, label: 'Modelagem BIM', desc: 'Projeto completo em 3D' },
              { icon: RotateCcw, label: 'Visualização 360°', desc: 'Explore antes de construir' },
              { icon: Cpu, label: 'Precisão Técnica', desc: 'Detalhamento milimétrico' },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-3"
                style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}
              >
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-sm" style={{ background: 'rgba(204,85,0,0.1)' }}>
                  <Icon size={14} style={{ color: '#cc5500' }} />
                </div>
                <div>
                  <p className="font-dm font-medium text-sm text-white">{label}</p>
                  <p className="font-dm font-light text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Hint */}
          <div className="flex items-center gap-2 mt-8">
            <RotateCcw size={11} style={{ color: 'rgba(255,255,255,0.2)' }} />
            <span className="font-dm font-light text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Arraste o modelo para explorar
            </span>
          </div>
        </div>

        {/* Right canvas - 70% */}
        <div
          ref={canvasRef}
          className="opacity-0 flex-1 relative"
          style={{ minHeight: isMobile ? '70vw' : '100vh' }}
        >
          {isMobile ? (
            <img
              src={IMAGES.heroBg}
              alt="Modelo 3D RTL"
              className="w-full h-full object-cover"
              style={{ opacity: 0.4, minHeight: '300px' }}
              loading="lazy"
            />
          ) : (
            <Suspense fallback={<Spinner />}>
              <BuildingModel />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  );
}
