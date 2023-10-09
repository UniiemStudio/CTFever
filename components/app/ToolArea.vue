<script lang="ts" setup>
const {createI18nToolkitKey} = useI18nKey()

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
          {{ $t(createI18nToolkitKey(toolkit.key).label) }}
        </h1>
      </div>
      <span class="text-sm font-thin dark:text-neutral-400">
        {{ $t(createI18nToolkitKey(toolkit.key).description) }}
      </span>
    </div>
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <AppToolCard v-for="(tool, k) in toolkit.tools" :key="k" :tool="tool" />
    </div>
  </div>
</template>

<style scoped></style>
