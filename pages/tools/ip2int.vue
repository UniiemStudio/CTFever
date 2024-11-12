<script lang="ts" setup>
const { t } = useI18n({ useScope: 'local' })
useSeoMeta({ title: t('title') })

const inputs = reactive({
  input: '',
  output: '',
})
</script>

<template>
  <ToolContainer>
    <TitleField label="IP Address">
      <UInput v-model="inputs.input" placeholder="Enter IP Address" />
    </TitleField>
    <div class="flex justify-between items-end gap-2">
      <div class="flex items-center gap-2">
        <UButton>{{ t('btn_encode') }}</UButton>
        <UButton>{{ t('btn_decode') }}</UButton>
      </div>
      <UButton icon="tabler:refresh" color="red" variant="soft">{{ t('btn_reset') }}</UButton>
    </div>
    <TitleField label="Integer">
      <UInput v-model="inputs.output" placeholder="The result will be displayed here" readonly />
    </TitleField>
  </ToolContainer>
</template>

<style scoped>

</style>
