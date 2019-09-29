<template>
  <div class="duration">
    <div class="duration-main">
      <div class="duration-hd">
        <div class="duration-hd-title">星期\时间</div>
        <div class="duration-hd-con">
          <div class="duration-hd-con-top">
            <div class="duration-date-range">00:00 - 12:00</div>
            <div class="duration-date-range">12:00 - 24:00</div>
          </div>
          <div class="duration-hd-con-bottom">
            <span class="duration-date-cell">0</span>
            <span class="duration-date-cell">1</span>
            <span class="duration-date-cell">2</span>
            <span class="duration-date-cell">3</span>
            <span class="duration-date-cell">4</span>
            <span class="duration-date-cell">5</span>
            <span class="duration-date-cell">6</span>
            <span class="duration-date-cell">7</span>
            <span class="duration-date-cell">8</span>
            <span class="duration-date-cell">9</span>
            <span class="duration-date-cell">10</span>
            <span class="duration-date-cell">11</span>
            <span class="duration-date-cell">12</span>
            <span class="duration-date-cell">13</span>
            <span class="duration-date-cell">14</span>
            <span class="duration-date-cell">15</span>
            <span class="duration-date-cell">16</span>
            <span class="duration-date-cell">17</span>
            <span class="duration-date-cell">18</span>
            <span class="duration-date-cell">19</span>
            <span class="duration-date-cell">20</span>
            <span class="duration-date-cell">21</span>
            <span class="duration-date-cell">22</span>
            <span class="duration-date-cell">23</span>
          </div>
        </div>
      </div>
      <div class="duration-bd">
        <div class="week-body">
          <div v-for="week in weeks" :key="week" class="week-item">{{week}}</div>
        </div>
        <div class="time-body" @mousedown="handleMousedown" @mouseup="handleMouseup">
          <el-tooltip
            v-for="(i,key) in timeSlots"
            :key="key"
            :data-index="key"
            effect="dark"
            :content="tiptxt(key)"
            placement="top"
            :open-delay="666"
          >
            <div class="time-cell" :class="{'active':list[key]==='1'}"></div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="duration-help">
      <div class="duration-help-bd">
        <span class="color-box"></span>
        <span class="text-box">未选</span>
        <span class="color-box color-active"></span>
        <span class="text-box">已选</span>
      </div>
      <div class="duration-help-ft" @click="initList()">清空选择</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "time-range-picker",
  props: {
    value: String
  },
  data() {
    return {
      list: [],
      timeSlots: 7 * 24 * 2,
      timeTextList: [],
      weeks: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      selectIndex: [],
      axis: {}
    }
  },
  watch: {
    selectIndex(newValue) {
      let valueLength = newValue.length;
      let newData = this.list[newValue[0]] === '1' ? '0' : '1';
      for (let i = 0; i < valueLength; i++) {
        this.list.splice(newValue[i], 1, newData);
        this.$emit('input', this.list.join(''));
      }
    }
  },
  methods: {
    tiptxt(index) {
      let timeIndex = index % 48;
      let weekIndex = ~~(index / 48);
      return `${this.weeks[weekIndex]} ${this.timeTextList[timeIndex]}~${this.timeTextList[timeIndex + 1]}`
    },
    initTime() {
      let timeTextList = [], hours = [], minutes = ['00', '30'];
      for (let i = 0; i <= 24; i++) {
        i < 10 ? hours.push('0' + i) : hours.push(i.toString())
      }
      for (const hour of hours) {
        for (const minute of minutes) {
          timeTextList.push(`${hour}:${minute}`)
        }
      }
      this.timeTextList = timeTextList
    },
    handleMousedown(event) {
      let index = event.target.getAttribute('data-index');
      this.axis.startx = index % 48;
      this.axis.starty = ~~(index / 48);
    },
    handleMouseup(event) {
      let index = event.target.getAttribute('data-index');
      this.axis.endx = index % 48;
      this.axis.endy = ~~(index / 48);
      this.selectIndex = this.getSelectIndex(this.axis)
    },
    getSelectIndex(axis) {
      let arr = [],
        newAxis = {
          startx: Math.min(axis.startx, axis.endx),
          starty: Math.min(axis.starty, axis.endy),
          endx: Math.max(axis.startx, axis.endx),
          endy: Math.max(axis.starty, axis.endy)
        }
      for (let y = newAxis.starty; y <= newAxis.endy; y++) {
        for (let x = newAxis.startx; x <= newAxis.endx; x++) {
          arr.push(x + y * 48)
        }
      }
      return arr
    },
    initList(value) {
      if (value) {
        let reg = new RegExp("^[01]{" + this.timeSlots + "}$");
        if (reg.test(value)) return this.list = value.split('');
      }
      this.list = [];
      for (let i = 0; i < this.timeSlots; i++) {
        this.list[i] = '0';
      }
      this.$emit('input', this.list.join(''));
    }
  },
  created() {
    this.initList(this.value);
    this.initTime()
  }
}
</script>

<style scoped>
.duration {
  font-size: 14px;
  line-height: 32px;
  color: #515a6e;
  user-select: none;
}
.duration .duration-main {
  border: 1px solid #dcdee2;
  position: relative;
  width: 658px;
}
.duration .duration-hd {
  display: flex;
  background: #f8f8f9;
}
.duration .duration-hd-title {
  display: flex;
  align-items: center;
  padding: 0 6px;
  width: 80px;
  height: 65px;
  font-weight: 700;
}
.duration .duration-hd-con {
  flex: 1;
  display: flex;
  -webkit-box-orient: vertical;
  flex-direction: column;
}
.duration .duration-hd-con-top {
  display: flex;
  border-bottom: 1px solid #dcdee2;
}
.duration .duration-date-range {
  width: 288px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-left: 1px solid #dcdee2;
  font-weight: 700;
}
.duration .duration-hd-con-bottom {
  display: flex;
}
.duration .duration-date-cell {
  width: 24px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-left: 1px solid #dcdee2;
}
.duration .duration-bd {
  display: flex;
}
.duration .week-body {
  width: 80px;
  flex-shrink: 0;
}
.duration .week-item {
  border-top: 1px solid #dcdee2;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-weight: 700;
}
.duration .time-body {
  width: 576px;
  height: 210px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  position: relative;
}
.duration .time-cell {
  width: 12px;
  height: 30px;
  border-left: 1px solid #efefef;
  border-top: 1px solid #efefef;
  overflow: hidden;
  transition: background 0.2s;
  outline-width: 0;
}
.duration .time-cell.active {
  background: #2d8cf0;
}
.time-area {
  width: 576px;
  height: 210px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background: transparent;
}
.duration .duration-help {
  display: flex;
  align-items: center;
  width: 658px;
  justify-content: space-between;
}
.duration .duration-help-bd {
  display: flex;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  padding: 4px 0;
}
.duration .duration-help .color-box {
  width: 14px;
  height: 20px;
  background: #fff;
  border: 1px solid #dddddd;
  display: block;
  margin-right: 6px;
}
.duration .duration-help-bd .color-box.color-active {
  background: #2d8cf0;
}
.duration .duration-help .text-box {
  margin-right: 15px;
}
.duration .duration-help .duration-help-ft {
  color: #2d8cf0;
  cursor: pointer;
}
</style>