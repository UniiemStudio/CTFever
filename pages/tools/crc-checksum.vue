<template>
  <PrimaryContainer>
    <div class="primary-form">
      <InteractiveBlock>
        <PrimaryInput id="data" :placeholder="input_mode === 'hex' ? '01 03 00 01 ...' : 'Any char...'"
                      :label="$t('common.text_input').toString()" v-model="input_data"/>
      </InteractiveBlock>
      <InteractiveDoubleColumns>
        <template v-slot:left>
          <PrimarySelector :label="$t('tool.crc.crcModel').toString()" v-model="crc_mode" :options="crc_modes"/>
        </template>
        <template v-slot:right>
          <PrimarySelector :label="$t('tool.crc.inputMode').toString()" v-model="input_mode" :options="input_modes"/>
        </template>
      </InteractiveDoubleColumns>
      <InteractiveBlock class="flex justify-between">
        <PrimaryButton type="button" @click="checksum">{{ $t('common.btn_calculate') }}</PrimaryButton>
        <PrimaryButton type="reset" danger>{{ $t('common.btn_reset') }}</PrimaryButton>
      </InteractiveBlock>
      <InteractiveBlock class="space-y-2">
        <PrimaryInput id="outputHex" :label="$t('tool.crc.checksum_result') + '(Hex)'" v-model="output.hex" disable
                      copyable/>
        <PrimaryInput id="outputBin" :label="$t('tool.crc.checksum_result') + '(Bin)'" v-model="output.bin" disable
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
import PrimaryInput from "~/components/form/PrimaryInput";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";
import PrimaryButton from "~/components/form/PrimaryButton";
import PrimarySelector from "~/components/form/PrimarySelector";

import crc from '~/libs/crc';

export default {
  name: "crc-checksum",
  components: {
    PrimarySelector,
    PrimaryButton,
    InteractiveDoubleColumns, PrimaryInput, InteractiveBlock, PrimaryIntroduction, PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.crc.title") + " - " + this.$t("app.name")
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
        {label: 'Hex', value: 'hex'},
        {label: 'ASCII', value: 'ascii'}
      ],
      references: [
        {
          name: '霓红的博客: CRC16 在 Java 中的实现',
          url: 'https://blog.i0x0i.ltd/posts/crc16-principle-and-implementation-in-java/'
        }
      ]
    }
  },
  methods: {
    checksum() {
      let data = this.input_data;
      if (this.input_mode === 'hex') {
        data = data.split(' ').map(item => parseInt(item, 16));
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
    }
  },
}
</script>

<style scoped>

</style>
