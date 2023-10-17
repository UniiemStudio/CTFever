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
  <div class="w-full h-full" :class="{ 'container mx-auto': !fullSize}">
    <div :class="{ 'lg:w-8/12 lg:mx-auto lg:px-8 md:pt-6 p-4': !fullSize, [contentClass]: contentClass }">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
