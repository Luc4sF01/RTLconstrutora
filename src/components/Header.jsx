import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Início', to: '/' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Portfólio', to: '/portfolio' },
  { label: 'Serviços', to: '/servicos' },
  { label: 'Contato', to: '/contato' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  // All page heroes have dark photo backgrounds — always use white text
  const textColor = '#ffffff';
  const textMuted = 'rgba(255,255,255,0.6)';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled
          ? 'rgba(10,10,10,0.92)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 70%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-cormorant font-bold text-3xl tracking-tight" style={{ color: textColor }}>RTL</span>
          <span className="font-dm font-light text-[10px] tracking-widest uppercase mt-[-2px]" style={{ color: textMuted }}>
            Construção de Edifícios
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) =>
            link.to.startsWith('/#') ? (
              <a key={link.to} href={link.to}
                className="font-dm text-[13px] tracking-[0.08em] transition-colors duration-300 hover:opacity-100"
                style={{ color: textMuted }}
              >
                {link.label}
              </a>
            ) : (
              <NavLink key={link.to} to={link.to} end={link.to === '/'}
                className={({ isActive }) =>
                  `font-dm text-[13px] tracking-[0.08em] transition-colors duration-300 ${isActive ? 'opacity-100' : 'hover:opacity-100'}`
                }
                style={{ color: location.pathname === link.to ? '#fff' : textMuted }}
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link to="/contato"
            className="hidden lg:block font-dm text-[13px] px-5 py-2.5 rounded-sm transition-all duration-300"
            style={{ background: '#cc5500', color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#b34a00')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#cc5500')}
          >
            Solicitar Orçamento
          </Link>
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: textColor }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {mobileOpen && (
        <div className="lg:hidden border-t px-6 py-6" style={{ background: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(20px)', borderColor: 'rgba(255,255,255,0.06)' }}>
          {NAV_LINKS.map((link) => (
            <div key={link.to} className="py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {link.to.startsWith('/#') ? (
                <a href={link.to} className="font-dm text-sm tracking-widest text-white/60 hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}>{link.label}</a>
              ) : (
                <NavLink to={link.to} className="font-dm text-sm tracking-widest text-white/60 hover:text-white transition-colors block">
                  {link.label}
                </NavLink>
              )}
            </div>
          ))}
          <Link to="/contato" className="mt-5 block text-center font-dm text-sm px-5 py-3 rounded-sm"
            style={{ background: '#cc5500', color: '#fff' }}>
            Solicitar Orçamento
          </Link>
        </div>
      )}
    </header>
  );
}
