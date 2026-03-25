import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';

import 'swiper/css';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
      );
      gsap.fromTo(swiperRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: swiperRef.current, start: 'top 85%' }, delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '140px 0', background: '#0A0A0A', overflow: 'hidden' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <p className="font-cormorantSC text-[11px] tracking-[0.3em] mb-4" style={{ color: '#cc5500' }}>DEPOIMENTOS</p>
          <h2 className="font-cormorant font-light text-white" style={{ fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '-0.01em' }}>
            O que nossos clientes dizem
          </h2>
        </div>

        {/* Big quote mark */}
        <div className="text-center mb-0" style={{ marginBottom: '-40px', position: 'relative', zIndex: 0 }}>
          <span className="font-cormorant select-none" style={{ fontSize: '200px', color: 'rgba(204,85,0,0.06)', lineHeight: 1, fontStyle: 'italic' }}>"</span>
        </div>

        <div ref={swiperRef} className="opacity-0 relative z-10">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            pagination={{ clickable: true }}
            spaceBetween={40}
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="flex flex-col items-center text-center px-4 pb-14">
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#cc5500" color="#cc5500" />
                    ))}
                  </div>
                  <p
                    className="font-cormorant italic font-light leading-relaxed mb-10 max-w-2xl"
                    style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', color: 'rgba(255,255,255,0.85)' }}
                  >
                    "{t.text}"
                  </p>
                  <div className="flex flex-col items-center gap-3">
                    <div style={{ width: 32, height: 1, background: 'rgba(204,85,0,0.45)' }} />
                    <p className="font-dm font-medium text-sm text-white">{t.name}</p>
                    <p className="font-dm font-light text-xs" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>{t.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
