<template>
  <div>
    <h1>ASCII Tool</h1>
  </div>
</template>

<script>
export default {
  name: "ascii",
  head() {
    return {
      title: this.$t("tool.ascii.title") + " - " + this.$t("app.name")
    };
  }
}
</script>

<style scoped>

</style>
