<script lang="ts" setup>
defineProps({
  fullSize: {
    type: Boolean,
    default: false
  },
  contentClass: {
    type: String,
    default: ''
  },
  gapped: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="w-full h-full container mx-auto">
    <div
      :class="{ 'lg:w-8/12 lg:mx-auto lg:px-8 md:pt-6 p-4': !fullSize, [contentClass]: contentClass, 'flex flex-col gap-4': gapped }">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
