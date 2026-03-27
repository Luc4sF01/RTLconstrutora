import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck, HardHat, ClipboardList, Truck, KeyRound } from 'lucide-react';
import Services from '../sections/Services';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Consulta e Diagnóstico',
    desc: 'Análise do escopo, visita técnica ao local e levantamento das necessidades do contratante — público ou privado.',
  },
  {
    icon: FileCheck,
    number: '02',
    title: 'Proposta Técnica e Orçamento',
    desc: 'Elaboração de proposta detalhada com cronograma físico-financeiro, ART e documentação completa para aprovação.',
  },
  {
    icon: Truck,
    number: '03',
    title: 'Contrato e Mobilização',
    desc: 'Assinatura do contrato, montagem da equipe técnica e mobilização de equipamentos e insumos para a obra.',
  },
  {
    icon: HardHat,
    number: '04',
    title: 'Execução e Gestão',
    desc: 'Gestão diária da obra com relatórios de avanço, controle de qualidade, NR-18 e comunicação transparente.',
  },
  {
    icon: KeyRound,
    number: '05',
    title: 'Entrega e Documentação Final',
    desc: 'Vistoria final, habite-se, as-built e entrega de toda a documentação técnica e fiscal ao contratante.',
  },
];

const CREDENTIALS = [
  { label: 'CREA Ativo', value: 'Registro no Conselho Regional de Engenharia — habilitação plena para execução de obras.' },
  { label: 'ART por Obra', value: 'Anotação de Responsabilidade Técnica emitida individualmente para cada contrato.' },
  { label: 'NR-18 e PCMAT', value: 'Segurança do trabalho com PCMAT, EPI e treinamentos obrigatórios em dia.' },
  { label: 'Certidões Negativas', value: 'CND Federal, Estadual, Municipal e FGTS sempre atualizadas para licitações.' },
  { label: 'BIM e Gestão Técnica', value: 'Projetos modelados em BIM com cronogramas integrados e controle de custos.' },
  { label: 'Licitações Públicas', value: 'Habilitada para participar de pregões e tomadas de preço municipais, estaduais e federais.' },
];

