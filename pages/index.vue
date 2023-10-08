<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const i18nMeta = useI18nMeta()
const { toolkits } = storeToRefs(useConstant())

onMounted(() => {
  useGlobalState().currentPageTitle = 'CTFever'
})
</script>

<template>
  <ToolContainer content-class="flex flex-col gap-8">
    <AppToolArea v-for="(toolkit, k) in toolkits" :key="k" :toolkit="toolkit" />
  </ToolContainer>
</template>

<style scoped></style>