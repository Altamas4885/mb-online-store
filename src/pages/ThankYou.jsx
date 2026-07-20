import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import { brand } from '../data/content';

export default function ThankYou() {
  const location = useLocation();
  const state = location.state;

  // This page only shows the success view when it was reached right after a
  // verified payment (Pricing.jsx passes this via navigate('/thank-you', { state }) ).
  // Anyone landing here directly (bookmark, typed URL, back button after
  // reload) gets redirected home instead of a fake "purchase confirmed" screen.
  if (!state?.verified) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <SEO title="Thank You | MB Online Store" description="Your order was successful. Access your AI Ultimate Collection now." />
      <section className="min-h-screen flex items-center justify-center section-pad bg-mesh-glow">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full text-center card-luxury p-10 md:p-14 shadow-gold-lg"
        >
          <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center mx-auto shadow-gold">
            <CheckCircle2 className="w-8 h-8 text-bg" />
          </div>
          <h1 className="font-display font-extrabold text-3xl text-ink mt-6">Thank You for Your Purchase!</h1>
          <p className="mt-3 text-ink-dim">
            Your access to <span className="text-gold font-medium">{brand.product}</span> is ready.
          </p>

          {state.orderId && (
            <div className="mt-6 inline-block rounded-lg bg-card border border-white/10 px-4 py-3 text-left">
              <p className="text-[11px] text-ink-dim/60 uppercase tracking-wide font-mono">Order ID</p>
              <p className="text-sm text-ink font-mono">{state.orderId}</p>
              {state.paymentId && (
                <>
                  <p className="text-[11px] text-ink-dim/60 uppercase tracking-wide font-mono mt-2">Payment ID</p>
                  <p className="text-sm text-ink font-mono">{state.paymentId}</p>
                </>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="https://drive.google.com/uc?export=download&id=1ULvHYBNI3qVb2tpvv3wyBaXW6tfwbVdp"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
>
  <Download className="w-4 h-4" />
  Download Your Files
</a>
            <a href={`mailto:${brand.email}`} className="btn-secondary">
              <Mail className="w-4 h-4" /> Contact Support
            </a>
          </div>

          <Link to="/" className="inline-block mt-8 text-sm text-ink-dim hover:text-gold transition-colors">
            ← Back to Home
          </Link>
        </motion.div>
      </section>
    </>
  );
}
