<template>
  <div>
    <div
      class="my-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
             border border-gray-200 dark:border-slate-500 rounded-lg p-4">
      <div v-for="(v, k) in data" class="mb-2">
        <h1 class="text-base font-normal text-slate-300">{{ k }}</h1>
        <p class="text-sm font-thin text-slate-500">{{ v }}</p>
      </div>
    </div>
  </div>
</template>

<script>
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
    }
  },
  computed: {
    data() {
      let result = '';
      if (this.object) {
        let object = this.object;
        object = Object.keys(object).sort().reduce((r, k) => {
          r[k] = object[k];
          return r;
        }, {});

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
}
</script>

<style scoped>

</style>
