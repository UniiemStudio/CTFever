<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimaryArea id="url" v-model="input" label="内容" placeholder="待编码内容" :rows="10"></PrimaryArea>
      </InteractiveBlock>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="space-x-1">
          <PrimaryButton type="button" @click="output = encodeURIComponent(input)">编码</PrimaryButton>
          <PrimaryButton type="button" @click="output = decodeURIComponent(input)">解码</PrimaryButton>
        </div>
        <PrimaryButton type="button" @click="swap">↑ 交换 ↓</PrimaryButton>
        <PrimaryButton type="button" danger @click="input = ''; output = '';">清空</PrimaryButton>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea id="result" v-model="output" label="结果" placeholder="编码结果" :rows="10"></PrimaryArea>
      </InteractiveBlock>
    </form>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import PrimaryButton from "~/components/form/PrimaryButton";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import InteractiveBlock from "~/components/tool/InteractiveBlock";

export default {
  name: "url-encoding",
  components: {InteractiveBlock, PrimaryArea, PrimaryButton, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.urlEncoding.title") + " - " + this.$t("app.name")
    };
  },
  data() {
    return {
      input: '',
      output: ''
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
