import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const cards = [
  { label: '10,000+ Prompts', rotate: -14, x: -70, y: 10, z: 0 },
  { label: '45 Personas', rotate: -5, x: -28, y: -6, z: 10 },
  { label: 'Prompt Mastery', rotate: 4, x: 18, y: -14, z: 20 },
  { label: '101 Business Ideas', rotate: 13, x: 62, y: -2, z: 30 },
];

/**
 * The page's signature visual: instead of a single generic book cover,
 * the bundle is represented as a fanned deck of glowing gold-edged cards —
 * a direct, literal echo of "collection" and "10,000+ prompts in one bundle".
 */
export default function CardStack() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-full max-w-md aspect-square mx-auto"
      style={{ perspective: '1400px' }}
    >
      {/* ambient glow behind the stack */}
      <div className="absolute inset-8 rounded-full bg-gold/20 blur-[80px]" aria-hidden="true" />

      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i, duration: 0.7, ease: 'easeOut' }}
            className="absolute w-44 h-60 md:w-52 md:h-72 rounded-2xl glass-strong shadow-gold-lg animate-float"
            style={{
              transform: `translate(${c.x}px, ${c.y}px) rotate(${c.rotate}deg) translateZ(${c.z}px)`,
              '--tilt': `${c.rotate}deg`,
              animationDelay: `${i * 0.4}s`,
              background: 'linear-gradient(160deg, rgba(245,197,66,0.10), rgba(255,255,255,0.02))',
              borderImage: 'linear-gradient(160deg, rgba(245,197,66,0.6), rgba(245,197,66,0.05)) 1',
            }}
          >
            <div className="h-full w-full flex flex-col justify-between p-5">
              <Sparkles className="w-6 h-6 text-gold" />
              <div>
                <p className="font-mono text-[10px] tracking-widest text-gold/70 uppercase mb-1">Included</p>
                <p className="font-display font-semibold text-ink text-sm leading-snug">{c.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
