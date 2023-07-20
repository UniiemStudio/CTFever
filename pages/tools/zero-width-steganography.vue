<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "zero-width-steganography",
})
</script>

<template>
  <div>
    <div class="flex flex-col md:flex-row justify-center md:justify-between flex-wrap md:flex-nowrap gap-2">
      <div class="w-full">
        <div>
          <UniTextarea label="可见文本" placeholder="可见文本" class="w-full" rows="6"></UniTextarea>
          <UniTextarea label="隐藏文本" placeholder="可见文本" class="w-full" rows="6"></UniTextarea>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 md:space-y-2 md:block md:h-fit md:my-auto md:mx-4">
        <UniButton class="w-full md:w-auto">编码</UniButton>
        <UniButton class="w-full md:w-auto">解码</UniButton>
      </div>
      <div class="w-full">
        <div class="">
          <UniTextarea label="隐写文本" class="w-full" rows="13"></UniTextarea>
          <UniLink href="blob:https://www.baidu.com/1" target="_blank" external>下载隐写文本文件</UniLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
