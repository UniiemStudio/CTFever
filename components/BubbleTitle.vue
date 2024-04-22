<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
  },
  reverseTitleIcon: {
    type: Boolean,
    default: false,
  },
  sm: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="relative">
    <div
      class="absolute -left-1 top-2 w-4 h-4 rounded-full bg-primary/30 dark:bg-primary/60 z-[0]"
      :class="{'!w-3 !h-3 !top-2.5': sm}"
    ></div>
    <h1
      class="text-xl font-bold text-black/70 dark:text-white/80 drop-shadow leading-none relative z-[1] inline-flex items-center gap-1"
      :class="{'flex-row-reverse': reverseTitleIcon, '!text-base': sm}"
    >
      <span>{{ title }}</span>
      <Icon v-if="icon" :name="icon" class="inline leading-none"/>
    </h1>
    <h1 v-if="subtitle" class="text-sm font-bold text-black/30 dark:text-white/40 italic leading-none">
      {{ subtitle }}
    </h1>
  </div>
</template>

<style scoped>

</style>