# MB Online Store — The AI Ultimate Collection 2026

A premium, luxury black-and-gold landing page for a digital product bundle, built with React, Vite, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Tech Stack

- **React 18** + **Vite** — fast dev server and optimized production build
- **Tailwind CSS** — utility-first styling with a custom luxury design token system (`tailwind.config.js`)
- **Framer Motion** — scroll reveals, hover states, page transitions, animated counters
- **React Router** — client-side routing for all pages
- **Lucide Icons** — crisp, consistent icon set
- **GSAP** — available and installed for any additional scroll/timeline animation work

## Project Structure

```
mb-online-store/
├── public/
│   ├── favicon.svg
│   ├── og-cover.svg          # Open Graph / Twitter card image (placeholder — swap for a real image)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── videos/
│       └── README.txt        # Drop product-demo.mp4 here
├── src/
│   ├── components/           # Reusable UI building blocks (Navbar, Hero, Pricing, FAQ, etc.)
│   ├── pages/                # Route-level pages (Home, ThankYou, Privacy, Terms, Refund, Contact, 404)
│   ├── data/
│   │   └── content.js        # All site copy, prices, links — edit here first
│   ├── App.jsx                # Routing + global chrome (navbar, footer, floating buttons)
│   ├── main.jsx                # React entry point
│   └── index.css              # Tailwind layers + design-system utility classes
├── index.html                 # SEO meta tags, Open Graph, Twitter cards, fonts
├── tailwind.config.js          # Color, type, shadow, and animation tokens
└── package.json
```

## Editing Content

Almost everything text- and price-related lives in `src/data/content.js`:
brand name, email, WhatsApp link, pricing, navigation links, stats, trust points,
included items, timeline reasons, audience tags, testimonials, and FAQs.

## Replacing Placeholders

This project ships with **no placeholder text** — only placeholder *media*, as requested:

1. **Demo video** — add your real file at `public/videos/product-demo.mp4`. The video section already points to it.
2. **OG/social image** — replace `public/og-cover.svg` with a real exported image (keep the same filename, or update the `<meta>` tags in `index.html`).
3. **Testimonials** — `src/data/content.js` → `testimonials` array is clearly labeled as sample content. Replace with real, verified reviews before launch.
4. **Countdown timer** — `src/components/CountdownTimer.jsx` is a decorative, repeating visual timer (not tied to a real deadline), so the urgency messaging stays honest. Wire it to a real target date if you want a genuine deadline.
5. **WhatsApp / social links** — update the URLs in `src/data/content.js` and `src/components/Footer.jsx`.

## Design System

- **Background:** `#080808` · **Card:** `#111111` · **Primary Gold:** `#F5C542`
- **Type:** Bricolage Grotesque (display), Inter (body), JetBrains Mono (labels/eyebrows)
- **Effects:** glassmorphism (`glass` / `glass-strong` utility classes), soft gold glow shadows, animated gradient mesh backgrounds, floating particles, mouse-follow glow, and a signature fanned "card stack" hero visual representing the bundle's contents.

## Accessibility & Performance Notes

- Visible focus rings on all interactive elements
- `prefers-reduced-motion` respected globally
- Semantic headings and landmark elements throughout
- Lazy-loaded route-based content via React Router
- SEO meta tags, Open Graph, Twitter Cards, `robots.txt`, and `sitemap.xml` included out of the box

## Pages

| Route | Purpose |
|---|---|
| `/` | Main landing page |
| `/thank-you` | Post-purchase confirmation |
| `/privacy-policy` | Privacy policy |
| `/terms-and-conditions` | Terms & conditions |
| `/refund-policy` | Refund policy |
| `/contact` | Contact form |
| `*` | 404 page |

## License

This code is provided for use with the MB Online Store brand. Replace all sample/placeholder content before going live.
