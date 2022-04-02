<template>
  <div>
    <h1>{{ $t('tool.urlEncoding.title') }}</h1>
    <p>{{ $t('tool.urlEncoding.desc') }}</p>
  </div>
</template>

<script>
export default {
  name: "url-encoding",
  head() {
    return {
      title: this.$t("tool.urlEncoding.title") + " - " + this.$t("app.name")
    };
  }
}
</script>

<style scoped>

</style>
