// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      appName: 'CTFever',
      appTitleTemplate: '%s - CTFever',
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
      // mode: 'out-in',
    },
  },
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
  ],
  dayjs: {
    locales: ['zh'],
    defaultLocale: 'zh',
    defaultTimezone: 'Asia/Shanghai',
    plugins: ['utc', 'timezone', 'relativeTime'],
  },
  ui: {
    icons: ['solar', 'tabler', 'svg-spinners'],
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
})
