<template>
  <PrimaryContainer>
    <form class="primary-form" @submit.prevent="submit">
      <InteractiveDoubleColumns>
        <template v-slot:left>
          <PrimarySelector
            :label="$t('common.text_radix').toString()"
            id="base" v-model="input_base"
            :options="[
              { value: 2, label: 'common.radix.bin' },
              { value: 8, label: 'common.radix.oct' },
              { value: 10, label: 'common.radix.dec' },
              { value: 16, label: 'common.radix.hex' }
            ]"
          />
        </template>
        <template v-slot:right>
          <PrimarySelector
            :label="$t('common.text_mode').toString()"
            id="mode" v-model="input_mode"
            :options="[
              { value: 'continuity', label: 'tool.ascii.continuity' },
              { value: 'split', label: 'tool.ascii.split' }
            ]"
          />
        </template>
      </InteractiveDoubleColumns>
      <InteractiveBlock>
        <PrimaryInput
          id="ascii" :placeholder="input_mode === 'split' ? '65,66,67 => ABC' : '656667 => ABC'" label="ASCII"
          v-model="input_ascii" :disable="input_string !== ''"/>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryInput
          id="string"
          :placeholder="$t('common.text_string').toString()"
          :label="$t('common.text_string').toString()" v-model="input_string" :disable="input_ascii !== ''"/>
      </InteractiveBlock>
      <InteractiveBlock v-if="result !== ''">
        <PrimaryPreBlock :label="$t('common.text_result_content').toString()">
          {{ result }}
        </PrimaryPreBlock>
        <PrimaryButton class="mt-2" type="button" @click="input_ascii = ''; input_string = ''; result = '';" danger>
          {{ $t('common.btn_clean') }}
        </PrimaryButton>
      </InteractiveBlock>
    </form>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import PrimaryButton from "~/components/form/PrimaryButton";
import PrimaryInput from "~/components/form/PrimaryInput";
import PrimarySelector from "~/components/form/PrimarySelector";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";
import PrimaryPreBlock from "~/components/form/PrimaryPreBlock";

export default {
  name: "ascii",
  components: {
    PrimaryPreBlock,
    InteractiveDoubleColumns,
    InteractiveBlock,
    PrimarySelector,
    PrimaryInput,
    PrimaryButton,
    PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.ascii.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.ascii.desc")},
      ],
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
