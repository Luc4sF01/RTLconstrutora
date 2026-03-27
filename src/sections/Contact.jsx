import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { MapPin, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPANY } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const INPUT = {
  background: 'transparent',
  border: '1px solid rgba(10,10,10,0.12)',
  color: '#0A0A0A',
  outline: 'none',
  fontFamily: '"DM Sans", sans-serif',
  fontWeight: 300,
  fontSize: '14px',
  padding: '14px 16px',
  borderRadius: '2px',
  width: '100%',
  transition: 'border-color 0.3s',
};

export default function Contact() {
  const [sent, setSent] = useState(false);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' } });
      gsap.fromTo(rightRef.current, { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' } });
    });
    return () => ctx.revert();
  }, []);

  const onSubmit = (data) => {
    const lines = [
      `Olá! Vim pelo site da RTL.`,
      ``,
      `*Nome:* ${data.name}`,
      `*Telefone:* ${data.phone}`,
      data.obraType ? `*Tipo de obra:* ${data.obraType}` : null,
      ``,
      `*Mensagem:* ${data.message}`,
    ].filter(l => l !== null).join('\n');

    const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank');
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 6000);
  };

  const onFocus = (e) => (e.target.style.borderColor = '#cc5500');
  const onBlur = (e) => (e.target.style.borderColor = 'rgba(10,10,10,0.12)');

  return (
    <section id="contato" style={{ padding: '140px 0', background: '#F7F4EF' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left */}
          <div ref={leftRef} className="opacity-0">
            <p className="font-cormorantSC text-[11px] tracking-[0.3em] mb-4" style={{ color: '#cc5500' }}>CONTATO</p>
            <h2 className="font-cormorant font-light leading-tight mb-5" style={{ fontSize: 'clamp(36px, 4vw, 52px)', color: '#0A0A0A' }}>
              Vamos construir juntos?
            </h2>
            <div className="mb-8" style={{ width: '50px', height: '2px', background: '#cc5500' }} />
            <p className="font-dm font-light text-sm leading-relaxed mb-10" style={{ color: 'rgba(10,10,10,0.5)' }}>
              Entre em contato e descubra como a RTL pode transformar seu projeto em realidade.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { Icon: MapPin, content: `${COMPANY.address.street}\n${COMPANY.address.neighborhood} — CEP ${COMPANY.address.cep}\n${COMPANY.address.city}` },
                { Icon: Phone, content: COMPANY.phone, href: `tel:${COMPANY.phone}` },
              ].map(({ Icon, content, href }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(204,85,0,0.08)' }}>
                    <Icon size={15} style={{ color: '#cc5500' }} />
                  </div>
                  {href ? (
                    <a href={href} className="font-dm font-light text-sm leading-relaxed hover:text-[#cc5500] transition-colors" style={{ color: 'rgba(10,10,10,0.55)' }}>
                      {content}
                    </a>
                  ) : (
                    <p className="font-dm font-light text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(10,10,10,0.55)' }}>
                      {content}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-sm" style={{ height: '200px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0399577977745!2d-49.37800!3d-20.81900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDQ5JzA4LjQiUyA0OcKwMjInNDAuOCJX!5e0!3m2!1spt!2sbr!4v1234567890"
                width="100%" height="200"
                style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="RTL Localização"
              />
            </div>
          </div>

          {/* Right — Form */}
          <div ref={rightRef} className="opacity-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <input {...register('name', { required: 'Nome obrigatório' })}
                  placeholder="Nome completo *" style={INPUT} onFocus={onFocus} onBlur={onBlur} />
                {errors.name && <p className="font-dm text-xs mt-1" style={{ color: '#cc5500' }}>{errors.name.message}</p>}
              </div>
              <div>
                <input {...register('phone', { required: 'Telefone obrigatório' })}
                  placeholder="Telefone *" style={INPUT} onFocus={onFocus} onBlur={onBlur} />
                {errors.phone && <p className="font-dm text-xs mt-1" style={{ color: '#cc5500' }}>{errors.phone.message}</p>}
              </div>
              <select {...register('obraType')} style={{ ...INPUT, cursor: 'pointer' }} onFocus={onFocus} onBlur={onBlur}>
                <option value="" style={{ background: '#fff' }}>Tipo de obra</option>
                {['Obra Pública', 'Infraestrutura Viária', 'Edificação Institucional', 'Construção Civil', 'Reforma / Revitalização', 'Outro'].map(o => (
                  <option key={o} value={o} style={{ background: '#fff' }}>{o}</option>
                ))}
              </select>
              <div>
                <textarea {...register('message', {
                  required: 'Mensagem obrigatória',
                  minLength: { value: 20, message: 'Mínimo 20 caracteres' },
                })} placeholder="Conte-nos sobre seu projeto *" rows={5}
                  style={{ ...INPUT, resize: 'vertical' }} onFocus={onFocus} onBlur={onBlur} />
                {errors.message && <p className="font-dm text-xs mt-1" style={{ color: '#cc5500' }}>{errors.message.message}</p>}
              </div>
              <button type="submit"
                className="w-full flex items-center justify-center gap-3 font-dm text-sm py-4 rounded-sm transition-all duration-300"
                style={{ background: '#cc5500', color: '#fff', cursor: 'pointer' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#b34a00'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#cc5500'; }}
              >
                Enviar pelo WhatsApp
              </button>
              {sent && (
                <div className="text-center py-3 px-4 rounded-sm" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <p className="font-dm font-light text-sm text-green-600">✓ WhatsApp aberto com sua mensagem. Aguarde nosso retorno!</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
