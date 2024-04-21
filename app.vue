<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const route = useRoute()
const routeBaseName = useRouteBaseName()
const { currentPageTitle } = storeToRefs(useGlobalState())

useHead({
  titleTemplate(title) {
    currentPageTitle.value = title || 'CTFever'
    return title
      ? `${ title } ${ routeBaseName(route)?.startsWith('tool') ? '-' : '::' } CTFever`
      : 'CTFever'
  },
})
</script>

<template>
  <UniMessageProvider :max="5">
    <NuxtLayout>
      <NuxtLoadingIndicator/>
      <NuxtPage/>
    </NuxtLayout>
  </UniMessageProvider>
</template>
