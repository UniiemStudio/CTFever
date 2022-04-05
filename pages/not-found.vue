<template>
  <div class="w-full h-full flex flex-col justify-center items-center md:justify-start md:items-start mt-8 md:mt-4">
    <div class="flex flex-col md:flex-row justify-items-center text-center md:text-left">
      <ion-icon class="text-6xl mx-auto" name="alert-circle-outline"></ion-icon>
      <div class="flex flex-col justify-center ml-0 md:ml-2">
        <h1 class="text-2xl font-bold">{{ $t('page.notFound.title') }}</h1>
        <p v-if="missing !== '/'">{{ missing }}</p>
      </div>
    </div>
    <p class="mt-4">{{ $t('page.notFound.message') }}</p>
    <TinyButtonLink class="mt-4" :to="localePath(from)">
      <!--      TODO: 当进入路由为 404 时无法返回上一级 -->
      {{ from === '/' ? $t('page.notFound.btn') : $t('page.notFound.btnPrevious') }}
    </TinyButtonLink>
  </div>
</template>

<script>
import TinyButtonLink from "~/components/TinyButtonLink";

export default {
  name: "not-found",
  components: {TinyButtonLink},
  head() {
    return {
      title: this.$t("page.notFound.title")
    }
  },
  data() {
    return {
      from: null,
      missing: null
    }
  },
  mounted() {
    this.missing = this.$route.query.missing || '/';
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$data.from = from.path || '/';
    });
  }
}
</script>

<style scoped>

</style>
