import { motion } from 'framer-motion';
import { brand } from '../data/content';

export default function ProductPreview() {
  return (
    <section className="section-pad flex flex-col items-center">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="eyebrow mb-3">Product Preview</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">
          Take a Closer Look
        </h2>
      </div>

      <div className="relative">
        <div className="absolute inset-0 -z-10 blur-[100px] bg-gold/25 rounded-full" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="animate-float"
        >
          <div
            className="relative w-64 sm:w-80 md:w-96 rounded-r-2xl rounded-l-md overflow-hidden shadow-gold-lg"
            style={{ transform: 'perspective(1200px) rotateY(-18deg) rotateX(4deg)' }}
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-[#161616] via-[#0d0d0d] to-black flex flex-col justify-between p-8 border-l-4 border-gold">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/70">{brand.name}</p>
              <div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl leading-tight text-ink">
                  THE AI ULTIMATE
                  <br />
                  <span className="gold-text">COLLECTION</span>
                </h3>
                <p className="mt-3 text-xs text-ink-dim tracking-wide">2026 EDITION</p>
              </div>
            </div>
            <div className="absolute inset-y-0 left-0 w-2 bg-black/40" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.06]" aria-hidden="true" />
          </div>

          {/* reflection */}
          <div
            className="w-64 sm:w-80 md:w-96 rounded-l-md rounded-r-2xl overflow-hidden mt-1 opacity-25"
            style={{
              transform: 'perspective(1200px) rotateY(-18deg) rotateX(4deg) scaleY(-1)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 70%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 70%)',
            }}
            aria-hidden="true"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-[#161616] via-[#0d0d0d] to-black" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
