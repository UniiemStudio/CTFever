<script>
import {defineComponent} from 'vue'
import PrimaryInput from "~/components/form/PrimaryInput.vue";

import {byte, DATA_UNITS} from '~/libs/dataUnitConversion'
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction.vue";

export default defineComponent({
  name: "data-units-conversion",
  computed: {
    DATA_UNITS() {
      return DATA_UNITS
    }
  },
  components: {PrimaryIntroduction, PrimaryInput},
  head() {
    return {
      title: this.$t("tool.dataUnitsConversion.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.dataUnitsConversion.desc")},
      ],
    }
  },
  data() {
    return {
      fields: [
        {
          title: '比特和字节',
          items: [
            {
              unit: DATA_UNITS.BYTE,
              label: 'byte',
              fullName: null,
            },
            {
              unit: DATA_UNITS.BIT,
              label: 'bit',
              fullName: null,
            },
            {
              unit: DATA_UNITS.KILOBIT,
              label: 'kbit',
              fullName: 'Kilobit',
            },
            {
              unit: DATA_UNITS.MEGABIT,
              label: 'Mbit',
              fullName: 'Megabit',
            },
            {
              unit: DATA_UNITS.GIGABIT,
              label: 'Gbit',
              fullName: 'Gigabit',
            },
            {
              unit: DATA_UNITS.TERABIT,
              label: 'Tbit',
              fullName: 'Terabit',
            },
          ]
        },
        {
          title: '十进制单位(SI)',
          items: [
            {
              unit: DATA_UNITS.KILOBYTE,
              label: 'KB',
              fullName: 'Kilobyte',
            },
            {
              unit: DATA_UNITS.MEGABYTE,
              label: 'MB',
              fullName: 'Megabyte',
            },
            {
              unit: DATA_UNITS.GIGABYTE,
              label: 'GB',
              fullName: 'Gigabyte',
            },
            {
              unit: DATA_UNITS.TERABYTE,
              label: 'TB',
              fullName: 'Terabyte',
            },
          ]
        },
        {
          title: '二进制单位(IEC)',
          items: [
            {
              unit: DATA_UNITS.KIBIBYTE,
              label: 'KiB',
              fullName: 'Kibibyte',
            },
            {
              unit: DATA_UNITS.MEBIBYTE,
              label: 'MiB',
              fullName: 'Mebibyte',
            },
            {
              unit: DATA_UNITS.GIBIBYTE,
              label: 'GiB',
              fullName: 'Gibibyte',
            },
            {
              unit: DATA_UNITS.TEBIBYTE,
              label: 'TiB',
              fullName: 'Tebibyte',
            },
          ]
        },
      ],
      formData: {
        [DATA_UNITS.BYTE]: "",
        [DATA_UNITS.BIT]: "",
        [DATA_UNITS.KILOBIT]: "",
        [DATA_UNITS.MEGABIT]: "",
        [DATA_UNITS.GIGABIT]: "",
        [DATA_UNITS.TERABIT]: "",
        [DATA_UNITS.KILOBYTE]: "",
        [DATA_UNITS.MEGABYTE]: "",
        [DATA_UNITS.GIGABYTE]: "",
        [DATA_UNITS.TERABYTE]: "",
        [DATA_UNITS.KIBIBYTE]: "",
        [DATA_UNITS.MEBIBYTE]: "",
        [DATA_UNITS.GIBIBYTE]: "",
        [DATA_UNITS.TEBIBYTE]: "",
      },
    }
  },
  mounted() {
    const shared_value = this.$route.query.byte
    if (shared_value) {
      this.formData[DATA_UNITS.BYTE] = shared_value
      this.inputHandler(DATA_UNITS.BYTE)
    }
  },
  methods: {
    inputHandler(eventUnit) {
      const eventValue = this.formData[eventUnit]
      if (eventValue === "") {
        for (let unit in this.formData) {
          if (unit !== eventUnit) {
            this.formData[unit] = ""
          }
        }
        return
      }
      for (let unit in this.formData) {
        if (unit !== eventUnit) {
          const [value, targetUnit] = byte(eventValue, eventUnit).to(unit)
          this.formData[unit] = value
        }
      }
      this.$router.replace({
        query: {
          ...this.$route.query,
          byte: this.formData[DATA_UNITS.BYTE]
        }
      })
    }
  },
})
</script>

<template>
  <div>
    <div class="grid gap-4 grid-cols-1 lg:grid-cols-3">
      <div v-for="(field, k) in fields" :key="k"
           class="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-600">
        <h2 class="text-slate-400 font-bold text-lg mb-3">{{ field.title }}</h2>
        <div class="space-y-2">
          <div v-for="(item, k) in field.items" :key="k" class="flex flex-row items-center">
            <PrimaryInput class="w-full" :id="item.label" :placeholder="item.label" type="number"
                          :label="`${item.label}${item.fullName ? ` (${item.fullName})` : ''}`"
                          @input="inputHandler(item.unit)" v-model="formData[item.unit]"/>
            <span class="ml-2 mt-7 font-bold dark:text-slate-400 font-mono">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <PrimaryIntroduction
      path="intro/data-unit-conversion" no-margin
      :references="[
              {
                name: 'Wikipedia - Bit',
                url: 'https://en.wikipedia.org/wiki/Bit'
              },
              {
                name: 'Wikipedia - Byte',
                url: 'https://en.wikipedia.org/wiki/Byte'
              },
              {
                name: 'ISO/IEC 80000-13:2008',
                url: 'https://en.wikipedia.org/wiki/ISO/IEC_80000#Part_13:_Information_science_and_technology'
              }
            ]"/>
  </div>
</template>

<style scoped>

</style>
