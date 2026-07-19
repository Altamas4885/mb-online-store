import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { brand } from '../data/content';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend wired up yet — replace this with your form/email API call.
    setSent(true);
  };

  return (
    <>
      <SEO title="Contact Us | MB Online Store" description="Get in touch with MB Online Store for support, questions, or feedback." />
      <section className="min-h-screen section-pad !pt-36 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="eyebrow mb-3">Contact</p>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-ink">Get in Touch</h1>
          <p className="mt-3 text-ink-dim">
            Have a question about your order or the collection? Send us a message and we&apos;ll get back to you.
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm text-ink-dim">
            <Mail className="w-4 h-4 text-gold" />
            <a href={`mailto:${brand.email}`} className="hover:text-gold transition-colors">{brand.email}</a>
          </div>

          {sent ? (
            <div className="mt-10 card-luxury p-8 text-center">
              <MessageCircle className="w-8 h-8 text-gold mx-auto mb-3" />
              <p className="font-display font-semibold text-ink">Message sent</p>
              <p className="text-sm text-ink-dim mt-1">Thanks for reaching out — we&apos;ll reply as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm text-ink-dim mb-2">Name</label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl bg-card border border-white/10 px-4 py-3 text-ink placeholder:text-ink-dim/40 focus:border-gold/50 outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-ink-dim mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl bg-card border border-white/10 px-4 py-3 text-ink placeholder:text-ink-dim/40 focus:border-gold/50 outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-ink-dim mb-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl bg-card border border-white/10 px-4 py-3 text-ink placeholder:text-ink-dim/40 focus:border-gold/50 outline-none transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </>
  );
}
