import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Loader2, AlertCircle } from 'lucide-react';
import { pricing, brand } from '../data/content';
import CountdownTimer from './CountdownTimer';
import { startRazorpayCheckout } from '../utils/razorpay';

const perks = [
  '10,000+ AI Prompts & 45 Personas',
  '101 AI Business Ideas + 487 Niche Markets',
  'Beginner to Expert ChatGPT Guides',
  'Instant download, lifetime access',
];

export default function Pricing() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleBuyNow = async () => {
    setStatus('loading');
    setErrorMessage('');

    await startRazorpayCheckout({
      amount: pricing.price, // in rupees, e.g. 199
      productName: brand.product,
      onSuccess: (verification) => {
        setStatus('idle');
        // Pass verified payment details to the Thank You page.
        // ThankYou.jsx only renders the success state when this state is present,
        // so the page can't be reached by simply typing the URL after a fake payment.
        navigate('/thank-you', {
          state: {
            verified: true,
            paymentId: verification.payment_id,
            orderId: verification.order_id,
          },
        });
      },
      onFailure: (err) => {
        setStatus('error');
        setErrorMessage(err.message || 'Payment could not be completed. Please try again.');
      },
      onDismiss: () => {
        // User closed the Razorpay modal without paying — not an error, just reset.
        setStatus('idle');
      },
    });
  };

  return (
    <section id="pricing" className="section-pad">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative card-luxury p-8 md:p-10 text-center shadow-gold-lg border-gold/20"
        >
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-gold-gradient text-bg text-xs font-bold px-4 py-1.5 rounded-full shadow-gold">
            <Zap className="w-3.5 h-3.5" /> Limited Time Offer — {pricing.discountLabel}
          </span>

          <p className="eyebrow mt-6 mb-2">The AI Ultimate Collection 2026</p>

          <div className="flex items-end justify-center gap-3 mt-4">
            <span className="text-2xl text-ink-dim/50 line-through">
              {pricing.currency}{pricing.originalPrice}
            </span>
            <span className="font-display font-extrabold text-5xl gold-text">
              {pricing.currency}{pricing.price}
            </span>
          </div>
          <p className="text-xs text-ink-dim/60 mt-2">One-time payment · Lifetime access</p>

          <div className="mt-8">
            <CountdownTimer />
          </div>

          <ul className="mt-8 space-y-3 text-left">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-ink-dim">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                {p}
              </li>
            ))}
          </ul>

          <button
            onClick={handleBuyNow}
            disabled={status === 'loading'}
            className="btn-primary w-full mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Processing...
              </>
            ) : (
              <>Buy Now — {pricing.currency}{pricing.price}</>
            )}
          </button>

          {status === 'error' && (
            <div className="mt-4 flex items-start gap-2 text-left rounded-lg bg-red-500/10 border border-red-500/30 p-3">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-300">{errorMessage}</p>
            </div>
          )}

          <p className="mt-4 text-[11px] text-ink-dim/50">Secure checkout · Instant delivery</p>
        </motion.div>
      </div>
    </section>
  );
}
