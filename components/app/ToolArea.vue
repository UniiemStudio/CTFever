<script lang="ts" setup>
const {$i18nMeta} = useNuxtApp()

defineProps({
  toolkit: {
    type: Object as PropType<Toolkit>,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-col space-y-4">
    <div>
      <div class="flex items-center gap-2">
        <Icon name="solar:code-line-duotone" class="text-2xl" />
        <h1 class="text-lg font-bold text-black/80 dark:text-neutral-200">
          {{ $i18nMeta.toolkit.label(toolkit.key) }}
        </h1>
      </div>
      <span class="text-sm font-thin dark:text-neutral-400">
        {{ $i18nMeta.toolkit.descriptipn(toolkit.key) }}
      </span>
    </div>
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <AppToolCard v-for="(tool, k) in toolkit.tools" :key="k" :tool="tool" />
    </div>
  </div>
</template>

<style scoped></style>
