<script setup lang="ts">
defineProps(['label'])
</script>

<template>
  <div class="space-y-1.5">
    <p class="block w-fit text-neutral-700 dark:text-neutral-400 text-xs font-medium font-sans ml-0.5">
      {{ label }}
    </p>
    <slot/>
  </div>
</template>

<style scoped>

</style>