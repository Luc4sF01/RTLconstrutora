import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Award, Shield, Users, MapPin } from 'lucide-react';
import * as THREE from 'three';
import Differentials from '../sections/Differentials';
import Testimonials from '../sections/Testimonials';
import { COMPANY, STATS, IMAGES } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

// ─── RTL Brand Animation (scoped) ────────────────────────────────────────────
function RTLBrand() {
  const ref = useRef(null);
  const bars = [22, 40, 66, 100, 88, 58, 38, 24, 14];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      });
      tl.fromTo('.ab-bar',
        { scaleY: 0, transformOrigin: 'bottom center' },
        { scaleY: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out' }, 0
      )
      .fromTo('.ab-letter',
        { yPercent: 110 },
        { yPercent: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' }, 0.2
      )
      .fromTo('.ab-sub',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.7
      )
      .fromTo('.ab-line',
        { scaleX: 0, transformOrigin: 'center' },
        { scaleX: 1, duration: 0.7, ease: 'power3.out' }, 0.65
      )
      .fromTo('.ab-tagline',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5 }, 0.9
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: '#0F2340',
        padding: 'clamp(80px,10vh,120px) clamp(24px,6vw,80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '55%', height: '70%', background: 'radial-gradient(ellipse, rgba(204,85,0,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Skyline bars */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 44, height: 90 }}>
        {bars.map((h, i) => (
          <div
            key={i}
            className="ab-bar"
            style={{
              width: i === 3 ? 14 : i === 2 || i === 4 ? 10 : 6,
              height: h,
              background: i === 3 ? '#cc5500' : i === 2 || i === 4 ? 'rgba(204,85,0,0.38)' : 'rgba(255,255,255,0.07)',
              transform: 'scaleY(0)',
            }}
          />
        ))}
      </div>

      {/* RTL letters */}
      <div style={{ display: 'flex', overflow: 'hidden', marginBottom: 10 }}>
        {'RTL'.split('').map((l, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <span
              className="ab-letter"
              style={{
                display: 'block',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(88px, 15vw, 190px)',
                fontWeight: 300,
                color: '#fff',
                lineHeight: 0.88,
                letterSpacing: '-0.03em',
              }}
            >
              {l}
            </span>
          </div>
        ))}
      </div>

      <div className="ab-line" style={{ width: '100%', maxWidth: 480, height: 1, background: 'linear-gradient(to right, transparent, rgba(204,85,0,0.55), transparent)', marginBottom: 18 }} />
      <p className="ab-sub" style={{ fontFamily: 'Cormorant SC, serif', fontSize: 'clamp(10px,1.1vw,13px)', letterSpacing: '0.42em', color: 'rgba(255,255,255,0.32)', textAlign: 'center', opacity: 0 }}>
        CONSTRUÇÃO DE EDIFÍCIOS
      </p>
      <p className="ab-tagline" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(14px,1.4vw,17px)', fontStyle: 'italic', color: 'rgba(204,85,0,0.65)', textAlign: 'center', marginTop: 10, fontWeight: 300, opacity: 0 }}>
        "Construir com excelência, entregar com confiança."
      </p>
      <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 18, height: 1, background: 'rgba(204,85,0,0.35)' }} />
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 9, letterSpacing: '0.32em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}>
          São José do Rio Preto — SP
        </span>
        <div style={{ width: 18, height: 1, background: 'rgba(204,85,0,0.35)' }} />
      </div>
    </div>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ value, prefix = '', suffix = '', label }) {
  const numRef = useRef(null);

  useEffect(() => {
    const proxy = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        val: value,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: numRef.current, start: 'top 85%', once: true },
        onUpdate: () => {
          if (numRef.current) {
            numRef.current.textContent = prefix + Math.round(proxy.val) + suffix;
          }
        },
      });
    });
    return () => ctx.revert();
  }, [value, prefix, suffix]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        ref={numRef}
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(52px, 7vw, 96px)',
          fontWeight: 300,
          color: '#fff',
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}
      >
        {prefix}0{suffix}
      </div>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 300, marginTop: 10, letterSpacing: '0.08em' }}>
        {label}
      </p>
    </div>
  );
}

// ─── 3D Wireframe Canvas ──────────────────────────────────────────────────────
function GeometryCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Main wireframe icosahedron
    const geo = new THREE.IcosahedronGeometry(1.4, 1);
    const mat = new THREE.MeshBasicMaterial({ color: 0xcc5500, wireframe: true, transparent: true, opacity: 0.22 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Inner smaller sphere
    const innerGeo = new THREE.OctahedronGeometry(0.7, 0);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.06 });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Outer faint ring
    const ringGeo = new THREE.TorusGeometry(2.1, 0.008, 6, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xcc5500, transparent: true, opacity: 0.1 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.005;
      innerMesh.rotation.x -= 0.004;
      innerMesh.rotation.z += 0.003;
      ring.rotation.z += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  );
}

