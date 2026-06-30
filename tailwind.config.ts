import type { Config } from 'tailwindcss';

// All brand values come straight from the Placement brand bible.
// Doctor colourway is green, graduate colourway is purple, one shared platform.
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#1D9E75', // primary brand, doctor accent, CTAs
          dark: '#04342C',    // deep backgrounds, rich text on light
          mint: '#9FE1CB',    // text on dark green, subtle accents
        },
        grad: {
          DEFAULT: '#534AB7', // all graduate-facing elements
        },
        cream: {
          DEFAULT: '#F5F0E8', // warm background
          border: '#D1C9B8',  // dividers on cream
          body: '#888780',    // body text on cream
        },
        ink: {
          DEFAULT: '#111827', // primary body text
          mid: '#6B7280',     // secondary text
          light: '#9CA3AF',   // labels, captions
        },
        offwhite: '#F9FAFB',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.18em',  // uppercase section labels
        footer: '0.26em', // small print / footer
        display: '-0.02em',
      },
      maxWidth: {
        shell: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