export default function ServicesPage() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const introRef = useRef(null);
  const processRef = useRef(null);
  const stepsRef = useRef([]);
  const credRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.fromTo(bgRef.current,
        { yPercent: -10 },
        {
          yPercent: 10, ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
        }
      );

      // Intro
      gsap.fromTo(introRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: introRef.current, start: 'top 85%' } }
      );

      // Process title
      gsap.fromTo(processRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: processRef.current, start: 'top 85%' } }
      );

      // Steps
      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out', delay: i * 0.08,
            scrollTrigger: { trigger: el, start: 'top 88%' } }
        );
      });

      // Credentials
      gsap.fromTo(credRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: credRef.current, start: 'top 85%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-[65vh] flex items-end overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 scale-110"
          style={{ backgroundImage: `url(/images/hero.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.18))' }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: '#cc5500' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pb-20 w-full">
          <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 13, letterSpacing: '0.3em', color: '#cc5500', marginBottom: 14 }}>
            SOLUÇÕES COMPLETAS
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(42px, 6vw, 78px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.025em', lineHeight: 0.95 }}>
              Nossos<br /><span style={{ color: '#cc5500' }}>Serviços</span>
            </h1>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: 320, lineHeight: 1.7 }}>
              Do contrato público à obra entregue — capacidade técnica em todas as frentes da construção civil.
            </p>
          </div>
        </div>
      </section>

      {/* ── Intro + Stats ── */}
      <section style={{ background: '#FAFAF8', padding: '100px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div ref={introRef} style={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left text */}
            <div>
              <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 12, letterSpacing: '0.38em', color: '#cc5500', marginBottom: 18 }}>
                SOBRE NOSSA ATUAÇÃO
              </p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 300, color: '#0F2340', letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: 24 }}>
                Capacidade técnica para<br />obras de qualquer porte
              </h2>
              <div style={{ width: 44, height: 2, background: '#cc5500', marginBottom: 28 }} />
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: 'rgba(10,10,10,0.5)', fontWeight: 300, lineHeight: 1.8, marginBottom: 20 }}>
                A RTL executa obras públicas e privadas com equipe própria de engenharia, desde a elaboração da proposta técnica até a entrega das chaves — com ART, documentação completa e gestão transparente em cada etapa.
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: 'rgba(10,10,10,0.5)', fontWeight: 300, lineHeight: 1.8 }}>
                Atuamos em obras de infraestrutura viária, edificações institucionais, reformas, saneamento e construção civil em todo o território nacional.
              </p>
            </div>

            {/* Right stats */}
            <div className="grid grid-cols-2 gap-px" style={{ background: 'rgba(15,35,64,0.08)' }}>
              {[
                { value: '30+', label: 'Obras entregues' },
                { value: '100%', label: 'Com ART emitida' },
                { value: '15+', label: 'Anos de experiência' },
                { value: '6', label: 'Frentes de serviço' },
              ].map(({ value, label }) => (
                <div key={label} style={{ background: '#fff', padding: 'clamp(28px,4vw,48px) clamp(20px,3vw,36px)' }}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(38px, 5vw, 58px)', fontWeight: 300, color: '#0F2340', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {value}
                  </p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(10,10,10,0.4)', fontWeight: 300, marginTop: 8, letterSpacing: '0.02em' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Services list ── */}
      <Services hideHeader />

      {/* ── Como trabalhamos ── */}
      <section style={{ background: '#F7F4EF', padding: '110px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">

          <div ref={processRef} style={{ opacity: 0, marginBottom: 64 }}>
            <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 12, letterSpacing: '0.38em', color: '#cc5500', marginBottom: 16 }}>
              MÉTODO DE TRABALHO
            </p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 300, color: '#0F2340', letterSpacing: '-0.01em', lineHeight: 1.05 }}>
                Do primeiro contato<br />
                <span style={{ color: '#cc5500' }}>à entrega final</span>
              </h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'rgba(10,10,10,0.4)', fontWeight: 300, maxWidth: 300, lineHeight: 1.7 }}>
                Um processo estruturado para garantir previsibilidade, qualidade e transparência em cada obra.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div style={{ borderTop: '1px solid rgba(15,35,64,0.08)' }}>
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  ref={(el) => (stepsRef.current[i] = el)}
                  style={{ opacity: 0, borderBottom: '1px solid rgba(15,35,64,0.08)' }}
                >
                  <div
                    className="max-w-7xl mx-auto"
                    style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr auto', alignItems: 'center', gap: 'clamp(16px,3vw,48px)', padding: '32px 0' }}
                  >
                    {/* Number */}
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(18px, 2.2vw, 26px)', fontWeight: 300, color: 'rgba(15,35,64,0.15)', minWidth: 36 }}>
                      {step.number}
                    </span>

                    {/* Icon */}
                    <div style={{ width: 44, height: 44, background: '#0F2340', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={18} color="#cc5500" strokeWidth={1.4} />
                    </div>

                    {/* Title + desc */}
                    <div>
                      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 300, color: '#0F2340', letterSpacing: '-0.01em', marginBottom: 6 }}>
                        {step.title}
                      </h3>
                      <p className="hidden lg:block" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'rgba(10,10,10,0.45)', fontWeight: 300, lineHeight: 1.65, maxWidth: 520 }}>
                        {step.desc}
                      </p>
                    </div>

                    {/* Step indicator */}
                    <span className="hidden lg:block" style={{ fontFamily: 'Cormorant SC, serif', fontSize: 11, letterSpacing: '0.22em', color: 'rgba(15,35,64,0.18)' }}>
                      ETAPA {step.number}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Habilitação e Documentação ── */}
      <section style={{ background: '#0F2340', padding: '110px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">

          <div ref={credRef} style={{ opacity: 0 }}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
              <div>
                <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 12, letterSpacing: '0.38em', color: '#cc5500', marginBottom: 16 }}>
                  HABILITAÇÃO E COMPLIANCE
                </p>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.05 }}>
                  Documentação completa<br />
                  <span style={{ color: '#cc5500' }}>para licitações e contratos</span>
                </h2>
              </div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.3)', fontWeight: 300, maxWidth: 280, lineHeight: 1.7 }}>
                Toda a documentação técnica e fiscal exigida para participação em processos licitatórios municipais, estaduais e federais.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
              {CREDENTIALS.map(({ label, value }, i) => (
                <div
                  key={label}
                  style={{ background: '#0F2340', padding: '36px 32px', borderTop: i < 3 ? 'none' : '1px solid rgba(255,255,255,0.04)', transition: 'background 0.3s', cursor: 'default' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(204,85,0,0.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#0F2340')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 5, height: 5, background: '#cc5500', flexShrink: 0 }} />
                    <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 12, letterSpacing: '0.22em', color: '#cc5500' }}>
                      {label.toUpperCase()}
                    </p>
                  </div>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.45)', fontWeight: 300, lineHeight: 1.65 }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '120px 0', background: '#F7F4EF' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
          <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 12, letterSpacing: '0.3em', color: '#cc5500', marginBottom: 16 }}>
            SOLICITE SEU ORÇAMENTO
          </p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 58px)', fontWeight: 300, color: '#0F2340', letterSpacing: '-0.01em', marginBottom: 20, lineHeight: 1.1 }}>
            Pronto para iniciar<br />sua obra?
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: 'rgba(10,10,10,0.45)', fontWeight: 300, maxWidth: 400, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Entre em contato com a RTL e receba um orçamento detalhado sem compromisso.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/contato"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#cc5500', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 500, padding: '15px 36px', textDecoration: 'none', letterSpacing: '0.04em', transition: 'background 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#b34a00')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#cc5500')}
            >
              Falar com a RTL
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/portfolio"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'transparent', color: '#0F2340', fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 400, padding: '15px 36px', textDecoration: 'none', letterSpacing: '0.04em', border: '1px solid rgba(15,35,64,0.2)', transition: 'border-color 0.3s, color 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0F2340'; e.currentTarget.style.color = '#0F2340'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(15,35,64,0.2)'; e.currentTarget.style.color = '#0F2340'; }}
            >
              Ver Portfólio
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
