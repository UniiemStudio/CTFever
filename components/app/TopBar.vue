<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useMessage } from '~/composables/uni/useMessage';

const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const toolkits = useConstant().toolkits
const { metaSymbol } = useShortcuts()
const message = useMessage()

const i18nMeta = useI18nMeta()
const { currentPageTitle } = storeToRefs(useGlobalState())

const commandPlatteRef = ref()
const commandPlatteActive = ref(false)
const flattedToolkits = computed(() => toolkits.flatMap(toolkit => {
  return {
    id: toolkit.key,
    icon: toolkit.icon,
    label: i18nMeta.toolkit.label(toolkit.key),
  }
}))
const flattedTools = computed(() => toolkits.flatMap(toolkit => toolkit.tools.map(tool => {
  return {
    id: tool.route,
    label: i18nMeta.tool.label(tool.key),
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
    router.push(localePath(option.route))
  } else if (option.href) {
    window.open(option.href, '_blank')
  }
}

const count = ref(0)
const handleMessageCreate = () => {
  message.info('info ' + count.value++)
}

const props = defineProps({
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
    <nav class="relative h-16 z-20 px-4 overflow-hidden flex items-center border-b transition"
      :class="{ 'border-b': props.minibar, 'shadow-md border-transparent': !props.minibar }">
      <div class="flex items-center justify-between container mx-auto">
        <nuxt-link :to="localePath('/')">
          <div class="flex items-center space-x-2.5">
            <img src="/icon.svg" class="w-6 h-6" alt="CTFever Logo">
            <Transition name="title" mode="out-in">
              <h1 :key="currentPageTitle">{{ currentPageTitle }}</h1>
            </Transition>
          </div>
        </nuxt-link>
        <div class="flex items-center space-x-4">
          <UTooltip text="搜索" :shortcuts="[metaSymbol, 'K']">
            <button @click="commandPlatteActive = true">
              <Icon name="tabler:search" class="text-lg inline -mt-1" />
            </button>
          </UTooltip>
          <UButton @click="handleMessageCreate">Message!</UButton>
          <nuxt-link :to="localePath('/tools/ascii')">
            <Icon name="tabler:settings-2" class="text-lg inline -mt-1" />
          </nuxt-link>
          <nuxt-link :to="localePath('/settings')">
            <Icon name="tabler:settings-2" class="text-lg inline -mt-1" />
          </nuxt-link>
          <select v-model="$colorMode.preference">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="sepia">Sepia</option>
          </select>
        </div>
      </div>
    </nav>
    <div
      class="relative w-full z-10 px-4 overflow-hidden flex items-center transition-all ease-in-out duration-300 shadow-md"
      :class="{ 'h-0 opacity-0': !props.minibar, 'h-8 opacity-100': props.minibar }">
      <div class="flex items-center justify-between container mx-auto">
        subbar
      </div>
    </div>
    <UModal v-model="commandPlatteActive">
      <UCommandPalette ref="commandPlatteRef" placeholder="搜索工具、命令、设置..." :empty-state="{
        icon: 'i-heroicons-magnifying-glass-20-solid',
        label: '没有数据',
        queryLabel: `什么都找不到...`
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