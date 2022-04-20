<template>
  <PrimaryContainer>
    <h1 class="text-xl">CTFever <span class="font-bold">Premium</span></h1>
    <h2 class="text-sm mb-4 text-gray-400">Coming soon...</h2>
    <p>Premium 版本提供了除 Basic 版本外的额外高级在线功能，包括但不限于：<b>pyc 在线反编译</b>、<b>在线执行 binwalk</b>、<b>端口分析工具</b> 等。Premium 内容将会在
      CTFever Basic 第一个版本开发完毕上线后进入开发流程。Premium 上线初期将会提供免费体验次数。</p>
    <p class="mt-2">CTFever Basic 所含内容将<b>永久免费且开源</b>；Premium 计划提供订阅制收费服务。</p>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";

export default {
  name: "premium-active",
  components: {InteractiveBlock, PrimaryContainer},
  head() {
    return {
      title: "激活 Premium" + " - " + this.$t("app.name"),
    };
  }
}
</script>

<style scoped>

</style>
