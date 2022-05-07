<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock class="space-y-2">
        <PrimaryInput id="radix-2" v-model="radix2" :label="$t('common.radix.bin').toString()"
                      placeholder="Binary..."/>
        <PrimaryInput id="radix-8" v-model="radix8" :label="$t('common.radix.oct').toString()"
                      placeholder="Octal..."/>
        <PrimaryInput id="radix-10" v-model="radix10" :label="$t('common.radix.dec').toString()"
                      placeholder="Decimal..."/>
        <PrimaryInput id="radix-16" v-model="radix16" :label="$t('common.radix.hex').toString()"
                      placeholder="Hexadecimal..."/>
      </InteractiveBlock>
    </form>
    <!--    <PrimaryIntroduction/>-->
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryInput from "~/components/form/PrimaryInput";

import radixc from '~/libs/radixc';

export default {
  name: "radix-conversion",
  components: {PrimaryInput, InteractiveBlock, PrimaryIntroduction, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.radixConversion.title") + " - " + this.$t("app.name")
    };
  },
  data() {
    return {
      radix2: "",
      radix8: "",
      radix10: "",
      radix16: ""
    };
  },
  watch: {
    radix2: function (val) {
      this.radix8 = this.convert(val, 2, 8);
      this.radix10 = this.convert(val, 2, 10);
      this.radix16 = this.convert(val, 2, 16);
    },
    radix8: function (val) {
      this.radix2 = this.convert(val, 8, 2);
      this.radix10 = this.convert(val, 8, 10);
      this.radix16 = this.convert(val, 8, 16);
    },
    radix10: function (val) {
      this.radix2 = this.convert(val, 10, 2);
      this.radix8 = this.convert(val, 10, 8);
      this.radix16 = this.convert(val, 10, 16);
    },
    radix16: function (val) {
      this.radix2 = this.convert(val, 16, 2);
      this.radix8 = this.convert(val, 16, 8);
      this.radix10 = this.convert(val, 16, 10);
    }
  },
  methods: {
    convert(val, from, to) {
      return radixc(val, from, to);
    }
  }
}
</script>

<style scoped>

</style>
