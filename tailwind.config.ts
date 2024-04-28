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
      gridTemplateColumns(utils) {
        return {
          '16': 'repeat(16, minmax(0, 1fr))',
          '24': 'repeat(24, minmax(0, 1fr))',
          '32': 'repeat(32, minmax(0, 1fr))',
        }
      },
    },
  },
  plugins: [typography],
}
