import { NuxtApp } from "#app/nuxt";

export default defineNuxtPlugin(() => {
  const { $i18n } = useNuxtApp()
  return {
    provide: {
      i18nMeta: {
        toolkit: {
          label: (key: string) => $i18n?.t(`app.toolkit.${key}.label`),
          descriptipn: (key: string) => $i18n?.t(`app.toolkit.${key}.description`)
        },
        tool: {
          label: (key: string) => $i18n?.t(`app.tool.${key}.label`),
          descriptipn: (key: string) => $i18n?.t(`app.tool.${key}.description`)
        },
        tag: {
          label: (key: string) => $i18n?.t(`app.tags.${key}.label`),
          descriptipn: (key: string) => $i18n?.t(`app.tags.${key}.description`)
        }
      }
    }
  }
})