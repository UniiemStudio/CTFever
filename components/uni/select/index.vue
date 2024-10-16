<script lang="ts" setup>
const emit = defineEmits(['input', 'change', 'update:modelValue'])
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    required: false
  },
  items: {
    type: Array as PropType<SelectItem[]>,
    required: true
  },
  justify: {
    type: String as PropType<'start' | 'end'>,
    required: false,
    default: 'end'
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})

const selectWrapperRef = ref()
const selectRef = ref()
const optionsRef = ref()

const hasAnyIcon = computed(() => props.items.some(item => item.icon))
const selectedItem = computed(() => props.items.find(item => item.value === props.modelValue) as SelectItem)
const optionsExpanded = ref(false)
const selectedIconFlag = ref(true)

const handleSelectClick = () => {
  optionsExpanded.value = !optionsExpanded.value
}
const handleOptionSelect = (option: SelectItem) => {
  emit('input', option.value)
  emit('change', option.value)
  emit('update:modelValue', option.value)
  selectedIconFlag.value = false;
  nextTick(() => {
    selectedIconFlag.value = true;
  });
}

onMounted(() => {
  selectRef.value.ownerDocument.addEventListener('click', (e: { target: any; }) => {
    if (optionsExpanded && !selectRef?.value?.contains(e.target)) {
      optionsExpanded.value = false
    }
  })
})
</script>

<template>
  <div class="flex flex-col space-y-1"
    :class="{ 'justify-start': justify === 'start', 'justify-end': justify === 'end' }">
    <p class="block w-fit text-neutral-700 dark:text-neutral-300 text-sm font-bold font-sans" v-if="label">
      {{ label }}
    </p>
    <div class="relative" ref="selectWrapperRef">
      <button class="relative w-full flex items-center gap-2.5 p-2 pr-6 rounded-md overflow-hidden border transition bg-white dark:bg-neutral-800
                   border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-700
                     focus:ring-4 focus:ring-opacity-50 focus:ring-neutral-200 dark:focus:ring-neutral-800 shadow-sm"
        :class="{ 'cursor-not-allowed bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600': disabled }" ref="selectRef" type="button" @click="handleSelectClick" :disabled="disabled">
        <span v-if="selectedItem?.icon && !selectedIconFlag && hasAnyIcon"
          class="inline-block w-5 h-5 pointer-events-none"></span>
        <UIcon v-else-if="selectedItem?.icon && selectedIconFlag && hasAnyIcon" :name="selectedItem?.icon"
          class="inline-block w-5 h-5 pointer-events-none" />
        <Transition name="select-item" mode="out-in">
          <span class="leading-snug whitespace-nowrap text-sm" :key="selectedItem?.value">{{
            selectedItem?.label || selectedItem?.value || 'Select an option'
          }}</span>
        </Transition>
        <UIcon name="tabler:dots-vertical"
          class="absolute bg-neutral-50 text-gray-500 dark:bg-neutral-700/50 dark:text-neutral-500 inset-y-0 right-0 h-full" />
      </button>
      <div class="absolute top-full mt-2 right-0 w-fit rounded-md border overflow-hidden transition shadow-lg opacity-0 pointer-events-none
                bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-800 z-50"
        :class="{ 'opacity-100 pointer-events-auto': optionsExpanded, '-translate-y-4': !optionsExpanded }"
        ref="optionsRef">
        <div class="flex items-center gap-2.5 px-2 py-2 cursor-pointer
                  dark:text-neutral-300 font-sans transition whitespace-nowrap
                  bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          v-for="(option, index) in items" :key="index" :class="{
            '!bg-neutral-200 dark:!bg-neutral-700 hover:!bg-neutral-200 dark:hover:!bg-neutral-700': option.value === selectedItem?.value,
            '!cursor-not-allowed text-neutral-300 dark:text-neutral-500 hover:bg-white dark:hover:!bg-neutral-800': option.disabled
          }" @click="!option.disabled ? handleOptionSelect(option) : void 0">
          <div class="inline-block w-5 h-5" v-if="hasAnyIcon && !option.icon"></div>
          <UIcon :name="(option?.icon)" class="inline-block w-5 h-5" v-if="option.icon" />
          <span class="leading-none whitespace-nowrap text-sm">{{ option.label || 'No label' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
.select-item-enter-active,
.select-item-leave-active {
  transition: all .15s ease;
}

.select-item-enter-from,
.select-item-leave-to {
  opacity: .5;
  filter: blur(2px);
}
</style>
