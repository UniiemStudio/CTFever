<script setup lang="ts">
import { encode } from '@uniiem/caesar'

const { t } = useI18n({ useScope: 'local' })
useSeoMeta({ title: t('title') })

const input = ref('')
const output = ref('')

watchEffect(() => {
  output.value = encode(input.value, 13)
})
</script>

<template>
  <ToolContainer>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TitleField :label="t('input')">
        <UTextarea
          :rows="10"
          v-model="input"
          :placeholder="t('input_placeholder')"
        />
      </TitleField>
      <TitleField :label="t('output')">
        <UTextarea
          :rows="10"
          v-model="output"
          :placeholder="t('output_placeholder')"
        />
      </TitleField>
    </div>
  </ToolContainer>
</template>

<style scoped>

</style>

<i18n>
en:
  title: ROT13 Encoding
  input: Input
  input_placeholder: Enter the text to encode
  output: Output
  output_placeholder: Automatically output the encoded text
zh:
  title: ROT13 编码
  input: 输入
  input_placeholder: 输入需要编码的文本
  output: 输出
  output_placeholder: 自动输出编码后的文本
</i18n>
