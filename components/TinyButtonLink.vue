<template>
  <button
    @click="clk ? clk() : $router.push(localePath(to))"
    class="border rounded px-2 py-px hover:shadow transition-shadow text-sm font-bold text-center select-none focus:ring-0 md:focus:ring-2"
    :class="{
      'border-blue-500 shadow-blue-500 bg-blue-500 text-white hover:text-white': accent,
      'border-gray-300 hover:text-inherit': !accent
    }"
  >
    <span><slot v-if="!text"/>{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: "TinyButtonLink",
  props: {
    to: {
      type: String,
      required: false
    },
    clk: {
      type: Function,
      required: false
    },
    text: {
      type: String,
      required: false
    },
    accent: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style scoped>

</style>
