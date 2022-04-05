<template>
  <PrimaryContainer>
    <form class="primary-form">
      <!-- TODO: 自定义长短号 -->
      <InteractiveBlock>
        <PrimaryArea id="morse" v-model="input" label="原始文本" placeholder="待加密的文本" :rows="10"></PrimaryArea>
      </InteractiveBlock>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="space-x-1">
          <PrimaryButton type="button" @click="encodeMorse">加密 ↓</PrimaryButton>
          <PrimaryButton type="button" @click="decodeMorse">解密 ↑</PrimaryButton>
        </div>
        <PrimaryButton type="button" danger @click="input = ''; output = '';">清空</PrimaryButton>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea id="output" v-model="output" label="摩尔斯码" placeholder="摩尔斯码" :rows="10"></PrimaryArea>
      </InteractiveBlock>
    </form>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import PrimaryButton from "~/components/form/PrimaryButton";

import {decode, encode} from 'xmorse';

export default {
  name: "morse-code",
  components: {PrimaryButton, PrimaryArea, InteractiveBlock, PrimaryContainer},
  data() {
    return {
      input: "",
      output: ""
    };
  },
  methods: {
    encodeMorse() {
      this.output = encode(this.input);
    },
    decodeMorse() {
      this.input = decode(this.output);
    },
  }
}
</script>

<style scoped>

</style>
