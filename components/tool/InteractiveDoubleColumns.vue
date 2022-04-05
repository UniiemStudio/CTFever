<template>
  <div class="flex flex-wrap -mx-3 mb-4">
    <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
      <slot name="left"></slot>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "InteractiveDoubleColumns"
}
</script>

<style scoped>

</style>
