module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./layouts/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    fontFamily: {
      'sans': ["PT Sans", "sans-serif"],
      'mono': ["PT Mono", "monospace"],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
