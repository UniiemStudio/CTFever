<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
})
</script>

<template>
  <div class="p-4 grid grid-cols-1 md:grid-cols-2">
    <div class="flex flex-col justify-center items-start">
      <span class="text-sm font-bold font-sans text-neutral-600 dark:text-neutral-300">{{ title }}</span>
      <span class="text-xs font-normal font-sans text-neutral-400 dark:text-neutral-500">{{ subtitle }}</span>
    </div>
    <div class="flex flex-row flex-wrap justify-start md:justify-end mt-2 md:mt-0 items-center gap-2">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
