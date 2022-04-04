<template>
  <ToolContainer>
    <form class="bg-white rounded lg:px-8 lg:pt-6" @submit.prevent="submit">
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="base">
            进制
          </label>
          <select
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="base" v-model="input_base">
            <option value="2">二进制</option>
            <option value="8">八进制</option>
            <option value="10">十进制</option>
            <option value="16">十六进制</option>
          </select>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="mode">
            模式
          </label>
          <select
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mode" v-model="input_mode">
            <option value="continuity">连续(自动识别可打印字符)</option>
            <option value="split">逗号分隔</option>
          </select>
        </div>
      </div>
      <div class="mb-4">
        <PrimaryInput
          id="ascii" placeholder="ASCII" label="ASCII" v-model="input_ascii" :disable="input_string !== ''"/>
      </div>
      <div class="mb-4">
        <PrimaryInput
          id="string" placeholder="字符串" label="字符串" v-model="input_string" :disable="input_ascii !== ''"/>
      </div>
      <div class="mb-4" v-if="result !== ''">
        <h1 class="text-gray-700 text-sm font-bold mb-2">结果</h1>
        <pre class="bg-gray-200 rounded-lg p-4 mb-2 text-gray-700">{{ result }}</pre>
        <PrimaryButton type="button" @click="input_ascii = ''; input_string = ''; result = '';" danger>
          重置
        </PrimaryButton>
      </div>
    </form>
  </ToolContainer>
</template>

<script>
import ToolContainer from "~/components/tool/ToolContainer";
import PrimaryButton from "~/components/form/PrimaryButton";
import PrimaryInput from "~/components/form/PrimaryInput";

export default {
  name: "ascii",
  components: {PrimaryInput, PrimaryButton, ToolContainer},
  head() {
    return {
      title: this.$t("tool.ascii.title") + " - " + this.$t("app.name")
    };
  },
  data() {
    return {
      input_ascii: "",
      input_string: "",
      input_base: "10",
      input_mode: "continuity",
      result: '',
    };
  },
  watch: {
    input_ascii() {
      this.input_string = "";
      this.result = this.input_mode === "continuity"
        ? this.infiniteAscii2String(this.input_ascii, parseInt(this.input_base))
        : this.splitAscii2String(this.input_ascii, parseInt(this.input_base));
    },
    input_string() {
      this.input_ascii = "";
      this.result = this.input_mode === "continuity"
        ? this.string2Ascii(this.input_string, parseInt(this.input_base))
        : this.string2Ascii(this.input_string, parseInt(this.input_base), ',');
    }
  },
  methods: {
    submit() {
      console.log(this.infiniteAscii2String(this.input_ascii));
      console.log(this.string2Ascii(this.input_string));
    },
    splitAscii2String(ascii_string, radix = 10) {
      let result = "";
      let arr = ascii_string.split(/[,，]/);
      for (let i = 0; i < arr.length; i++) {
        result += String.fromCharCode(parseInt(arr[i], radix));
      }
      return result;
    },
    // TODO: Required to be improved. The radix should be used to differentiate between the different bases
    infiniteAscii2String(longASCII, radix = 10) {
      let result = "";
      let chars = longASCII.split("");
      let char_temp = 0;
      chars.forEach((char) => {
        if (char_temp + char > 31 && char_temp + char < 127) {
          result += String.fromCharCode(char_temp + char);
          char_temp = 0;
        } else {
          char_temp += char;
        }
      });
      return result;
    },
    string2Ascii(string, radix = 10, separator = null) {
      let resultString = "";
      for (let i = 0; i < string.length; i++) {
        resultString += string.charCodeAt(i).toString(radix).toUpperCase();
        if (separator) resultString += separator;
      }
      if (separator) resultString = resultString.slice(0, -separator.length);
      return resultString;
    }
  },
}
</script>

<style scoped>

</style>
