<template>
  <div>
    <ele-easy-table :form="form" :table="table" :formData.sync="formData" @getList="handleSearch">
      <template slot="slot1">
        <el-button type="primary" size="small" @click="test1()">测试测试</el-button>
      </template>
      <template slot="slot2" slot-scope="{row}">
        <el-dropdown :hide-on-click="false" @command="handleView">
          <span class="el-dropdown-link">
            <el-button type="text">操作</el-button>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{item:row,handle:'RecordDetail'}">查看详情</el-dropdown-item>
            <el-dropdown-item :command="{item:row,handle:'RecordLog'}">查看日志</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </ele-easy-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        filterStartTime: "2019-01-01",  //设置默认值
        filterEndTime: "2019-01-07",  //设置默认值
        filterStartAndEndTime: ["2019-01-01", "2019-01-07"], //设置默认值
        pageIndex: 1,
        pageSize: 2,
        totalCount: 6,
      },
      form: {
        style: {
          background: '#f2f2f2',
          paddingTop: '20px'
        },
        list: [{
          type: 'datePicker',
          key: 'filterStartAndEndTime',
          startKey: 'filterStartTime',
          endKey: 'filterEndTime',
          label: '起止时间'
        }, {
          type: 'input',
          key: 'modelName',
          label: '输入框'
        }, {
          type: 'select',
          key: 'productType',
          config: {
            filterable: true
          },
          options: [{
            label: '全部',
            value: 'all'
          }, {
            label: 'API',
            value: 'API'
          }, {
            label: 'H5',
            value: 'H5'
          }],
          label: '选择框'
        }, {
          type: 'select',
          key: 'productName',
          config: {
            filterable: true
          },
          options: ['产品名称1', '产品名称2', '产品名称3'],
          label: '产品名称'
        }, {
          type: 'button',
          text: '查询',
          handleClick: () => {
            console.log('11111111111');
            this.handleSearch();
          }
        }, {
          type: 'slot',
          slot: 'slot1'
        }]
      },
      table: {
        list: [{
          data1: '111',
          data2: '第111111',
        }, {
          data1: '222',
          data2: '第222222',
        }, {
          data1: '333',
          data2: '第333333',
        }, {
          data1: '444',
          data2: '第4444444',
        }, {
          data1: '555',
          data2: '第555555',
        }, {
          data1: '666',
          data2: '第666666',
        }],
        columns: [{
          key: 'data1',
          label: '标题1',
          config: {
            sortable: true
          }
        }, {
          key: 'data2',
          label: '标题2',
          type: 'format',
          format: row => {
            return row.data2 + '%';
          }
        }, {
          key: 'data3',
          label: '操作',
          type: 'textBtn',
          textBtn: [{
            text: "操作一",
            handleClick: row => { console.log(row, '操作一') }
          }, {
            text: "操作二",
            handleClick: row => { console.log(row, '操作二') }
          }, {
            text: "操作三",
            handleClick: row => { console.log(row, '操作三') }
          }]
        }, {
          key: 'data4',
          label: '编辑',
          type: 'slot',
          slot: 'slot2'
        }]
      }
    }
  },
  methods: {
    handleSearch() {
      console.log('2222222222222');
    },
    test1() {
      console.log(this.formData);
    },
    handleView(command) {
      console.log(command);
    }
  }
}
</script>
