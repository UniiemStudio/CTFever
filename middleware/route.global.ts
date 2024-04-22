function removeLanguagePrefix(path: string) {
  return path.replace(/^\/[a-z]{2}\//, '/')
}

export default defineNuxtRouteMiddleware((to, from) => {
  const globalState = useGlobalState()
  if (to.name) {
    const toRoot = (to.name?.valueOf() as string).split('-')[0]
    if (toRoot) {
      globalState.isOnToolPage = (toRoot === 'tools')
      globalState.currentTool = useConstant().getToolByPath(removeLanguagePrefix(to.path))
    }
  }
})