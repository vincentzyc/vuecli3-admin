<template>
  <div class="base-tabel">
    <el-form :model="formData" :inline="true" size="small" class="mg-t20" v-if="baseData.hasOwnProperty('condition')">
      <el-form-item v-for="(item,key) in baseData.condition" :label="item.label" :key="key">
        <el-date-picker
          v-if="item.type==='datePicker'"
          v-model="formData[item.key]"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="getDate(item)"
          size="small"
        ></el-date-picker>
        <el-input v-if="item.type==='input'" v-model="formData[item.key]" placeholder="请输入" size="small"></el-input>
        <el-select v-if="item.type==='select'" v-model="formData[item.key]" placeholder="请选择" size="small">
          <el-option v-for="option in item.options" :label="option.label" :value="option.value" :key="option.value"></el-option>
        </el-select>
        <el-button v-if="item.type==='button'" type="primary" size="small" @click="item.handleClick()">{{item.text}}</el-button>
        <slot v-if="item.type==='slot'" :name="item.slot"></slot>
      </el-form-item>
    </el-form>

    <el-table ref="elTable" :data="baseData.table.list" stripe tooltip-effect="light" border class="mg-t20" v-if="baseData.hasOwnProperty('table')">
      <el-table-column label="序号" align="center" type="index" :index="showTableIndex(formData.pageIndex,formData.pageSize)" width="55"></el-table-column>
      <el-table-column v-for="(column,key) in baseData.table.columns" :key="key" :prop="column.key" :label="column.label" align="center">
        <template slot-scope="{row}">
          <template v-if="!column.hasOwnProperty('type')">{{ row[column.key] }}</template>
          <template v-if="column.type==='format'">
            <span v-html="column.format(row)"></span>
          </template>
          <template v-if="column.type==='textBtn'">
            <el-button v-for="(btn,key) in column.textBtn" :key="key" type="text" @click="btn.handleClick(row)">{{btn.text}}</el-button>
          </template>
          <template v-if="column.type==='slot'">
            <slot :name="column.slot" :row="row"></slot>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <div class="pull-right mg-t20 mg-b20" v-if="baseData.table.list.length>0&&baseData.pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 50, 100]"
        :current-page="formData.pageIndex||1"
        :page-size="formData.pageSize||10"
        :total="formData.totalCount||0"
        :layout="formData.layout||'total, sizes, prev, pager, next, jumper'"
      ></el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "BaseTable",
  props: {
    formData: {
      type: Object,
      default() {
        return {}
      }
    },
    baseData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    showTableIndex(pageIndex = 1, pageSize = 10) {
      var index = 0;
      return (pageIndex - 1) * pageSize + index + 1;
    },
    getDate(item) {
      this.formData[item.startKey] = this.formData[item.key] ? this.formData[item.key][0] : "";
      this.formData[item.endKey] = this.formData[item.key] ? this.formData[item.key][1] : "";
    },
    handleSizeChange(val) {
      console.log('每页显示条数', val);
      this.$emit('update:formData', {
        pageIndex: 1,
        pageSize: val,
        ...this.formData
      })
      this.$emit('getList')
    },
    handleCurrentChange(val) {
      console.log('页码数', val);
      this.$emit('update:formData', {
        pageIndex: val,
        ...this.formData
      })
      this.$emit('getList')
    }
  }
};
</script>
