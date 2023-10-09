<script lang="ts" setup>
defineProps({
  fullSize: {
    type: Boolean,
    default: false
  },
  contentClass: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="w-full h-full" :class="{ 'px-4 py-4': !fullSize }">
    <div :class="{ 'container mx-auto': !fullSize, [contentClass]: contentClass }">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
