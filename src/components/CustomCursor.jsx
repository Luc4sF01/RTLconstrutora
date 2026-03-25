import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const isDesktop = !useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!isDesktop) return;

    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let raf;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (innerRef.current) {
        innerRef.current.style.left = mouseX + 'px';
        innerRef.current.style.top = mouseY + 'px';
      }
    };

    const animate = () => {
      outerX += (mouseX - outerX) * 0.12;
      outerY += (mouseY - outerY) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.left = outerX + 'px';
        outerRef.current.style.top = outerY + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => outerRef.current?.classList.add('hovered');
    const onMouseLeaveLink = () => outerRef.current?.classList.remove('hovered');

    document.addEventListener('mousemove', onMouseMove);
    raf = requestAnimationFrame(animate);

    const links = document.querySelectorAll('a, button, [data-cursor]');
    links.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    const observer = new MutationObserver(() => {
      const freshLinks = document.querySelectorAll('a, button, [data-cursor]');
      freshLinks.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div ref={outerRef} className="custom-cursor-outer hidden md:block" />
      <div ref={innerRef} className="custom-cursor-inner hidden md:block" />
    </>
  );
}
