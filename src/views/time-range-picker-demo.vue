<template>
  <div>
    <h1 class="mg-b20">多段时间范围选择器</h1>
    <TimeRangePicker v-model="timeList" />
    <p style="word-wrap: break-word;margin-top:30px;line-height:24px">{{timeList}}</p>
  </div>
</template>

<script>
import TimeRangePicker from "@/components/time-range-picker.vue";

export default {
  name: "timeRangePickerDemo",
  components: {
    TimeRangePicker
  },
  data() {
    return {
      timeList: "000011111111100011000000000011000111111111100000000000000111100000110000001100000111000000000000000000001110000000001100110000000111000000000000000000011100000000000011000000000111000000000000000000111000000000000011000000000111000000000000000011110000000000000011000000000111000000000000000011111111100000000011000000000111111111100000"
    }
  }
};
</script>
