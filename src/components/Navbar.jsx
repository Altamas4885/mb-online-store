import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { navLinks, brand } from '../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-500 ${
        scrolled ? 'py-3 bg-bg/70 backdrop-blur-xl border-b border-white/[0.06]' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 lg:px-16" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <Sparkles className="w-5 h-5 text-gold" strokeWidth={2} />
          <span className="font-display font-semibold tracking-tight text-lg text-ink">
            {brand.name}
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleNav(link.href)}
                className="text-sm font-medium text-ink-dim hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => handleNav('#pricing')}
          className="hidden md:inline-flex items-center rounded-full bg-gold-gradient text-bg font-semibold text-sm px-6 py-2.5 shadow-gold hover:scale-105 transition-transform duration-300"
        >
          Buy Now
        </button>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-bg/95 backdrop-blur-xl border-t border-white/[0.06] mt-3"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="w-full text-left py-3 text-ink-dim hover:text-gold transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => handleNav('#pricing')}
                  className="w-full inline-flex items-center justify-center rounded-full bg-gold-gradient text-bg font-semibold px-6 py-3 shadow-gold"
                >
                  Buy Now
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
