<script setup lang="ts">
import {PropType} from "@vue/runtime-core";

const props = defineProps({
  for: {
    type: String as PropType<'navbar' | 'page'>,
    default: 'navbar'
  }
})

const logoClass = computed(() => {
  switch (props.for) {
    case 'navbar':
      return 'w-6 h-6'
    case 'page':
      return 'w-12 h-12'
  }
})
</script>

<template>
  <div>
    <img src="/icon.svg" :class="logoClass" alt="CTFever Logo">
  </div>
</template>

<style scoped>

</style>