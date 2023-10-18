<script lang="ts" setup>
import { useMessage } from '~/composables/uni/useMessage';

const message = useMessage()
const { t } = useI18n({
  useScope: 'local'
})

const encodingType = ref('base64')
const inputDecoded = ref('')
const inputEncoded = ref('')
</script>

<template>
  <ToolContainer>
    <div class="flex flex-col gap-4">
      <UniTextArea v-model="inputDecoded" :min-rows="6" label="未编码文本" placeholder="未进行 base64 编码的原始文本" />
      <div class="flex justify-between items-end gap-2">
        <UniSelect class="flex-1" :items="[
          { label: 'Base64', value: 'base64' }
        ]" v-model="encodingType" label="编码方式" />
        <div class="flex justify-end gap-2 flex-1">
          <UniButton icon="tabler:arrow-bar-down">编码</UniButton>
          <UniButton icon="tabler:arrow-bar-up">解码</UniButton>
        </div>
      </div>
      <UniTextArea v-model="inputEncoded" :min-rows="6" label="已编码文本" placeholder="经过 base64 编码的文本" />
    </div>
  </ToolContainer>
</template>

<style scoped></style>

<i18n lang="yaml">

</i18n>
