function removeLanguagePrefix(path: string) {
  // 使用正则表达式将语言标识部分（例如：/en/、/zh/）替换为空字符串
  return path.replace(/^\/[a-z]{2}\//, '/');
}

export default defineNuxtRouteMiddleware((to, from) => {
  const globalState = useGlobalState()
  const toRoot = (to.name?.valueOf() as string).split('-')[0]
  if (toRoot) {
    globalState.isOnToolPage = (toRoot === 'tools')
    globalState.currentTool = useConstant().getToolByPath(removeLanguagePrefix(to.path))
  }
})