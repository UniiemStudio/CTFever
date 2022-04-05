<template>
  <div>
    <h1 v-if="label" class="text-gray-700 text-sm font-bold mb-2">{{ label }}</h1>
    <pre class="bg-gray-200 rounded-lg p-4 text-gray-700"><slot/></pre>
  </div>
</template>

<script>
export default {
  name: "PrimaryPreBlock",
  props: {
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
