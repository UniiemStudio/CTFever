<script setup lang="ts">
const emit = defineEmits(['input', 'change', 'update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: false
  },
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    required: false,
    default: 'md'
  },
  value: {
    type: Boolean,
    required: false
  },
  onIcon: {
    type: String,
    required: false,
  },
  offIcon: {
    type: String,
    required: false,
  }
})

const checked = ref(false)

const buttonSizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-6 w-10'
    case 'md':
      return 'h-8 w-14'
    case 'lg':
      return 'h-10 w-[calc(2.5rem/0.54)]'
  }
})

const buttonPaddingClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'p-1'
    case 'md':
      return 'p-1'
    case 'lg':
      return 'p-1.5'
  }
})

const bulletSizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-4'
    case 'md':
      return 'h-6'
    case 'lg':
      return 'h-7'
  }
})

const bulletTranslateClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'translate-x-4'
    case 'md':
      return 'translate-x-6'
    case 'lg':
      return 'translate-x-8'
  }
})

const handleCheck = () => {
  checked.value = !checked.value
  emit('update:modelValue', checked.value)
  emit('change', checked.value)
  emit('input', checked.value)
}

onMounted(() => {
  if (props.modelValue) {
    checked.value = props.modelValue
  } else if (props.value) {
    checked.value = props.value
  }
})

watch(() => props.modelValue, (value) => {
  checked.value = value
})
</script>

<template>
  <button
      class="relative flex items-center rounded-lg bg-neutral-100 dark:bg-neutral-800 shadow-inner transition ease-in-out group outline-none"
      :class="{
      '!bg-green-400 dark:!bg-green-400/50': checked,
      [buttonSizeClass]: buttonSizeClass,
      [buttonPaddingClass]: buttonPaddingClass
    }" @click="handleCheck">
    <span
        class="aspect-[1/1] translate-x-0 transition ease-in-out bg-white dark:bg-black rounded-md shadow duration-300 group-active:scale-90"
        :class="{
      '!shadow-lg': checked,
      'group-active:translate-x-3 group-active:duration-500': !checked,
      [bulletSizeClass]: bulletSizeClass,
      [bulletTranslateClass]: checked
    }">
      <span v-if="onIcon || offIcon" class="absolute inset-0 flex items-center justify-center text-neutral-400">
        <Transition name="icon" mode="out-in">
          <Icon v-if="checked && onIcon" :name="onIcon"/>
          <Icon v-else-if="!checked && offIcon" :name="offIcon"/>
        </Transition>
      </span>
    </span>
  </button>
</template>

<style scoped>
.icon-enter-active,
.icon-leave-active {
  transition: all 0.1s ease;
}

.icon-enter-from,
.icon-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>