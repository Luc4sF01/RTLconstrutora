import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#0a0a0a' }}>
      <p className="font-cormorantSC text-[12px] tracking-[0.25em] mb-4" style={{ color: '#cc5500' }}>
        ERRO 404
      </p>
      <h1 className="font-cormorant font-light text-white text-6xl mb-4">Página não encontrada</h1>
      <p className="font-dm font-light text-base mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
        A página que você procura não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="font-dm text-sm px-8 py-4 rounded-sm transition-all duration-300"
        style={{ background: '#cc5500', color: '#fff' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#b34a00')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#cc5500')}
      >
        Voltar ao Início
      </Link>
    </div>
  );
}
