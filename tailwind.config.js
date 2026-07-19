/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#080808',
          soft: '#0c0c0c',
        },
        card: {
          DEFAULT: '#111111',
          soft: '#161616',
        },
        gold: {
          DEFAULT: '#F5C542',
          bright: '#FDE49A',
          deep: '#C9A227',
          muted: '#8A7530',
        },
        ink: {
          DEFAULT: '#F5F5F3',
          dim: '#B9B7B1',
          faint: '#6E6C67',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        gold: '0 0 40px -8px rgba(245, 197, 66, 0.45)',
        'gold-lg': '0 0 80px -12px rgba(245, 197, 66, 0.55)',
        card: '0 8px 32px -8px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FDE49A 0%, #F5C542 45%, #C9A227 100%)',
        'mesh-glow': 'radial-gradient(circle at 20% 20%, rgba(245,197,66,0.10), transparent 40%), radial-gradient(circle at 80% 30%, rgba(245,197,66,0.06), transparent 45%), radial-gradient(circle at 50% 80%, rgba(245,197,66,0.08), transparent 50%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(var(--tilt, 0deg))' },
          '50%': { transform: 'translateY(-18px) rotate(var(--tilt, 0deg))' },
        },
        drift: {
          '0%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(20px,-30px)' },
          '100%': { transform: 'translate(0,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 9s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        gradientShift: 'gradientShift 12s ease infinite',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
    },
  },
  plugins: [],
}
