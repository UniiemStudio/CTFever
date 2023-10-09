export const useI18nMeta = (nuxtApp: { $i18n: { t: (arg0: string) => any } }) => {
  return () => {
    const nuxtAppC = nuxtApp
    const toolkit = {
      label: (key: string) => nuxtAppC?.$i18n.t(`app.toolkit.${key}.label`),
      descriptipn: (key: string) => nuxtAppC?.$i18n?.t(`app.toolkit.${key}.description`)
    }
    const tool = {
      label: (key: string) => nuxtAppC?.$i18n.t(`app.tool.${key}.label`),
      descriptipn: (key: string) => nuxtAppC?.$i18n?.t(`app.tool.${key}.description`)
    }
    const tag = {
      label: (key: string) => nuxtAppC?.$i18n.t(`app.tags.${key}.label`),
      descriptipn: (key: string) => nuxtAppC?.$i18n?.t(`app.tags.${key}.description`)
    }
    // return {
    //   toolkit,
    //   tool,
    //   tag
    // }
  }

  // return {
  //   toolkit,
  //   tool,
  //   tag
  // }
}