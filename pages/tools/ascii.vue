<script lang="ts" setup>
const radix = ref('10')
const mode = ref('continuity')
const inputMode = ref('ascii')
const separator = ref('space')
const inputText = ref('')
const result = ref('')

const separators: {
  [key: string]: string
} = {
  'none': '',
  'space': ' ',
  'comma': ','
}

const handleInput = () => {
  if (inputText.value) {
    const input = inputText.value
    const sep = separators[separator.value]
    if (inputMode.value === 'ascii') {
      if (mode.value === 'continuity') {
        result.value = input.split(sep).map(i => String.fromCharCode(parseInt(i, parseInt(radix.value)))).join('') // 待完善
      } else {
        result.value = input.split(sep).map(i => parseInt(i, parseInt(radix.value))).map(i => String.fromCharCode(i)).join('') // 可用
      }
    } else {
      result.value = input.split('').map(i => i.charCodeAt(0).toString(parseInt(radix.value))).join(sep)
    }
  } else {
    result.value = ''
  }
}
</script>

<template>
  <ToolContainer gapped>
    <div class="grid grid-cols-2 gap-4">
      <UniSelect label="进制" :items="[
        {
          label: '二进制',
          value: '2',
          icon: 'tabler:binary'
        },
        {
          label: '八进制',
          value: '8',
          icon: 'tabler:square-number-8'
        },
        {
          label: '十进制',
          value: '10',
          icon: 'tabler:decimal'
        },
        {
          label: '十六进制',
          value: '16',
          icon: 'mdi:hexadecimal'
        },
      ]" v-model="radix" />
      <UniSelect label="模式" :items="[
        {
          label: '连续',
          value: 'continuity',
          icon: 'tabler:abc'
        },
        {
          label: '分割',
          value: 'split',
          icon: 'mdi:comma-box-outline'
        },
      ]" v-model="mode" :disabled="inputMode !== 'ascii'" />
      <UniSelect label="输入" :items="[
        {
          label: 'ASCII',
          value: 'ascii',
          icon: 'tabler:numbers'
        },
        {
          label: '字符',
          value: 'chars',
          icon: 'carbon:character-upper-case'
        },
      ]" v-model="inputMode" />
      <UniSelect label="分隔符" :items="[
        {
          label: '无分割',
          value: 'none',
          icon: 'tabler:space-off',
          disabled: mode === 'split' && inputMode === 'ascii'
        },
        {
          label: '空格',
          value: 'space',
          icon: 'tabler:space'
        },
        {
          label: '逗号',
          value: 'comma',
          icon: 'mdi:comma-box-outline'
        },
      ]" v-model="separator" />
    </div>
    <UniInput :label="inputMode === 'ascii' ? 'ASCII' : '字符串'" v-model="inputText" @input="handleInput"
      :placeholder="inputMode === 'ascii' ? (mode === 'continuity' ? `'656667' to 'ABC'` : `'65,66,67' to 'ABC'`) : (mode === 'continuity' ? `'ABC' to '656667'` : `'ABC' to '65,66,67'`)" />
    <Transition name="result">
      <UniInput v-if="result" label="结果" v-model="result" disabled />
    </Transition>
  </ToolContainer>
</template>

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
