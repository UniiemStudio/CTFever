<script lang="ts" setup>
const { t } = useI18n({
  useScope: 'local',
})

useSeoMeta({
  title: t('app.tool.ascii.label'),
})

const route = useRoute()
const router = useRouter()

const inputs = reactive({
  radix: '10',
  mode: 'continuity',
  inputMode: 'ascii',
  separator: 'space',
  input: '',
})

const result = ref('')

export type AsciiToolInputs = typeof inputs

const separators: {
  [key: string]: string
} = {
  'none': '',
  'space': ' ',
  'comma': ',',
}

const handleInput = (update: boolean = true) => {
  if (inputs.input) {
    const input = inputs.input
    const sep = separators[inputs.separator]
    if (inputs.inputMode === 'ascii') {
      if (inputs.mode === 'continuity') {
        result.value = input.split(sep).map(i => String.fromCharCode(parseInt(i, parseInt(inputs.radix)))).join('') // 待完善
      } else {
        result.value = input.split(sep).map(i => parseInt(i, parseInt(inputs.radix))).map(i => String.fromCharCode(i)).join('') // 可用
      }
    } else {
      result.value = input.split('').map(i => i.charCodeAt(0).toString(parseInt(inputs.radix))).join(sep)
    }
  } else {
    result.value = ''
  }
  update && router.replace({ query: inputs })
}

const inputHandler = () => {
  for (const key in inputs) {
    if (route.query[key]) {
      (inputs as any)[key] = route.query[key] as string
      handleInput(false)
    }
  }
}

onUpdated(inputHandler)
onMounted(inputHandler)
</script>

<template>
  <ToolContainer gapped>
    <div class="grid grid-cols-2 gap-4">
      <UniSelect :label="t('label.radix')" :items="[
        {
          label: t('radix.bin'),
          value: '2',
          icon: 'tabler:binary'
        },
        {
          label: t('radix.oct'),
          value: '8',
          icon: 'tabler:square-number-8'
        },
        {
          label: t('radix.dec'),
          value: '10',
          icon: 'tabler:decimal'
        },
        {
          label: t('radix.hex'),
          value: '16',
          icon: 'mdi:hexadecimal'
        },
      ]" v-model="inputs.radix" />
      <UniSelect :label="t('label.mode')" :items="[
        {
          label: t('mode.continuity'),
          value: 'continuity',
          icon: 'tabler:abc'
        },
        {
          label: t('mode.split'),
          value: 'split',
          icon: 'mdi:comma-box-outline'
        },
      ]" v-model="inputs.mode" :disabled="inputs.inputMode !== 'ascii'" />
      <UniSelect :label="t('label.input')" :items="[
        {
          label: t('input.ascii'),
          value: 'ascii',
          icon: 'tabler:numbers'
        },
        {
          label: t('input.characters'),
          value: 'chars',
          icon: 'carbon:character-upper-case'
        },
      ]" v-model="inputs.inputMode" />
      <UniSelect :label="t('label.separator')" :items="[
        {
          label: t('separator.none'),
          value: 'none',
          icon: 'tabler:space-off',
          disabled: inputs.mode === 'split' && inputs.inputMode === 'ascii'
        },
        {
          label: t('separator.space'),
          value: 'space',
          icon: 'tabler:space'
        },
        {
          label: t('separator.comma'),
          value: 'comma',
          icon: 'mdi:comma-box-outline'
        },
      ]" v-model="inputs.separator" />
    </div>
    <UFormGroup :label="inputs.inputMode === 'ascii' ? t('input.ascii') : t('input.characters')"
      :placeholder="inputs.inputMode === 'ascii' ? (inputs.mode === 'continuity' ? `'656667' to 'ABC'` : `'65,66,67' to 'ABC'`) : (inputs.mode === 'continuity' ? `'ABC' to '656667'` : `'ABC' to '65,66,67'`)">
      <UInput v-model:model-value="inputs.input" @update:model-value="handleInput()" />
    </UFormGroup>
    <Transition name="result">
      <UFormGroup v-if="result" :label="t('label.result')">
        <UTextarea v-model="result" readonly />
      </UFormGroup>
    </Transition>
  </ToolContainer>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
.result-enter-active,
.result-leave-active {
  transition: all .3s ease;
}

.result-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}

.result-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>

<i18n lang="yaml">
en:
  label:
    radix: Radix
    mode: Mode
    input: Input
    separator: Separator
    result: Conversion result
  radix:
    bin: Binary
    oct: Octal
    dec: Decimal
    hex: Hexadecimal
  mode:
    continuity: Continuous input
    split: Symbol segmented
  input:
    ascii: ASCII
    characters: Characters
  separator:
    none: No segmentation
    space: Space
    comma: Comma
zh:
  label:
    radix: 进制
    mode: 模式
    input: 输入
    separator: 分隔符
    result: 转换结果
  radix:
    bin: 二进制
    oct: 八进制
    dec: 十进制
    hex: 十六进制
  mode:
    continuity: 连续输入
    split: 符号分割
  input:
    ascii: ASCII
    characters: 字符
  separator:
    none: 无分割
    space: 空格
    comma: 逗号
</i18n>
