<script lang="ts" setup>
import TopBar from "~/components/app/TopBar.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen antialiased">
    <TopBar/>
    <div class="flex-1 h-full">
      <slot/>
    </div>
  </div>
</template>

<style scoped>
</style>