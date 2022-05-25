<template>
  <!-- mt-4 -->
  <footer class="mx-auto pattern-diagonal-stripes-sm bg-gray-50 text-gray-100 lg:rounded
                dark:bg-slate-900 dark:text-slate-800 font-['Nunito']">
    <div class="w-full h-full py-4 flex flex-col text-sm justify-center items-center text-gray-500">
      <p class="mt-2 dark:text-gray-300">CTFever for everyone</p>
      <p class="text-xs text-gray-400 mt-1">
        Made with <span><ion-icon class="animate-bounce animate-pulse text-red-400" name="heart"></ion-icon></span> by
        Uniiem, in memory of BoxMoe
      </p>
      <p class="text-xs text-gray-400 mt-1">&copy; 2022 Uniiem Studio</p>
      <div class="mt-2 flex flex-row space-x-1 text-xl">
        <a href="https://github.com/UniiemStudio/CTFever" target="_blank">
          <ion-icon name="logo-github"></ion-icon>
        </a>
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
