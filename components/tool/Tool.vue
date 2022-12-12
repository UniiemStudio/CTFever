<template>
  <nuxt-link :to="!tool.disabled ? localePath(tool.route) : ''" :class="{'disabled pointer-events-none': tool.disabled}"
             class="rounded-lg border dark:border h-border transition-all duration-500 p-4 cursor-pointer flex flex-col justify-between
              dark:bg-slate-800 dark:text-white dark:border-slate-500 relative overflow-hidden"
             :draggable="draggable">
    <div>
      <h1 class="text-base dark:text-slate-300 font-['Nunito'] flex flex-row items-center space-x-1">
        <span>{{ $t(tool.title) || tool.title }}</span>
        <span v-if="tool.beta" class="badge-beta">BETA</span>
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
    <div v-if="tool.disabled" class="warning-line"></div>
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

.warning-line {
  top: 8px;
  right: -16px;
  height: 16px;
  width: 64px;
  @apply absolute font-['Nunito'] font-medium text-white dark:text-slate-400 overflow-hidden brightness-75 dark:brightness-100;
  /*@apply border-y-2 border-gray-300 dark:border-slate-500;*/
  /*@apply border-l border-b dark:border-l-2 dark:border-b-2 rounded-bl-lg dark:border-slate-500;*/
  background: repeating-linear-gradient(
    45deg,
    rgba(255, 204, 0, .3),
    rgba(255, 204, 0, .3) 5px,
    rgba(0, 0, 0, .3) 5px,
    rgba(0, 0, 0, .3) 10px,
    rgba(255, 204, 0, .3) 10px
  );
  transform: rotate(45deg);
}

.h-border:not(.anti-hover):hover {
  @apply hover:border-blue-500 dark:hover:border-blue-500;
}
</style>
