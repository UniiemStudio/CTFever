<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useMessage } from '~/composables/uni/useMessage'
import { stringSignatureDetect } from '~/libs/misc/stringSignatureDetect'

const router = useRouter()
const message = useMessage()
const { t } = useI18n({
  useScope: 'local',
})
const localePath = useLocalePath()
const { $t_toolkit, $t_tool, $t_tag } = useNuxtApp()
const { addFavorite, removeFavorite, tags } = useConstant()
const { toolkits, favorites } = storeToRefs(useConstant())
const { metaSymbol } = useShortcuts()

const { isOnToolPage, currentPageTitle, currentTool } = storeToRefs(useGlobalState())

const isCurrentToolFavorite = computed(() => {
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
  // {
  //   key: 'category',
  //   label: t('component.commandPlatte.groups.category'),
  //   commands: flattedToolkits.value,
  // },
  {
    key: 'common',
    label: t('component.commandPlatte.groups.common'),
    commands: [
      {
        id: 'wizard',
        label: t('wizard'),
        click: () => {
          commandPlatteActive.value = false
          isCharsWizardOpen.value = true
        },
        icon: 'i-tabler-compass',
      },
    ],
  },
  {
    key: 'tag',
    label: t('component.commandPlatte.groups.tag'),
    commands: Object.keys(tags).map(tag => {
      return {
        id: tag,
        label: $t_tag(tag).label,
        route: localePath(`/tag/${ tag }`),
        icon: 'i-tabler-tag',
      }
    }),
  },
  {
    key: 'tool',
    label: t('component.commandPlatte.groups.tool'),
    commands: flattedTools.value,
  },
].filter(Boolean))

const isCharsWizardOpen = ref(false)
const inputWizard = debouncedRef('', 500)
const wizardSignatures = ref<StringSignature[]>([])
const relatedTools = computed(() => {
  return wizardSignatures.value.flatMap(signature => {
    return toolkits.value.flatMap(toolkit => toolkit.tools.filter(tool => tool.signatures?.includes(signature.signature)))
  })
})

watch(() => inputWizard.value, (val) => {
  if (val) {
    wizardSignatures.value = stringSignatureDetect(val)
  } else {
    wizardSignatures.value = []
  }
})

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

const handleFavorite = () => {
  if (isOnToolPage) {
    if (isCurrentToolFavorite.value) {
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
    default: false,
  },
})

