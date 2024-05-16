<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
useSeoMeta({ title: t('title') })
</script>

<template>
  <ToolContainer>
    <div class="grid grid-cols-2 gap-4">
      <div class="w-full">
        <UniFileDnD
          accept="application/zip,application/x-zip-compressed"
        />
      </div>
      <div class="w-full">
      </div>
    </div>
  </ToolContainer>
</template>

<style scoped>

</style>

<i18n>
en:
  title: Zip Pseudo Encryption
zh:
  title: Zip 伪加密
</i18n>
