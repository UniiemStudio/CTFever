<script lang="ts" setup>
import { storeToRefs } from "pinia";
import TopBar from "~/components/app/TopBar.vue";

const route = useRoute()
const localeRoute = useLocaleRoute()
const {locale, t} = useI18n()
const toolkits = useConstant().toolkits
const tools = toolkits.flatMap(toolkit => toolkit.tools)
const { isOnToolPage } = storeToRefs(useGlobalState())
const { currentPageTitle } = storeToRefs(useGlobalState())
const { $t_tool } = useNuxtApp()

const titleMap: {
  [key: string]: string
} = {
  '/': '',
  '/settings': '设置',
}

function removeLanguagePrefix(path: string) {
  // 使用正则表达式将语言标识部分（例如：/en/、/zh/）替换为空字符串
  return path.replace(/^\/[a-z]{2}\//, '/');
}

const handleTitleUpdate = (path: string) => {
  const matched_tool = tools.find(tool => tool.route === removeLanguagePrefix(path))
  if (matched_tool) {
    currentPageTitle.value = $t_tool(matched_tool.key).label
    useHead({
      title: t('app.titleTemplate', { title: $t_tool(matched_tool.key).label }),
      meta: [
        { hid: 'description', name: 'description', content: $t_tool(matched_tool.key).description }
      ]
    })
  } else {
    currentPageTitle.value = titleMap[removeLanguagePrefix(path)] || ''
    useHead({
      title: t('app.title')
    })
  }
}

watch(() => route.path, handleTitleUpdate)

onMounted(() => {
  handleTitleUpdate(route.path)
})
</script>

<template>
  <div class="flex flex-col min-h-screen antialiased">
    <TopBar :minibar="isOnToolPage" />
    <div class="flex-1 h-full">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>