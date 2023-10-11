<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const { toolkits } = storeToRefs(useConstant())
</script>

<template>
  <ToolContainer content-class="flex flex-col gap-8">
    <AppToolArea v-for="(toolkit, k) in toolkits" :key="k" :toolkit="toolkit" />
  </ToolContainer>
</template>

<style scoped></style>