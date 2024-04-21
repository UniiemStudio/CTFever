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
  },
})
</script>

<template>
  <div
    :class="{'pb-1 duration-300': inSidebar, '!border-primary-500/80 dark:!border-primary-800 ring-2 ring-primary-300/80 dark:ring-primary-900': active }"
    class="flex flex-col justify-between border border-neutral-200 hover:border-primary-500/80 dark:hover:border-primary-800/80 dark:bg-neutral-900 dark:border-neutral-700 shadow-sm dark:shadow-neutral-900 rounded-lg overflow-hidden transition">
    <NuxtLinkLocale :to="tool.route" class="p-2 space-y-1">
      <h1 class="text-base dark:text-neutral-200">
        {{ $t_tool(tool.key).label }}
      </h1>
      <p class="text-xs dark:text-neutral-400 md:truncate">
        {{ $t_tool(tool.key).description }}
      </p>
    </NuxtLinkLocale>
    <div :class="{'hidden': inSidebar }"
         class="px-2 py-1 bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-400 flex-nowrap whitespace-nowrap flex items-center justify-between text-xs">
      <div class="overflow-hidden text-ellipsis">
        <div class="flex items-center gap-1">
          <Icon name="tabler:tag" class="text-sm"/>
          <NuxtLinkLocale v-for="(tag, k) in tool.tags" :key="k" to="/" class="overflow-hidden text-ellipsis">
            {{ $t_tag(tag.key).label }}
          </NuxtLinkLocale>
        </div>
      </div>
      <div class="flex items-center">
        <div v-if="false" class="flex items-center rounded space-x-1 px-1 py-0.5">
          <Icon name="solar:confetti-line-duotone" class="text-sm"/>
          <span class="text-xs">NEW</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
