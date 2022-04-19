<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimaryArea id="url" v-model="input" label="输入" placeholder="Input..." :rows="10"></PrimaryArea>
      </InteractiveBlock>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="space-x-1">
          <PrimaryButton type="button" @click="output = ceasarCipher.encode(input, 13)">编码</PrimaryButton>
        </div>
        <PrimaryButton type="button" @click="swap">↑ 交换 ↓</PrimaryButton>
        <PrimaryButton type="button" danger @click="input = ''; output = '';">清空</PrimaryButton>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea id="result" v-model="output" label="输出" placeholder="Output..." :rows="10"></PrimaryArea>
      </InteractiveBlock>
    </form>
    <PrimaryIntroduction title="ROT-13" :document="intro" :references="references"/>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import PrimaryButton from "~/components/form/PrimaryButton";

import ceasarCipher from '~/libs/ceasarCipher';

export default {
  name: "rot-series",
  components: {PrimaryButton, PrimaryArea, InteractiveBlock, PrimaryIntroduction, PrimaryContainer},
  async asyncData({$content}) {
    const intro = await $content(`intro/rot13`).fetch();
    return {
      intro
    }
  },
  data() {
    return {
      input: '',
      output: '',
      ceasarCipher: ceasarCipher,
      references: [
        {
          name: 'Wikipedia: ROT13',
          url: 'https://zh.wikipedia.org/wiki/ROT13'
        }
      ],
    }
  },
  methods: {
    swap() {
      [this.input, this.output] = [this.output, this.input];
    }
  }
}
</script>

<style scoped>

</style>
