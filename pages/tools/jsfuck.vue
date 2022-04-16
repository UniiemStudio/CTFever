<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimaryArea id="input" v-model="input_code" label="JavaScript 代码" placeholder="JavaScript Code..."
                     :rows="10"></PrimaryArea>
      </InteractiveBlock>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="space-x-1">
          <PrimaryButton type="button" @click="encode">编码 ↓</PrimaryButton>
          <a-checkbox v-model:checked="wrapWithEval">用 eval 函数包裹</a-checkbox>
          <!--          <PrimaryButton type="button" @click="decode">解码 ↑</PrimaryButton>-->
        </div>
        <PrimaryButton type="button" danger @click="input_code = ''; output = '';">清空</PrimaryButton>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea id="output" v-model="output" label="JSFucked" placeholder="" :rows="10"></PrimaryArea>
        <!--        <PrimaryPreBlock>{{ output }}</PrimaryPreBlock>-->
      </InteractiveBlock>
    </form>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import PrimaryButton from "~/components/form/PrimaryButton";
import PrimaryPreBlock from "~/components/form/PrimaryPreBlock";

import Jsfuck from 'jsfuck';

export default {
  name: "jsfuck",
  components: {PrimaryPreBlock, PrimaryButton, PrimaryArea, InteractiveBlock, PrimaryContainer},
  data() {
    return {
      input_code: "",
      output: "",
      wrapWithEval: true,
    };
  },
  methods: {
    encode() {
      this.output = Jsfuck.JSFuck.encode(this.input_code, this.wrapWithEval);
    },
  },
}
</script>

<style scoped>

</style>
