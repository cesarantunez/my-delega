import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // MyDELEGA Brand Colors — Supermercado Su Hogar
        // ⛔ GREEN IS PROHIBITED — Do not use any green tones
        'brand-yellow': '#FFE000',  // Primary, main buttons, splash screen
        'brand-pink':   '#FF1F8E',  // Secondary, alerts, urgent badges
        'brand-blue':   '#1B4FD8',  // Navigation, headers, links
        'brand-red':    '#E31E24',  // Errors, deletions, critical states
        'brand-white':  '#FFFFFF',  // Backgrounds, text on dark colors
        'brand-dark':   '#2D2D2D',  // Main text, dark backgrounds
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      boxShadow: {
        'brand': '0 4px 14px 0 rgba(27, 79, 216, 0.15)',
        'card': '0 2px 8px 0 rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-brand': 'pulseBrand 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseBrand: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

export default config