// ─── Timeline Item ────────────────────────────────────────────────────────────
const TIMELINE = [
  { year: '2023', title: 'Fundação da RTL', desc: 'Empresa fundada em Fevereiro de 2023 por profissionais com mais de 15 anos de experiência no setor da construção civil.' },
  { year: '2023', title: 'Primeiros Contratos', desc: 'Entrega dos primeiros contratos — reforma escolar e obras de infraestrutura — com início de atuação em licitações municipais da região.' },
  { year: '2024', title: 'Expansão Regional', desc: 'Ampliação para cidades da região: Mirassol, Bady Bassitt, Cedral e outras municipalidades. Início de obras de infraestrutura viária.' },
  { year: '2025', title: 'Referência em Obras Públicas', desc: 'Com mais de 20 obras entregues, a RTL consolida-se como referência em qualidade técnica, cumprimento de prazos e transparência contratual.' },
];

function TimelineItem({ item, index }) {
  const itemRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(itemRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: itemRef.current, start: 'top 88%' },
          delay: index * 0.12,
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={itemRef} style={{ display: 'flex', gap: 'clamp(32px,5vw,72px)', alignItems: 'flex-start', opacity: 0 }}>
      <div style={{ flexShrink: 0, textAlign: 'right', minWidth: 52 }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, color: '#cc5500', fontWeight: 300 }}>{item.year}</span>
      </div>
      <div style={{ flex: 1, paddingBottom: 44, borderLeft: '1px solid rgba(10,10,10,0.08)', paddingLeft: 28, position: 'relative' }}>
        <div style={{ position: 'absolute', left: -5, top: 8, width: 10, height: 10, borderRadius: '50%', border: '2px solid #cc5500', background: '#FAFAF8' }} />
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: '#0A0A0A', fontWeight: 300, marginBottom: 8 }}>{item.title}</h3>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: 'rgba(10,10,10,0.5)', fontWeight: 300, lineHeight: 1.7 }}>{item.desc}</p>
      </div>
    </div>
  );
}

const VALUES = [
  'Excelência técnica em cada detalhe',
  'Transparência total com o cliente',
  'Compromisso absoluto com prazos',
  'Segurança como prioridade máxima',
  'Inovação com tecnologia BIM',
  'Responsabilidade ambiental e social',
];

const CAPABILITIES = [
  { Icon: Award, label: 'Certificada', desc: 'CREA ativo, ART/RRT emitidas em cada obra, NR-18 e PCMAT em conformidade.' },
  { Icon: Shield, label: 'Habilitada', desc: 'Certidões em dia para licitações municipais, estaduais e federais.' },
  { Icon: Users, label: 'Equipe Sênior', desc: 'Engenheiros e mestres de obra com mais de 15 anos de experiência acumulada.' },
  { Icon: MapPin, label: 'Nacional', desc: 'Atendemos prefeituras, órgãos estaduais e federais e clientes privados em todo o Brasil.' },
];

