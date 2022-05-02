<template>
  <button
    @click="click"
    class="shadow bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
    :class="{'bg-red-500 hover:bg-red-700': danger, 'hover:bg-blue-400': !danger, 'bg-gray-300 hover:bg-gray-300 dark:bg-slate-500 dark:hover:bg-slate-500 dark:text-slate-300': disable}"
    :disabled="disable">
    <slot/>
  </button>
</template>

<script>
export default {
  name: "PrimaryButton",
  props: {
    danger: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click() {
      this.$emit("click");
    }
  }
}
</script>

<style scoped>

</style>
