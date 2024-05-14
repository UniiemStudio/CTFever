// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from './package.json'
import path from 'path'
import * as fs from 'node:fs'
import type { InlineConfig } from 'vite'

fs.rmSync(path.join(__dirname, 'dist-electron'), { recursive: true, force: true })

const viteElectronBuildConfig: InlineConfig = {
  build: {
    minify: process.env.NODE_ENV === 'production',
    rollupOptions: {
      external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
    },
  },
  resolve: {
    alias: {
      '~': __dirname,
    },
  },
}

export default defineNuxtConfig({
  nitro: {
    preset: 'node-server',
    devProxy: {
      host: '127.0.0.1',
    },
  },
  ssr: false,
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      appName: 'CTFever',
      apiBase: 'http://localhost:8080',
    },
  },
  css: [
    '~/assets/css/transitions.scss',
    '~/assets/css/main.scss',
  ],
  app: {
    pageTransition: {
      name: 'page',
    },
  },
  spaLoadingTemplate: true,
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-icon',
    '@nuxt/content',
    'dayjs-nuxt',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    'nuxt-monaco-editor',
    'nuxt-electron',
  ],
  router: {
    options: {
      hashMode: !process.env.VITE_DEV_SERVER_URL,
    },
  },
  electron: {
    build: [
      {
        entry: 'electron/main.ts',
        vite: viteElectronBuildConfig,
      },
      {
        entry: 'electron/preload.ts',
        vite: viteElectronBuildConfig,
        onstart(args) {
          args.reload()
        },
      },
    ],
  },
  dayjs: {
    locales: ['zh'],
    defaultLocale: 'zh',
    defaultTimezone: 'Asia/Shanghai',
    plugins: ['utc', 'timezone', 'relativeTime'],
  },
  ui: {
    icons: ['solar', 'tabler', 'svg-spinners', 'twemoji'],
  },
  colorMode: {
    preference: 'system',
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        icon: 'twemoji:flag-united-states',
      },
      {
        code: 'zh',
        iso: 'zh-CN',
        name: '简体中文',
        icon: 'twemoji:flag-china',
      },
    ],
    defaultLocale: 'zh',
    customBlocks: {
      defaultSFCLang: 'yaml',
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      // redirectOn: 'root',
      alwaysRedirect: true,
    },
  },
  googleFonts: {
    families: {
      Rubik: '100..900',
      'Noto Sans SC': '100..900',
    },
  },
  monacoEditor: {
    locale: 'en',
  },
})