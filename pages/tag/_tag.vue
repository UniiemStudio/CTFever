<template>
  <div>
    <div>
      <div class="py-4 text-center md:text-left">
        <h1 class="text-lg font-bold flex flex-col md:flex-row justify-center md:justify-start items-center space-x-1
                  dark:text-slate-300">
          <Icon icon="tabler:tag" class="text-4xl md:text-xl mb-2 md:mb-0"/>
          <span class="text-lg font-medium"
                v-html="$t('common.text_tag_archive').toString().replace('{}', this.getTagName())"
          ></span>
        </h1>
      </div>
      <div class="my-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Tool v-for="(tool, k) in findToolsByTag()" :key="k" :tool="tool"/>
      </div>
    </div>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue2";

export default {
  name: "TagArchive",
  components: {Icon},
  head() {
    return {
      title: "标签: " + this.getTagName() + " - " + this.$t("app.name"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getTagName() + "的归档"
        }
      ]
    }
  },
  methods: {
    findToolsByTag() {
      let result = [];
      this.$store.state.toolkits.forEach(toolkit => {
        toolkit.tools.forEach(tool => {
          if (tool.tags.filter(item => item === `tags.${this.$route.params.tag}`).length > 0) {
            result.push(tool);
          }
        });
      });
      return result;
    },
    getTagName() {
      return this.$t(`tags.${this.$route.params.tag}`);
    }
  }
}
</script>

<style scoped>

</style>
