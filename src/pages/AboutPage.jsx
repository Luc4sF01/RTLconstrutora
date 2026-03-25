import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';
import Differentials from '../sections/Differentials';
import Testimonials from '../sections/Testimonials';
import { COMPANY, STATS, IMAGES } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  { year: '2023', title: 'Fundação da RTL', desc: 'Empresa fundada em Fevereiro de 2023 por profissionais com mais de 15 anos de experiência no setor da construção civil.' },
  { year: '2023', title: 'Primeiros Projetos', desc: 'Entrega dos primeiros contratos residenciais e início das obras industriais na região de São José do Rio Preto.' },
  { year: '2024', title: 'Expansão Regional', desc: 'Ampliação da área de atuação para cidades da região: Mirassol, Bady Bassitt, Cedral e outras municipalidades.' },
  { year: '2025', title: 'Referência Regional', desc: 'Mais de 50 obras entregues com reconhecimento como referência em qualidade, pontualidade e excelência técnica na região.' },
];

const VALUES = [
  'Excelência técnica em cada detalhe',
  'Transparência total com o cliente',
  'Compromisso absoluto com prazos',
  'Segurança como prioridade máxima',
  'Inovação com tecnologia BIM',
  'Responsabilidade ambiental e social',
];

function TimelineItem({ item, index }) {
  const itemRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(itemRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: itemRef.current, start: 'top 88%' },
          delay: index * 0.1 }
      );
    });
    return () => ctx.revert();
  }, []);
  return (
    <div ref={itemRef} className="flex gap-8 lg:gap-14 items-start opacity-0">
      <div className="flex-shrink-0 text-right" style={{ minWidth: '60px' }}>
        <span className="font-cormorant font-light" style={{ fontSize: '28px', color: '#cc5500' }}>{item.year}</span>
      </div>
      <div className="flex-1 pb-10" style={{ borderLeft: '1px solid rgba(10,10,10,0.08)', paddingLeft: '28px', position: 'relative' }}>
        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: '#cc5500', background: '#FAFAF8' }} />
        <h3 className="font-cormorant font-light mb-2" style={{ fontSize: '22px', color: '#0A0A0A' }}>{item.title}</h3>
        <p className="font-dm font-light text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.5)', fontSize: '14px' }}>{item.desc}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
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

  return (
    <>
      {/* Page Hero */}
      <section ref={heroRef} className="relative h-[70vh] flex items-end overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 scale-110"
          style={{ backgroundImage: `url(${IMAGES.about})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.15))' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pb-20">
          <p className="font-cormorantSC text-[12px] tracking-[0.25em] mb-3" style={{ color: '#cc5500' }}>QUEM SOMOS</p>
          <h1 className="font-cormorant font-light text-white leading-tight" style={{ fontSize: 'clamp(44px, 6vw, 72px)', letterSpacing: '-0.02em' }}>
            Sobre a RTL Construção
          </h1>
        </div>
      </section>

      {/* Our story - LIGHT theme */}
      <section style={{ padding: '120px 0', background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <p className="font-cormorantSC text-[11px] tracking-[0.3em] mb-4" style={{ color: '#cc5500' }}>NOSSA HISTÓRIA</p>
              <h2
                className="font-cormorant font-light leading-tight mb-6"
                style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', color: '#0A0A0A', letterSpacing: '-0.01em' }}
              >
                Nascemos para construir<br />com propósito
              </h2>
              <div className="mb-7" style={{ width: '60px', height: '2px', background: '#cc5500' }} />
              <div className="space-y-5">
                <p className="font-dm font-light text-base leading-relaxed" style={{ color: 'rgba(10,10,10,0.55)', fontSize: '15px' }}>
                  A RTL Construção de Edifícios Ltda nasceu em {COMPANY.founded} com uma missão clara: entregar obras com excelência técnica, dentro do prazo e com total transparência para nossos clientes.
                </p>
                <p className="font-dm font-light text-base leading-relaxed" style={{ color: 'rgba(10,10,10,0.55)', fontSize: '15px' }}>
                  Fundada por engenheiros e gestores com mais de 15 anos de experiência no mercado da construção civil, a empresa se estabeleceu rapidamente como referência em qualidade e confiança na região de São José do Rio Preto - SP.
                </p>
                <p className="font-dm font-light text-base leading-relaxed" style={{ color: 'rgba(10,10,10,0.55)', fontSize: '15px' }}>
                  Atuamos em construção civil, obras industriais, reformas, gerenciamento e incorporação imobiliária, sempre priorizando a segurança da equipe e a satisfação plena do cliente.
                </p>
              </div>
              <p className="font-cormorant italic mt-8 text-xl" style={{ color: '#cc5500', fontWeight: 400 }}>
                "Construir com excelência, entregar com confiança"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="p-6"
                  style={{ borderTop: '2px solid #cc5500', background: '#F7F4EF' }}
                >
                  <div className="font-cormorant font-light leading-none mb-2" style={{ fontSize: '56px', color: '#0A0A0A' }}>
                    {stat.prefix}{stat.value}{stat.suffix}
                  </div>
                  <p className="font-dm font-light text-sm" style={{ color: 'rgba(10,10,10,0.45)' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline - LIGHT theme */}
      <section style={{ padding: '100px 0', background: '#F7F4EF' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="mb-14">
            <p className="font-cormorantSC text-[11px] tracking-[0.3em] mb-4" style={{ color: '#cc5500' }}>TRAJETÓRIA</p>
            <h2
              className="font-cormorant font-light"
              style={{ fontSize: 'clamp(36px, 4vw, 52px)', color: '#0A0A0A', letterSpacing: '-0.01em' }}
            >
              Nossa jornada de crescimento
            </h2>
          </div>
          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Values - LIGHT theme */}
      <section style={{ padding: '100px 0', background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="font-cormorantSC text-[11px] tracking-[0.3em] mb-4" style={{ color: '#cc5500' }}>NOSSOS VALORES</p>
              <h2
                className="font-cormorant font-light mb-6"
                style={{ fontSize: 'clamp(36px, 4vw, 52px)', color: '#0A0A0A', letterSpacing: '-0.01em' }}
              >
                O que nos define<br />como empresa
              </h2>
              <div className="mb-8" style={{ width: '60px', height: '2px', background: '#cc5500' }} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VALUES.map((v, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} style={{ color: '#cc5500', flexShrink: 0, marginTop: 3 }} />
                    <span className="font-dm font-light text-sm" style={{ color: 'rgba(10,10,10,0.65)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-sm" style={{ height: '400px' }}>
              <img
                src={IMAGES.about}
                alt="Equipe RTL"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(204,85,0,0.12), transparent)' }} />
              <div className="absolute bottom-6 left-6 right-6 p-4" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}>
                <p className="font-cormorant italic text-lg" style={{ color: '#0A0A0A' }}>
                  "Construir é criar legado. Cada obra que entregamos transforma vidas."
                </p>
                <p className="font-dm font-light text-xs mt-1" style={{ color: 'rgba(10,10,10,0.4)' }}>— Equipe RTL Construção</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Differentials />
      <Testimonials />
    </>
  );
}
