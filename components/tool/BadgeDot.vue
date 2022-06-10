<template>
  <div v-show="info || warn || success || error" class="relative">
    <div :class="{'bg-blue-400': info, 'bg-green-400': success, 'bg-orange-400': warn, 'bg-red-400': error}"
         class="absolute w-2 h-2 top-0 right-0 rounded-full opacity-60"></div>
    <div v-show="ping"
         :class="{'bg-blue-400': info, 'bg-green-400': success, 'bg-orange-400': warn, 'bg-red-400': error}"
         class="absolute w-2 h-2 top-0 right-0 rounded-full opacity-70 animate-ping"></div>
  </div>
</template>

<script>
export default {
  name: "BadgeDot",
  props: {
    ping: {
      type: Boolean,
      default: false
    },
    info: {
      type: Boolean,
      default: false
    },
    success: {
      type: Boolean,
      default: false
    },
    warn: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
  },
}
</script>

<style scoped>

</style>
