<template>
  <div>
    <h1>{{ $t('tool.ascii.title') }}</h1>
    <p>{{ $t('tool.ascii.desc') }}</p>
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