defineShortcuts({
  ctrl_k: {
    usingInput: true,
    handler: () => {
      commandPlatteActive.value = !commandPlatteActive.value
    },
  },
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
            <AppLogo for="navbar"/>
            <Transition name="title" mode="out-in">
              <h1 :key="currentPageTitle" class="whitespace-nowrap">{{ currentPageTitle }}</h1>
            </Transition>
          </div>
        </NuxtLinkLocale>
        <div class="flex items-center space-x-4">
          <DevOnly>
            <UniButton size="medium"
                       @click="$colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark'">
              <Icon class="text-lg"
                    :name="$colorMode.preference === 'dark' ? 'line-md:sunny-outline-to-moon-alt-loop-transition' : 'line-md:moon-alt-to-sunny-outline-loop-transition'"/>
            </UniButton>
          </DevOnly>
          <button @click="commandPlatteActive = true" class="items-center space-x-2 px-2 py-1 border border-neutral-300 bg-neutral-50 text-neutral-500 dark:border-neutral-600 hover:border-neutral-500 dark:hover:border-neutral-500
                   transition dark:bg-neutral-800 text-xs rounded-lg cursor-pointer whitespace-nowrap hidden md:flex">
            <Icon name="tabler:search" class="text-base"/>
            <span>{{ t('search') }}</span>
            <span class="flex items-center gap-0.5">
              <UKbd>{{ metaSymbol }}</UKbd>
              <UKbd>K</UKbd>
            </span>
          </button>
          <button @click="commandPlatteActive = true" class="block md:hidden">
            <Icon name="tabler:search" class="text-lg inline -mt-1"/>
          </button>
          <a href="https://github.com/UniiemStudio/CTFever" target="_blank">
            <Icon name="simple-icons:github" class="text-lg inline -mt-1"/>
          </a>
          <nuxt-link :to="localePath('/settings')">
            <Icon name="tabler:settings-2" class="text-lg inline -mt-1"/>
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
            <Icon name="solar:square-alt-arrow-left-linear" class="text-lg"/>
            <span>{{ $t('component.topSubBar.back') }}</span>
          </nuxt-link>
        </div>
        <div class="flex items-center space-x-3">
          <button class="flex items-center" @click="handleFavorite">
            <Icon v-show="isCurrentToolFavorite" name="tabler:bookmark-filled" class="text-lg text-amber-500"/>
            <Icon v-show="!isCurrentToolFavorite" name="tabler:bookmark-plus" class="text-lg"/>
          </button>
          <button class="flex items-center" @click="sidebarActive = !sidebarActive">
            <Icon name="solar:hamburger-menu-linear" class="text-lg"/>
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
              <Icon :name="toolkit.icon" class="text-lg"/>
              <h1 class="text-sm font-medium">{{ $t_toolkit(toolkit.key).label }}</h1>
            </div>
            <div class="h-[1px] bg-neutral-300 dark:bg-neutral-700 w-full flex-1"></div>
          </div>
          <div class="flex flex-col gap-2">
            <AppToolCard v-for="(tool, k) in toolkit.tools" :key="k" :tool="tool" in-sidebar
                         :active="currentTool?.key === tool.key"/>
          </div>
        </div>
      </div>
    </div>
    <UModal v-model="commandPlatteActive">
      <UCommandPalette
        ref="commandPlatteRef"
        :placeholder="$t('component.commandPlatte.placeholder')"
        :empty-state="{
          icon: 'i-heroicons-magnifying-glass-20-solid',
          label: $t('component.commandPlatte.empty.label'),
          queryLabel: $t('component.commandPlatte.empty.queryLabel')
        }"
        :groups="commandPlatteGroups"
        :fuse="{
          fuseOptions: {
            includeMatches: true,
            keys: ['id', 'label', 'route'],
            threshold: 0.3,
          },
        }"
        @update:model-value="handleCommandSelect"
      />
    </UModal>
    <UModal v-model="isCharsWizardOpen">
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center space-x-2">
            <Icon name="tabler:gps" class="text-xl"/>
            <h1>{{ t('wizard') }}</h1>
          </div>
          <p class="text-xs mt-2 text-neutral-400">
            {{ t('wizardModal.tip') }}
            <a class="text-blue-400">{{ t('wizardModal.how_it_works') }}</a>
          </p>
        </template>
        <div class="flex flex-col gap-4">
          <UniTextArea v-model="inputWizard" :label="t('wizardModal.input_text')"
                       :placeholder="t('wizardModal.placeholder')"/>
          <Transition name="wizard-result" mode="out-in">
            <div v-if="!wizardSignatures.length && inputWizard"
                 class="w-full rounded-lg p-4 flex flex-col justify-center items-center gap-2 bg-neutral-100 dark:bg-neutral-700">
              <Icon name="twemoji:thinking-face" class="text-4xl"/>
              <h1 class="text-sm text-neutral-500 dark:text-neutral-300 font-bold">
                {{ t('wizardModal.no_signatures_detected') }}</h1>
            </div>
          </Transition>
          <Transition name="wizard-result" mode="out-in">
            <div v-if="wizardSignatures.length">
              <h1 class="block w-fit text-neutral-700 dark:text-neutral-300 text-sm font-bold">
                {{ t('wizardModal.contains_signatures') }}
              </h1>
              <ul class="mt-2 rounded-lg bg-neutral-100 dark:bg-slate-800 divide-y">
                <li v-for="(signature, k) in wizardSignatures" :key="k" class="px-4 py-2">
                  <div class="flex justify-between items-center">
                    <h1 class="font-bold dark:text-neutral-300">{{ signature.description }}</h1>
                    <p class="text-sm text-neutral-500">{{ signature.signature }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </Transition>
          <Transition name="wizard-result" mode="out-in">
            <div v-if="relatedTools.length">
              <h1 class="block w-fit text-neutral-700 dark:text-neutral-300 text-sm font-bold">
                {{ t('wizardModal.recommended_tools') }}
              </h1>
              <div class="mt-2 grid grid-cols-1 md:grid-cols-2" :class="{'!grid-cols-1': relatedTools.length === 1}">
                <AppToolCard
                  v-for="(t, k) in relatedTools"
                  :tool="t"
                  :key="k"
                  @click="() => {
                    inputWizard = ''
                    isCharsWizardOpen = false
                  }"
                />
              </div>
            </div>
          </Transition>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<!--suppress CssUnusedSymbol -->
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

.wizard-result-enter-active,
.wizard-result-leave-active {
  transition: all .3s ease;
}

.wizard-result-enter-from,
.wizard-result-leave-to {
  opacity: 0;
}
</style>

<i18n lang="yaml">
en:
  search: Search
  wizard: Chars wizard
  wizardModal:
    tip: When you have a string but don't know how to start, you can use this tool to get some suggestions
    how_it_works: How it works?
    input_text: Input or paste text
    placeholder: Any text that may have been encoded or encrypted
    contains_signatures: Contains the following signatures
    recommended_tools: Tools that may be used
    no_signatures_detected: No signatures detected
zh:
  search: 搜索
  wizard: 字符向导
  wizardModal:
    tip: 当你有一个字符串但不知道如何开始时，可以使用此工具获取一些建议
    how_it_works: 如何运作?
    input_text: 输入或粘贴文本
    placeholder: 任何可能被编码、加密过的文本
    contains_signatures: 包含下列特征
    recommended_tools: 可能用到的工具
    no_signatures_detected: 没有检测到特征
</i18n>