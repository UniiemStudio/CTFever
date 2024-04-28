<script setup lang="ts">
import type { MonacoEditor } from '#components'
import { useMonaco } from '#imports'
import { editor, languages } from 'monaco-editor'

const monaco = useMonaco()
const monacoRef = ref<InstanceType<typeof MonacoEditor>>()

const bf_program = ref('')

onMounted(() => {
  if (monaco) {
    const brainfuckMonarch: languages.IMonarchLanguage = {
      tokenizer: {
        root: [
          ['[\\+\\-]', 'operators'],
        ],
      },
    }
    monaco.languages.register({ id: 'brainfuck' })
    monaco.languages.setMonarchTokensProvider('brainfuck', brainfuckMonarch)

    // monaco.languages.registerDocumentFormattingEditProvider('brainfuck', {
    //   provideDocumentFormattingEdits: function(model, options, token) {
    //     let indent = 2; // 初始缩进为2个空格
    //     let formattedCode = "";
    //     const bfCode = model.getValue();
    //     bfCode.split('\n').forEach(line => {
    //       line = line.trim();
    //       if (!line) return;
    //       const formattedLine = " ".repeat(indent) + line;
    //       formattedCode += formattedLine + '\n';
    //       indent = line.includes('[') ? 4 : 2; // 根据 '[' 是否出现来决定下一行的缩进
    //     });
    //     // 生成编辑操作
    //     return [{
    //       range: monaco.Range.fromPositions(model.getPositionAt(0), model.getPositionAt(model.getLineCount() - 1)),
    //       text: formattedCode.trim()
    //     }];
    //   }
    // });
  }
})
</script>

<template>
  <ToolContainer>
    <MonacoEditor
      class="w-full h-96"
      v-model="bf_program"
      lang="brainfuck"
      ref="monacoRef"
    />
  </ToolContainer>
</template>

<style scoped>

</style>