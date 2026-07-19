import { motion } from 'framer-motion';
import { perfectFor } from '../data/content';

export default function PerfectFor() {
  return (
    <section className="section-pad !py-16">
      <div className="max-w-4xl mx-auto text-center">
        <p className="eyebrow mb-3">Perfect For</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-10">
          Built for Anyone Ready to Use AI
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {perfectFor.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="px-5 py-2.5 rounded-full glass text-sm font-medium text-ink-dim hover:text-gold hover:border-gold/40 transition-colors duration-300"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
