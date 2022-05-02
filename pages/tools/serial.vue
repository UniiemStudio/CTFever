<template>
  <PrimaryContainer>
    <InteractiveDoubleColumns>
      <template v-slot:left>
        <PrimaryArea id="tx" label="TX" v-model="tx" :rows="15"/>
        <InteractiveBlock>
          <PrimaryInput id="autoSendDelay" label="自动发送延时(ms)" v-model="autoSendDelay" type="number"/>
        </InteractiveBlock>
        <InteractiveBlock>
          <PrimaryButton @click="writeSerial" :disable="!connected" class="w-full">SEND</PrimaryButton>
        </InteractiveBlock>
        <InteractiveDoubleColumns>
          <template v-slot:left>
            <div class="w-full h-full flex items-center">
              <a-checkbox v-model:checked="autoSend" class="dark:text-slate-300">定时发送</a-checkbox>
            </div>
          </template>
          <template v-slot:right>
            <div class="w-full h-full flex items-center">
              <a-checkbox v-model:checked="sendLineBreak" class="dark:text-slate-300">自动发送换行</a-checkbox>
            </div>
          </template>
        </InteractiveDoubleColumns>
      </template>
      <template v-slot:right>
        <PrimaryArea id="rx" label="RX" v-model="rx" :rows="15" class="font-mono"/>
        <InteractiveDoubleColumns>
          <template v-slot:left>
            <PrimaryInput label="状态" id="status" :value="connected ? `已连接[${baud}]` : '已断开'" class="w-full" disable/>
          </template>
          <template v-slot:right>
            <PrimarySelector label="波特率" v-model="baud" :options="baudRates" :disable="connected"/>
          </template>
        </InteractiveDoubleColumns>
        <InteractiveBlock>
          <PrimaryButton @click="!connected ? openSerial() : closeSerial()" :danger="connected" class="w-full">
            {{ !connected ? '打开串口' : '关闭串口' }}
          </PrimaryButton>
        </InteractiveBlock>
      </template>
    </InteractiveDoubleColumns>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import PrimaryButton from "~/components/form/PrimaryButton";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";
import PrimaryArea from "~/components/form/PrimaryTextArea";

import Serial from '~/libs/serial';
import PrimarySelector from "~/components/form/PrimarySelector";
import PrimaryInput from "~/components/form/PrimaryInput";

export default {
  name: "serial",
  components: {
    PrimaryInput,
    PrimarySelector,
    PrimaryArea,
    InteractiveDoubleColumns,
    InteractiveBlock,
    PrimaryButton,
    PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.serialTool.title") + " - " + this.$t("app.name")
    };
  },
  data() {
    return {
      serial: null,
      sendLineBreak: false,
      baud: 9600,
      baudRates: [
        {value: 1200, label: '1200'},
        {value: 2400, label: '2400'},
        {value: 4800, label: '4800'},
        {value: 9600, label: '9600'},
        {value: 19200, label: '19200'},
        {value: 28800, label: '28800'},
        {value: 38400, label: '38400'},
        {value: 57600, label: '57600'},
        {value: 115200, label: '115200'},
        {value: 230400, label: '230400'},
        {value: 460800, label: '460800'},
      ],
      autoSend: false,
      autoSendDelay: 500,
      autoSendInterval: null,
      connected: false,
      tx: '',
      rx: ''
    }
  },
  mounted() {
    const self = this;
    this.serial = new Serial(val => {
      this.rx += val;
      this.rxScrollDown();
    }, event => {
      if (event instanceof Error) {
        this.log2Rx(`[error] ${event.message}`);
      } else {
        self.$message.error('Unknown error.');
      }
    }, () => {
      this.connected = true;
      this.log2Rx(`[connect] Serial is open (${this.baud})`);
    }, () => {
      this.connected = false;
      this.log2Rx(`[close] Serial is closed`);
    });
  },
  watch: {
    autoSend: function (val) {
      if (val) {
        if (val >= 0) {
          this.autoSendInterval = setInterval(() => {
            if (this.connected) this.writeSerial();
          }, this.autoSendDelay);
        }
      } else {
        if (this.autoSendInterval) clearInterval(this.autoSendInterval);
      }
    },
  },
  methods: {
    openSerial() {
      this.serial.open(this.baud);
    },
    closeSerial() {
      this.serial.close();
    },
    writeSerial() {
      if (this.tx !== '') this.serial.write(this.tx, this.sendLineBreak);
    },
    rxScrollDown() {
      this.$nextTick(() => {
        this.$el.ownerDocument.querySelector('#rx').scrollTop = this.$el.ownerDocument.querySelector('#rx').scrollHeight;
      });
    },
    log2Rx(val) {
      if (this.rx.charAt(this.rx.length - 1) !== '\n' && this.rx !== '') this.rx += '\n';
      this.rx += val + '\n';
      this.rxScrollDown();
    }
  }
}
</script>

<style scoped>

</style>
