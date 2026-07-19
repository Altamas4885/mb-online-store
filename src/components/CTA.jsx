import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { pricing } from '../data/content';

export default function CTA() {
  return (
    <section className="section-pad">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto text-center rounded-xl3 glass-strong p-12 md:p-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-mesh-glow" aria-hidden="true" />
        <div className="relative">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-ink leading-tight">
            Get the Full Collection Today for Just{' '}
            <span className="gold-text">{pricing.currency}{pricing.price}</span>
          </h2>
          <p className="mt-4 text-ink-dim max-w-xl mx-auto">
            Instant download. Lifetime access. Everything you need to master AI in one place.
          </p>
          <a href="#pricing" className="btn-primary mt-9 group">
            Buy Now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 opacity-0 group-active:opacity-100 transition-transform duration-500" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
