<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimaryArea id="morse" v-model="input" :label="$t('common.text_plain').toString()"
                     :placeholder="$t('common.text_original_content').toString()" :rows="10" copyable></PrimaryArea>
      </InteractiveBlock>
      <InteractiveBlock>
        <UniInput id="key" :label="$t('common.text_secret').toString()" v-model="key" :pattern="/^[A-Za-z]*$/g"/>
      </InteractiveBlock>
      <InteractiveBlock>
        <div class="flex flex-row justify-between items-center">
          <div class="flex space-x-1">
            <UniButton type="button" @click="encode" icon="tabler:arrow-narrow-down">{{
                $t('common.btn_encode')
              }}
            </UniButton>
            <UniButton type="button" @click="decode" icon="tabler:arrow-narrow-up">{{
                $t('common.btn_decode')
              }}
            </UniButton>
          </div>
          <UniButton type="button" danger @click="input = ''; output = ''; key = ''">{{
              $t('common.btn_clean')
            }}
          </UniButton>
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

import {decryptVigenere, encryptVigenere} from "~/libs/vigenereCipher";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";


export default {
  name: "vigenereCipher",
  components: {InteractiveDoubleColumns, PrimaryArea, InteractiveBlock, PrimaryContainer},
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
      if (this.input) {
        if (this.key) {
          this.output = encryptVigenere(this.input, this.key);
        } else {
          this.output = "Please input key";
        }
      }
    },
    decode() {
      if (this.output) {
        if (this.key) {
          this.input = decryptVigenere(this.input, this.key);
        } else {
          this.input = "Please input key";
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
