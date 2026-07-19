import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { brand, pricing } from '../data/content';

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* WhatsApp */}
      <a
        href={brand.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-24 md:bottom-8 right-5 z-[70] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.4a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2zm0 18.02h-.01a8.1 8.1 0 0 1-4.14-1.13l-.3-.18-3.14.83.84-3.06-.19-.31a8.13 8.13 0 0 1-1.25-4.32c0-4.49 3.65-8.14 8.14-8.14a8.1 8.1 0 0 1 5.75 2.39 8.08 8.08 0 0 1 2.38 5.75c0 4.49-3.65 8.17-8.08 8.17zm4.46-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.19 3.7.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.11-.22-.17-.46-.29z" />
        </svg>
      </a>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-24 md:bottom-8 left-5 z-[70] w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:border-gold/50"
          >
            <ArrowUp className="w-5 h-5 text-gold" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sticky bottom buy bar (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] md:hidden bg-bg/90 backdrop-blur-xl border-t border-white/[0.08] px-5 py-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-ink-dim/60 line-through">{pricing.currency}{pricing.originalPrice}</p>
          <p className="font-display font-bold text-gold text-lg leading-none">{pricing.currency}{pricing.price}</p>
        </div>
        <a href="#pricing" className="rounded-full bg-gold-gradient text-bg font-semibold text-sm px-6 py-3 shadow-gold">
          Buy Now
        </a>
      </div>
    </>
  );
}
