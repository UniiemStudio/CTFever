<script lang="ts" setup>
const emit = defineEmits(['click'])
const props = defineProps({
  type: {
    type: String as PropType<ButtonType>,
    default: 'normal'
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'base'
  },
  block: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const buttonTypeClass = computed(() => {
  let ret = `uni-button--normal`
  if (props.type !== 'normal') ret += ` uni-button--${props.type}`
  return ret
})

const buttonSizeClass = computed(() => {
  return `uni-button--${props.size}`
})

const buttonIcon = computed(() => {
  if (props.icon) return props.icon
  return null
})

const handleClick = (e: any) => {
  emit('click', e)
}
</script>

<template>
  <button class="w-fit flex items-center rounded-md font-bold border shadow-sm transition focus:ring-4" :class="{
    'w-full': block,
    'uni-button--disabled': disabled || loading,
    [buttonTypeClass]: buttonTypeClass,
    [buttonSizeClass]: buttonSizeClass,
  }" @click="handleClick" :disabled="disabled || loading">
    <Transition name="icon">
      <UniIconSpinner v-if="loading" />
      <Icon v-else-if="buttonIcon" :name="buttonIcon" :key="buttonIcon" />
    </Transition>
    <div class="flex items-center whitespace-nowrap leading-snug" :class="{ 'ml-2': buttonIcon || loading }">
      <slot />
    </div>
  </button>
</template>

<style scoped>
.icon-enter-active,
.icon-leave-active {
  transition: all .3s ease;
}

.icon-enter-from,
.icon-leave-to {
  opacity: 0;
  width: 0;
}

.uni-button--normal {
  @apply bg-neutral-50 hover:bg-neutral-100 active:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600;
  @apply ring-neutral-200/50 dark:ring-neutral-800/50;
  @apply border-neutral-300 dark:border-neutral-700;
  @apply text-neutral-700 dark:text-neutral-300;
}

.uni-button--primary {
  @apply text-blue-600 dark:text-blue-600;
}

.uni-button--danger {
  @apply text-red-500 dark:text-red-500;
}

.uni-button--disabled {
  @apply bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-100 hover:dark:bg-neutral-900;
  @apply ring-transparent;
  @apply border-transparent;
  @apply text-neutral-400 dark:text-neutral-600;
}

.uni-button--base {
  @apply text-base;
  @apply px-4 py-2;
}

.uni-button--medium {
  @apply text-sm;
  @apply px-3 py-1.5;
}

.uni-button--small {
  @apply text-sm;
  @apply px-2 py-1;
}
</style>
