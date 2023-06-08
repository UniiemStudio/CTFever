<script>
import {defineComponent} from 'vue'
import {Icon} from "@iconify/vue2";

export default defineComponent({
  name: "Area",
  components: {Icon},
  props: {
    title: {
      type: String,
      default: "Settings",
      required: true
    },
    subtitle: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: "tabler:settings"
    },
    danger: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<template>
  <div class="mt-6 first:mt-0 font-['Nunito']">
    <div class="p-4 py-2.5 text-left bg-gray-100 dark:bg-slate-800 rounded-tl-lg rounded-tr-lg"
         :class="{'!bg-red-100 dark:!bg-red-400/10': danger}">
      <h1
        class="text-lg font-base flex flex-row justify-start items-center space-x-1 text-gray-600 dark:text-slate-300">
        <Icon :icon="icon" class="text-base"/>
        <span class="text-base">{{ title }}</span>
      </h1>
      <p v-if="subtitle" class="text-sm font-normal font-['Nunito'] dark:text-slate-500">{{ subtitle }}</p>
    </div>
    <div class="border-4 border-t-0 border-gray-100 dark:border-slate-800 dark:text-slate-300
                rounded-bl-lg rounded-br-lg divide-y divide-gray-200 dark:divide-slate-800"
         :class="{'!border-red-100 dark:!border-red-400/10': danger}">
      <slot>
        <div class="p-4">
          No items
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>

</style>
