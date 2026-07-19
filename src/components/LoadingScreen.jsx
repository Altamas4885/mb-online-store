import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center gap-5"
          >
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-2 border-white/10" />
              <div className="absolute inset-0 rounded-full border-2 border-t-gold border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              <div className="absolute inset-[6px] rounded-full bg-gold-gradient blur-[2px] opacity-70" />
            </div>
            <p className="eyebrow">MB Online Store</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
