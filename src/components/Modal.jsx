import { AnimatePresence, motion } from 'framer-motion';
import { X, MapPin, Maximize2 } from 'lucide-react';
import { useEffect } from 'react';

export default function Modal({ item, onClose }) {
  useEffect(() => {
    // Only lock scroll & listen for Escape when a modal is open
    if (!item) {
      document.body.style.overflow = '';
      return;
    }

    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
          style={{ padding: '0' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full overflow-hidden"
            style={{
              maxWidth: 860,
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.07)',
              maxHeight: '92vh',
              overflowY: 'auto',
              margin: '0 auto',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 16, right: 16, zIndex: 20,
                width: 40, height: 40, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(204,85,0,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              aria-label="Fechar"
            >
              <X size={16} color="white" />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div style={{ width: '100%', flexShrink: 0 }} className="md:w-[45%]">
                <div style={{ height: 260, overflow: 'hidden' }} className="md:h-full md:min-h-[380px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: 'clamp(24px,4vw,40px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                <span style={{ fontFamily: 'Cormorant SC, serif', fontSize: 10, letterSpacing: '0.28em', color: '#cc5500', display: 'block', marginBottom: 10 }}>
                  {item.category}
                </span>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.01em' }}>
                  {item.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={13} style={{ color: '#cc5500', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>{item.city}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Maximize2 size={13} style={{ color: '#cc5500', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>{item.area}</span>
                  </div>
                </div>
                <div style={{ width: 36, height: 2, background: '#cc5500', marginBottom: 16 }} />
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontWeight: 300 }}>
                  {item.description}
                </p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.22)', marginTop: 20, letterSpacing: '0.08em', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
                  ANO DE ENTREGA: {item.year}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
