<template>
  <div>
    <div class="p-4 bg-white rounded-lg border border-gray-200">
      <p class="font-bold mb-2">Welcome to CTFever!</p>
      <p class="mb-2">这是为 CTF 发烧者准备的的工具套件，助你过关斩将、攻克难关。这个项目仍在第一个版本的开发中，快照版将实时反映开发进度。</p>
      <a class="group text-blue-500" href="https://github.com/UniiemStudio/CTFever">
        GitHub Repository
        <ion-icon class="align-middle -mt-0.5 transition-transform group-hover:translate-x-1"
                  name="arrow-forward-outline"/>
      </a>
    </div>
    <div v-for="(toolkit, k) in $store.state.toolkits" :key="k">
      <div class="py-4 text-center md:text-left">
        <h1 class="text-lg font-bold flex flex-col md:flex-row justify-center md:justify-start items-center space-x-1">
          <ion-icon class="text-4xl md:text-xl mb-2 md:mb-0" :name="toolkit.icon || 'albums-outline'"></ion-icon>
          <span class="text-lg">{{ $t(toolkit.title) || toolkit.title }}</span>
          <!-- TODO: Tools count -->
        </h1>
        <p class="text-sm font-thin">{{ $t(toolkit.description) || toolkit.description }}</p>
      </div>
      <div class="my-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Tool v-for="(tool, k) in toolkit.tools" :key="k" :tool="tool"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
