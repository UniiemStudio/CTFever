<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimaryArea :label="$t('common.text_input').toString()" :placeholder="$t('common.text_plain').toString()"
                     v-model="input" id="input"/>
      </InteractiveBlock>
      <InteractiveDoubleColumns>
        <template v-slot:left>
          <UniInput id="offset" :label="$t('tool.railFenceCipher.rows').toString()"
                    v-model="rows" type="number" min="1" max="26"/>
        </template>
        <template v-slot:right>
          <UniSelect id="type" :label="$t('common.text_type').toString()" v-model="type" :options="typeOptions"/>
        </template>
      </InteractiveDoubleColumns>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="space-x-1">
          <UniButton @click="encode">{{ $t('common.btn_encode') }}</UniButton>
          <UniButton @click="decode">{{ $t('common.btn_decode') }}</UniButton>
        </div>
        <UniButton type="reset" danger icon="tabler:trash">{{ $t('common.btn_clean') }}</UniButton>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea :label="$t('common.text_output').toString()" v-model="output" id="output" copyable/>
      </InteractiveBlock>
    </form>
    <PrimaryIntroduction title="栅栏密码(基础型 / W 型)" path="intro/rail-fence"/>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";

import {RailFence, RailFenceW} from "~/libs/railFence";

export default {
  name: "rail-fence-cipher",
  components: {
    InteractiveDoubleColumns, PrimaryArea, InteractiveBlock, PrimaryIntroduction, PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.railFenceCipher.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.railFenceCipher.desc")},
      ],
    };
  },
  data() {
    return {
      input: "",
      output: "",
      rows: 3,
      type: "w",
      typeOptions: [
        {label: '基础型', value: 'standard', disabled: true},
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
