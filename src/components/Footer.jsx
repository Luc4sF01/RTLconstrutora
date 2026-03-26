import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { COMPANY, SERVICES } from '../data/content';

export default function Footer() {
  return (
    <footer style={{ background: '#0F2340', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <span className="font-cormorant font-bold text-3xl text-white">RTL</span>
            <p className="font-dm font-light text-[10px] text-white/30 tracking-widest uppercase mt-0.5 mb-4">Construção de Edifícios</p>
            <p className="font-dm font-light text-sm text-white/40 leading-relaxed">{COMPANY.slogan}</p>
            <div className="flex gap-3 mt-6">
              {[
                { Icon: Instagram, href: COMPANY.social.instagram },
                { Icon: Facebook, href: COMPANY.social.facebook },
                { Icon: Linkedin, href: COMPANY.social.linkedin },
                { Icon: MessageCircle, href: `https://wa.me/${COMPANY.whatsapp}` },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm flex items-center justify-center group transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Icon size={14} className="text-white/35 group-hover:text-[#cc5500] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-cormorantSC text-[10px] tracking-[0.25em] text-white/40 mb-5">LINKS RÁPIDOS</h4>
            <ul className="space-y-3">
              {[{ label: 'Início', to: '/' }, { label: 'Sobre a RTL', to: '/sobre' }, { label: 'Serviços', to: '/servicos' }, { label: 'Portfólio', to: '/portfolio' }, { label: 'Contato', to: '/contato' }].map((l) => (
                <li key={l.to}><Link to={l.to} className="font-dm font-light text-sm text-white/35 hover:text-white/70 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-cormorantSC text-[10px] tracking-[0.25em] text-white/40 mb-5">SERVIÇOS</h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to="/servicos" className="font-dm font-light text-sm text-white/35 hover:text-white/60 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-cormorantSC text-[10px] tracking-[0.25em] text-white/40 mb-5">CONTATO</h4>
            <div className="space-y-3">
              <p className="font-dm font-light text-sm text-white/35 leading-relaxed">
                {COMPANY.address.street}<br />{COMPANY.address.neighborhood}<br />{COMPANY.address.city}
              </p>
              <a href={`tel:${COMPANY.phone}`} className="font-dm font-light text-sm text-white/35 hover:text-white/60 transition-colors block">{COMPANY.phone}</a>
              <a href={`mailto:${COMPANY.email}`} className="font-dm font-light text-sm text-white/35 hover:text-white/60 transition-colors block">{COMPANY.email}</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="font-dm font-light text-xs text-white/20">© 2025 RTL Construção de Edifícios Ltda. Todos os direitos reservados.</p>
          <p className="font-dm font-light text-xs" style={{ color: 'rgba(255,255,255,0.12)' }}>CNPJ: {COMPANY.cnpj}</p>
        </div>

        {/* Okto credit */}
        <div
          className="flex items-center justify-center gap-3 mt-6 pt-5"
          style={{ borderTop: '1px solid rgba(204,85,0,0.15)' }}
        >
          <div style={{ width: 28, height: 1, background: 'rgba(204,85,0,0.4)' }} />
          <a
            href="https://okto-ag.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm font-light text-[11px] tracking-widest transition-colors duration-300"
            style={{ color: 'rgba(204,85,0,0.5)', letterSpacing: '0.18em' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#cc5500')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(204,85,0,0.5)')}
          >
            DESENVOLVIDO POR OKTO
          </a>
          <div style={{ width: 28, height: 1, background: 'rgba(204,85,0,0.4)' }} />
        </div>
      </div>
    </footer>
  );
}
