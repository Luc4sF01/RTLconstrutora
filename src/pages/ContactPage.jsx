import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { sendEmail } from '../utils/emailjs';
import { COMPANY } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

// -- Marquee strip ---------------------------------------------------------
function Marquee() {
  const trackRef = useRef(null);
  useEffect(() => {
    gsap.to(trackRef.current, { x: '-50%', duration: 24, repeat: -1, ease: 'none' });
  }, []);
  const items = ['FALE CONOSCO', 'ORÇAMENTO SEM COMPROMISSO', 'OBRAS PÚBLICAS', 'RTL CONSTRUÇÃO', 'SÃO JOSÉ DO RIO PRETO', 'ENTREGUE COM RIGOR'];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: '#cc5500', overflow: 'hidden', padding: '12px 0' }}>
      <div ref={trackRef} style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'Cormorant SC, serif',
            fontSize: 10,
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.88)',
            padding: '0 40px',
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// -- Main ------------------------------------------------------------------
export default function ContactPage() {
  const [status, setStatus] = useState('idle');
  const leftRef  = useRef(null);
  const wordsRef = useRef([]);
  const infoRef  = useRef(null);
  const formRef  = useRef(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left panel curtain reveal
      gsap.fromTo(leftRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power4.inOut', delay: 0.1 }
      );
      // Title words stagger
      gsap.fromTo(wordsRef.current.filter(Boolean),
        { y: 64, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.11, delay: 0.65 }
      );
      // Scroll reveals
      gsap.fromTo(infoRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.12,
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data) => {
    setStatus('loading');
    try {
      await sendEmail(data);
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const INPUT = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.14)',
    color: '#fff',
    outline: 'none',
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 300,
    fontSize: '14px',
    padding: '13px 0',
    width: '100%',
    transition: 'border-color 0.3s',
    borderRadius: 0,
  };
  const onFocus = (e) => (e.target.style.borderColor = '#cc5500');
  const onBlur  = (e) => (e.target.style.borderColor = 'rgba(255,255,255,0.14)');

  const WORDS = [
    { text: 'Construindo',  color: '#fff' },
    { text: 'juntos,',      color: '#fff' },
    { text: 'do plano',     color: '#cc5500', italic: false },
    { text: 'à entrega.',   color: '#fff' },
  ];

  return (
    <>
      <style>{`
        @keyframes ctSpin    { to { transform: rotate(360deg);  } }
        @keyframes ctSpinRev { to { transform: rotate(-360deg); } }
        ::placeholder { color: rgba(255,255,255,0.28); }
        select option  { background: #111; color: #fff; }
      `}</style>

      {/* -- HERO -- */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 580, overflow: 'hidden' }}>

        {/* Left dark panel */}
        <div
          ref={leftRef}
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: '58%',
            background: '#0F2340',
            zIndex: 2,
            clipPath: 'inset(0 100% 0 0)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: 'clamp(36px,5vw,72px)',
            paddingBottom: 'clamp(60px,9vh,100px)',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#cc5500' }} />

          {/* Ghost watermark */}
          <div style={{
            position: 'absolute', top: '44%', left: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(90px, 14vw, 180px)',
            fontWeight: 300, color: 'rgba(255,255,255,0.022)',
            letterSpacing: '-0.02em', userSelect: 'none', pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}>RTL</div>

          <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 10, letterSpacing: '0.38em', color: '#cc5500', marginBottom: 28 }}>
            FALE CONOSCO
          </p>

          <div>
            {WORDS.map((w, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <span
                  ref={el => (wordsRef.current[i] = el)}
                  style={{
                    display: 'block',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(44px, 6.5vw, 82px)',
                    fontWeight: 300, color: w.color,
                    fontStyle: w.italic ? 'italic' : 'normal',
                    letterSpacing: '-0.025em', lineHeight: 0.96, opacity: 0,
                  }}
                >
                  {w.text}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'clamp(28px,4vh,44px)', display: 'flex', gap: 36, flexWrap: 'wrap' }}>
            {[
              { label: 'TELEFONE', value: COMPANY.phone },
              { label: 'EMAIL',    value: COMPANY.email  },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 8, letterSpacing: '0.32em', color: 'rgba(204,85,0,0.65)', marginBottom: 5 }}>{label}</p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.5)' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right photo panel */}
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '48%', zIndex: 1 }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80)`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 55%, rgba(10,10,10,0.4))' }} />

          {/* CSS animated circles */}
          <div style={{ position: 'absolute', bottom: '14%', right: '9%', width: 170, height: 170 }}>
            <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(204,85,0,0.45)', borderRadius: '50%', animation: 'ctSpin 16s linear infinite' }} />
            <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(255,255,255,0.07)', borderRadius: '50%', animation: 'ctSpinRev 10s linear infinite' }} />
            <div style={{ position: 'absolute', inset: 50, border: '1px solid rgba(204,85,0,0.2)', borderRadius: '50%', animation: 'ctSpin 7s linear infinite' }} />
            <div style={{ position: 'absolute', inset: 73, background: 'rgba(204,85,0,0.1)', borderRadius: '50%', border: '1px solid rgba(204,85,0,0.35)' }} />
            <div style={{ position: 'absolute', inset: 92, background: '#cc5500', borderRadius: '50%', opacity: 0.85 }} />
          </div>

          {/* Floating city tag */}
          <div style={{
            position: 'absolute', top: 'clamp(88px,10vh,116px)', right: 28,
            border: '1px solid rgba(204,85,0,0.28)',
            padding: '9px 16px',
            background: 'rgba(10,10,10,0.38)',
            backdropFilter: 'blur(8px)',
          }}>
            <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 9, letterSpacing: '0.26em', color: 'rgba(204,85,0,0.85)' }}>
              SÃO JOSÉ DO RIO PRETO — SP
            </p>
          </div>
        </div>

        {/* Orange vertical separator */}
        <div style={{
          position: 'absolute', left: '58%', top: 0, bottom: 0,
          width: 1,
          background: 'linear-gradient(to bottom, transparent 0%, #cc5500 20%, #cc5500 80%, transparent 100%)',
          zIndex: 3,
        }} />

        {/* Bottom bridge tab */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4, background: '#cc5500',
          padding: '13px 32px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
          <span style={{ fontFamily: 'Cormorant SC, serif', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap' }}>
            PREENCHA O FORMULÁRIO ABAIXO
          </span>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
        </div>
      </section>

      {/* -- MARQUEE -- */}
      <Marquee />

      {/* -- CONTACT SECTION -- */}
      <section id="contato" style={{ background: '#0F2340', padding: '100px 0 120px' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

            {/* -- INFO -- */}
            <div ref={infoRef} style={{ opacity: 0 }}>

              {/* Phone — editorial large */}
              <div style={{ marginBottom: 44 }}>
                <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 8, letterSpacing: '0.36em', color: '#cc5500', marginBottom: 10 }}>
                  TELEFONE / WHATSAPP
                </p>
                <a
                  href={`tel:${COMPANY.phone}`}
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(26px, 3vw, 40px)',
                    fontWeight: 300, color: '#fff',
                    letterSpacing: '-0.01em',
                    textDecoration: 'none', display: 'block',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#cc5500')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                >
                  {COMPANY.phone}
                </a>
              </div>

              {/* Email */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, marginBottom: 28 }}>
                <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 8, letterSpacing: '0.36em', color: '#cc5500', marginBottom: 9 }}>EMAIL</p>
                <a
                  href={`mailto:${COMPANY.email}`}
                  style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 14,
                    fontWeight: 300, color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none', transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#cc5500')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  {COMPANY.email}
                </a>
              </div>

              {/* Address */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, marginBottom: 44 }}>
                <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 8, letterSpacing: '0.36em', color: '#cc5500', marginBottom: 9 }}>ENDEREÇO</p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.38)', lineHeight: 1.75 }}>
                  {COMPANY.address.street}<br />
                  {COMPANY.address.neighborhood} — CEP {COMPANY.address.cep}<br />
                  {COMPANY.address.city}
                </p>
              </div>

              {/* Map */}
              <div style={{ overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 44 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0399577977745!2d-49.37800!3d-20.81900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDQ5JzA4LjQiUyA0OcKwMjInNDAuOCJX!5e0!3m2!1spt!2sbr!4v1234567890"
                  width="100%" height="190"
                  style={{ border: 0, filter: 'grayscale(100%) invert(1) contrast(1.1)', display: 'block' }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title="RTL Localização"
                />
              </div>

              {/* Quote block */}
              <div style={{ borderLeft: '2px solid #cc5500', paddingLeft: 20 }}>
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  fontWeight: 300, fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.35)',
                  lineHeight: 1.4,
                }}>
                  "Cada obra começa com uma conversa — fale conosco."
                </p>
              </div>
            </div>

            {/* -- FORM -- */}
            <div ref={formRef} style={{ opacity: 0 }}>
              <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: 9, letterSpacing: '0.36em', color: '#cc5500', marginBottom: 14 }}>
                ENVIE UMA MENSAGEM
              </p>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(28px, 3vw, 42px)',
                fontWeight: 300, color: '#fff',
                letterSpacing: '-0.01em',
                marginBottom: 48, lineHeight: 1.05,
              }}>
                Vamos construir<br />
                <span style={{ color: '#cc5500' }}>juntos?</span>
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

                {/* Field: Nome */}
                <div>
                  <label style={{ fontFamily: 'Cormorant SC, serif', fontSize: 8, letterSpacing: '0.3em', color: 'rgba(204,85,0,0.6)', display: 'block', marginBottom: 4 }}>
                    01 — NOME
                  </label>
                  <input
                    {...register('name', { required: 'Nome obrigatório' })}
                    placeholder="Nome completo"
                    style={INPUT} onFocus={onFocus} onBlur={onBlur}
                  />
                  {errors.name && <p style={{ fontFamily: 'DM Sans', fontSize: 11, color: '#cc5500', marginTop: 4 }}>{errors.name.message}</p>}
                </div>

                {/* Fields: Telefone + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <label style={{ fontFamily: 'Cormorant SC, serif', fontSize: 8, letterSpacing: '0.3em', color: 'rgba(204,85,0,0.6)', display: 'block', marginBottom: 4 }}>
                      02 — TELEFONE
                    </label>
                    <input
                      {...register('phone', { required: 'Obrigatório' })}
                      placeholder="(00) 00000-0000"
                      style={INPUT} onFocus={onFocus} onBlur={onBlur}
                    />
                    {errors.phone && <p style={{ fontFamily: 'DM Sans', fontSize: 11, color: '#cc5500', marginTop: 4 }}>{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label style={{ fontFamily: 'Cormorant SC, serif', fontSize: 8, letterSpacing: '0.3em', color: 'rgba(204,85,0,0.6)', display: 'block', marginBottom: 4 }}>
                      03 — EMAIL
                    </label>
                    <input
                      {...register('email', {
                        required: 'Obrigatório',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email inválido' },
                      })}
                      placeholder="seu@email.com"
                      style={INPUT} onFocus={onFocus} onBlur={onBlur}
                    />
                    {errors.email && <p style={{ fontFamily: 'DM Sans', fontSize: 11, color: '#cc5500', marginTop: 4 }}>{errors.email.message}</p>}
                  </div>
                </div>

                {/* Field: Tipo de obra */}
                <div>
                  <label style={{ fontFamily: 'Cormorant SC, serif', fontSize: 8, letterSpacing: '0.3em', color: 'rgba(204,85,0,0.6)', display: 'block', marginBottom: 4 }}>
                    04 — TIPO DE OBRA
                  </label>
                  <select
                    {...register('obraType')}
                    style={{ ...INPUT, cursor: 'pointer' }}
                    onFocus={onFocus} onBlur={onBlur}
                  >
                    <option value="">Selecione...</option>
                    {['Obra Pública', 'Infraestrutura Viária', 'Edificação Institucional', 'Construção Civil', 'Reforma / Revitalização', 'Outro'].map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                {/* Field: Mensagem */}
                <div>
                  <label style={{ fontFamily: 'Cormorant SC, serif', fontSize: 8, letterSpacing: '0.3em', color: 'rgba(204,85,0,0.6)', display: 'block', marginBottom: 4 }}>
                    05 — MENSAGEM
                  </label>
                  <textarea
                    {...register('message', {
                      required: 'Mensagem obrigatória',
                      minLength: { value: 20, message: 'Mínimo 20 caracteres' },
                    })}
                    placeholder="Descreva seu projeto..."
                    rows={5}
                    style={{ ...INPUT, resize: 'vertical' }}
                    onFocus={onFocus} onBlur={onBlur}
                  />
                  {errors.message && <p style={{ fontFamily: 'DM Sans', fontSize: 11, color: '#cc5500', marginTop: 4 }}>{errors.message.message}</p>}
                </div>

                {/* Submit */}
                <div style={{ paddingTop: 8 }}>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(204,85,0,0.4)',
                      color: '#cc5500',
                      fontFamily: '"Cormorant SC", serif',
                      fontSize: 10,
                      letterSpacing: '0.32em',
                      padding: '16px 36px',
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: 14,
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => { if (status !== 'loading') { e.currentTarget.style.background = '#cc5500'; e.currentTarget.style.color = '#fff'; } }}
                    onMouseLeave={e => { if (status !== 'loading') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#cc5500'; } }}
                  >
                    {status === 'loading'
                      ? <><Loader2 size={14} className="animate-spin" /> ENVIANDO</>
                      : <>ENVIAR MENSAGEM <div style={{ width: 20, height: 1, background: 'currentColor' }} /></>
                    }
                  </button>
                </div>

                {status === 'success' && (
                  <div style={{ padding: '14px 18px', border: '1px solid rgba(34,197,94,0.2)', background: 'rgba(34,197,94,0.05)' }}>
                    <p style={{ fontFamily: 'DM Sans', fontSize: 13, fontWeight: 300, color: 'rgba(34,197,94,0.75)' }}>
                      ✓ Mensagem enviada. Entraremos em contato em breve.
                    </p>
                  </div>
                )}
                {status === 'error' && (
                  <div style={{ padding: '14px 18px', border: '1px solid rgba(204,85,0,0.18)', background: 'rgba(204,85,0,0.05)' }}>
                    <p style={{ fontFamily: 'DM Sans', fontSize: 13, fontWeight: 300, color: '#cc5500' }}>
                      Erro ao enviar. Tente novamente ou nos chame no WhatsApp.
                    </p>
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
