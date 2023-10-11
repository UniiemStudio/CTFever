<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const route = useRoute()
const router = useRouter()
const { availableLocales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { $t_toolkit, $t_tool } = useNuxtApp()
const toolkits = useConstant().toolkits
const tools = toolkits.flatMap(toolkit => toolkit.tools)
const { metaSymbol } = useShortcuts()

const { currentPageTitle } = storeToRefs(useGlobalState())

const commandPlatteRef = ref()
const commandPlatteActive = ref(false)
const flattedToolkits = computed(() => toolkits.flatMap(toolkit => {
  return {
    id: toolkit.key,
    icon: toolkit.icon,
    label: $t_toolkit(toolkit.key).label,
  }
}))
const flattedTools = computed(() => toolkits.flatMap(toolkit => toolkit.tools.map(tool => {
  return {
    id: tool.route,
    label: $t_tool(tool.key).label,
    route: tool.route,
    icon: 'i-solar-square-arrow-right-up-bold-duotone',
  }
})))
const commandPlatteGroups = computed(() => [
  { key: 'category', label: '分类', commands: flattedToolkits.value },
  { key: 'tool', label: '工具', commands: flattedTools.value },
].filter(Boolean))

const handleCommandSelect = (option: any) => {
  if (option.click) {
    option.click()
  } else if (option.route) {
    commandPlatteActive.value = false
    router.push(localePath(option.route))
  } else if (option.href) {
    window.open(option.href, '_blank')
  }
}

const handleLocaleSelect = (e: Event | any) => {
  router.push(switchLocalePath(e?.target?.value))
}

defineProps({
  minibar: {
    type: Boolean,
    default: false
  }
})

defineShortcuts({
  ctrl_k: {
    usingInput: true,
    handler: () => {
      commandPlatteActive.value = !commandPlatteActive.value
    }
  }
})
</script>

<template>
  <div class="sticky top-0 left-0 right-0 h-fit">
    <nav class="relative h-16 z-20 px-4 overflow-hidden flex items-center transition border-b"
      :class="{ 'border-b dark:border-neutral-800': minibar, 'shadow-md border-transparent': !minibar }">
      <div class="flex items-center justify-between container mx-auto">
        <NuxtLinkLocale to="/">
          <div class="flex items-center space-x-2.5">
            <img src="/icon.svg" class="w-6 h-6" alt="CTFever Logo">
            <Transition name="title" mode="out-in">
              <h1 :key="currentPageTitle">{{ currentPageTitle }}</h1>
            </Transition>
          </div>
        </NuxtLinkLocale>
        <div class="flex items-center space-x-4">
          <select v-model="$colorMode.preference">
            <option value="system">跟随系统</option>
            <option value="light">亮色</option>
            <option value="dark">暗色</option>
            <option value="sepia">褐色</option>
          </select>
          <select @change="handleLocaleSelect">
            <option v-for="(locale, k) in availableLocales" :key="k" :value="locale">
              {{ locale }}
            </option>
          </select>
          <button @click="commandPlatteActive = true"
            class="flex items-center space-x-2 px-2 py-1 border border-neutral-300 bg-neutral-50 text-neutral-500 dark:border-neutral-600 hover:border-neutral-500 dark:hover:border-neutral-500 transition dark:bg-neutral-800 text-xs rounded-lg cursor-pointer">
            <Icon name="tabler:search" class="text-base" />
            <span>搜索</span>
            <div class="flex items-center gap-0.5">
              <UKbd>{{ metaSymbol }}</UKbd>
              <UKbd>K</UKbd>
            </div>
          </button>
          <nuxt-link :to="localePath('/settings')">
            <Icon name="tabler:settings-2" class="text-lg inline -mt-1" />
          </nuxt-link>
        </div>
      </div>
    </nav>
    <div
      class="relative w-full z-10 px-4 overflow-hidden flex items-center transition-all ease-in-out duration-300 shadow-md border-transparent border-b"
      :class="{ 'h-0 opacity-0': !minibar, 'h-8 opacity-100 dark:border-neutral-800': minibar }">
      <div class="flex items-center justify-between container mx-auto">
        <div class="flex items-center">
          <nuxt-link to="/" class="flex items-center space-x-1 text-sm">
            <Icon name="solar:square-alt-arrow-left-linear" class="text-lg" />
            <span>返回</span>
          </nuxt-link>
        </div>
        <div class="flex items-center space-x-3">
          <button class="flex items-center">
            <Icon name="tabler:bookmark-plus" class="text-lg" />
          </button>
          <button class="flex items-center">
            <Icon name="solar:hamburger-menu-linear" class="text-lg" />
          </button>
        </div>
      </div>
    </div>
    <UModal v-model="commandPlatteActive">
      <UCommandPalette ref="commandPlatteRef" :placeholder="$t('component.commandPlatte.placeholder')" :empty-state="{
        icon: 'i-heroicons-magnifying-glass-20-solid',
        label: $t('component.commandPlatte.empty.label'),
        queryLabel: $t('component.commandPlatte.empty.queryLabel')
      }" :groups="commandPlatteGroups" @update:model-value="handleCommandSelect" />
    </UModal>
  </div>
</template>

<style scoped>
.title-move,
.title-enter-active,
.title-leave-active {
  transition: all .3s ease;
}

.title-enter-from {
  opacity: 0;
  transform: translateX(-5px);
}

.title-leave-to {
  opacity: 0;
  transform: translateX(5px);
}
</style>