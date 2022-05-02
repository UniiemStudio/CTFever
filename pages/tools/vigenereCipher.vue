<template>
  <PrimaryContainer>
    <form class="primary-form">
      <!-- TODO: 自定义长短号 -->
      <InteractiveBlock>
        <PrimaryArea id="morse" v-model="input" label="原始文本" placeholder="待加密的文本" :rows="10"></PrimaryArea>
      </InteractiveBlock>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="space-x-1">
          <PrimaryInput id="key" label="密钥" v-model="key" type="string"/>
          <PrimaryButton type="button" @click="encodeMorse">加密 ↓</PrimaryButton>
          <PrimaryButton type="button" @click="decodeMorse">解密 ↑</PrimaryButton>
        </div>
        <PrimaryButton type="button" danger @click="input = ''; output = '';key = ''">清空</PrimaryButton>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea id="output" v-model="output" label="维吉尼亚密码" placeholder="维吉尼亚密码" :rows="10"></PrimaryArea>
      </InteractiveBlock>
    </form>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import PrimaryButton from "~/components/form/PrimaryButton";
import PrimaryInput from "~/components/form/PrimaryInput";

import {encryptVigenere, decryptVigenere} from "~/libs/vigenereCipher";


export default {
  name: "vigenereCipher",
  components: {PrimaryButton, PrimaryArea, InteractiveBlock, PrimaryContainer, PrimaryInput},
  head() {
    return {
      title: this.$t("tool.vigenereCipher.title") + " - " + this.$t("app.name")
    };
  },
  data() {
    return {
      input: "",
      output: "",
      key: "",
    };
  },
  methods: {
    encodeMorse() {
      this.output = encryptVigenere(this.input, this.key);
    },
    decodeMorse() {
      this.input = decryptVigenere(this.output, this.key);
    },
  }
}
</script>

<style scoped>

</style>
