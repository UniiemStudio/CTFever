<template>
  <ToolContainer>
    <form class="bg-white rounded lg:px-8 lg:pt-6">
      <div class="mb-4">
        <PrimaryArea id="url" v-model="url" label="内容" placeholder="待编码内容" rows="10"></PrimaryArea>
      </div>
      <div class="mb-4 flex items-center justify-between">
        <div class="space-x-1">
          <PrimaryButton type="button" @click="output = encodeURIComponent(url)">编码</PrimaryButton>
          <PrimaryButton type="button" @click="output = decodeURIComponent(url)">解码</PrimaryButton>
        </div>
        <PrimaryButton type="button" @click="swap">↑ 交换 ↓</PrimaryButton>
        <PrimaryButton type="button" danger @click="url = ''; output = '';">清空</PrimaryButton>
      </div>
      <div class="mb-4">
        <PrimaryArea id="result" v-model="output" label="结果" placeholder="编码结果" rows="10"></PrimaryArea>
      </div>
    </form>
  </ToolContainer>
</template>

<script>
import ToolContainer from "~/components/ToolContainer";
import PrimaryButton from "~/components/PrimaryButton";
import PrimaryArea from "~/components/PrimaryTextArea";

export default {
  name: "url-encoding",
  components: {PrimaryArea, PrimaryButton, ToolContainer},
  data() {
    return {
      url: '',
      output: ''
    }
  },
  methods: {
    swap() {
      [this.url, this.output] = [this.output, this.url];
    }
  },
  head() {
    return {
      title: this.$t("tool.urlEncoding.title") + " - " + this.$t("app.name")
    };
  }
}
</script>

<style scoped>

</style>
