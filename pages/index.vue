<template>
  <div>
    <div v-for="(toolkit, k) in $store.state.toolkits" :key="k">
      <div class="py-4 text-center md:text-left">
        <h1 class="text-lg font-bold">{{ $t(toolkit.title) || toolkit.title }}</h1>
        <p>{{ $t(toolkit.description) || toolkit.description }}</p>
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
  name: 'IndexPage'
}
</script>
