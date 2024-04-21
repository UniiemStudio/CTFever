<script lang="ts" setup>
import { storeToRefs } from 'pinia';
const { metaSymbol } = useShortcuts()

const { toolkits } = storeToRefs(useConstant())
</script>

<template>
  <ToolContainer content-class="flex flex-col gap-8 container mx-auto p-4" full-size>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <UAlert icon="i-tabler-tools" title="欢迎使用 CTFever">
        <template #description>
          你可以通过 <UKbd>{{ metaSymbol }}</UKbd> + <UKbd>K</UKbd> 打开指令面板
        </template>
      </UAlert>
      <UAlert icon="i-tabler-link" title="启用新域名" class="bg-gradient-to-br from-purple-700 to-blue-800 text-white">
        <template #description>
          <p class="text-xs text-white/80">CTFever 已经迁移到新的域名 c5r.app，旧的域名将会逐步重定向到新域名</p>
        </template>
      </UAlert>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <AppToolArea v-for="(toolkit, k) in toolkits" :key="k" :toolkit="toolkit" />
    </div>
  </ToolContainer>
</template>

<style scoped></style>