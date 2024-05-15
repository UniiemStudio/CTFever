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
    class="flex flex-col justify-between border border-neutral-200 hover:border-primary-500/80 dark:hover:border-primary-800/80 dark:bg-neutral-900 dark:border-neutral-700 shadow-sm dark:shadow-neutral-900 rounded-md overflow-hidden transition">
    <NuxtLinkLocale :to="tool.route" class="px-2 py-1 space-y-0.5">
      <h1
        :title="$t_tool(tool.key).label"
        class="text-sm font-medium dark:text-neutral-200 overflow-hidden text-ellipsis line-clamp-1 break-all"
      >
        {{ $t_tool(tool.key).label }}
      </h1>
      <p
        :title="$t_tool(tool.key).description"
        class="text-xs text-neutral-500 dark:text-neutral-400 overflow-hidden text-ellipsis line-clamp-1 break-all"
      >
        {{ $t_tool(tool.key).description }}
      </p>
    </NuxtLinkLocale>
    <div :class="{'hidden': inSidebar }"
         class="px-1.5 py-0.5 bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-400 flex-nowrap whitespace-nowrap flex items-center justify-between text-xs">
      <div class="overflow-hidden text-ellipsis text-neutral-500 dark:text-neutral-400">
        <div class="flex items-center gap-0.5">
          <Icon :name="(tool.tags?.length || 1) <= 1 ? 'IconTag' : 'IconTags'" class="text-sm"/>
          <UTooltip
            v-for="(tag, k) in tool.tags"
            :key="k"
            :text="`Tag: ${$t_tag(tag.key).label}`"
          >
            <NuxtLinkLocale
              class="text-2xs font-medium overflow-hidden text-ellipsis"
              :to="`/tag/${tag.key}`"
            >
              {{ $t_tag(tag.key).label }}{{ k < (tool.tags?.length || 1) - 1 ? ',' : '' }}
            </NuxtLinkLocale>
          </UTooltip>
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
