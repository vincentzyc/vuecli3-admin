<template>
  <div>
    <h1>多段时间范围选择器</h1>
    <TimeRangePicker />
  </div>
</template>

<script>
// @ is an alias to /src
import TimeRangePicker from "@/components/time-range-picker.vue";

export default {
  name: "timeRangePicker",
  components: {
    TimeRangePicker
  }
};
</script>
