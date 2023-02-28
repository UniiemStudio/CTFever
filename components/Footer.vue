<template>
  <!-- mt-4 -->
  <footer class="flex-shrink-0 mt-auto mx-0 pattern-diagonal-stripes-sm bg-gray-50 text-gray-100 lg:rounded
                dark:bg-slate-900 dark:text-slate-800 font-['Nunito']">
    <div class="w-full h-full py-4 flex flex-col text-sm justify-center items-center text-gray-500">
      <img src="@/static/icon.svg" alt="CTFever Logo" width="32" height="32"/>
      <p class="mt-2 dark:text-gray-300">CTFever is open source for everyone</p>
      <p class="text-xs text-gray-400 mt-1">
        Made with
        <span><ion-icon class="animate-bounce animate-pulse text-red-400" name="heart"
                        aria-hidden="true"></ion-icon></span>
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
      <div class="mt-2 flex flex-row space-x-1 text-xl">
        <!--        <a href="https://github.com/UniiemStudio/CTFever" target="_blank">-->
        <!--          <ion-icon name="logo-github"></ion-icon>-->
        <!--        </a>-->
        <!--                <a class="group text-blue-500 w-fit" href="https://github.com/UniiemStudio/CTFever" target="_blank">-->
        <!--                  GitHub-->
        <!--                  <ion-icon class="align-middle -mt-0.5 transition-transform group-hover:translate-x-1"-->
        <!--                            name="rocket-outline"/>-->
        <!--                </a>-->
        <!--                <a class="group text-blue-500 w-fit" href="https://uniiem.com" target="_blank">-->
        <!--                  Blog-->
        <!--                  <ion-icon class="align-middle -mt-0.5 transition-transform group-hover:translate-x-1"-->
        <!--                            name="rocket-outline"/>-->
        <!--                </a>-->
        <!--                <a class="group text-blue-500 w-fit" href="/sitemap.xml" target="_blank">-->
        <!--                  Site Map-->
        <!--                  <ion-icon class="align-middle -mt-0.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"-->
        <!--                            name="rocket-outline"/>-->
        <!--                </a>-->
      </div>
    </div>
  </footer>
</template>

<script>
import CloudShadow from "~/pages/tools/cloud-shadow.vue";

export default {
  name: "Footer",
  components: {CloudShadow}
}
</script>

<style scoped>

</style>
