<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimaryArea :label="$t('common.text_input').toString()" :placeholder="$t('common.text_plain').toString()"
                     v-model="input" id="input"/>
      </InteractiveBlock>
      <InteractiveDoubleColumns>
        <template v-slot:left>
          <PrimaryInput id="offset" :label="$t('tool.railFenceCipher.rows').toString()"
                        v-model="rows" type="number" min="1" max="26"/>
        </template>
        <template v-slot:right>
          <PrimarySelector id="type" :label="$t('common.text_type').toString()" v-model="type" :options="typeOptions"/>
        </template>
      </InteractiveDoubleColumns>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="space-x-1">
          <PrimaryButton type="button" @click="encode">{{ $t('common.btn_encode') }}</PrimaryButton>
          <PrimaryButton type="button" @click="decode">{{ $t('common.btn_decode') }}</PrimaryButton>
        </div>
        <PrimaryButton type="reset" danger>{{ $t('common.btn_clean') }}</PrimaryButton>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea :label="$t('common.text_output').toString()" v-model="output" id="output"/>
      </InteractiveBlock>
    </form>
    <!--    <PrimaryIntroduction title="栅栏密码(基础型 / W 型)" :document="intro"/>-->
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";
import PrimaryInput from "~/components/form/PrimaryInput";
import PrimarySelector from "~/components/form/PrimarySelector";
import PrimaryButton from "~/components/form/PrimaryButton";

import {RailFence, RailFenceW} from "~/libs/railFence";

export default {
  name: "rail-fence-cipher",
  components: {
    PrimaryButton,
    PrimarySelector,
    PrimaryInput,
    InteractiveDoubleColumns, PrimaryArea, InteractiveBlock, PrimaryIntroduction, PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.railFenceCipher.title") + " - " + this.$t("app.name")
    };
  },
  async asyncData({$content}) {
    const intro = await $content('intro/rail-fence').fetch();
    return {intro};
  },
  data() {
    return {
      input: "",
      output: "",
      rows: 3,
      type: "w",
      typeOptions: [
        {label: '基础型', value: 'standard'},
        {label: 'W型', value: 'w'},
      ]
    }
  },
  methods: {
    encode() {
      if (this.type === 'standard')
        this.output = RailFence(this.input)['encode'](this.rows);
      else
        this.output = RailFenceW(this.input)['encode'](this.rows);
    },
    decode() {
      if (this.type === 'standard')
        this.output = RailFence(this.input)['decode'](this.rows);
      else
        this.output = RailFenceW(this.input)['decode'](this.rows);
    },
  }
}
</script>

<style scoped>

</style>
