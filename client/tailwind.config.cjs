/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        michroma: ['Outfit', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'waving-flag': 'waving 4s ease-in-out infinite',
        'shake': 'shake 0.6s ease-in-out infinite',
        'cloud-scroll': 'cloudScroll 60s linear infinite',
        'cloud-fade': 'cloudFade 10s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px 30px rgba(2,132,199,0.3)',
          },
          '50%': {
            boxShadow: '0 0 30px 45px rgba(2,132,199,0.5)',
          },
        },
        waving: {
          '0%': { transform: 'rotate(0deg) scale(1) translateY(0)' },
          '25%': { transform: 'rotate(1deg) scale(1.02) translateY(1px)' },
          '50%': { transform: 'rotate(0deg) scale(1) translateY(0)' },
          '75%': { transform: 'rotate(-1deg) scale(1.02) translateY(-1px)' },
          '100%': { transform: 'rotate(0deg) scale(1) translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%, 90%': { transform: 'translate(-2px, 2px)' },
          '20%, 80%': { transform: 'translate(2px, -2px)' },
          '30%, 70%': { transform: 'translate(-4px, 4px)' },
          '40%, 60%': { transform: 'translate(4px, -4px)' },
          '50%': { transform: 'translate(-6px, 6px)' },
        },
        cloudScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        cloudFade: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
