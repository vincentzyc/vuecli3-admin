<template>
  <BasePage :paths="['标签页']" title="标签页" hideBack>
    <h3 class="mg-b20">解决element-ui的 Tabs 标签页组件 自定义标签页嵌入时间选择器时，选择时间后不渲染问题</h3>
    <div style="border:1px solid #ccc;margin:20px;padding:20px">
      <p class="mg10">原demo：</p>
      <bug-demo/>
    </div>
    <div style="border:1px solid #ccc;margin:20px;padding:20px">
      <p class="mg10">修改后：</p>
      <el-tabs v-model="activeIndex" type="border-card">
        <el-tab-pane label="用户管理" name="0">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="1">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="2">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="3">定时任务补偿</el-tab-pane>
        <el-tab-pane name="4">
          <template slot="label">
            <date-picker v-model="timeValue" @pickerTime="pickerTime"/>
          </template>
          选择的时间：{{timeValue}}
        </el-tab-pane>
      </el-tabs>
    </div>
  </BasePage>
</template>
<script>
import bugdemo from './bugdemo'
import datepicker from './datepicker'
export default {
  components: {
    'bug-demo': bugdemo,
    'date-picker': datepicker
  },
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

