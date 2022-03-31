<template>
  <div
    class="fixed top-0 h-16 w-full bg-white backdrop-blur-sm shadow hover:shadow-lg transition-shadow flex justify-center">
    <div class="w-full h-full px-4 container flex justify-between items-center">
      <div>
        <h1 class="text-lg font-bold">CTFever</h1>
      </div>
      <div>
        <button class="border border-gray-300 rounded px-2 py-px hover:shadow transition-shadow">SIGN IN</button>
        <button
          class="border border-blue-500 rounded px-2 py-px hover:shadow transition-shadow ml-1 bg-blue-500 text-white">
          SIGN
          UP
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBar"
}
</script>

<style scoped>

</style>
