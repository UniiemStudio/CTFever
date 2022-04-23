<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock class="space-y-2">
        <PrimaryInput id="cel" v-model="cel" label="摄氏度(℃)" placeholder="Celsius..."/>
        <PrimaryInput id="fah" v-model="fah" label="华氏度(℉)" placeholder="Fahrenheit..."/>
        <PrimaryInput id="kelvin" v-model="kelvin" label="开尔文(K)" placeholder="Kelvin..."/>
        <PrimaryInput id="rankine" v-model="rankine" label="兰氏度" placeholder="Rankine..."/>
        <PrimaryInput id="reaumur" v-model="reaumur" label="列氏度" placeholder="Reaumur..."/>
      </InteractiveBlock>
    </form>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryInput from "~/components/form/PrimaryInput";

import {tempc, TEMPERATURE_TYPE} from '~/libs/tempc';

export default {
  name: "temperature-conversion",
  components: {PrimaryInput, InteractiveBlock, PrimaryIntroduction, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.temperatureConversion.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.temperatureConversion.desc")},
      ],
    };
  },
  data() {
    return {
      cel: "",
      fah: "",
      rankine: "",
      reaumur: "",
      kelvin: "",
    }
  },
  methods: {
    clear() {
      this.cel = "";
      this.fah = "";
      this.rankine = "";
      this.reaumur = "";
      this.kelvin = "";
    },
  },
  watch: {
    cel(val) {
      if (val !== '') {
        this.fah = tempc(val, TEMPERATURE_TYPE.Celsius, TEMPERATURE_TYPE.Fahrenheit);
        this.kelvin = tempc(val, TEMPERATURE_TYPE.Celsius, TEMPERATURE_TYPE.Kelvin);
        this.rankine = tempc(val, TEMPERATURE_TYPE.Celsius, TEMPERATURE_TYPE.Rankine);
        this.reaumur = tempc(val, TEMPERATURE_TYPE.Celsius, TEMPERATURE_TYPE.Reaumur);
      } else {
        this.clear();
      }
    },
    fah(val) {
      if (val !== '') {
        this.cel = tempc(val, TEMPERATURE_TYPE.Fahrenheit, TEMPERATURE_TYPE.Celsius);
        this.kelvin = tempc(val, TEMPERATURE_TYPE.Fahrenheit, TEMPERATURE_TYPE.Kelvin);
        this.rankine = tempc(val, TEMPERATURE_TYPE.Fahrenheit, TEMPERATURE_TYPE.Rankine);
        this.reaumur = tempc(val, TEMPERATURE_TYPE.Fahrenheit, TEMPERATURE_TYPE.Reaumur);
      } else {
        this.clear();
      }
    },
    kelvin(val) {
      if (val !== '') {
        this.cel = tempc(val, TEMPERATURE_TYPE.Kelvin, TEMPERATURE_TYPE.Celsius);
        this.fah = tempc(val, TEMPERATURE_TYPE.Kelvin, TEMPERATURE_TYPE.Fahrenheit);
        this.rankine = tempc(val, TEMPERATURE_TYPE.Kelvin, TEMPERATURE_TYPE.Rankine);
        this.reaumur = tempc(val, TEMPERATURE_TYPE.Kelvin, TEMPERATURE_TYPE.Reaumur);
      } else {
        this.clear();
      }
    },
    rankine(val) {
      if (val !== '') {
        this.cel = tempc(val, TEMPERATURE_TYPE.Rankine, TEMPERATURE_TYPE.Celsius);
        this.fah = tempc(val, TEMPERATURE_TYPE.Rankine, TEMPERATURE_TYPE.Fahrenheit);
        this.kelvin = tempc(val, TEMPERATURE_TYPE.Rankine, TEMPERATURE_TYPE.Kelvin);
        this.reaumur = tempc(val, TEMPERATURE_TYPE.Rankine, TEMPERATURE_TYPE.Reaumur);
      } else {
        this.clear();
      }
    },
  }
}
</script>

<style scoped>

</style>
