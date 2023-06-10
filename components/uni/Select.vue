<script>
import {defineComponent} from 'vue'
import {Icon} from "@iconify/vue2";

export default defineComponent({
  name: "Select",
  components: {Icon},
  props: {
    options: {
      type: Array,
      required: true,
      default: []
    },
    value: {
      type: String | Number,
      required: false,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      showOptions: false,
      selectedIconFlag: true,
    };
  },
  computed: {
    selectedOption() {
      return this.options.find(
        (option) => option.value === this.value
      ) || {}
    },
    anyOptionHasIcon() {
      return this.options.some((option) => option.icon);
    },
  },
  mounted() {
    // Set the min-width of the select to the width of the longest option
    if (this.$refs.options && this.$refs.options.children) {
      const optionsRefs = this.$refs.options.children
      const optionsWidths = Array.from(optionsRefs).map((option) => option.offsetWidth)
      this.$refs.select.style.minWidth = `${Math.max(...optionsWidths)}px`
    }
    this.$refs.select.ownerDocument.addEventListener("click", e => {
      if (this.showOptions && !this.$refs.select.contains(e.target)) {
        this.showOptions = false;
      }
    });
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    selectOption(option) {
      this.showOptions = false;
      this.selectedIconFlag = false;
      this.$nextTick(() => {
        this.selectedIconFlag = true;
      });
      this.$emit("input", option.value);
      this.$emit("change", option.value);
    },
  },
  watch: {
    // value(val) {
    //   this.selectOption(this.options.find((option) => option.value === val) || {});
    // },
  },
})
</script>

<template>
  <div>
    <p class="block w-fit text-gray-700 dark:text-slate-300 text-sm font-bold font-['Nunito'] mb-1" v-if="label">
      {{ label }}</p>
    <div class="relative" ref="select-wrapper">
      <button class="w-full p-2 pr-6 rounded-md border border-gray-200 focus:border-gray-400 dark:border-slate-800 dark:focus:border-slate-700 dark:bg-slate-800
                  dark:text-slate-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-['Nunito'] text-left
                  dark:focus:ring-slate-800 focus:ring-opacity-50 dark:focus:ring-opacity-50 transition
                  flex flex-row items-center gap-2.5 relative overflow-hidden"
              ref="select" @click="toggleOptions" type="button">
      <span v-if="selectedOption.icon && !selectedIconFlag && anyOptionHasIcon"
            class="inline-block w-4 h-4 pointer-events-none"></span>
        <Icon v-if="selectedOption.icon && selectedIconFlag && anyOptionHasIcon" :icon="selectedOption.icon"
              class="inline-block w-4 h-4 pointer-events-none"/>
        <span class="leading-snug whitespace-nowrap text-sm">{{
            selectedOption.label || selectedOption.value || 'Select a option'
          }}</span>
        <Icon icon="tabler:dots-vertical"
              class="absolute bg-gray-50 text-gray-500 dark:bg-slate-700/50 dark:text-slate-500 inset-y-0 right-0 h-full"/>
      </button>
      <div
        class="absolute top-full right-0 w-fit rounded-md border border-gray-200 focus:border-gray-400 dark:border-slate-800 dark:focus:border-slate-700
             dark:bg-slate-800 overflow-hidden transition shadow-lg -translate-y-4 opacity-0 pointer-events-none z-50"
        :class="{
        '!translate-y-2 opacity-100 pointer-events-auto': showOptions
      }" ref="options">
        <div class="flex flex-row items-center gap-2.5 px-2 py-2 cursor-pointer
                  dark:text-slate-300 font-['Nunito'] transition whitespace-nowrap
                  bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700"
             v-for="(option, index) in options" :key="index"
             :class="{
               '!bg-gray-200 dark:!bg-slate-700 hover:!bg-gray-200 dark:!hover:bg-slate-700': option.value === selectedOption.value,
               'cursor-not-allowed text-gray-300 dark:text-slate-500 hover:bg-white dark:hover:bg-white': option.disabled
             }"
             @click="!option.disabled ? selectOption(option) : null"
        >
          <div class="inline-block w-4 h-4" v-if="!showOptions && anyOptionHasIcon"></div>
          <Icon :icon="option.icon" class="inline-block w-4 h-4" v-if="showOptions && anyOptionHasIcon"/>
          <span class="leading-none whitespace-nowrap text-sm">{{ option.label || 'No label' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
