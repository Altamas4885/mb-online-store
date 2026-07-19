import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import CardStack from './CardStack';

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 3,
  top: Math.random() * 100,
  left: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 6 + Math.random() * 6,
}));

export default function Hero() {
  const sectionRef = useRef(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = sectionRef.current;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      setGlow({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
    >
      {/* animated gradient mesh background */}
      <div
        className="absolute inset-0 bg-mesh-glow bg-[length:200%_200%] animate-gradientShift"
        aria-hidden="true"
      />
      {/* mouse-follow glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(500px circle at ${glow.x}% ${glow.y}%, rgba(245,197,66,0.10), transparent 60%)`,
        }}
        aria-hidden="true"
      />
      {/* floating particles */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-gold/40 animate-drift"
            style={{
              width: p.size,
              height: p.size,
              top: `${p.top}%`,
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full section-pad !py-32 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="eyebrow mb-5">MB Online Store</p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink">
            THE AI ULTIMATE{' '}
            <span className="gold-text">COLLECTION 2026</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink-dim font-medium">
            Master AI Faster with One Powerful Bundle
          </p>
          <p className="mt-3 text-base text-ink-dim/80 max-w-lg">
            Everything you need to learn AI and ChatGPT in one premium collection.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#pricing" className="btn-primary">
              Buy Now <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#preview" className="btn-secondary">
              <PlayCircle className="w-4 h-4" /> Watch Demo
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        >
          <CardStack />
        </motion.div>
      </div>
    </section>
  );
}
