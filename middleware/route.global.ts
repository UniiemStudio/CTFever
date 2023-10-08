export default defineNuxtRouteMiddleware((to, from) => {
  const globalState = useGlobalState()
  const toRoot = (to.name?.valueOf() as string).split('-')[0]
  if (toRoot) {
    globalState.isOnToolPage = (toRoot === 'tools')
  }
})