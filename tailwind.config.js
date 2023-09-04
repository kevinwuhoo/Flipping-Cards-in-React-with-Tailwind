/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-0': {
      'transform': 'rotateY(0deg)',
    },
    '.rotate-y-180': {
      'transform': 'rotateY(180deg)',
    },
  })
});

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'image-1': 'repeat(1, minmax(320px, 1fr))',
        'image-2': 'repeat(2, minmax(320px, 1fr))',
        'image-3': 'repeat(3, minmax(320px, 1fr))',
      },
    },
  },
  plugins: [rotateY]
}