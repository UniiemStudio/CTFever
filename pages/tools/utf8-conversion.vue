<template>
  <PrimaryContainer>
    <InteractiveBlock>
      <PrimaryArea id="morse" v-model="input" :label="$t('common.text_original_content').toString()"
                   :rows="10" copyable></PrimaryArea>
    </InteractiveBlock>
    <InteractiveBlock class="flex items-center justify-between">
      <div class="space-x-1">
        <PrimaryButton type="button" @click="encode">{{ $t('common.text_encode').toString() }} ↓</PrimaryButton>
        <PrimaryButton type="button" @click="decode">{{ $t('common.text_decode').toString() }} ↑</PrimaryButton>
      </div>
      <PrimaryButton type="button" danger @click="input = ''; output = '';">{{
          $t('common.btn_clean').toString()
        }}
      </PrimaryButton>
    </InteractiveBlock>
    <InteractiveBlock>
      <PrimaryArea id="output" v-model="output" :label="$t('common.text_result_content').toString()"
                   placeholder="UTF8 Code" :rows="10" copyable></PrimaryArea>
    </InteractiveBlock>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import PrimaryButton from "~/components/form/PrimaryButton";

import UTF8Translate from '~/libs/utf8-util';

export default {
  name: "utf8-conversion",
  components: {PrimaryButton, PrimaryArea, InteractiveBlock, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.utf8Conversion.title") + " - " + this.$t("app.name")
    };
  },
  data() {
    return {
      input: '',
      output: '',
    }
  },
  methods: {
    encode() {
      // this.output = encodeURIComponent(this.input);
      this.output = UTF8Translate.Encode(this.input);
    },
    decode() {
      // this.input = decodeURIComponent(this.output);
      this.input = UTF8Translate.Decode(this.output);
    },
  },
}
</script>

<style scoped>

</style>
