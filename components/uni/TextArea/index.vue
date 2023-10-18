
import { textarea } from '@nuxt/ui';
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
    required: true
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  justify: {
    type: String as PropType<'start' | 'end'>,
    required: false,
    default: 'end'
  },
  pattern: {
    type: [String, RegExp],
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  rows: {
    type: Number,
    required: false,
    default: 5
  },
  minRows: {
    type: Number,
    required: false,
  },
})

const inputValue = ref(props.modelValue)
const isError = ref(false)

watch(() => props.modelValue, (value) => {
  inputValue.value = value
  if (props.pattern && value) {
    const pattern = typeof props.pattern === 'string' ? new RegExp(props.pattern) : props.pattern
    isError.value = !pattern.test(value as string)
    pattern.lastIndex = 0
  }
}, { immediate: true })

const handleInput = (e: any) => {
  if (props.disabled) return
  const value = e.target.value

  if (props.pattern && value) {
    const pattern = typeof props.pattern === 'string' ? new RegExp(props.pattern) : props.pattern
    isError.value = !pattern.test(value)
    pattern.lastIndex = 0
    inputValue.value = value
    if (isError.value) return
  }

  inputValue.value = value
  isError.value = false

  emit('update:modelValue', e.target.value)
  emit('input', e)
}

const autosize = (e: any) => {
  const el = e?.target ? e.target : e
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

onMounted(() => {
  if (props.minRows) {
    const textarea = document.querySelector('textarea')
    textarea.addEventListener('keydown', autosize)
    textarea.addEventListener('input', autosize)
    textarea.addEventListener('focus', autosize)
    autosize(textarea)
  }
})
</script>

<template>
  <div class="flex flex-col space-y-1"
    :class="{ 'justify-start': justify === 'start', 'justify-end': justify === 'end' }">
    <p class="block w-fit text-neutral-700 dark:text-neutral-300 text-sm font-bold font-['Nunito']" v-if="label">
      {{ label }}
    </p>
    <div class="relative">
      <textarea class="relative w-full flex items-center gap-2.5 p-2 pr-6 rounded-md overflow-hidden overflow-y-auto border transition bg-white dark:bg-neutral-800
                   border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-700
                     focus:ring-4 focus:ring-opacity-50 focus:ring-neutral-200 dark:focus:ring-neutral-800
                     outline-none placeholder-neutral-400 dark:placeholder-neutral-500" :rows="minRows || rows"
        :class="{ '!border-red-500': isError, 'bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600': disabled }"
        :value="inputValue" @input="handleInput" :placeholder="placeholder" :disabled="disabled" />
    </div>
  </div>
</template>

<style scoped></style>
