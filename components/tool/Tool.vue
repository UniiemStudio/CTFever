<template>
  <nuxt-link :to="!tool.disabled ? localePath(tool.route) : ''" :class="{'disabled pointer-events-none': tool.disabled}"
             class="rounded-lg border h-border transition-all duration-500 p-4 cursor-pointer flex flex-col justify-between
              dark:bg-slate-800 dark:text-white dark:border-slate-500 relative"
             :draggable="draggable">
    <div>
      <h1 class="text-base dark:text-slate-300 font-['Nunito'] flex flex-row items-center space-x-1">
        <span>{{ $t(tool.title) || tool.title }}</span>
        <span v-if="tool.beta"
              class="text-xs border border-gray-400 text-gray-400 font-bold shadow-inner rounded px-0.5 py-0">BETA</span>
      </h1>
      <p class="text-xs text-black/80 dark:text-slate-500 md:truncate"
         :title="$t(tool.description) || tool.description">{{ $t(tool.description) || tool.description }}</p>
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
    <div class="absolute top-2 right-2 flex flex-row space-x-4">
      <BadgeDot :info="tool.newest"/>
      <BadgeDot ping :success="tool.recommended"/>
      <BadgeDot :warn="tool.premium"/>
    </div>
  </nuxt-link>
</template>

<script>
import BadgeDot from "~/components/tool/BadgeDot";

export default {
  name: "Tool",
  components: {BadgeDot},
  props: {
    tool: {
      type: Object,
      required: true
    },
    draggable: {
      type: Boolean,
      default: true
    }
  },
}
</script>

<style scoped>
.disabled {
  /*@apply bg-gray-100 dark:bg-transparent text-gray-600 shadow-none hover:shadow-none cursor-default;*/
  @apply bg-gray-100 dark:bg-transparent text-gray-600 hover:border-gray-200 dark:hover:border-slate-500 cursor-not-allowed;
}

.h-border:not(.anti-hover):hover {
  @apply hover:border-blue-500 dark:hover:border-blue-500;
}
</style>
