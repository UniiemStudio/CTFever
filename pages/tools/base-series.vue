<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimarySelector v-model="method" :options="options" label="选择编码方式"></PrimarySelector>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea id="input" v-model="input" label="解码结果" placeholder="待编码的文本" :rows="10"></PrimaryArea>
      </InteractiveBlock>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="space-x-1">
          <PrimaryButton type="button" @click="encode">编码 ↓</PrimaryButton>
          <PrimaryButton type="button" @click="decode">解码 ↑</PrimaryButton>
        </div>
        <PrimaryButton type="button" danger @click="input = ''; output = '';">清空</PrimaryButton>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea id="output" v-model="output" label="编码结果" placeholder="已编码的内容" :rows="10"></PrimaryArea>
      </InteractiveBlock>
    </form>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryButton from "~/components/form/PrimaryButton";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";
import PrimarySelector from "~/components/form/PrimarySelector";

import * as base64 from "hi-base64";
import * as base32 from "hi-base32";

export default {
  name: "base-series",
  components: {
    PrimarySelector,
    InteractiveDoubleColumns,
    PrimaryArea,
    PrimaryButton,
    InteractiveBlock,
    PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.baseSeries.title") + " - " + this.$t("app.name")
    };
  },
  methods: {
    encode() {
      this.output = this.method === "base64" ? base64.encode(this.input) : base32.encode(this.input);
    },
    decode() {
      this.input = this.method === "base64" ? base64.decode(this.output) : base32.decode(this.output);
    }
  },
  data() {
    return {
      input: "",
      output: "",
      method: "base64",
      options: [
        {
          label: "Base64",
          value: "base64"
        },
        {
          label: "Base32",
          value: "base32"
        }
      ]
    };
  },
}
</script>

<style scoped>

</style>
