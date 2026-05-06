import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0a',
          elev: '#111113',
          card: '#15151a',
          border: '#23232b',
        },
        ink: {
          DEFAULT: '#f5f5f7',
          dim: '#a1a1aa',
          muted: '#6b6b75',
        },
        saffron: {
          50: '#fff5ec',
          100: '#ffe4cc',
          200: '#ffc999',
          300: '#ffa866',
          400: '#ff8533',
          500: '#ff6a00',
          600: '#e05500',
          700: '#b34400',
        },
        teal: {
          50: '#ecfffb',
          100: '#cffff5',
          200: '#9bffe9',
          300: '#5cf2d8',
          400: '#2ed9c1',
          500: '#0fb8a3',
          600: '#0a9484',
          700: '#0a766b',
        },
        cream: {
          50: '#fbf8f1',
          100: '#f5efde',
          200: '#ebe0c2',
          300: '#dcc99a',
          400: '#caac6c',
          500: '#b6924b',
        },
        ok: '#22c55e',
        warn: '#f59e0b',
        bad: '#ef4444',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      backgroundImage: {
        'gradient-hero':
          'radial-gradient(1200px 600px at 80% -20%, rgba(255,106,0,0.20), transparent 60%), radial-gradient(900px 500px at -10% 110%, rgba(15,184,163,0.18), transparent 60%)',
        'card-glow':
          'linear-gradient(135deg, rgba(255,106,0,0.08), rgba(15,184,163,0.05))',
      },
      boxShadow: {
        soft: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 12px 30px -20px rgba(0,0,0,0.6)',
        glow: '0 0 0 1px rgba(255,106,0,0.18), 0 8px 30px -10px rgba(255,106,0,0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
