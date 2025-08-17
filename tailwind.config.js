/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // ← 다크모드 활성화 방식
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard Variable', 'ui-sans-serif', 'system-ui'],
        press: ['"Press Start 2P"', 'cursive'],
      },
      dropShadow: {
        whiteGlow: '0 8px 16px rgba(255,255,255,0.2)',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(255,255,255,0)' },
          '50%': { boxShadow: '0 0 32px rgba(255,255,255,0.7)' },
        },
        pulseGlow: {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 rgba(255,255,255,0)'
          },
          '50%': {
            transform: 'scale(1.05)',
            boxShadow: '0 0 28px rgba(0,255,255,0.5)'
          }
        }
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite'
      }
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /dark:shadow-\[.*\]/,
    },
    {
      pattern: /dark:drop-shadow-.*/,
    }
  ],

};

