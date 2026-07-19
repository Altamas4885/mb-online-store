import { motion } from 'framer-motion';
import {
  MessageSquareText, Lightbulb, Users, Layers, KeyRound,
  BookOpen, GraduationCap, Wand2, Map, Rocket,
} from 'lucide-react';
import { includedItems } from '../data/content';

const icons = [
  MessageSquareText, Lightbulb, Users, Layers, KeyRound,
  BookOpen, GraduationCap, Wand2, Map, Rocket,
];

export default function WhatsIncluded() {
  return (
    <section id="included" className="section-pad">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="eyebrow mb-3">What&apos;s Included</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">
          One Collection. Everything You Need.
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {includedItems.map((item, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative card-luxury p-7 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl2 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(245,197,66,0.5), 0 0 40px -8px rgba(245,197,66,0.35)' }}
              />
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display font-semibold text-lg text-ink mb-2">{item.title}</h3>
              <p className="text-sm text-ink-dim leading-relaxed">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
