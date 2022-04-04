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
            <option value="continuity">连续</option>
            <option value="split">逗号分隔</option>
          </select>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="ascii">
          ASCII
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="ascii" type="text" placeholder="ASCII" v-model="input_ascii" :disabled="input_string !== ''">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="string">
          字符串
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="string" type="text" placeholder="字符串" v-model="input_string" :disabled="input_ascii !== ''">
      </div>
      <div class="mb-4" v-if="result !== ''">
        <h1 class="text-gray-700 text-sm font-bold mb-2">结果</h1>
        <pre class="bg-gray-200 rounded-lg p-4 mb-2 text-gray-700">{{ result }}</pre>
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button" @click="input_ascii = ''; input_string = ''">
          清空
        </button>
      </div>
    </form>
  </ToolContainer>
</template>

<script>
import ToolContainer from "~/components/ToolContainer";

export default {
  name: "ascii",
  components: {ToolContainer},
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
    infiniteAscii2String(longASCII, radix = 10) {
      let string = "";
      let arr = longASCII.split("");
      let tmp_str = "";
      arr.forEach((item) => {
        if(tmp_str+item > 31 && tmp_str+item < 127) {
          string += String.fromCharCode(tmp_str+item);
          tmp_str = "";
        }else{
          tmp_str += item;
        }
      });
      return string;
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
