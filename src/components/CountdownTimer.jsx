import { useEffect, useState } from 'react';

/**
 * A visual countdown for the pricing section. This is a repeating decorative
 * timer, not tied to a real deadline — it exists to add urgency to the
 * limited-time framing without making a false claim about an actual cutoff.
 * To wire this to a real deadline, replace the interval logic below with a
 * fixed target Date and remove the reset-to-cycleSeconds line.
 */
export default function CountdownTimer({ cycleSeconds = 24 * 60 * 60 }) {
  const [seconds, setSeconds] = useState(cycleSeconds);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s <= 0 ? cycleSeconds : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [cycleSeconds]);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center justify-center gap-3" aria-label="Limited time offer countdown">
      {[
        { label: 'HRS', value: h },
        { label: 'MIN', value: m },
        { label: 'SEC', value: s },
      ].map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-xl glass-strong flex items-center justify-center">
            <span className="font-display font-bold text-xl text-gold">{pad(unit.value)}</span>
          </div>
          <span className="mt-1.5 text-[10px] tracking-widest text-ink-dim/70 font-mono">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
