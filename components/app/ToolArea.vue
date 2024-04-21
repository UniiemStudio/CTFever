<script lang="ts" setup>
// noinspection TypeScriptUnresolvedReference
defineProps({
  toolkit: {
    type: Object as PropType<Toolkit>,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col space-y-4">
    <BubbleTitle
      :title="$t_toolkit(toolkit.key).label"
      :subtitle="$t_toolkit(toolkit.key).description"
      :icon="toolkit.icon"
    />
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
      <AppToolCard v-for="(tool, k) in toolkit.tools" :key="tool.key" :tool="tool"/>
    </div>
  </div>
</template>

<style scoped></style>
