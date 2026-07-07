/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: {
        //   DEFAULT: '#008e46',
        //   dark: '#045B16',
        //   accent: '#e67f37'
        // },
         primary: {
          DEFAULT: '#343434',
          dark: '#AD5913',
          accent: '#E77B1D'
        },
      }
    },
    fontFamily: {
      'serif': [...defaultTheme.fontFamily.serif],
      'sans': [...defaultTheme.fontFamily.sans],
      'poppins': ["'Poppins'", 'sans-serif'],
      'roboto': ["'Roboto'", 'sans-serif'],
      'noto': ["'Noto Sans'", 'sans-serif'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('tailwind-scrollbar-hide'),
  ],
}

