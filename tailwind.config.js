/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ec6246',
          dark: '#d04f35',
          light: '#fbdcd6',
        },
        background: {
          DEFAULT: '#FDFBF7',
          light: '#FDFBF7',
          dark: '#211311',
        },
        surface: {
          light: '#ffffff',
          dark: '#2a1a18',
        },
        risk: {
          critical: '#ec6246',
          high: '#f59e0b',
          safe: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
