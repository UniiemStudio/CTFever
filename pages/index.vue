<template>
  <div>
    <div v-for="(toolkit, k) in $store.state.toolkits" :key="k">
      <div class="py-4 text-center md:text-left">
        <h1 class="text-lg font-bold flex flex-col md:flex-row justify-center md:justify-start items-center space-x-1">
          <ion-icon class="text-4xl md:text-xl mb-2 md:mb-0" :name="toolkit.icon || 'albums-outline'"></ion-icon>
          <span class="text-lg">{{ $t(toolkit.title) || toolkit.title }}</span>
          <!--          <span class="bg-gray-300 rounded-full w-4 h-4 text-xs text-center align-middle">-->
          <!--            {{ toolkit.tools.length }}-->
          <!--          </span>-->
        </h1>
        <p class="text-sm font-thin">{{ $t(toolkit.description) || toolkit.description }}</p>
      </div>
      <div class="my-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div
          v-for="(tool, k) in toolkit.tools" :key="k" @click="$router.push(localePath(tool.route))"
          class="rounded-lg border border-gray-200 shadow hover:shadow-md transition-all p-4 cursor-pointer"
        >
          <h1 class="text-lg">{{ $t(tool.title) || tool.title }}</h1>
          <p>{{ $t(tool.description) || tool.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
