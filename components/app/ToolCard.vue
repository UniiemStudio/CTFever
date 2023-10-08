<script lang="ts" setup>
const i18nMeta = useI18nMeta()

defineProps({
  tool: {
    type: Object as PropType<Tool>,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col justify-between border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-700 shadow-sm dark:shadow-neutral-900 rounded-lg overflow-hidden">
    <nuxt-link :to="tool.route" class="p-2 space-y-1">
      <h1 class="text-base dark:text-neutral-200">{{ i18nMeta.tool.label(tool.key) }}</h1>
      <p class="text-xs dark:text-neutral-400 md:truncate">{{ i18nMeta.tool.descriptipn(tool.key) }}</p>
    </nuxt-link>
    <div class="px-2 py-1 bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-400 flex items-center justify-between text-xs">
      <div>
        <div class="flex items-center gap-1">
          <Icon name="tabler:tag" class="text-sm" />
          <nuxt-link v-for="(tag, k) in tool.tags" :key="k" to="/">
            {{ i18nMeta.tag.label(tag.key) }}
          </nuxt-link>
        </div>
      </div>
      <div class="flex items-center">
        <div class="flex items-center rounded space-x-1 px-1 py-0.5">
          <Icon name="solar:confetti-line-duotone" class="text-sm" />
          <span class="text-xs">NEW</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
