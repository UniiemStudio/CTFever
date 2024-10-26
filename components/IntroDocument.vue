<script setup lang="ts">
const { t, locale } = useI18n({
  useScope: 'local',
})

const route = useRoute()
const getRouteBaseName = useRouteBaseName()
const routeBaseName = computed(() => getRouteBaseName(route))

const contentPath = computed(() => {
  return `/intro/${ routeBaseName.value?.replace('tools-', '') }.${ locale.value }`
})

const props = defineProps({
  references: {
    type: Object as PropType<{
      title: string
      url: string
    }[]>,
    required: false,
  },
})

const { data } = await useAsyncData(
  `introduction_${ contentPath.value }`,
  () => queryContent(contentPath.value).findOne(),
)
</script>

<template>
  <div
    v-if="(data && (data.body?.children.length || 0) > 0) || references"
    class="lg:mt-6 mt-4 p-4 rounded-lg border border-neutral-200 bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800"
  >
    <div v-if="contentPath && data">
      <BubbleTitle
        sm
        :title="t('intro')"
        icon="i-tabler-article"
      />
      <article
        class="prose prose-sm max-w-none reset-code overflow-x-auto dark:prose-p:text-neutral-300 dark:prose-headings:text-neutral-300 dark:prose-strong:text-neutral-300 dark:prose-table:text-neutral-300"
      >
        <ContentRenderer :value="data" />
      </article>
    </div>
    <div v-if="references && references.length > 0">
      <BubbleTitle
        sm
        :title="t('reference')"
        icon="i-tabler-external-link"
      />
      <div class="flex flex-col gap-1 mt-2 w-fit group">
        <div
          v-for="(reference, k) in references"
          :key="k"
          class="flex items-center gap-1 italic text-xs font-medium"
        >
          <a
            :href="reference.url"
            target="_blank"
            class="text-primary hover:underline group-hover:text-primary/60 hover:!text-primary transition"
          >
            {{ reference.title }}
          </a>
          <Icon name="i-tabler-link" class="text-primary"/>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  intro: Introduction
  reference: References

zh:
  intro: 说明
  reference: 参考资料
</i18n>