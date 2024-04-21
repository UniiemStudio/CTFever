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
  <!--  <div class="flex flex-col space-y-4">-->
  <div class="flex flex-col space-y-4">
    <div class="relative">
      <div class="absolute -left-1 top-2 w-4 h-4 rounded-full bg-primary/30 dark:bg-primary/60 z-[0]"></div>
      <h1 class="text-xl font-bold text-black/70 dark:text-white/80 drop-shadow leading-none relative z-[1] inline-flex items-center gap-1">
        <span>{{ $t_toolkit(toolkit.key).label }}</span>
        <Icon :name="toolkit.icon" class="inline leading-none"/>
      </h1>
      <h1 class="text-sm font-bold text-black/30 dark:text-white/40 italic leading-none">{{ $t_toolkit(toolkit.key).description }}</h1>
    </div>
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
      <AppToolCard v-for="(tool, k) in toolkit.tools" :key="k" :tool="tool"/>
    </div>
  </div>
</template>

<style scoped></style>
