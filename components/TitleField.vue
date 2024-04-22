<script setup lang="ts">
defineProps(['label'])
</script>

<template>
  <div class="space-y-1">
    <p class="block w-fit text-neutral-700 dark:text-neutral-300 text-sm font-bold font-sans ml-1">
      {{ label }}
    </p>
    <slot/>
  </div>
</template>

<style scoped>

</style>