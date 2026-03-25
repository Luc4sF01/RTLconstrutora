/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#cc5500',
        dark: {
          DEFAULT: '#0a0a0a',
          100: '#050505',
          200: '#0f0f0f',
          300: '#111111',
          400: '#0d0d0d',
        }
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        cormorantSC: ['"Cormorant SC"', 'serif'],
        dm: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
