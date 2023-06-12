<template>
  <PrimaryContainer>
    <div class="primary-form">
      <InteractiveBlock>
        <UniInput id="data" :placeholder="input_mode === 'hex' ? '01 03 00 01 ...' : 'Any char...'"
                  :label="$t('common.text_input').toString()" v-model="input_data"/>
      </InteractiveBlock>
      <InteractiveDoubleColumns>
        <template v-slot:left>
          <UniSelect :label="$t('tool.crc.crcModel').toString()" v-model="crc_mode" :options="crc_modes"/>
        </template>
        <template v-slot:right>
          <UniSelect :label="$t('tool.crc.inputMode').toString()" v-model="input_mode" :options="input_modes"/>
        </template>
      </InteractiveDoubleColumns>
      <InteractiveBlock class="flex justify-between">
        <UniButton @click="checksum(true)" icon="tabler:calculator">{{ $t('common.btn_calculate') }}</UniButton>
        <UniButton @click="handleClean" danger icon="tabler:trash">{{ $t('common.btn_clean') }}</UniButton>
      </InteractiveBlock>
      <InteractiveBlock class="space-y-2">
        <UniInput id="outputHex" :label="$t('tool.crc.checksum_result') + '(Hex)'" v-model="output.hex" disable
                  copyable/>
        <UniInput id="outputBin" :label="$t('tool.crc.checksum_result') + '(Bin)'" v-model="output.bin" disable
                  copyable/>
      </InteractiveBlock>
    </div>
    <PrimaryIntroduction title="CRC 循环冗余校验" path="intro/crc" :references="references"/>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";

import crc from '~/libs/crc';

export default {
  name: "crc-checksum",
  components: {
    InteractiveDoubleColumns, InteractiveBlock, PrimaryIntroduction, PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.crc.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.crc.desc")},
      ],
    };
  },
  data() {
    return {
      input_data: '',
      output: {
        hex: '',
        bin: ''
      },
      crc_mode: "crc16_ccitt",
      input_mode: "hex",
      crc_modes: [
        {label: 'CRC16-CCITT', value: 'crc16_ccitt'},
        {label: 'CRC16-CCITT-FALSE', value: 'crc16_ccitt_false'},
        {label: 'CRC16-XMODEM', value: 'crc16_xmodem'},
        {label: 'CRC16-X25', value: 'crc16_x25'},
        {label: 'CRC16-MODBUS', value: 'crc16_modbus'},
        {label: 'CRC16-IBM', value: 'crc16_ibm'},
        {label: 'CRC16-MAXIM', value: 'crc16_maxim'},
        {label: 'CRC16-USB', value: 'crc16_usb'},
        {label: 'CRC16-DNP', value: 'crc16_dnp'},
      ],
      input_modes: [
        {label: 'Hex', value: 'hex', icon: 'mdi:hexadecimal'},
        {label: 'ASCII', value: 'ascii', icon: 'tabler:abc'}
      ],
      references: [
        {
          name: '星野鈴美的博客: CRC16 在 Java 中的实现',
          url: 'https://uniiem.com/blog/post/crc16-principle-and-implementation-in-java/'
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.query.crc_mode) {
        this.crc_mode = this.$route.query.crc_mode
      }
      if (this.$route.query.input_mode) {
        this.input_mode = this.$route.query.input_mode
      }
      if (this.$route.query.input_data) {
        this.input_data = this.$route.query.input_data
      }
      this.checksum()
    })
  },
  methods: {
    checksum(updateRoute = false) {
      if (updateRoute) {
        this.$router.replace({
          query: {
            crc_mode: this.crc_mode,
            input_mode: this.input_mode,
            input_data: this.input_data
          }
        })
      }
      let input_data = this.input_data;
      let data = this.input_data
      if (this.input_mode === 'hex') {
        data = []
        input_data = input_data.replaceAll(' ', '')
        if (input_data.length % 2 !== 0) {
          return this.$message.error('Hex 格式输入错误，请使用两个字符表示一个字节');
        }
        // 从 input_data 中每两个字符为一个元素插入 data 中
        for (let i = 0; i < input_data.length; i += 2) {
          data.push(parseInt(input_data.substr(i, 2), 16));
        }
      }
      let result = 0;
      switch (this.crc_mode) {
        case 'crc16_ccitt':
          result = crc(data).CRC16_CCITT();
          break;
        case 'crc16_ccitt_false':
          result = crc(data).CRC16_CCITT_FALSE();
          break;
        case 'crc16_xmodem':
          result = crc(data).CRC16_XMODEM();
          break;
        case 'crc16_x25':
          result = crc(data).CRC16_X25();
          break;
        case 'crc16_modbus':
          result = crc(data).CRC16_MODBUS();
          break;
        case 'crc16_ibm':
          result = crc(data).CRC16_IBM();
          break;
        case 'crc16_maxim':
          result = crc(data).CRC16_MAXIM();
          break;
        case 'crc16_usb':
          result = crc(data).CRC16_USB();
          break;
        case 'crc16_dnp':
          result = crc(data).CRC16_DNP();
          break;
      }
      this.output = {
        hex: result.toString(16).toUpperCase(),
        bin: result.toString(2)
      };
    },
    handleClean() {
      this.input_data = '';
      this.output = {
        hex: '',
        bin: ''
      };
    }
  },
}
</script>

<style scoped>

</style>
