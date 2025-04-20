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
    },
  },
  plugins: [],
};

