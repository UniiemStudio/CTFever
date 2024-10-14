// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-10-14",
  runtimeConfig: {
    public: {
      appName: "CTFever",
      apiBase: "http://localhost:8080",
    },
  },
  css: ["~/assets/css/transitions.css", "~/assets/css/main.css"],
  app: {
    pageTransition: {
      name: "page",
    },
  },
  spaLoadingTemplate: true,
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/content",
    "dayjs-nuxt",
    "@vueuse/nuxt",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "nuxt-monaco-editor",
  ],
  dayjs: {
    locales: ["zh"],
    defaultLocale: "zh",
    defaultTimezone: "Asia/Shanghai",
    plugins: ["utc", "timezone", "relativeTime"],
  },
  colorMode: {
    preference: "system",
  },
  i18n: {
    locales: [
      {
        code: "en",
        language: "en-US",
        name: "English",
        icon: "twemoji:flag-united-states",
      },
      {
        code: "zh",
        language: "zh-CN",
        name: "简体中文",
        icon: "twemoji:flag-china",
      },
    ],
    defaultLocale: "zh",
    customBlocks: {
      defaultSFCLang: "yaml",
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
  googleFonts: {
    families: {
      Rubik: "100..900",
      "Noto Sans SC": "100..900",
    },
  },
  monacoEditor: {
    locale: "en",
  },
});
