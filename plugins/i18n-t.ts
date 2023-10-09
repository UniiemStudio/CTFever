export default defineNuxtPlugin(() => {
  const { $i18n } = useNuxtApp()
  return {
    provide: {
      t_toolkit: (key: string) => {
        return {
          label: $i18n.t(`app.toolkit.${key}.label`),
          description: $i18n.t(`app.toolkit.${key}.description`),
        }
      },
      t_tool: (key: string) => {
        return {
          label: $i18n.t(`app.tool.${key}.label`),
          description: $i18n.t(`app.tool.${key}.description`),
        }
      },
      t_tag: (key: string) => {
        return {
          label: $i18n.t(`app.tags.${key}.label`),
          description: $i18n.t(`app.tags.${key}.description`),
        }
      },
    }
  }
})