<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: "tabler:settings"
  },
  danger: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="mt-6 first:mt-0 font-['Nunito']">
    <div class="p-4 py-2.5 text-left bg-gray-100 dark:bg-neutral-800 rounded-tl-lg rounded-tr-lg"
      :class="{ '!bg-red-100 dark:!bg-red-400/10': danger }">
      <h1 class="text-lg font-base flex flex-row justify-start items-center space-x-1.5 text-gray-600 dark:text-neutral-300">
        <Icon :name="icon" class="text-xl" />
        <span class="text-base pt-0.5">{{ title }}</span>
      </h1>
      <p v-if="subtitle" class="text-sm font-normal font-['Nunito'] dark:text-neutral-500">{{ subtitle }}</p>
    </div>
    <div class="border-4 border-t-0 border-gray-100 dark:border-neutral-800 dark:text-neutral-300
                rounded-bl-lg rounded-br-lg divide-y divide-gray-200 dark:divide-neutral-800"
      :class="{ '!border-red-100 dark:!border-red-400/10': danger }">
      <slot>
        <div class="p-4">
          No items
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped></style>
