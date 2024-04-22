<script setup lang="ts">
import TitleField from '~/components/TitleField.vue'
import { encode, decode } from '@uniiem/caesar'

const { t } = useI18n({
  useScope: 'local',
})

useSeoMeta({
  title: t('title'),
})

const input = ref('')
const output = ref('')
const mode = ref('encrypt')
const offset = ref(3)

watchEffect(() => {
  if (mode.value === 'encrypt') {
    output.value = encode(input.value, offset.value)
  } else {
    output.value = decode(input.value, offset.value)
  }
})
</script>

<template>
  <ToolContainer>
    <div class="flex flex-col gap-4">

      <TitleField label="输入">
        <UTextarea
          size="md"
          placeholder="需要处理的文本"
          v-model="input"
          autofocus
        />
      </TitleField>

      <div class="flex justify-between items-center flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <USelectMenu
            size="md"
            v-model="mode"
            :options="[
              { label: '加密', value: 'encrypt', icon: 'i-tabler-lock' },
              { label: '解密', value: 'decrypt', icon: 'i-tabler-lock-open' },
            ]"
            option-attribute="label"
            value-attribute="value"
            :leading-icon="mode === 'encrypt' ? 'i-tabler-lock' : 'i-tabler-lock-open'"
          />
          <UTooltip text="偏移量">
            <UInput
              size="md"
              placeholder="偏移量"
              icon="i-tabler-arrow-move-left"
              v-model="offset"
              type="number"
            />
          </UTooltip>
        </div>
      </div>

      <TitleField label="输出">
        <UTextarea
          size="md"
          placeholder="输出文本"
          v-model="output"
        />
      </TitleField>

    </div>
  </ToolContainer>
</template>

<i18n>
en:
  title: Caesar Cipher

zh:
  title: 凯撒密码
</i18n>