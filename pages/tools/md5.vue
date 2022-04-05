<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimaryArea id="input" label="消息原文" placeholder="消息原文" v-model="input" :rows="10"/>
      </InteractiveBlock>
      <InteractiveBlock>
        <!--        <PrimaryArea id="output" label="消息摘要" placeholder="MD5 摘要" v-model="output" :rows="10" disable/>-->
        <PrimaryPreBlock label="MD5 摘要">{{ output }}</PrimaryPreBlock>
      </InteractiveBlock>
    </form>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";

import md5 from 'blueimp-md5';
import PrimaryPreBlock from "~/components/form/PrimaryPreBlock";

export default {
  name: "md5",
  components: {PrimaryPreBlock, PrimaryArea, InteractiveBlock, PrimaryContainer},
  watch: {
    input: function (val) {
      this.output = val === '' ? '' : md5(val);
    }
  },
  data() {
    return {
      input: "",
      output: ""
    };
  },
}
</script>

<style scoped>

</style>
