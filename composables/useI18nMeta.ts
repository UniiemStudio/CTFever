export const useI18nMeta = () => {
  const nuxtApp = useNuxtApp()
  const i18n = computed(() => nuxtApp.$i18n)
  const toolkit = {
    label: (key: string) => i18n.value.t(`app.toolkit.${key}.label`),
    descriptipn: (key: string) => i18n.value.t(`app.toolkit.${key}.description`)
  }
  const tool = {
    label: (key: string) => i18n.value.t(`app.tool.${key}.label`),
    descriptipn: (key: string) => i18n.value.t(`app.tool.${key}.description`)
  }
  const tag = {
    label: (key: string) => i18n.value.t(`app.tags.${key}.label`),
    descriptipn: (key: string) => i18n.value.t(`app.tags.${key}.description`)
  }

  return {
    toolkit,
    tool,
    tag
  }
}