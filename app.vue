<script lang="ts" setup>
</script>

<template>
  <UniMessageProvider :max="5">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </UniMessageProvider>
</template>

<style>
::-webkit-scrollbar {
  /*滚动条整体*/
  width: 4px;
  height: 4px;
  border-radius: 5px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-neutral-800;
}

/* :hover::-webkit-scrollbar-track { ignored } */

::-webkit-scrollbar-thumb {
  /*滚动条里面的滑块*/
  border-radius: 10px;
  @apply bg-gray-300 dark:bg-neutral-700;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}

::-webkit-scrollbar-corner {
  border: none;
  background: transparent;
}

body {
  @apply dark:bg-neutral-950;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
</style>
