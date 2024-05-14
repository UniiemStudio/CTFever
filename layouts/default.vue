<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import TopBar from '~/components/app/TopBar.vue'

const { isOnToolPage } = storeToRefs(useGlobalState())
</script>

<template>
  <div class="flex flex-col min-h-screen antialiased">
    <TopBar :minibar="isOnToolPage"/>
    <div class="flex-1 h-full transition-all" :style="{'padding-top': isOnToolPage ? '98px' : '64px'}">
      <slot/>
    </div>
  </div>
</template>

<style scoped></style>