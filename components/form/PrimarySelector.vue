<template>
  <div>
    <label v-if="label" class="block text-gray-700 dark:text-slate-300 text-sm font-bold font-['Nunito'] mb-2"
           :for="id">
      {{ label }}
    </label>
    <div class="relative group">
      <select
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
             focus:ring transition duration-300 relative
             dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600"
        :class="{'text-gray-300 dark:text-slate-500 bg-gray-50': disable}"
        :id="id" :value="value" @input="$emit('input', $event.target.value)" :disabled="disable">
        <option v-for="(option, k) in options" :k="k" :value="option.value" class="mt-4">
          {{ (option.label === $t(option.label)) ? option.label : $t(option.label) }}
        </option>
      </select>
      <div
        class="absolute top-[calc(50%-0.625rem)] right-2 transition group-focus-within:rotate-180 dark:text-slate-500">
        <Icon icon="tabler:chevron-down" class="text-xl"/>
      </div>
    </div>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue2";

export default {
  name: "PrimarySelector",
  components: {Icon},
  props: {
    id: {
      type: String,
      default: 'primary-select',
    },
    label: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    disable: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [
        {
          value: '',
          label: '请选择',
        },
      ],
    },
  },
  methods: {}
}
</script>

<style scoped>

</style>
