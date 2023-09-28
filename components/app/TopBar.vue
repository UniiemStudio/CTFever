<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const toolkits = useConstant().toolkits

const commandPlatteRef = ref()
const commandPlatteActive = ref(false)
const flattedToolkits = computed(() => toolkits.flatMap(toolkit => {
  return {
    id: toolkit.title,
    icon: toolkit.icon,
    label: toolkit.title,
  }
}))
const flattedTools = computed(() => toolkits.flatMap(toolkit => toolkit.tools.map(tool => {
  return {
    id: tool.route,
    label: tool.label,
    route: tool.route,
    icon: 'i-tabler-tools',
  }
})))
const commandPlatteGroups = computed(() => [
  {key: 'category', label: '分类', commands: flattedToolkits.value},
  {key: 'tool', label: '工具', commands: flattedTools.value},
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
    <nav class="relative h-16 z-20 px-4 overflow-hidden flex items-center border-b transition"
         :class="{'border-b': minibar, 'shadow-md border-transparent': !minibar}">
      <div class="flex items-center justify-between container mx-auto">
        <nuxt-link :to="localePath('/')">
          <div class="flex items-center space-x-2.5">
            <img src="/icon.svg" class="w-6 h-6" alt="CTFever Logo">
            <h1>CTFever</h1>
          </div>
        </nuxt-link>
        <div class="flex items-center space-x-4">
          <UTooltip text="搜索" :shortcuts="['Ctrl', 'K']">
            <button @click="commandPlatteActive = true">
              <Icon name="tabler:search" class="text-lg inline -mt-1"/>
            </button>
          </UTooltip>
          <UButton color="white" @click="minibar = !minibar">minibar</UButton>
          <nuxt-link :to="localePath('/settings')">
            <Icon name="tabler:settings-2" class="text-lg inline -mt-1"/>
          </nuxt-link>
        </div>
      </div>
    </nav>
    <div
        class="relative w-full z-10 px-4 overflow-hidden flex items-center transition-all ease-in-out duration-300 shadow-md"
        :class="{'h-0 opacity-0': !minibar, 'h-8 opacity-100': minibar}">
      <div class="flex items-center justify-between container mx-auto">
        subbar
      </div>
    </div>
    <UModal v-model="commandPlatteActive">
      <UCommandPalette
          ref="commandPlatteRef"
          placeholder="搜索工具、命令、设置..."
          :empty-state="{
            icon: 'i-heroicons-magnifying-glass-20-solid',
            label: '没有数据',
            queryLabel: `什么都找不到...`
          }"
          :groups="commandPlatteGroups"
          @update:model-value="handleCommandSelect"
      />
    </UModal>
  </div>
</template>

<style scoped>

</style>