import { motion } from 'framer-motion';
import { ShieldCheck, Download, Infinity as InfinityIcon, Award } from 'lucide-react';
import { trustPoints } from '../data/content';

const icons = [Award, Download, InfinityIcon, ShieldCheck];

export default function TrustBadges() {
  return (
    <section className="section-pad !pt-16 !pb-10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {trustPoints.map((t, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-luxury p-6 hover:border-gold/30 transition-colors duration-300"
            >
              <div className="w-11 h-11 rounded-full glass flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display font-semibold text-ink mb-1.5">{t.title}</h3>
              <p className="text-sm text-ink-dim leading-relaxed">{t.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
