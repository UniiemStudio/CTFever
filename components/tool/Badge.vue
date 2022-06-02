<template>
  <div v-show="newest || premium" class="absolute top-2 right-2">
    <div :class="{'bg-blue-300': newest, 'bg-orange-400': premium}"
         class="absolute w-2 h-2 top-0 right-0 rounded-full"></div>
    <div v-show="ping"
         :class="{'bg-blue-300': newest, 'bg-orange-400': premium}"
         class="absolute w-2 h-2 top-0 right-0 rounded-full animate-ping"></div>
  </div>
</template>

<script>
export default {
  name: "Badge",
  props: {
    ping: {
      type: Boolean,
      default: false
    },
    newest: {
      type: Boolean,
      default: false
    },
    premium: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped>

</style>
