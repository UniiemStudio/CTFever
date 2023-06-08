<script>
import {defineComponent} from 'vue'
import {Icon} from "@iconify/vue2";

export default defineComponent({
  name: "Item",
  components: {Icon},
  props: {
    title: {
      default: "Settings",
      required: true
    },
    subtitle: {
      default: null
    },
  }
})
</script>

<template>
  <div class="p-4 grid grid-cols-1 md:grid-cols-2">
    <div class="flex flex-col justify-center items-start">
      <span class="text-sm font-bold">{{ title }}</span>
      <span class="text-sm font-normal font-['Nunito'] dark:text-slate-500">{{ subtitle }}</span>
    </div>
    <div v-if="$slots.actions"
         class="flex flex-row flex-wrap justify-start md:justify-end mt-2 md:mt-0 items-center gap-2">
      <slot name="actions"/>
    </div>
  </div>
</template>

<style scoped>

</style>
