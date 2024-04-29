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

useSeoMeta({
  viewport() {
    return 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
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
