import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '../data/content';

export default function Testimonials() {
  return (
    <section className="section-pad">
      <div className="max-w-3xl mx-auto text-center mb-4">
        <p className="eyebrow mb-3">Testimonials</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">What People Say</h2>
        <p className="mt-3 text-sm text-ink-dim/70">
          Sample placeholder content shown below — replace with verified customer reviews.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-luxury p-7"
          >
            <Quote className="w-6 h-6 text-gold/60 mb-4" />
            <p className="text-sm text-ink-dim leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-6 pt-5 border-t border-white/[0.06]">
              <p className="font-semibold text-ink text-sm">{t.name}</p>
              <p className="text-xs text-gold/70 mt-0.5 font-mono uppercase tracking-wide">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
