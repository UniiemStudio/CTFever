<script lang="ts" setup>
const inputValue = ref(`asdas
dasdasda
sdasda
sd`)
</script>

<template>
  <ToolContainer>
    <div class="grid grid-cols-2 gap-4">
      <UniInput v-model="inputValue" label="Input" placeholder="Input anything" justify="start" />
      <UniTextArea v-model="inputValue" label="TextArea" placeholder="Text area" :min-rows="2" :pattern="/^[A-Za-z]+$/gm" />
    </div>
  </ToolContainer>
</template>

<style scoped>

</style>
