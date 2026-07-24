import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function VideoSection() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="preview" className="section-pad">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <p className="eyebrow mb-3">See it in action</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">Watch the Full Walkthrough</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-4xl mx-auto rounded-xl3 glass-strong p-3 shadow-gold-lg"
      >
        <div className="relative rounded-xl2 overflow-hidden bg-card aspect-video">
          {/* Replace src with your real product-demo MP4 file */}
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            
            preload="auto"
            autoPlay={false}
            onClick={togglePlay}
          >
            <source src="/videos/promo.mp4" type="video/mp4" />
          </video>

          {!playing && (
            <button
              onClick={togglePlay}
              aria-label="Play demo video"
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors"
            >
              <span className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold-lg animate-float">
                <Play className="w-8 h-8 text-bg fill-bg ml-1" />
              </span>
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
