<template>
  <div @click="$router.push(localePath(tool.route))"
       class="rounded-lg border border-gray-200 shadow hover:shadow-md transition-all p-4 cursor-pointer"
  >
    <h1 class="text-lg">{{ $t(tool.title) || tool.title }}</h1>
    <p>{{ $t(tool.description) || tool.description }}</p>
  </div>
</template>

<script>
export default {
  name: "Tool",
  props: {
    tool: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>

</style>
