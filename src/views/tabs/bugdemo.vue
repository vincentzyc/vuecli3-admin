<template>
  <el-tabs v-model="activeIndex" type="border-card">
    <el-tab-pane label="用户管理" name="0">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="1">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="2">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="3">定时任务补偿</el-tab-pane>
    <el-tab-pane label="自定义" name="4">
      <template slot="label">
        <span>自定义</span>
        <el-date-picker
          class="mg-l15"
          v-model="timeValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small"
          @change="pickerTime"
        ></el-date-picker>
      </template>
      选择的时间：{{timeValue}}
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '1',
      timeValue: []
    }
  },
  methods: {
    pickerTime(val) {
      console.log(val)
    }
  }
}
</script>

