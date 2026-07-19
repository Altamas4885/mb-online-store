import { motion } from 'framer-motion';
import { Zap, Gem, Package, TrendingUp } from 'lucide-react';
import { timeline } from '../data/content';

const icons = [Zap, Gem, Package, TrendingUp];

export default function WhyChoose() {
  return (
    <section className="section-pad">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="eyebrow mb-3">Why Choose This Bundle</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">
          Built to Save You Time and Money
        </h2>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent md:-translate-x-1/2" aria-hidden="true" />

        <div className="space-y-10">
          {timeline.map((item, i) => {
            const Icon = icons[i];
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-5 md:w-1/2 ${
                  isEven ? 'md:pr-10' : 'md:ml-auto md:pl-10'
                }`}
              >
                <div className="absolute left-6 md:left-auto md:relative flex-shrink-0 w-12 h-12 rounded-full bg-card border border-gold/30 flex items-center justify-center shadow-gold -translate-x-1/2 md:translate-x-0">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div className="pl-16 md:pl-0">
                  <h3 className="font-display font-semibold text-lg text-ink mb-1">{item.title}</h3>
                  <p className="text-sm text-ink-dim leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
