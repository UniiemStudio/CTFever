export const useI18nKey = () => {
  return {
    createI18nToolkitKey: (key: string) => {
      return {
        label: `app.toolkit.${key}.label`,
        description: `app.toolkit.${key}.description`,
      }
    },
    createI18nToolKey: (key: string) => {
      return {
        label: `app.tool.${key}.label`,
        description: `app.tool.${key}.description`,
      }
    },
    createI18nTagKey: (key: string) => {
      return {
        label: `app.tags.${key}.label`,
        description: `app.tags.${key}.description`,
      }
    },
  }
}