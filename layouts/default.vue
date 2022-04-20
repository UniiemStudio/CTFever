<template>
  <div class="antialiased">
    <TopBar/>
    <div class="container mx-auto p-4 pt-20"
         :class="{'pt-28': isToolPage(), 'pt-20': !isToolPage()}">
      <Nuxt/>
    </div>
  </div>
</template>

<script>
import crc from '~/libs/crc';

export default {
  name: "index",
  mounted() {
    let data = [1, 2, 3];
    console.log(crc(data).CRC16_CCITT().toString(16));
    console.log(crc(data).CRC16_CCITT_FALSE().toString(16));
    console.log(crc(data).CRC16_XMODEM().toString(16));
    console.log(crc(data).CRC16_X25().toString(16));
    console.log(crc(data).CRC16_MODBUS().toString(16));
    console.log(crc(data).CRC16_IBM().toString(16));
    console.log(crc(data).CRC16_MAXIM().toString(16));
    console.log(crc(data).CRC16_USB().toString(16));
    console.log(crc(data).CRC16_DNP().toString(16));
  },
  data() {
    return {
      toolPageReg: /^.*\/tools\/.*/,
      isToolPage: () => this.toolPageReg.test(this.$route.path),
    }
  },
}
</script>

<style>
.primary-form {
  @apply bg-white rounded lg:px-8 lg:pt-6;
}

/* transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
  transform: scale(0.99);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(10px, 0, 0);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(-10px, 0, 0);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
