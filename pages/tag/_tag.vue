<template>
  <div>
    <div>
      <div class="py-4 text-center md:text-left">
        <h1 class="text-lg font-bold flex flex-col md:flex-row justify-center md:justify-start items-center space-x-1">
          <ion-icon class="text-4xl md:text-xl mb-2 md:mb-0" name="search-outline"></ion-icon>
          <span class="text-lg">标签：{{ $route.params.tag }} 的归档</span>
        </h1>
      </div>
      <div class="my-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Tool v-for="(tool, k) in findToolsByTag($route.params.tag)" :key="k" :tool="tool"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagArchive",
  head() {
    return {
      title: "标签: " + this.$route.params.tag + " - " + this.$t("app.name"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$route.params.tag + "的归档"
        }
      ]
    }
  },
  methods: {
    findToolsByTag(tag) {
      let result = [];
      this.$store.state.toolkits.forEach(toolkit => {
        toolkit.tools.forEach(tool => {
          if (tool.tags.filter(item => item === this.$route.params.tag).length > 0) {
            result.push(tool);
          }
        });
      });
      return result;
    },
  }
}
</script>

<style scoped>

</style>
