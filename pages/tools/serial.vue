<template>
  <PrimaryContainer>
    <InteractiveDoubleColumns>
      <template v-slot:left>
        <PrimaryArea id="tx" label="TX" v-model="tx" :rows="15"/>
        <InteractiveBlock>
          <UniInput id="autoSendDelay" :label="$t('tool.serialTool.resendDelay') + '(ms)'" v-model="autoSendDelay"
                    type="number"/>
        </InteractiveBlock>
        <InteractiveBlock>
          <UniButton @click="writeSerial" :disabled="!connected" class="w-full" icon="iconamoon:send-duotone">发送
          </UniButton>
        </InteractiveBlock>
        <InteractiveDoubleColumns>
          <template v-slot:left>
            <div class="w-full h-full flex items-center">
              <a-checkbox v-model:checked="autoSend" class="dark:text-slate-300">
                {{ $t('tool.serialTool.resend') }}
              </a-checkbox>
            </div>
          </template>
          <template v-slot:right>
            <div class="w-full h-full flex items-center">
              <a-checkbox v-model:checked="sendLineBreak" class="dark:text-slate-300">
                {{ $t('tool.serialTool.autoEOL') }}
              </a-checkbox>
            </div>
          </template>
        </InteractiveDoubleColumns>
      </template>
      <template v-slot:right>
        <PrimaryArea id="rx" label="RX" v-model="rx" :rows="15" class="font-mono"/>
        <InteractiveDoubleColumns>
          <template v-slot:left>
            <UniInput
              :label="$t('tool.serialTool.status').toString()" id="status"
              :value="connected ? `${$t('tool.serialTool.connected')}[${baud}]` : $t('tool.serialTool.disconnected')"
              class="w-full"
              disabled/>
          </template>
          <template v-slot:right>
            <!--suppress JSValidateTypes -->
            <UniSelect :label="$t('tool.serialTool.baud')" v-model="baud" :options="baudRates"
                       :disabled="connected"/>
          </template>
        </InteractiveDoubleColumns>
        <InteractiveBlock>
          <UniButton @click="!connected ? openSerial() : closeSerial()" :danger="connected" class="w-full"
                     :icon="connected ? 'tabler:plug-connected-x' : 'tabler:plug-connected'">
            {{ !connected ? $t('tool.serialTool.open') : $t('tool.serialTool.close') }}
          </UniButton>
        </InteractiveBlock>
      </template>
    </InteractiveDoubleColumns>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";
import PrimaryArea from "~/components/form/PrimaryTextArea";

import Serial from '~/libs/serial';

export default {
  name: "serial",
  components: {
    PrimaryArea,
    InteractiveDoubleColumns,
    InteractiveBlock,
    PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.serialTool.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.serialTool.desc")},
      ],
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
        this.log2Rx(`⚠️ ${event.message}`);
      } else {
        self.$message.error(`❌ ${this.$t('tool.serialTool.tip.unknown')}`);
      }
    }, () => {
      this.connected = true;
      this.log2Rx(`🔗 ${this.$t('tool.serialTool.tip.opened')} (${this.baud})`);
    }, () => {
      this.connected = false;
      this.log2Rx(`🖇️ ${this.$t('tool.serialTool.tip.closed')}`);
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
      if (this.connected) this.serial.close();
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
  },
  beforeDestroy() {
    this.closeSerial();
  }
}
</script>

<style scoped>

</style>
