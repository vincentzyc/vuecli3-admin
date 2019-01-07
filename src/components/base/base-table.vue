<template>
  <div class="base-tabel">
    <el-form ref="formData" :model="formData" :inline="true" size="small" class="mg-t20">
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

    <div class="mg-t20" v-if="baseData.table.list.length>0">
      <el-table :data="baseData.table.list" stripe tooltip-effect="light" border>
        <el-table-column label="序号" align="center" type="index" :index="showTableIndex(baseData.pagination.pageIndex,baseData.pagination.pageSize)" width="55"></el-table-column>
        <el-table-column
          v-for="(column,key) in baseData.table.columns"
          :key="key"
          :prop="column.key"
          :label="column.label"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{row}">
            <template v-if="column.type==='text'">{{ row[column.key] }}</template>
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

      <div class="pull-right mg-t20 mg-b20" v-if="baseData.hasOwnProperty('pagination')">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="baseData.pagination.pageIndex||1"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="baseData.pagination.pageSize||10"
          :total="baseData.pagination.totalCount||0"
          :layout="baseData.pagination.layout||'total, sizes, prev, pager, next, jumper'"
        ></el-pagination>
      </div>
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
      console.log(val);
      // this.$emit("getList", 1, val);//切换条数的时候回到第一页
    },
    handleCurrentChange(val) {
      console.log(val);
      // this.$emit("getList", val, this.pageSize);
    }
  },
  created() {
  }
};
</script>
