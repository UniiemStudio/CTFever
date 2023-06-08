<template>
  <PrimaryContainer>
    <form class="primary-form" @submit.prevent="submit">
      <InteractiveDoubleColumns>
        <template v-slot:left>
          <UniSelect :label="$t('common.text_radix').toString()" v-model="input_base" :options="[
              { value: 2, label: $t('common.radix.bin'), icon: 'tabler:binary' },
              { value: 8, label: $t('common.radix.oct'), icon: 'tabler:number-8' },
              { value: 10, label: $t('common.radix.dec'), icon: 'tabler:decimal' },
              { value: 16, label: $t('common.radix.hex'), icon: 'mdi:hexadecimal' }
            ]"/>
        </template>
        <template v-slot:right>
          <UniSelect :label="$t('common.text_mode').toString()" v-model="input_mode" :options="[
              { value: 'continuity', label: $t('tool.ascii.continuity'), icon: 'tabler:abc' },
              { value: 'split', label: $t('tool.ascii.split'), icon: 'mdi:comma-box-outline' }
            ]"/>
        </template>
      </InteractiveDoubleColumns>
      <InteractiveBlock>
        <UniInput :placeholder="input_mode === 'split' ? '65,66,67 => ABC' : '656667 => ABC'" label="ASCII"
                  v-model="input_ascii" :disabled="input_string !== ''"/>
      </InteractiveBlock>
      <InteractiveBlock>
        <UniInput :placeholder="$t('common.text_string').toString()"
                  :label="$t('common.text_string').toString()" v-model="input_string" :disabled="input_ascii !== ''"/>
      </InteractiveBlock>
      <InteractiveBlock v-if="result !== ''">
        <PrimaryPreBlock :label="$t('common.text_result_content').toString()">
          {{ result }}
        </PrimaryPreBlock>
        <UniButton class="mt-2" @click="input_ascii = ''; input_string = ''; result = '';" danger>
          {{ $t('common.btn_clean') }}
        </UniButton>
      </InteractiveBlock>
    </form>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";
import PrimaryPreBlock from "~/components/form/PrimaryPreBlock";

export default {
  name: "ascii",
  components: {
    PrimaryPreBlock,
    InteractiveDoubleColumns,
    InteractiveBlock,
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
      input_base: 10,
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
