<template>
  <InteractiveBlock>
    <table class="t-table pig-font pig-font-size" title="猪圈密码">
      <tbody>
      <tr v-for="(rowList,key) in valueList" :key="key">
        <td v-for="(rowValue, i) in rowList" :key="i" @click="add(rowValue)">{{ rowValue }}</td>
      </tr>
      </tbody>
    </table>
    <InteractiveBlock>
      <PrimaryInput id="output" label="密文" v-model="result" class="pig-font" disable/>
      <PrimaryInput id="output" label="明文" v-model="result" disable/>
    </InteractiveBlock>
    <InteractiveBlock>
      <PrimaryButton type="button" @click="clear()">清空</PrimaryButton>
    </InteractiveBlock>
  </InteractiveBlock>
</template>

<script>
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryInput from "~/components/form/PrimaryInput";
import PrimaryButton from "~/components/form/PrimaryButton";

export default {
  name: "pigpen",
  components: {PrimaryButton, PrimaryInput, InteractiveBlock},
  head() {
    return {
      title: this.$t("tool.pigpen.title") + " - " + this.$t("app.name")
    };
  },
  data() {
    return {
      result: "",
      valueList: [
        ['a','b','c','d','e','f','g','h','i'],
        ['j','k','l','m','n','o','p','q','r'],
        ['s','t','u','v','w','x','y','z',':'],
        ['<','>','?','@',';','=','[','\\',']'],
        ['^','_',`\``,'{','}','|','~','%','+'],
      ],
    };
  },
  watch: {

  },
  methods: {
    add(value) {
      this.result += value
    },
    clear() {
      this.result = ""
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: "pigpen-regular";
  src: url("../static/pigpen/pigpen-regular.woff2") format("woff2"),
  url("../static/pigpen/pigpen-regular.woff") format("woff");
  font-weight:normal;
  font-style: normal;
}

.t-table tbody tr:hover{
  background-color: transparent;
}
td:hover{
  color: #009688;
  cursor:pointer;
}
.pig-font{
  font-family: "pigpen-regular",serif;
}
.pig-font-size {
  font-size:60px;
}
</style>
