<template>
  <!-- mt-4 -->
  <footer class="flex-shrink-0 mt-auto mx-0 pattern-diagonal-stripes-sm bg-gray-50 text-gray-100 lg:rounded
                dark:bg-slate-900 dark:text-slate-800 font-['Nunito']">
    <div class="w-full h-full py-4 flex flex-col text-sm justify-center items-center text-gray-500">
      <img src="@/static/icon.svg" alt="CTFever Logo" width="32" height="32"/>
      <p class="mt-2 dark:text-gray-300">CTFever is open source for everyone</p>
      <p class="text-xs text-gray-400 mt-1">
        Made with
        <span>
          <Icon icon="tabler:heart-filled" class="inline animate-bounce animate-pulse text-red-400 -mt-0.5"
                aria-hidden="true"/>
        </span>
        by Uniiem, in memory of BoxMoe
      </p>
      <p class="text-xs text-gray-400 mt-1">&copy; 2023 Uniiem Studio</p>
      <p class="text-xs text-gray-400 mt-2">
        <a href="https://github.com/UniiemStudio/CTFever" target="_blank">GitHub</a> |
        <a href="https://uniiem.com" target="_blank">Blog</a> |
        <!--suppress HtmlUnknownTarget -->
        <a href="/sitemap.xml" target="_blank">SiteMap</a> |
        <a href="https://status.i0x0i.ltd/status/ctfever" target="_blank">Status</a>
      </p>
    </div>
  </footer>
</template>

<script>
import CloudShadow from "~/pages/tools/cloud-shadow.vue";
import {Icon} from "@iconify/vue2";

export default {
  name: "Footer",
  components: {Icon, CloudShadow}
}
</script>

<style scoped>

</style>
