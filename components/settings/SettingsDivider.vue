<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "SettingsItemDivider",
  props: {
    forItem: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<template>
  <hr class="border-gray-200 dark:border-slate-700 mt-6 mx-0" :class="{'mt-0 mx-4': forItem}"/>
</template>

<style scoped>

</style>
