<template>
  <!-- mt-4 -->
  <footer class="flex-shrink-0 mt-auto mx-0 pattern-diagonal-stripes-sm bg-gray-50 text-gray-100 lg:rounded
                dark:bg-slate-900 dark:text-slate-800 font-['Nunito']">
    <div class="w-full h-full py-4 flex flex-col text-sm justify-center items-center text-gray-500">
      <img src="@/static/icon.svg" width="32" height="32"/>
      <p class="mt-2 dark:text-gray-300">CTFever is open source for everyone</p>
      <p class="text-xs text-gray-400 mt-1">
        Made with <span><ion-icon class="animate-bounce animate-pulse text-red-400" name="heart"></ion-icon></span> by
        Uniiem, in memory of BoxMoe
      </p>
      <p class="text-xs text-gray-400 mt-1">&copy; 2022 Uniiem Studio</p>
      <div class="mt-2 flex flex-row space-x-1 text-xl">
        <a href="https://github.com/UniiemStudio/CTFever" target="_blank">
          <ion-icon name="logo-github"></ion-icon>
        </a>
        <!--        <a class="group text-blue-500 w-fit" href="https://github.com/UniiemStudio/CTFever" target="_blank">-->
        <!--          GitHub-->
        <!--          <ion-icon class="align-middle -mt-0.5 transition-transform group-hover:translate-x-1"-->
        <!--                    name="rocket-outline"/>-->
        <!--        </a>-->
        <!--        <a class="group text-blue-500 w-fit" href="https://uniiem.com" target="_blank">-->
        <!--          Blog-->
        <!--          <ion-icon class="align-middle -mt-0.5 transition-transform group-hover:translate-x-1"-->
        <!--                    name="rocket-outline"/>-->
        <!--        </a>-->
        <!--        <a class="group text-blue-500 w-fit" href="/sitemap.xml" target="_blank">-->
        <!--          Site Map-->
        <!--          <ion-icon class="align-middle -mt-0.5 transition-transform group-hover:translate-x-1"-->
        <!--                    name="rocket-outline"/>-->
        <!--        </a>-->
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

</style>
