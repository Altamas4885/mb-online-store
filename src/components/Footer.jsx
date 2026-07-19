import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { brand } from '../data/content';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions' },
  { label: 'Refund Policy', to: '/refund-policy' },
];

const socials = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-bg-soft">
      <div className="section-pad !py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="font-display font-semibold text-lg text-ink">{brand.name}</span>
          </div>
          <p className="text-sm text-ink-dim leading-relaxed max-w-xs">
            Premium AI resources to help you learn faster and build smarter.
          </p>
          <a href={`mailto:${brand.email}`} className="mt-4 inline-flex items-center gap-2 text-sm text-ink-dim hover:text-gold transition-colors">
            <Mail className="w-4 h-4" /> {brand.email}
          </a>
        </div>

        <div>
          <h4 className="font-display font-semibold text-ink mb-4 text-sm tracking-wide uppercase">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-ink-dim hover:text-gold transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-ink mb-4 text-sm tracking-wide uppercase">Follow Us</h4>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-gold/40 hover:text-gold transition-colors"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] py-6 px-6 md:px-10 lg:px-16">
        <p className="text-xs text-ink-dim/60 text-center">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
