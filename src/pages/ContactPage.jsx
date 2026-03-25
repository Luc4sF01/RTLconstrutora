import Contact from '../sections/Contact';
import { IMAGES } from '../data/content';

export default function ContactPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[45vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${IMAGES.heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 60%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <p className="font-cormorantSC text-[12px] tracking-[0.25em] mb-3" style={{ color: '#cc5500' }}>
            FALE CONOSCO
          </p>
          <h1 className="font-cormorant font-light text-white leading-tight" style={{ fontSize: 'clamp(44px, 6vw, 72px)' }}>
            Entre em Contato
          </h1>
        </div>
      </section>

      <Contact />
    </>
  );
}
