import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'Noto Sans SC', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
}
