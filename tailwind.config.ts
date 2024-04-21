// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontSize(utils) {
        return {
          '2xs': '0.625rem',
        }
      },
      fontFamily(utils) {
        return {
          sans: ['Rubik', 'Noto Sans SC', 'sans-serif'],
        }
      },
    },
  },
  plugins: [typography],
}
