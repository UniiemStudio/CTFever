// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    css: [
        '~/assets/css/transitions.scss',
    ],
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in',
        }
    },
    modules: [
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
        "nuxt-icon",
        "nuxt-snackbar",
        "@nuxt/content",
        "dayjs-nuxt",
        "@vueuse/nuxt",
        "@nuxt/ui",
        "@nuxtjs/i18n",
    ],
    snackbar: {
        top: true,
        duration: 5000,
    },
    dayjs: {
        locales: ['zh'],
        defaultLocale: 'zh',
        defaultTimezone: 'Asia/Shanghai',
        plugins: ['utc', 'timezone', 'relativeTime'],
    },
    ui: {
        icons: ['solar', 'tabler']
    },
    i18n: {
        locales: ['en', 'zh'],
        defaultLocale: 'zh',
        customBlocks: {
            defaultSFCLang: 'yaml'
        }
    },
})
