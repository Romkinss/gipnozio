import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./index.tsx",
    "./src/**/*.{js,ts,jsx,tsx,astro}",
    "./components/**/*.{js,ts,jsx,tsx,astro}",
    "./pages/**/*.{js,ts,jsx,tsx,astro}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F4E5B0',
          dark: '#B8941F',
          dim: 'rgba(212, 175, 55, 0.1)',
        },
        dark: {
          DEFAULT: '#1A1A1A',
          accent: '#2C2C2C',
        },
        light: {
          DEFAULT: '#FAFAF8',
          secondary: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['PT Sans', 'Inter', 'sans-serif'],
        serif: ['PT Serif', 'serif'],
      },
      boxShadow: {
        'gold': '0 4px 20px -2px rgba(212, 175, 55, 0.25)',
        'gold-hover': '0 10px 25px -5px rgba(212, 175, 55, 0.4)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        }
      }
    }
  },
  plugins: [],
} satisfies Config