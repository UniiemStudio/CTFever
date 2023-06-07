const CEVER_BACKEND_BASE_FALLBACK = 'https://ctfever-service.uniiem.com'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: process.env.CEVER_RUN_MODE || "static",
  server: {
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'
  },
  publicRuntimeConfig: {
    version: process.env.CEVER_VERSION || 'unstable',
    CEVER_BACKEND_BASE: process.env.CEVER_BACKEND_BASE || null,
    CEVER_BACKEND_BASE_FALLBACK: CEVER_BACKEND_BASE_FALLBACK
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "CTFever Toolkit by uniiem",
    meta: [
      {charset: "utf-8"},
      {
        title: "viewport",
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
      },
      {
        hid: "description",
        name: "description",
        title: "description",
        content: "免费的超赞 CTF 工具箱。为所有人准备的工具箱，包含pyc反编译、binwalk、端口扫描、Zip伪加密检测，以及多种加密、编码、Json编辑器和各种实用工具。"
      },
      {
        name: "keywords",
        content:
          "CTF,CTFever,CTF Toolkit,CTF Toolkit by uniiem,进制,在线工具,古典密码,凯撒密码,哈希,反编译,URL 编码,栅栏密码,猪圈密码,摩斯密码,Morse Code,MD5,BrainFuck,端口扫描,Port Scan,时间戳,Timestamp,Base64,ROT-13,pyc decompiler,pyc 反编译,IP,伪加密,数据存储格式转换",
      },
      {title: "format-detection", content: "telephone=no"},
      {name: "apple-mobile-web-app-capable", content: "yes"},
      {name: "msapplication-TileColor", content: "#2b5797"}
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      // {rel: 'manifest', href: '/site.webmanifest'},
      {rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5"},
      // Preloads
      {rel: "preconnect", href: "//analytics.i0x0i.ltd"},
      {
        rel: "preload",
        href: "//fonts.font.im/css?family=PT+Mono|PT+Sans|Poppins|Nunito&display=swap",
        as: "font"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "ant-design-vue/dist/antd.css",
    "pattern.css/dist/pattern.css",
    "@/assets/css/main.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/antd-ui",
    "@/plugins/g-tag",
    "@/plugins/api"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxt/postcss8",
    "@nuxtjs/pwa",
    "@nuxtjs/device"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/i18n
    "@nuxtjs/i18n",
    "@nuxt/content",
    [
      "nuxt-matomo",
      {
        matomoUrl: "//analytics.i0x0i.ltd/",
        trackerUrl: "//analytics.i0x0i.ltd/matomo.php",
        scriptUrl: "//analytics.i0x0i.ltd/matomo.js",
        siteId: 5,
        debug: false,
        onMetaChange: true
      }
    ],
    ["@nuxtjs/robots", {}],
    "@nuxtjs/sitemap",
    "@nuxtjs/proxy"
  ],

  // googleAnalytics: {
  //   id: 'UA-197955373-1'
  // },

  loading: {
    continuous: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
    proxy: true
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      name: "CTFever",
      author: "Uniiem Studio",
      description: "A fantastic toolkit for CTFers and everyone.",
      viewport:
        "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no",
      theme_color: "#ffffff",
      mobileApp: true,
      mobileAppIOS: true,
      nativeUI: true
    },
    icon: {
      source: "/static/icon.png",
      fileName: "icon.png",
      sizes: [64, 120, 144, 152, 192, 384, 512],
      purpose: "any"
    },
    workbox: {
      workboxURL: "/third_party/workbox/workbox-sw.js",
      config: {
        modulePathPrefix: "/third_party/workbox/"
      }
    },
    manifest: {
      lang: "zh",
      name: "CTFever",
      short_name: "CTFever",
      description: "A fantastic toolkit for CTFers and everyone by uniiem.",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    }
  },

  sitemap: {
    hostname: "https://ctfever.uniiem.com",
    gzip: true,
    defaults: {
      lastmod: new Date()
    },
    i18n: {
      locales: ["en", "zh"],
      routesNameSeparator: "___"
    }
  },

  proxy: {
    '/gateway/': {
      // target: process.env.NODE_ENV === 'production' ? 'https://ctfever-service.uniiem.com' : 'http://127.0.0.1:8080',
      target: process.env.CEVER_BACKEND_BASE || CEVER_BACKEND_BASE_FALLBACK,
      changeOrigin: true,
      pathRewrite: {
        '^/gateway/': '/'
      }
    }
  },

  i18n: {
    // https://go.nuxtjs.dev/i18n-module
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en-US.js",
        name: "English",
        label: "English",
        icon: "twemoji:flag-united-kingdom"
      },
      {
        code: "zh",
        iso: "zh-CN",
        file: "zh-CN.js",
        name: "简体中文",
        label: "简体中文",
        icon: "twemoji:flag-china"
      },
      // {
      //   code: 'ja',
      //   iso: 'ja-JP',
      //   file: 'ja-JP.js',
      //   name: '日本語',
      //   label: '日本語'
      // }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      // redirectOn: 'root',
      alwaysRedirect: true
    },
    defaultLocale: "zh",
    lazy: true,
    langDir: "lang/",
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        en: require("./lang/en-US.js"),
        zh: require("./lang/zh-CN.js")
      }
    },
    vueI18nLoader: true
  },

  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
  }
};
