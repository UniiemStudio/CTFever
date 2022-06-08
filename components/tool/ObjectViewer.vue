<template>
  <div>
    <div
      class="mt-2 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
             border border-gray-200 dark:border-slate-500 rounded-lg p-2">
      <div v-for="(v, k) in data" @click="copy(v)"
           class="cursor-pointer transition p-2 hover:bg-gray-100 rounded-lg active:shadow-inner">
        <h1 class="text-base font-normal dark:text-slate-300 overflow-x-hidden">{{ k }}</h1>
        <p class="text-sm font-thin dark:text-slate-500 overflow-x-hidden">{{ v }}</p>
      </div>
    </div>
    <div class="mt-1 text-xs italic text-gray-300 select-none flex flex-row justify-between">
      <span>单击项目可以复制其值</span>
      <span v-html="tip"></span>
    </div>
  </div>
</template>

<script>
import {copyTextToClipboard} from '~/libs/common';

export default {
  name: "ObjectViewer",
  props: {
    object: {
      type: Object | null,
      required: true
    },
    map: {
      type: Object,
      required: false
    },
    tip: {
      type: String,
      required: false,
    },
    noSort: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    data() {
      let result = '';
      if (this.object) {
        let object = this.object;
        if (this.noSort) {
          object = Object.keys(object).reduce((r, k) => {
            r[k] = object[k];
            return r;
          }, {});
        } else {
          object = Object.keys(object).sort().reduce((r, k) => {
            r[k] = object[k];
            return r;
          }, {});
        }

        result = {};
        if (this.map) {
          for (let key in object) {
            result[this.map[key] || key] = object[key];
          }
        } else {
          result = object;
        }
      }
      return result;
    }
  },
  methods: {
    copy(text) {
      copyTextToClipboard(text);
    }
  }
}
</script>

<style scoped>

</style>
