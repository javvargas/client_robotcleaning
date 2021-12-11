const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
            avidbots: '#00FF64',
            blueGray: colors.blueGray,
            amber: colors.amber,
            warmGray: colors.warmGray,
            lime: colors.lime,
            orange: colors.orange
        },
    },
},
  variants: {
    extend: {},
  },
  plugins: [],
}
