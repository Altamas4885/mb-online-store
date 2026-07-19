import { motion } from 'framer-motion';

export default function LegalLayout({ title, updated, children }) {
  return (
    <section className="min-h-screen section-pad !pt-36 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="eyebrow mb-3">Policy</p>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-ink">{title}</h1>
        {updated && <p className="mt-2 text-xs text-ink-dim/60">Last updated: {updated}</p>}
        <div className="mt-10 space-y-6 text-sm md:text-base text-ink-dim leading-relaxed [&_h2]:font-display [&_h2]:text-ink [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-2">
          {children}
        </div>
      </motion.div>
    </section>
  );
}
