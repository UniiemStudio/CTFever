export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // 续命

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'CTFever Toolkit by uniiem',
    meta: [
      {charset: 'utf-8'},
      {title: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no;'},
      {hid: 'description', title: 'description', content: ''},
      {title: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: [
      {src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js', type: 'module'},
      {src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js', type: 'nomodule'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css',
    'pattern.css/dist/pattern.css',
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/i18n
    '@nuxtjs/i18n',
    '@nuxt/content',
    [
      'nuxt-matomo',
      {
        matomoUrl: '//analytics.i0x0i.ltd/',
        trackerUrl: '//analytics.i0x0i.ltd/matomo.php',
        scriptUrl: '//analytics.i0x0i.ltd/matomo.js',
        siteId: 5,
        debug: true,
        onMetaChange: true
      }
    ],
    ['@nuxtjs/robots', {}],
    '@nuxtjs/sitemap'
  ],

  loading: {
    continuous: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'zh'
    }
  },

  sitemap: {
    hostname: 'https://ctfever.uniiem.com',
    gzip: true,
    defaults: {
      lastmod: new Date()
    },
    i18n: {
      locales: ['en', 'zh'],
      routesNameSeparator: '___'
    }
  },

  i18n: {
    // https://go.nuxtjs.dev/i18n-module
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js',
        name: 'English',
        label: 'English'
      },
      {
        code: 'zh',
        iso: 'zh-CN',
        file: 'zh-CN.js',
        name: '简体中文',
        label: '简体中文'
      },
      {
        code: 'ja',
        iso: 'ja-JP',
        file: 'ja-JP.js',
        name: '日本語',
        label: '日本語'
      }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      // redirectOn: 'root',
      alwaysRedirect: true
    },
    defaultLocale: 'zh',
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./lang/en-US.js'),
        zh: require('./lang/zh-CN.js'),
        ja: require('./lang/ja-JP')
      }
    },
    vueI18nLoader: true
  },

  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  }
}
