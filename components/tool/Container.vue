<script lang="ts" setup>
defineProps({
  fullSize: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="w-full h-full" :class="{'px-4 py-4': !fullSize}">
    <div :class="{'container mx-auto': !fullSize}">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
