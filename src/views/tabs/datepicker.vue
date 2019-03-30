<template>
  <div>
    <span>自定义</span>
    <el-date-picker
      class="mg-l15"
      v-model="pickerValue"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd HH:mm:ss"
      size="small"
      @change="pickerTime"
    ></el-date-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickerValue: []
    }
  },
  methods: {
    pickerTime(val) {
      this.$emit('input', val);
      this.$emit('pickerTime', val);
    }
  }
}
</script>
