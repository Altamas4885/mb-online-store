import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found | MB Online Store" description="The page you're looking for doesn't exist." />
      <section className="min-h-screen flex items-center justify-center section-pad bg-mesh-glow text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Compass className="w-12 h-12 text-gold mx-auto mb-6" />
          <h1 className="font-display font-extrabold text-7xl gold-text">404</h1>
          <p className="mt-4 text-lg text-ink">This page has wandered off.</p>
          <p className="mt-2 text-sm text-ink-dim">The link may be broken, or the page may have been moved.</p>
          <Link to="/" className="btn-primary mt-8 inline-flex">
            Back to Home
          </Link>
        </motion.div>
      </section>
    </>
  );
}
