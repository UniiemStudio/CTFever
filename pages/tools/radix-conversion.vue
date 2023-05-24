<template>
  <PrimaryContainer>
    <InteractiveBlock class="space-y-2">
      <PrimaryInput id="radix-2" v-model="formData['r2']" :label="$t('common.radix.bin').toString()"
                    @input="inputHandler('r2')" placeholder="Binary..." copyable/>
      <PrimaryInput id="radix-8" v-model="formData['r8']" :label="$t('common.radix.oct').toString()"
                    @input="inputHandler('r8')" placeholder="Octal..." copyable/>
      <PrimaryInput id="radix-10" v-model="formData['r10']" :label="$t('common.radix.dec').toString()"
                    @input="inputHandler('r10')" placeholder="Decimal..." copyable/>
      <PrimaryInput id="radix-16" v-model="formData['r16']" :label="$t('common.radix.hex').toString()"
                    @input="inputHandler('r16')" placeholder="Hexadecimal..." copyable/>
      <PrimaryInput id="readable" v-model="formData['readable']" :label="$t('tool.radixConversion.readable').toString()"
                    @input="inputHandler('readable')" placeholder="Readable..." copyable/>
    </InteractiveBlock>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryInput from "~/components/form/PrimaryInput";

import {decimal_to_readable, radixc, readable_to_decimal} from '~/libs/radixc';

export default {
  name: "radix-conversion",
  components: {PrimaryInput, InteractiveBlock, PrimaryIntroduction, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.radixConversion.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.radixConversion.desc")},
      ],
    };
  },
  mounted() {
    for (let format in this.formData) {
      if (this.$route.query[format] && this.$route.query[format] !== '') {
        this.formData[format] = this.$route.query[format];
        this.inputHandler(format);
      }
    }
  },
  data() {
    return {
      formData: {
        ['r2']: "",
        ['r8']: "",
        ['r10']: "",
        ['r16']: "",
        ['readable']: "",
      },
    };
  },
  methods: {
    convert(val, from, to) {
      return radixc(val, from, to);
    },
    inputHandler(eventFormat) {
      const eventValue = this.formData[eventFormat];
      this.$router.replace({
        query: {
          [eventFormat]: eventValue
        }
      })
      if (eventValue === '') {
        for (let format in this.formData) {
          if (format !== eventFormat) {
            this.formData[format] = '';
          }
        }
        return
      }
      if (eventFormat === 'readable') {
        const decimal = readable_to_decimal(eventValue);
        if (decimal === null) {
          return
        }
        for (let format in this.formData) {
          if (format !== eventFormat) {
            if (format === 'readable') {
              this.formData[format] = eventValue;
              continue
            }
            this.formData[format] = this.convert(
              decimal,
              10,
              parseInt(format.replace('r', ''))
            );
          }
        }
        return
      }
      for (let format in this.formData) {
        if (format !== eventFormat) {
          if (format === 'readable') {
            this.formData[format] = decimal_to_readable(
              this.convert(
                eventValue,
                parseInt(eventFormat.replace('r', '')),
                10
              )
            );
            continue
          }
          this.formData[format] = this.convert(
            eventValue,
            parseInt(eventFormat.replace('r', '')),
            parseInt(format.replace('r', '')));
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
