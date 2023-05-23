<template>
  <PrimaryContainer>
    <InteractiveBlock>
      <PrimaryArea id="input" v-model="input" :label="$t('common.text_plain').toString()" :rows="10"
                   copyable></PrimaryArea>
    </InteractiveBlock>
    <InteractiveBlock class="flex items-center justify-between">
      <div class="space-x-1">
        <PrimaryButton type="button" @click="encode">{{ $t('common.btn_encrypt') }} ↓</PrimaryButton>
        <PrimaryButton type="button" @click="decode">{{ $t('common.btn_decrypt') }} ↑</PrimaryButton>
      </div>
      <PrimaryButton type="button" danger @click="input = ''; output = '';">{{
          $t('common.btn_clean')
        }}
      </PrimaryButton>
    </InteractiveBlock>
    <InteractiveBlock>
      <PrimaryArea id="output" v-model="output" :label="$t('common.text_cipher').toString()"
                   :rows="10" copyable></PrimaryArea>
    </InteractiveBlock>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimarySelector from "~/components/form/PrimarySelector";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import PrimaryButton from "~/components/form/PrimaryButton";

import {coreValuesDecode, coreValuesEncode} from '~/libs/coreValuesCipher';

export default {
  name: "core-values-cipher",
  components: {PrimaryButton, PrimaryArea, PrimarySelector, InteractiveBlock, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.coreValues.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.coreValues.desc")},
      ],
    };
  },
  data() {
    return {
      input: "",
      output: "",
    }
  },
  methods: {
    encode() {
      this.output = coreValuesEncode(this.input);
    },
    decode() {
      this.input = coreValuesDecode(this.output);
    }
  },
}
</script>

<style scoped>

</style>
