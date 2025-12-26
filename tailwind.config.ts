import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        'gold-light': '#F4E5B0',
        'gold-dark': '#B8941F',
        dark: '#1A1A1A',
        'dark-accent': '#2C2C2C',
        light: '#FAFAF8',
      },
      fontFamily: {
        serif: ['PT Serif', 'Georgia', 'serif'],
        sans: ['PT Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
