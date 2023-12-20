<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "authentication"
})
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center gap-8">
    <AppLogo for="page"/>
    <slot/>
  </div>
</template>

<style scoped>

</style>