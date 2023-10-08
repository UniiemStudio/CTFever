export const useI18nMeta = () => {
  const nuxtApp = useNuxtApp()
  const toolkit = {
    label: (key: string) => nuxtApp.$i18n.t(`app.toolkit.${key}.label`),
    descriptipn: (key: string) => nuxtApp.$i18n.t(`app.toolkit.${key}.description`)
  }
  const tool = {
    label: (key: string) => nuxtApp.$i18n.t(`app.tool.${key}.label`),
    descriptipn: (key: string) => nuxtApp.$i18n.t(`app.tool.${key}.description`)
  }
  const tag = {
    label: (key: string) => nuxtApp.$i18n.t(`app.tags.${key}.label`),
    descriptipn: (key: string) => nuxtApp.$i18n.t(`app.tags.${key}.description`)
  }

  return {
    toolkit,
    tool,
    tag
  }
}