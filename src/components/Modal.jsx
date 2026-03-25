import { AnimatePresence, motion } from 'framer-motion';
import { X, MapPin, Tag, Maximize2 } from 'lucide-react';
import { useEffect } from 'react';

export default function Modal({ item, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 w-full max-w-4xl rounded-sm overflow-hidden"
            style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)' }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <X size={18} color="white" />
            </button>

            <div className="md:flex">
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <span
                  className="font-cormorantSC text-[11px] tracking-[0.2em] mb-3 block"
                  style={{ color: '#cc5500' }}
                >
                  {item.category}
                </span>
                <h3
                  className="font-cormorant font-light text-white leading-tight mb-4"
                  style={{ fontSize: '32px' }}
                >
                  {item.title}
                </h3>
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} style={{ color: '#cc5500' }} />
                    <span className="font-dm font-light text-sm text-white/60">{item.city}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 size={14} style={{ color: '#cc5500' }} />
                    <span className="font-dm font-light text-sm text-white/60">{item.area}</span>
                  </div>
                </div>
                <div className="w-10 h-px mb-5" style={{ background: '#cc5500' }} />
                <p className="font-dm font-light text-sm leading-relaxed text-white/60">
                  {item.description}
                </p>
                <div className="mt-6">
                  <span
                    className="font-dm text-xs tracking-widest text-white/40 uppercase"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', display: 'block' }}
                  >
                    Ano de entrega: {item.year}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
