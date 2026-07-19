import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../data/content';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-pad">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <p className="eyebrow mb-3">FAQ</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">Frequently Asked Questions</h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.q} className="card-luxury overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-3 font-display font-medium text-ink">
                  <HelpCircle className="w-4 h-4 text-gold flex-shrink-0" />
                  {item.q}
                </span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-5 h-5 text-ink-dim flex-shrink-0" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p className="px-5 pb-5 text-sm text-ink-dim leading-relaxed pl-12">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
