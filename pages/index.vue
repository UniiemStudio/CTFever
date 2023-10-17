<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const { toolkits } = storeToRefs(useConstant())
</script>

<template>
  <ToolContainer content-class="flex flex-col gap-8 container mx-auto p-4" full-size>
    <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <UAlert icon="i-tabler-link" title="启用新域名" class="bg-gradient-to-br from-purple-500 to-neutral-800 text-white">
        <template #description>
          <p class="text-xs text-white/80">CTFever 已经迁移到新的域名 c5r.app，旧的域名将会逐步重定向到新域名</p>
        </template>
      </UAlert>
      <UAlert icon="i-heroicons-command-line" title="欢迎使用 CTFever">
        <template #icon>
          asd
        </template>
        <template #description>
          你可以通过 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> 或者 <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> 打开指令面板
        </template>
      </UAlert>
    </div> -->
    <AppToolArea v-for="(toolkit, k) in toolkits" :key="k" :toolkit="toolkit" />
  </ToolContainer>
</template>

<style scoped></style>