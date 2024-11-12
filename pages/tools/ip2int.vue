<script lang="ts" setup>
import { ip2int, int2ip } from '~/libs/network/ip2int'
import { useMessage } from '~/composables/uni/useMessage';

const { t } = useI18n({ useScope: 'local' })
useSeoMeta({ title: t('title') })

const message = useMessage()

const inputs = reactive({
  ip: '',
  int: '',
})

const onIpConvert = () => {
  if (!inputs.ip) return
  try {
    inputs.int = ip2int(inputs.ip).toString()
  } catch (error) {
    message.error(t('ip_invalid'))
  }
}

const onIntConvert = () => {
  if (!inputs.int) return
  try {
    inputs.ip = int2ip(parseInt(inputs.int, 10))
  } catch (error) {
    message.error(t('int_invalid'))
    
  }
}

watch(() => inputs.ip, useDebounceFn(onIpConvert, 1000))
watch(() => inputs.int, useDebounceFn(onIntConvert, 1000))
</script>

<template>
  <ToolContainer>
    <UAlert class="mb-4" icon="IconWorldWww" :title="t('tip')" />
    <div class="flex flex-col md:flex-row gap-4">
      <TitleField class="w-full" :label="t('ip')">
        <UInput v-model="inputs.ip" :placeholder="t('ip_placeholder')" />
      </TitleField>
      <TitleField class="w-full" :label="t('int')">
        <UInput v-model="inputs.int" :placeholder="t('int_placeholder')" type="number" />
      </TitleField>
    </div>
  </ToolContainer>
</template>

<style scoped></style>

<i18n lang="yaml">
en:
  title: "IP to Integer"
  tip: "Enter IP Address or Int IP Address, it will be converted automatically"
  ip: "IP Address"
  ip_placeholder: "Enter IP Address or display the converted IP Address"
  ip_invalid: "Invalid IP Address"
  int: "Integer"
  int_placeholder: "Enter Integer or display the converted IP Integer"
  int_invalid: "Invalid IP Integer"

zh:
  title: "IP 地址与整数转换"
  tip: "输入 IP 地址或 Int 型 IP 地址，即可自动转换"
  ip: "IP 地址"
  ip_placeholder: "输入或显示转换后的 IP 地址"
  ip_invalid: "无效的 IP 地址"
  int: "整数"
  int_placeholder: "输入或显示转换后的整数 IP"
  int_invalid: "无效的整数 IP"
</i18n>
