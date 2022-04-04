<template>
  <ToolContainer>
    <form class="bg-white rounded lg:px-8 lg:pt-6">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="url">
          内容
        </label>
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="10" id="url" placeholder="待编码内容" v-model="url"></textarea>
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
        <label class="block text-gray-700 text-sm font-bold mb-2" for="result">
          结果
        </label>
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="10" id="result" placeholder="编码结果" v-model="output"></textarea>
      </div>
    </form>
  </ToolContainer>
</template>

<script>
import ToolContainer from "~/components/ToolContainer";
import PrimaryButton from "~/components/PrimaryButton";

export default {
  name: "url-encoding",
  components: {PrimaryButton, ToolContainer},
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
