<script lang="ts" setup>
defineProps({
  tool: {
    type: Object as PropType<Tool>,
    required: true,
  },
  inSidebar: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <div :class="{'pb-1 duration-500': inSidebar, '!border-emerald-500/80 dark:!border-emerald-800 ring-2 ring-emerald-300/80 dark:ring-emerald-900': active }"
    class="flex flex-col justify-between border border-neutral-200 hover:border-emerald-500/80 dark:hover:border-emerald-800/80 dark:bg-neutral-900 dark:border-neutral-700 shadow-sm dark:shadow-neutral-900 rounded-lg overflow-hidden transition">
    <NuxtLinkLocale :to="tool.route" class="p-2 space-y-1">
      <h1 class="text-base dark:text-neutral-200">
        {{ $t_tool(tool.key).label }}
      </h1>
      <p class="text-xs dark:text-neutral-400 md:truncate">
        {{ $t_tool(tool.key).description }}
      </p>
    </NuxtLinkLocale>
    <div :class="{'hidden': inSidebar }"
      class="px-2 py-1 bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-400 flex items-center justify-between text-xs">
      <div>
        <div class="flex items-center gap-1">
          <Icon name="tabler:tag" class="text-sm" />
          <nuxt-link v-for="(tag, k) in tool.tags" :key="k" to="/">
          {{ $t_tag(tag.key).label }}
          </nuxt-link>
        </div>
      </div>
      <div class="flex items-center">
        <div class="flex items-center rounded space-x-1 px-1 py-0.5">
          <Icon name="solar:confetti-line-duotone" class="text-sm" />
          <span class="text-xs">NEW</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
