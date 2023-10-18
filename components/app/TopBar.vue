<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useMessage } from '~/composables/uni/useMessage';

const route = useRoute()
const router = useRouter()
const message = useMessage()
const { availableLocales, locale } = useI18n()
const { t } = useI18n({
  useScope: 'local'
})
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { $t_toolkit, $t_tool } = useNuxtApp()
const { addFavorite, removeFavorite } = useConstant()
const { toolkits, favorites } = storeToRefs(useConstant())
// const tools = toolkits.value.flatMap(toolkit => toolkit.tools)
const { metaSymbol } = useShortcuts()

const { isOnToolPage, currentPageTitle, currentTool } = storeToRefs(useGlobalState())

const isCurrentToolFavorited = computed(() => {
  return !!favorites.value.find(t => t.key === currentTool.value?.key)
})

const sidebarActive = ref(false)
const commandPlatteRef = ref()
const commandPlatteActive = ref(false)
const flattedToolkits = computed(() => toolkits.value.flatMap(toolkit => {
  return {
    id: toolkit.key,
    icon: toolkit.icon,
    label: $t_toolkit(toolkit.key).label,
  }
}))
const flattedTools = computed(() => toolkits.value.flatMap(toolkit => toolkit.tools.map(tool => {
  return {
    id: tool.route,
    label: $t_tool(tool.key).label,
    route: tool.route,
    icon: 'i-solar-square-arrow-right-up-bold-duotone',
  }
})))
const commandPlatteGroups = computed(() => [
  { key: 'category', label: t('component.commandPlatte.groups.category'), commands: flattedToolkits.value },
  { key: 'tool', label: t('component.commandPlatte.groups.tool'), commands: flattedTools.value },
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

const handleFavorite = () => {
  if (isOnToolPage) {
    if (isCurrentToolFavorited.value) {
      removeFavorite(currentTool.value?.key as string)
      message.success(t('component.topSubBar.favorite.removed'))
    } else {
      addFavorite(currentTool.value as Tool)
      message.success(t('component.topSubBar.favorite.success'))
    }
  }
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
  <div class="sticky top-0 left-0 right-0 h-fit z-50">
    <nav
      class="relative h-16 z-20 px-4 overflow-hidden flex items-center transition border-b bg-white/90 dark:bg-neutral-800/90 backdrop-blur-lg backdrop-saturate-50"
      :class="{ 'border-b dark:border-neutral-700': minibar, 'shadow-md border-transparent': !minibar }">
      <div class="flex items-center justify-between container mx-auto">
        <NuxtLinkLocale to="/">
          <div class="flex items-center space-x-2.5">
            <img src="/icon.svg" class="w-6 h-6" alt="CTFever Logo">
            <Transition name="title" mode="out-in">
              <h1 :key="currentPageTitle" class="whitespace-nowrap">{{ currentPageTitle }}</h1>
            </Transition>
          </div>
        </NuxtLinkLocale>
        <div class="flex items-center space-x-4">
          <select v-model="$colorMode.preference">
            <option value="system">系统</option>
            <option value="light">亮色</option>
            <option value="dark">暗色</option>
          </select>
          <select @change="handleLocaleSelect" :value="locale">
            <option v-for="(locale, k) in availableLocales" :key="k" :value="locale">
              {{ locale }}
            </option>
          </select>
          <button @click="commandPlatteActive = true" class="items-center space-x-2 px-2 py-1 border border-neutral-300 bg-neutral-50 text-neutral-500 dark:border-neutral-600 hover:border-neutral-500 dark:hover:border-neutral-500
                   transition dark:bg-neutral-800 text-xs rounded-lg cursor-pointer whitespace-nowrap hidden md:flex">
            <Icon name="tabler:search" class="text-base" />
            <span>{{ t('search') }}</span>
            <div class="flex items-center gap-0.5">
              <UKbd>{{ metaSymbol }}</UKbd>
              <UKbd>K</UKbd>
            </div>
          </button>
          <button @click="commandPlatteActive = true" class="block md:hidden">
            <Icon name="tabler:search" class="text-lg inline -mt-1" />
          </button>
          <a href="https://github.com/UniiemStudio/CTFever" target="_blank">
            <Icon name="simple-icons:github" class="text-lg inline -mt-1" />
          </a>
          <nuxt-link :to="localePath('/settings')">
            <Icon name="tabler:settings-2" class="text-lg inline -mt-1" />
          </nuxt-link>
        </div>
      </div>
    </nav>
    <div
      class="relative w-full z-10 px-4 overflow-hidden flex items-center transition-all ease-in-out duration-300 shadow-md border-transparent border-b bg-white/90 dark:bg-neutral-800/90 backdrop-blur-lg backdrop-saturate-50"
      :class="{ 'h-0 opacity-0': !minibar, 'h-8 opacity-100 dark:border-neutral-700': minibar }">
      <div class="flex items-center justify-between container mx-auto">
        <div class="flex items-center">
          <nuxt-link :to="localePath('/')" class="flex items-center space-x-1 text-sm">
            <Icon name="solar:square-alt-arrow-left-linear" class="text-lg" />
            <span>{{ $t('component.topSubBar.back') }}</span>
          </nuxt-link>
        </div>
        <div class="flex items-center space-x-3">
          <button class="flex items-center" @click="handleFavorite">
            <Icon v-show="isCurrentToolFavorited" name="tabler:bookmark-filled" class="text-lg text-amber-500" />
            <Icon v-show="!isCurrentToolFavorited" name="tabler:bookmark-plus" class="text-lg" />
          </button>
          <button class="flex items-center" @click="sidebarActive = !sidebarActive">
            <Icon name="solar:hamburger-menu-linear" class="text-lg" />
          </button>
        </div>
      </div>
    </div>
    <!-- Sidebar -->
    <div class="fixed top-24 left-0 md:left-auto right-0 bottom-0 md:bg-gradient-to-l from-gray-100 dark:from-neutral-900 to-transparent translate-x-[120%] transition ease-out
                p-0 md:p-4 overflow-hidden" :class="{ '!translate-x-0': sidebarActive && isOnToolPage }">
      <div
        class="w-full md:w-64 h-full p-2 md:border rounded-none md:rounded-xl shadow-md bg-white dark:bg-neutral-800 dark:border-neutral-700 overflow-y-auto">
        <div v-for="(toolkit, k) in toolkits" :key="k" class="mt-6 first-of-type:mt-0">
          <div class="mb-2 flex items-center">
            <div class="flex items-center space-x-1 mr-2">
              <Icon :name="toolkit.icon" class="text-lg" />
              <h1 class="text-sm font-medium">{{ $t_toolkit(toolkit.key).label }}</h1>
            </div>
            <div class="h-[1px] bg-neutral-300 dark:bg-neutral-700 w-full flex-1"></div>
          </div>
          <div class="flex flex-col gap-2">
            <AppToolCard v-for="(tool, k) in toolkit.tools" :key="k" :tool="tool" in-sidebar
              :active="currentTool?.key === tool.key" />
          </div>
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

.favorite-enter-active,
.favorite-leave-active {
  transition: all .3s ease;
}

.favorite-leave-active {
  position: absolute;
}

.favorite-enter-from,
.favorite-leave-to {
  opacity: 0;
}
</style>

<i18n lang="yaml">
en:
  search: Search

zh:
  search: 搜索
</i18n>