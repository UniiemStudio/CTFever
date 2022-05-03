<template>
  <PrimaryContainer>
    <form class="primary-form">
      <!-- TODO: 自定义长短号 -->
      <InteractiveBlock>
        <PrimaryArea id="morse" v-model="input" label="原始内容" placeholder="待加密的文本" :rows="10"></PrimaryArea>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryInput id="key" label="密钥" v-model="key" type="string"/>
      </InteractiveBlock>
      <InteractiveBlock>
        <div class="flex flex-row justify-between items-center">
          <div class="space-x-1">
            <PrimaryButton type="button" @click="encode">加密 ↓</PrimaryButton>
            <PrimaryButton type="button" @click="decode">解密 ↑</PrimaryButton>
          </div>
          <PrimaryButton type="button" danger @click="input = ''; output = ''; key = ''">清空</PrimaryButton>
        </div>
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

import {decryptVigenere, encryptVigenere} from "~/libs/vigenereCipher";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";


export default {
  name: "vigenereCipher",
  components: {InteractiveDoubleColumns, PrimaryButton, PrimaryArea, InteractiveBlock, PrimaryContainer, PrimaryInput},
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
    encode() {
      this.output = encryptVigenere(this.input, this.key);
    },
    decode() {
      this.input = decryptVigenere(this.output, this.key);
    },
  }
}
</script>

<style scoped>

</style>
