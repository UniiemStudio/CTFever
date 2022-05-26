<template>
  <div>
    <h1 v-if="label" class="text-gray-700 text-sm font-bold font-['Nunito'] mb-2 dark:text-slate-300">{{ label }}</h1>
    <pre class="bg-gray-200 rounded-lg p-4 text-gray-700 whitespace-normal break-all font-mono
                dark:bg-slate-800 dark:text-slate-300 dark:border dark:border-slate-600"><slot/></pre>
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
