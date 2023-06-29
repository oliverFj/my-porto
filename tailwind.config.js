module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: { '600px': '600px', },
  },
  variants: {
    extend: {},
  },
  plugins: [
  require('@tailwindcss/forms'),
  require('@tailwindcss/typography'),
  ],
}