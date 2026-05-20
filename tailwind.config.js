/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        'aura-ivory': '#FAF8F5',
        'aura-white': '#FFFFFF',
        'aura-gold': '#C9A96E',
        'aura-black': '#1A1A1A',
        'aura-gray': '#6B6B6B',
        'aura-border': 'rgba(26,26,26,0.08)',
        'aura-overlay': 'rgba(26,26,26,0.4)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