const REGIONS = [
  'São Paulo', 'Minas Gerais', 'Goiás', 'Mato Grosso',
  'Paraná', 'Mato Grosso do Sul', 'Tocantins', 'Bahia',
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const storyLeftRef = useRef(null);
  const storyImgRef = useRef(null);
  const storyImgWrapRef = useRef(null);
  const capRef = useRef(null);
  const regionRef = useRef(null);
  const valuesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.fromTo(bgRef.current,
        { yPercent: -10 },
        { yPercent: 10, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } }
      );

      // Story left
      gsap.fromTo(storyLeftRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: storyLeftRef.current, start: 'top 82%' } }
      );

      // Story image reveal
      gsap.fromTo(storyImgWrapRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: storyImgWrapRef.current, start: 'top 85%' } }
      );
      gsap.to(storyImgRef.current, {
        yPercent: 14, ease: 'none',
        scrollTrigger: { trigger: storyImgWrapRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // Capabilities stagger
      gsap.fromTo('.cap-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: capRef.current, start: 'top 82%' } }
      );

      // Region section
      gsap.fromTo(regionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: regionRef.current, start: 'top 84%' } }
      );

      // City tags stagger
      gsap.fromTo('.city-tag',
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: '.city-tag', start: 'top 88%' } }
      );

      // Values
      gsap.fromTo(valuesRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: valuesRef.current, start: 'top 82%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Page Hero ── */}
      <section ref={heroRef} style={{ position: 'relative', height: '70vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <div
          ref={bgRef}
          style={{
            position: 'absolute', inset: 0, transform: 'scale(1.12)',
            backgroundImage: `url(${IMAGES.about})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15))' }} />
        {/* Top accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#cc5500' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, width: '100%', margin: '0 auto', padding: '0 clamp(24px,6vw,80px) clamp(48px,8vh,96px)' }}>
          <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 11, letterSpacing: '0.3em', color: '#cc5500', marginBottom: 14 }}>
            QUEM SOMOS
          </p>
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(44px, 6.5vw, 82px)',
              fontWeight: 300,
              color: '#fff',
              letterSpacing: '-0.025em',
              lineHeight: 0.95,
            }}
          >
            Sobre a<br />
            <span style={{ color: '#cc5500' }}>RTL Construção</span>
          </h1>
        </div>
      </section>

      {/* ── RTL Brand Animation ── */}
      <RTLBrand />

      {/* ── Story ── */}
      <section style={{ background: '#FAFAF8', padding: '100px 0 120px', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            <div ref={storyLeftRef} style={{ opacity: 0 }}>
              <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 11, letterSpacing: '0.3em', color: '#cc5500', marginBottom: 18 }}>NOSSA HISTÓRIA</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 300, color: '#0A0A0A', lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: 20 }}>
                Nascemos para construir<br />com <span style={{ color: '#cc5500' }}>propósito</span>
              </h2>
              <div style={{ width: 52, height: 2, background: '#cc5500', marginBottom: 28 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'rgba(10,10,10,0.55)', fontWeight: 300, lineHeight: 1.75 }}>
                  A RTL Construção de Edifícios Ltda nasceu em {COMPANY.founded} com uma missão clara: entregar obras com excelência técnica, dentro do prazo e com total transparência.
                </p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'rgba(10,10,10,0.55)', fontWeight: 300, lineHeight: 1.75 }}>
                  Fundada por engenheiros e gestores com mais de 15 anos de experiência, a empresa se estabeleceu rapidamente como referência em qualidade e confiança em todo o território nacional.
                </p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'rgba(10,10,10,0.55)', fontWeight: 300, lineHeight: 1.75 }}>
                  Atuamos em obras públicas e privadas — da licitação governamental à edificação residencial — sempre priorizando segurança, técnica e satisfação do cliente.
                </p>
              </div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 22, color: '#cc5500', fontWeight: 400, marginTop: 32 }}>
                "Construir com excelência, entregar com confiança"
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, color: 'rgba(10,10,10,0.2)', marginTop: 28, letterSpacing: '0.04em' }}>
                CNPJ {COMPANY.cnpj}
              </p>
            </div>

            {/* Stats cards */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    style={{ borderTop: '2px solid #cc5500', background: '#F7F4EF', padding: 'clamp(20px,3vw,32px)' }}
                  >
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(44px,5vw,64px)', color: '#0A0A0A', fontWeight: 300, lineHeight: 1 }}>
                      {stat.prefix}{stat.value}{stat.suffix}
                    </div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(10,10,10,0.45)', fontWeight: 300, marginTop: 8 }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              {/* Photo below stats */}
              <div
                ref={storyImgWrapRef}
                style={{ overflow: 'hidden', marginTop: 16, clipPath: 'inset(100% 0 0 0)', position: 'relative', height: 260 }}
              >
                <img
                  ref={storyImgRef}
                  src="/images/sobre.jpg"
                  alt="Obra RTL"
                  style={{ width: '100%', height: '130%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                  loading="lazy"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.25)' }} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Animated Counters + 3D ── */}
      <section
        style={{ background: '#0F2340', padding: '120px 0', position: 'relative', overflow: 'hidden' }}
      >
        {/* 3D decorative canvas */}
        <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', width: 'clamp(240px, 30vw, 420px)', height: 'clamp(240px, 30vw, 420px)', opacity: 0.7 }}>
          <GeometryCanvas />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px,6vw,80px)' }}>
          <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 11, letterSpacing: '0.3em', color: '#cc5500', marginBottom: 20 }}>
            EM NÚMEROS
          </p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 80 }}>
            Resultados que<br /><span style={{ color: '#cc5500' }}>falam por si</span>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12" style={{ maxWidth: 760 }}>
            {STATS.map((s) => (
              <Counter key={s.label} value={s.value} prefix={s.prefix} suffix={s.suffix} label={s.label} />
            ))}
          </div>

          {/* Capability cards */}
          <div ref={capRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-20">
            {CAPABILITIES.map(({ Icon, label, desc }, i) => (
              <div
                key={label}
                className="cap-card"
                style={{
                  border: '1px solid rgba(255,255,255,0.07)',
                  padding: '28px 24px',
                  opacity: 0,
                  transition: 'border-color 0.35s, background 0.35s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(204,85,0,0.4)'; e.currentTarget.style.background = 'rgba(204,85,0,0.04)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon size={18} style={{ color: '#cc5500', marginBottom: 16 }} strokeWidth={1.4} />
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: '#fff', fontWeight: 300, marginBottom: 10 }}>{label}</p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 300, lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ padding: '110px 0', background: '#F7F4EF' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div style={{ marginBottom: 64 }}>
            <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 11, letterSpacing: '0.3em', color: '#cc5500', marginBottom: 16 }}>TRAJETÓRIA</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 300, color: '#0A0A0A', letterSpacing: '-0.01em' }}>
              Nossa jornada de crescimento
            </h2>
          </div>
          <div>
            {TIMELINE.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Área de Atuação (NEW) ── */}
      <section style={{ background: '#0F2340', padding: '110px 0', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <div ref={regionRef} style={{ opacity: 0 }}>
              <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 11, letterSpacing: '0.3em', color: '#cc5500', marginBottom: 18 }}>ÁREA DE ATUAÇÃO</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 24 }}>
                Brasil inteiro —<br /><span style={{ color: '#cc5500' }}>sem fronteiras</span>
              </h2>
              <div style={{ width: 48, height: 2, background: '#cc5500', marginBottom: 28 }} />
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.45)', fontWeight: 300, lineHeight: 1.75, maxWidth: 400, marginBottom: 36 }}>
                Com sede em São José do Rio Preto — SP, a RTL atende prefeituras, órgãos estaduais e federais e clientes privados em todo o território nacional — do contrato à entrega final.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {REGIONS.map((city) => (
                  <span
                    key={city}
                    className="city-tag"
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.55)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '7px 16px',
                      opacity: 0,
                      transition: 'border-color 0.3s, color 0.3s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#cc5500'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual block */}
            <div style={{ position: 'relative' }}>
              <div style={{
                border: '1px solid rgba(255,255,255,0.06)',
                padding: 'clamp(32px,5vw,56px)',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {[
                    { label: 'Sede', value: 'São José do Rio Preto — SP' },
                    { label: 'Cobertura', value: 'Todo o território nacional' },
                    { label: 'Modalidades', value: 'Municipal · Estadual · Federal' },
                    { label: 'Mobilização', value: 'Equipe deslocável a qualquer estado' },
                    { label: 'Contratos', value: 'Licitação pública e contrato privado' },
                  ].map(({ label, value }, i) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '18px 0',
                        borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        gap: 20,
                      }}
                    >
                      <span style={{ fontFamily: 'Cormorant SC, serif', fontSize: 9, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.25)' }}>
                        {label.toUpperCase()}
                      </span>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 300, textAlign: 'right' }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Corner accent */}
                <div style={{ position: 'absolute', top: -2, right: -2, width: 40, height: 40, background: '#cc5500' }} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ padding: '110px 0', background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <div ref={valuesRef} style={{ opacity: 0 }}>
              <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 11, letterSpacing: '0.3em', color: '#cc5500', marginBottom: 18 }}>NOSSOS VALORES</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 300, color: '#0A0A0A', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 24 }}>
                O que nos define<br />como empresa
              </h2>
              <div style={{ width: 48, height: 2, background: '#cc5500', marginBottom: 32 }} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VALUES.map((v, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <CheckCircle2 size={15} style={{ color: '#cc5500', flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(10,10,10,0.65)', fontWeight: 300, lineHeight: 1.5 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 0, height: 420 }}>
              <img
                src={IMAGES.about}
                alt="Equipe RTL"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(204,85,0,0.14), transparent)' }} />
              <div
                style={{
                  position: 'absolute', bottom: 24, left: 24, right: 24,
                  background: 'rgba(255,255,255,0.93)',
                  backdropFilter: 'blur(10px)',
                  padding: '16px 22px',
                  borderLeft: '2px solid #cc5500',
                }}
              >
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 17, color: '#0A0A0A', lineHeight: 1.4 }}>
                  "Construir é criar legado. Cada obra que entregamos transforma vidas."
                </p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(10,10,10,0.4)', marginTop: 6 }}>— Equipe RTL Construção</p>
              </div>
              {/* Accent square */}
              <div style={{ position: 'absolute', top: -6, right: -6, width: 32, height: 32, background: '#cc5500' }} />
            </div>

          </div>
        </div>
      </section>

      <Differentials />
      <Testimonials />
    </>
  );
}
