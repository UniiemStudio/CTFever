<script setup lang="ts">
import BubbleTitle from '~/components/BubbleTitle.vue'
import { storeToRefs } from 'pinia'

const { params } = useRoute()
const { toolkits } = storeToRefs(useConstant())
const tools = toolkits.value.flatMap(toolkit => toolkit.tools)
const taggedTools = tools.filter(tool => tool.tags.some(tag => tag.key === params.tag.toString()))
const { $t_tag } = useNuxtApp()
const { t } = useI18n({
  useScope: 'local',
})

useSeoMeta({
  title: t('title', { tag: $t_tag(params.tag.toString()).label }),
})
</script>

<template>
  <ToolContainer content-class="flex flex-col gap-8 container mx-auto p-4" full-size>
    <BubbleTitle
      icon="i-tabler-tag"
      :title="t('title', { tag: $t_tag(params.tag.toString()).label })"
      :subtitle="$t_tag(params.tag.toString()).description"
    />
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      <AppToolCard v-for="(tool, k) in taggedTools" :key="tool.key" :tool="tool"/>
    </div>
  </ToolContainer>
</template>

<style scoped>

</style>

<i18n>
en:
  title: "Tag - {tag}"

zh:
  title: "标签 - {tag}"
</i18n>
