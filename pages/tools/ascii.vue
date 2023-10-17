<script lang="ts" setup>
const testItems: SelectItem[] = [
  {
    label: '选项1',
    value: 'option1',
    icon: 'tabler:http-options'
  },
  {
    label: '选项2',
    value: 'option2',
    icon: 'tabler:http-get'
  },
]

const testItems2: SelectItem[] = [
  {
    label: '选项1',
    value: 'option1',
  },
  {
    label: '选项2',
    value: 'option2',
    icon: 'tabler:http-get'
  },
  {
    label: '选项3',
    value: 'option3',
    icon: 'tabler:http-get',
    disabled: true
  },
]

const selected = ref('option1')
</script>

<template>
  <ToolContainer>
    <div class="grid grid-cols-2 gap-4">
      <UniSelect :items="testItems" label="Selection" v-model="selected" />
      <UniSelect :items="testItems2" v-model="selected" />
    </div>
  </ToolContainer>
</template>

<style scoped></style>
