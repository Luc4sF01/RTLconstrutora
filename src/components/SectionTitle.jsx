import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionTitle({ label, title, subtitle, center = false, dark = false }) {
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);

  const textColor = dark ? '#ffffff' : '#0A0A0A';
  const textMuted = dark ? 'rgba(255,255,255,0.45)' : 'rgba(10,10,10,0.5)';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
      tl.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3')
        .fromTo(lineRef.current, { width: 0 }, { width: 50, duration: 0.8, ease: 'power3.out' }, '-=0.5');
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={center ? 'text-center' : ''}>
      <p ref={labelRef} className="font-cormorantSC text-[11px] tracking-[0.3em] mb-4" style={{ color: '#cc5500' }}>
        {label}
      </p>
      <h2 ref={titleRef} className="font-cormorant font-light leading-tight" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', color: textColor, letterSpacing: '-0.01em' }}>
        {title}
      </h2>
      <div ref={lineRef} className="mt-5 h-px" style={{ background: '#cc5500', width: 0, margin: center ? '20px auto 0' : undefined }} />
      {subtitle && (
        <p ref={subtitleRef} className="font-dm font-light mt-5 leading-relaxed"
          style={{ color: textMuted, fontSize: '15px', maxWidth: center ? '560px' : undefined, margin: center ? '20px auto 0' : undefined }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
