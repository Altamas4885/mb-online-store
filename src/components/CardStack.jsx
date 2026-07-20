import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Crown } from 'lucide-react';

const cards = [
  { id: 'card-1', rotate: -14, x: -70, y: 10, z: 0 },
  { id: 'card-2', rotate: -5, x: -28, y: -6, z: 10 },
  { id: 'card-3', rotate: 4, x: 18, y: -14, z: 20 },
  { id: 'card-4', rotate: 13, x: 62, y: -2, z: 30 },
];

const bundleItems = [
  "10,000+ AI Prompts",
  "101 AI Business Ideas",
  "45 ChatGPT Personas",
  "80 ChatGPT Use Cases",
  "AI Secrets Vol. I",
  "Beginner's Guide to ChatGPT",
  "Expert's Guide to ChatGPT",
  "ChatGPT Prompt Mastery",
  "487 Online Niche Markets",
  "ChatGPT Accelerator",
];

const EASE = [0.22, 1, 0.36, 1]; // Apple-style smooth ease

/**
 * The page's signature visual: a fanned stack of premium glass cards,
 * each cycling through the bundle's contents with a buttery-smooth
 * fade + slide + blur crossfade — never a flip, never a flash.
 */
export default function CardStack() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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

  // Fixed set of golden particles, generated once.
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 4,
      })),
    []
  );

  const getItem = (i) => bundleItems[(step + i) % bundleItems.length];

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-full max-w-md md:max-w-lg mx-auto py-10 md:py-0 md:aspect-square"
      style={{ perspective: '1400px' }}
    >
      {/* ambient gold glow behind the stack */}
      <div className="absolute inset-8 rounded-full bg-gold/20 blur-[90px]" aria-hidden="true" />

      {/* floating golden particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-gold shadow-[0_0_8px_2px_rgba(245,197,66,0.6)]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.15, 0.85, 0.15],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full flex flex-col items-center gap-6 md:gap-0 md:flex md:items-center md:justify-center"
      >
        {cards.map((c, i) => (
          <div
            key={c.id}
            className="relative w-56 md:w-52 lg:w-56 md:absolute md:[transform:translate(var(--x),var(--y))_rotate(var(--rotate))_translateZ(var(--z))]"
            style={{
              '--x': `${c.x}px`,
              '--y': `${c.y}px`,
              '--rotate': `${c.rotate}deg`,
              '--z': `${c.z}px`,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(8px)' }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
                scale: [1, 1.015, 1],
                filter: 'blur(0px)',
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.15 * i, ease: EASE },
                filter: { duration: 0.8, delay: 0.15 * i, ease: EASE },
                y: {
                  duration: 4 + i * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.3 * i,
                },
                scale: {
                  duration: 5 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.2 * i,
                },
              }}
              whileHover={{ y: -18, scale: 1.06, transition: { duration: 0.4, ease: EASE } }}
              className="relative h-72 md:h-80 rounded-2xl overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                background:
                  'linear-gradient(160deg, rgba(20,18,12,0.85), rgba(10,9,7,0.9))',
                border: '1px solid transparent',
                backgroundImage:
                  'linear-gradient(160deg, rgba(20,18,12,0.9), rgba(8,7,6,0.95)), linear-gradient(160deg, rgba(245,197,66,0.9), rgba(245,197,66,0.05))',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow:
                  '0 0 0 1px rgba(245,197,66,0.15), 0 20px 45px -15px rgba(0,0,0,0.8), 0 0 40px -8px rgba(245,197,66,0.35)',
              }}
            >
              {/* glow pulse ring */}
              <motion.div
                className="absolute -inset-px rounded-2xl pointer-events-none"
                animate={{ opacity: [0.25, 0.6, 0.25] }}
                transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  boxShadow: '0 0 30px 4px rgba(245,197,66,0.35)',
                }}
                aria-hidden="true"
              />

              {/* diagonal shine sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.18) 45%, rgba(245,197,66,0.35) 50%, rgba(255,255,255,0.18) 55%, transparent 80%)',
                  mixBlendMode: 'screen',
                }}
                initial={{ x: '-120%' }}
                animate={{ x: '120%' }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  repeatDelay: 2.4,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
                aria-hidden="true"
              />

              {/* top reflection sheen */}
              <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0) 70%)',
                }}
                aria-hidden="true"
              />

              {/* content */}
              <div className="relative h-full w-full flex flex-col justify-between p-5 backdrop-blur-sm">
                {/* header row: logo + badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="font-mono text-[9px] tracking-[0.15em] text-gold/80 uppercase">
                      MB Online Store
                    </span>
                  </div>

                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-gold/30 to-gold/10 border border-gold/40">
                    <Crown className="w-3 h-3 text-gold" />
                    <span className="font-mono text-[8px] tracking-wider text-gold uppercase">
                      Premium
                    </span>
                  </div>
                </div>

                {/* title area with fixed height to prevent layout shift */}
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-gold/60 uppercase mb-2">
                    Included
                  </p>
                  <div className="relative h-[3.6rem] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`${step}-${i}`}
                        initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="absolute inset-0 font-display font-semibold text-white text-sm leading-snug"
                      >
                        {getItem(i)}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}