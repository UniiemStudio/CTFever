module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./layouts/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./content/**/*.md"
  ],
  theme: {
    fontFamily: {
      'sans': ["-apple-system", "PT Sans", "PingFang SC", "sans-serif"],
      'mono': ["PT Mono", "monospace"],
    },
    fallbackFontFamily: {
      'sans': ["-apple-system", "PT Sans", "PingFang SC", "sans-serif"],
      'mono': ["PT Mono", "monospace"],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
