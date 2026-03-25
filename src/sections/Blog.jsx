import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
            delay: i * 0.1 }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '120px 0', background: '#FAFAF8' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <p className="font-cormorantSC text-[11px] tracking-[0.3em] mb-4" style={{ color: '#cc5500' }}>BLOG</p>
            <h2 className="font-cormorant font-light" style={{ fontSize: 'clamp(36px, 4vw, 52px)', color: '#0A0A0A' }}>
              Conteúdo e Conhecimento
            </h2>
          </div>
          <button className="flex items-center gap-2 font-dm font-light text-sm self-start lg:self-end lg:mb-2 transition-colors" style={{ color: '#cc5500' }}>
            Ver todos os artigos <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <article
              key={post.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group cursor-pointer opacity-0"
            >
              <div className="overflow-hidden rounded-sm mb-5" style={{ aspectRatio: '16/9' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-cormorantSC text-[10px] tracking-[0.2em]" style={{ color: '#cc5500' }}>
                  {post.category}
                </span>
                <span className="font-dm font-light text-xs" style={{ color: 'rgba(10,10,10,0.3)' }}>
                  {post.date}
                </span>
              </div>
              <h3 className="font-cormorant font-light text-xl mb-3 leading-tight transition-colors duration-300 group-hover:text-[#cc5500]" style={{ color: '#0A0A0A' }}>
                {post.title}
              </h3>
              <p className="font-dm font-light text-sm leading-relaxed mb-4" style={{ color: 'rgba(10,10,10,0.45)', fontSize: '13px' }}>
                {post.excerpt}
              </p>
              <button className="flex items-center gap-2 font-dm font-light text-xs transition-all duration-300 group-hover:gap-3" style={{ color: '#cc5500' }}>
                Ler artigo <ArrowRight size={12} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
