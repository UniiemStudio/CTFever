<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimaryArea id="morse" v-model="input" :label="$t('common.text_plain').toString()"
                     :placeholder="$t('common.text_original_content').toString()" :rows="10" copyable></PrimaryArea>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryInput id="key" :label="$t('common.text_secret').toString()" v-model="key" type="string"/>
      </InteractiveBlock>
      <InteractiveBlock>
        <div class="flex flex-row justify-between items-center">
          <div class="space-x-1">
            <PrimaryButton type="button" @click="encode">{{ $t('common.btn_encode') }} ↓</PrimaryButton>
            <PrimaryButton type="button" @click="decode">{{ $t('common.btn_decode') }} ↑</PrimaryButton>
          </div>
          <PrimaryButton type="button" danger @click="input = ''; output = ''; key = ''">{{
              $t('common.btn_clean')
            }}
          </PrimaryButton>
        </div>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea id="output" v-model="output" label="Vigenere Cipher"
                     :placeholder="$t('common.text_result_content').toString()" :rows="10" copyable></PrimaryArea>
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
      title: this.$t("tool.vigenereCipher.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.vigenereCipher.desc")},
      ],
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
