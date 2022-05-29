<template>
  <nuxt-link :to="!tool.disabled ? localePath(tool.route) : ''" :class="{'disabled pointer-events-none': tool.disabled}"
             class="rounded-lg border hover:border-blue-500 transition-all duration-500 p-4 cursor-pointer flex flex-col justify-between
              dark:bg-slate-800 dark:text-white dark:border-slate-500 dark:hover:border-blue-500">
    <div>
      <h1 class="text-base dark:text-slate-300 font-['Nunito']">{{ $t(tool.title) || tool.title }}</h1>
      <p class="text-xs dark:text-slate-500">{{ $t(tool.description) || tool.description }}</p>
    </div>
    <div v-if="tool.tags && tool.tags.length > 0" class="mt-2 text-xs text-gray-400 dark:text-slate-500 w-fit"
         @click.stop>
      <ion-icon class="align-middle -mt-0.5" name="pricetag-outline"></ion-icon>
      <div class="inline-block" v-for="(tag, k) in tool.tags">
        <nuxt-link class="underline-offset-2 hover:underline" :key="k"
                   :to="localePath(`/tag/${tag.replace('tags.', '')}`)">
          {{ $t(tag) }}
        </nuxt-link>
        <span v-if="k < tool.tags.length - 1">, </span>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: "Tool",
  props: {
    tool: {
      type: Object,
      required: true
    },
  },
}
</script>

<style scoped>
.disabled {
  /*@apply bg-gray-100 dark:bg-transparent text-gray-600 shadow-none hover:shadow-none cursor-default;*/
  @apply bg-gray-100 dark:bg-transparent text-gray-600 hover:border-gray-200 dark:hover:border-slate-500 cursor-not-allowed;
}
</style>
