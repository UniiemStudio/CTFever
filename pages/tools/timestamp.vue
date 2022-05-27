<template>
  <PrimaryContainer>
    <div class="grid gap-x-4 grid-cols-1 md:grid-cols-2 grid-rows-1">
      <InteractiveBlock>
        <PrimaryInput id="timestamp" :label="$t('tool.timeStamp.timestamp').toString()" @input="changeTimestamp"
                      :value="isUnixTime ? date.unix() : date.valueOf()"/>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryInput id="human-readable" :label="$t('tool.timeStamp.humanReadable').toString()"
                      @input="changeHumanDate" :value="humanReadable"/>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimarySelector id="unit" :label="$t('tool.timeStamp.unit').toString()" :options="units" value="sec"
                         @input="(val)=>this.isUnixTime = val === 'sec'"/>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryButton class="w-full mt-2 md:mt-7" @click="refreshDayjs">
          {{ $t('tool.timeStamp.now').toString() }}
        </PrimaryButton>
      </InteractiveBlock>
    </div>
    <hr class="mt-3 mb-4"/>
    <div class="grid gap-x-4 grid-cols-1 md:grid-cols-2 grid-rows-1">
      <InteractiveBlock>
        <PrimaryInput id="utc" :label="$t('tool.timeStamp.utc').toString()" :value="date.utc().format()" disable
                      copyable/>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryInput id="from-now" :label="$t('tool.timeStamp.fromNow').toString()" :value="date.fromNow()" disable
                      copyable/>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryInput id="day-of-year" :label="$t('tool.timeStamp.dayOfYear').toString()" :value="date.dayOfYear()"
                      disable copyable/>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryInput id="week-of-year" :label="$t('tool.timeStamp.weekOfYear').toString()" :value="date.isoWeek()"
                      disable copyable/>
      </InteractiveBlock>
    </div>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryInput from "~/components/form/PrimaryInput";

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import PrimaryButton from "~/components/form/PrimaryButton";
import PrimarySelector from "~/components/form/PrimarySelector";

dayjs.extend(require('dayjs/plugin/utc'));
dayjs.extend(require('dayjs/plugin/relativeTime'));
dayjs.extend(require('dayjs/plugin/dayOfYear'));
dayjs.extend(require('dayjs/plugin/isoWeek'));
dayjs.extend(require('dayjs/plugin/customParseFormat'));

export default {
  name: "timestamp",
  components: {PrimarySelector, PrimaryButton, PrimaryInput, InteractiveBlock, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.timeStamp.title") + " - " + this.$t("app.name")
    };
  },
  data() {
    return {
      isUnixTime: true,
      date: dayjs(),
      humanReadable: '',
      isHumanReadable: true,
      unit: 'sec',
      units: [
        {
          label: 'sec',
          value: 'sec'
        },
        {
          label: 'msec',
          value: 'msec'
        }
      ]
    }
  },
  beforeCreate() {
    dayjs.locale(this.$i18n.locales.filter(i => i.code === this.$i18n.locale)[0].iso);
    this.$nextTick(() => {
      this.date = dayjs();
      this.humanReadable = this.date.format("YYYY-MM-DD HH:mm:ss");
    })
  },
  beforeMount() {
  },
  methods: {
    changeTimestamp(val) {
      let timestamp = Number(val.toString().replace(/\D/g, ''));
      if (this.isUnixTime) timestamp = timestamp * 1000;
      this.date = dayjs(timestamp);
      this.humanReadable = dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
    },
    changeHumanDate(val) {
      this.humanReadable = val;
      const newTime = dayjs(val, 'YYYY-MM-DD HH:mm:ss');
      if (newTime.isValid()) {
        this.date = newTime;
      }
    },
    refreshDayjs() {
      this.date = dayjs();
    }
  },
}
</script>

<style scoped>

</style>
