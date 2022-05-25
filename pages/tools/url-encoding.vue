<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimaryArea id="url" v-model="input" :label="$t('common.text_input').toString()"
                     :rows="10"></PrimaryArea>
      </InteractiveBlock>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="space-x-1">
          <PrimaryButton type="button" @click="output = encodeURIComponent(input)">
            {{ $t('common.btn_encode') }}
          </PrimaryButton>
          <PrimaryButton type="button" @click="output = decodeURIComponent(input)">
            {{ $t('common.btn_decode') }}
          </PrimaryButton>
        </div>
        <PrimaryButton type="button" @click="swap">↑ {{ $t('common.btn_swap') }} ↓</PrimaryButton>
        <PrimaryButton type="button" danger @click="input = ''; output = '';">
          {{ $t('common.btn_clean') }}
        </PrimaryButton>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea id="result" v-model="output" :label="$t('common.text_result_content').toString()"
                     :rows="10" copyable></PrimaryArea>
      </InteractiveBlock>
    </form>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import PrimaryButton from "~/components/form/PrimaryButton";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import InteractiveBlock from "~/components/tool/InteractiveBlock";

export default {
  name: "url-encoding",
  components: {InteractiveBlock, PrimaryArea, PrimaryButton, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.urlEncoding.title") + " - " + this.$t("app.name")
    };
  },
  data() {
    return {
      input: '',
      output: ''
    }
  },
  methods: {
    swap() {
      [this.input, this.output] = [this.output, this.input];
    }
  }
}
</script>

<style scoped>

</style>
