import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Maximize2, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO, IMAGES, STATS } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { num: '01', title: 'Briefing e Levantamento', desc: 'Reunião técnica para entendimento completo do escopo, prazos, orçamento e exigências legais do contratante — público ou privado.' },
  { num: '02', title: 'Projeto e Planejamento', desc: 'Elaboração do projeto executivo com tecnologia BIM, cronograma físico-financeiro detalhado e emissão de ART/RRT pelo engenheiro responsável.' },
  { num: '03', title: 'Execução com Rigor', desc: 'Equipe técnica sênior em campo, controle de qualidade, relatórios periódicos e documentação NR-18/PCMAT em dia durante toda a obra.' },
  { num: '04', title: 'Entrega e Pós-obra', desc: 'Vistoria final com o contratante, as-built completo, manual de uso e manutenção e suporte técnico pós-entrega.' },
];

const SECTORS = [
  {
    title: 'Obras Governamentais',
    desc: 'Escolas, postos de saúde, praças e equipamentos urbanos via licitação pública.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  },
  {
    title: 'Infraestrutura Viária',
    desc: 'Pontes, viadutos, pavimentação asfáltica e drenagem urbana.',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
  },
  {
    title: 'Edificações Privadas',
    desc: 'Residenciais, comerciais e industriais com gestão técnica completa.',
    image: 'https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?w=800&q=80',
  },
  {
    title: 'Reformas e Revitalizações',
    desc: 'Modernização e ampliação de edificações públicas e privadas.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
  },
];

function ProcessSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.step-row',
        { opacity: 0, x: -24 },
        {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 82%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ background: '#0F2340', padding: '110px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 11, letterSpacing: '0.3em', color: '#cc5500', marginBottom: 16 }}>
              METODOLOGIA
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.05 }}>
              Como cada obra<br /><span style={{ color: '#cc5500' }}>é executada</span>
            </h2>
          </div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 300, maxWidth: 280, lineHeight: 1.7 }}>
            Do primeiro contato à entrega das chaves — processo estruturado em 4 etapas com total controle técnico e financeiro.
          </p>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {STEPS.map((step, i) => (
            <StepRow key={step.num} step={step} i={i} total={STEPS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepRow({ step, i, total }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="step-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: hovered ? 'rgba(204,85,0,0.04)' : 'transparent',
        transition: 'background 0.35s',
        opacity: 0,
      }}
    >
      <div
        className="max-w-7xl mx-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: 'clamp(20px,4vw,64px)',
          padding: '36px clamp(24px,6vw,80px)',
        }}
      >
        {/* Number */}
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(48px,5vw,72px)', fontWeight: 300, lineHeight: 1, color: hovered ? 'rgba(204,85,0,0.25)' : 'rgba(255,255,255,0.05)', transition: 'color 0.35s', minWidth: 60 }}>
          {step.num}
        </span>

        {/* Content */}
        <div>
          <div style={{ width: hovered ? 36 : 0, height: 2, background: '#cc5500', marginBottom: 12, transition: 'width 0.35s' }} />
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 300, color: hovered ? '#fff' : 'rgba(255,255,255,0.75)', letterSpacing: '-0.01em', marginBottom: 8, transition: 'color 0.35s' }}>
            {step.title}
          </h3>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 300, color: hovered ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.25)', lineHeight: 1.65, maxWidth: 520, transition: 'color 0.35s' }}>
            {step.desc}
          </p>
        </div>

        {/* Step indicator */}
        <span className="hidden lg:block" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 13, fontStyle: 'italic', color: hovered ? '#cc5500' : 'rgba(255,255,255,0.1)', transition: 'color 0.35s', whiteSpace: 'nowrap' }}>
          Etapa {i + 1} de {total}
        </span>
      </div>
    </div>
  );
}

function SectorsSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sector-card',
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 82%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ background: '#F7F4EF', padding: '110px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 11, letterSpacing: '0.3em', color: '#cc5500', marginBottom: 16 }}>
              SEGMENTOS
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 300, color: '#0A0A0A', letterSpacing: '-0.01em', lineHeight: 1.05 }}>
              Tipos de obra<br /><span style={{ color: '#cc5500' }}>que executamos</span>
            </h2>
          </div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(10,10,10,0.4)', fontWeight: 300, maxWidth: 280, lineHeight: 1.7 }}>
            Capacidade técnica para atender diferentes segmentos com o mesmo nível de exigência e qualidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SECTORS.map((sector) => (
            <div
              key={sector.title}
              className="sector-card group"
              style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', opacity: 0 }}
            >
              <img
                src={sector.image}
                alt={sector.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s', display: 'block' }}
                className="group-hover:scale-105"
                loading="lazy"
              />
              {/* Gradient always visible at bottom */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.35) 45%, transparent)' }} />
              {/* Orange bar top */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#cc5500', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.45s' }} className="group-hover:[transform:scaleX(1)]" />

              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 20px' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 300, color: '#fff', lineHeight: 1.2, marginBottom: 8 }}>
                  {sector.title}
                </h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.6, maxHeight: 0, overflow: 'hidden', transition: 'max-height 0.45s ease, opacity 0.35s', opacity: 0 }} className="group-hover:opacity-100 group-hover:[max-height:80px]">
                  {sector.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FILTERS = ['Todos', 'Institucional', 'Infraestrutura', 'Governamental', 'Residencial'];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('Todos');
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

  const filtered = activeFilter === 'Todos'
    ? PORTFOLIO
    : PORTFOLIO.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Page Hero */}
      <section ref={heroRef} className="relative h-[65vh] flex items-end overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 scale-110"
          style={{ backgroundImage: `url(${IMAGES.heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.18))' }} />
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
            NOSSAS OBRAS
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h1
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(44px, 6vw, 78px)',
                fontWeight: 300,
                color: '#fff',
                letterSpacing: '-0.025em',
                lineHeight: 0.95,
              }}
            >
              Portfólio de<br />
              <span style={{ color: '#cc5500' }}>Projetos</span>
            </h1>
            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 80,
                  color: 'rgba(255,255,255,0.08)',
                  lineHeight: 1,
                  display: 'block',
                }}
                className="hidden lg:block"
              >
                {PORTFOLIO.length}
              </span>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.35)',
                  fontWeight: 300,
                  letterSpacing: '0.06em',
                }}
                className="hidden lg:block"
              >
                obras em destaque
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ background: '#0F2340', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  padding: '28px 0',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  paddingLeft: i > 0 ? 'clamp(16px,3vw,40px)' : 0,
                  paddingRight: 'clamp(16px,3vw,40px)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(28px, 3.5vw, 42px)',
                    color: '#fff',
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '65%' }}>{stat.prefix}</span>
                  {stat.value}
                  {stat.suffix && (
                    <span style={{ color: '#cc5500', fontSize: '50%', marginLeft: 2 }}>{stat.suffix}</span>
                  )}
                </div>
                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.35)',
                    fontWeight: 300,
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + description strip */}
      <section style={{ padding: '48px 0', background: '#FAFAF8', borderBottom: '1px solid rgba(10,10,10,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                color: 'rgba(10,10,10,0.5)',
                fontWeight: 300,
                maxWidth: 480,
                lineHeight: 1.7,
              }}
            >
              Obras executadas em São José do Rio Preto e região — do contrato público à edificação privada,
              cada projeto com rigor técnico e documentação completa.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 11,
                    letterSpacing: '0.06em',
                    padding: '8px 18px',
                    background: activeFilter === f ? '#cc5500' : 'transparent',
                    color: activeFilter === f ? '#fff' : 'rgba(10,10,10,0.45)',
                    border: `1px solid ${activeFilter === f ? '#cc5500' : 'rgba(10,10,10,0.12)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section style={{ padding: '80px 0 140px', background: '#F7F4EF' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="group"
                >
                  {/* Image */}
                  <div
                    className="overflow-hidden relative mb-4"
                    style={{ aspectRatio: '4/3' }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Category badge */}
                    <div
                      className="absolute top-4 left-4 px-3 py-1.5"
                      style={{ background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(6px)' }}
                    >
                      <span
                        style={{
                          fontFamily: 'Cormorant SC, serif',
                          fontSize: 9,
                          letterSpacing: '0.28em',
                          color: '#cc5500',
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.25) 55%, transparent)' }}
                    >
                      <p
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: 20,
                          fontWeight: 300,
                          color: '#fff',
                          lineHeight: 1.2,
                          marginBottom: 6,
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: 11,
                          color: 'rgba(255,255,255,0.5)',
                          fontWeight: 300,
                        }}
                      >
                        {item.city} · {item.year}
                      </p>
                    </div>
                  </div>

                  {/* Card info */}
                  <div>
                    <h3
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: 'clamp(18px, 2vw, 22px)',
                        fontWeight: 300,
                        color: '#0A0A0A',
                        letterSpacing: '-0.01em',
                        marginBottom: 10,
                        transition: 'color 0.3s',
                      }}
                      className="group-hover:text-[#cc5500]"
                    >
                      {item.title}
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <MapPin size={11} style={{ color: '#cc5500' }} />
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(10,10,10,0.45)', fontWeight: 300 }}>{item.city}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Calendar size={11} style={{ color: '#cc5500' }} />
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(10,10,10,0.45)', fontWeight: 300 }}>{item.year}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Maximize2 size={11} style={{ color: '#cc5500' }} />
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(10,10,10,0.45)', fontWeight: 300 }}>{item.area}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: 'rgba(10,10,10,0.25)', fontWeight: 300 }}>
                Nenhum projeto nesta categoria ainda.
              </p>
            </div>
          )}
        </div>
      </section>

      <ProcessSection />
      <SectorsSection />

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
            PRÓXIMO PROJETO
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
            Seu projeto pode ser<br />o próximo
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
            Entre em contato e receba um orçamento detalhado sem compromisso.
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
