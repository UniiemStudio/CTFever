<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimaryArea id="url" v-model="input" :label="$t('common.text_input').toString()"
                     :rows="10"></PrimaryArea>
      </InteractiveBlock>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="space-x-1">
          <UniButton @click="output = encodeURIComponent(input)">
            {{ $t('common.btn_encode') }}
          </UniButton>
          <UniButton @click="output = decodeURIComponent(input)">
            {{ $t('common.btn_decode') }}
          </UniButton>
        </div>
        <UniButton @click="swap" icon="tabler:arrows-up-down">{{ $t('common.btn_swap') }}</UniButton>
        <UniButton @click="input = ''; output = '';" icon="tabler:trash" danger>{{ $t('common.btn_clean') }}</UniButton>
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
import PrimaryArea from "~/components/form/PrimaryTextArea";
import InteractiveBlock from "~/components/tool/InteractiveBlock";

export default {
  name: "url-encoding",
  components: {InteractiveBlock, PrimaryArea, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.urlEncoding.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.urlEncoding.desc")},
      ],
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
