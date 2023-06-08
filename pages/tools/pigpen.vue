<template>
  <PrimaryContainer>
    <InteractiveDoubleColumns>
      <template v-slot:left>
        <InteractiveBlock>
          <div class="flex flex-col dark:text-slate-300">
            <div v-for="(rowList,key) in valueList" :key="key"
                 class="font-['pigpen-regular'] text-4xl w-full flex justify-around">
              <span v-for="(rowValue, i) in rowList" :key="i" @click="add(rowValue)"
                    class="hover:text-cyan-500 cursor-pointer">{{ rowValue }}</span>
            </div>
          </div>
        </InteractiveBlock>
      </template>
      <template v-slot:right>
        <InteractiveBlock>
          <UniInput id="input" :label="$t('common.text_cipher').toString()" v-model="result" class="pig-font" disabled/>
        </InteractiveBlock>
        <InteractiveBlock>
          <UniInput id="output" :label="$t('common.text_plain').toString()" v-model="result" copyable/>
        </InteractiveBlock>
        <InteractiveBlock class="flex items-center space-x-1">
          <!--          <Icon icon="tabler:backspace" class="inline text-base" />-->
          <UniButton @click="backspace" icon="tabler:backspace" class="!py-2"></UniButton>
          <UniButton @click="clear">{{ $t('common.btn_clean') }}</UniButton>
        </InteractiveBlock>
      </template>
    </InteractiveDoubleColumns>
  </PrimaryContainer>
</template>

<script>
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";
import {Icon} from "@iconify/vue2";

export default {
  name: "pigpen",
  components: {Icon, InteractiveDoubleColumns, PrimaryContainer, InteractiveBlock},
  head() {
    return {
      title: this.$t("tool.pigpen.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.pigpen.desc")},
      ],
    };
  },
  data() {
    return {
      result: "",
      valueList: [
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
        ['j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'],
        ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z', ':'],
        ['<', '>', '?', '@', ';', '=', '[', '\\', ']'],
        ['^', '_', `\``, '{', '}', '|', '~', '%', '+'],
      ],
    };
  },
  watch: {},
  methods: {
    add(value) {
      this.result += value
    },
    clear() {
      this.result = ""
    },
    backspace() {
      this.result = this.result.slice(0, -1);
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: "pigpen-regular";
  src: url("../static/pigpen/pigpen-regular.woff2") format("woff2"),
  url("../static/pigpen/pigpen-regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

.pig-font {
  font-family: "pigpen-regular", serif;
}
</style>
