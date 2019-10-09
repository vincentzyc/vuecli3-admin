<template>
  <div class="weektime">
    <div class="weektime-main">
      <div class="weektime-hd">
        <div class="weektime-hd-title">星期\时间</div>
        <div class="weektime-hd-con">
          <div class="weektime-hd-con-top">
            <div class="weektime-date-range">00:00 - 12:00</div>
            <div class="weektime-date-range">12:00 - 24:00</div>
          </div>
          <div class="weektime-hd-con-bottom">
            <span class="weektime-date-cell" v-for="hour in 24" :key="hour">{{hour-1}}</span>
          </div>
        </div>
      </div>
      <div class="weektime-bd">
        <div class="week-body">
          <div v-for="week in weeks" :key="week" class="week-item">{{week}}</div>
        </div>
        <div class="time-body" @mousedown="handleMousedown" @mouseup="handleMouseup" @mousemove="handleMousemove">
          <el-tooltip
            v-for="(i,key) in timeSlots"
            :key="key"
            :data-index="key"
            effect="dark"
            :content="tiptxt(key)"
            placement="top"
            :open-delay="800"
          >
            <div class="time-cell" :class="{'active':list[key]==='1','pre-active':preViewIndex.includes(key)}"></div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="weektime-help">
      <div class="weektime-help-tx">
        <div class="weektime-help-bd">
          <span class="color-box"></span>
          <span class="text-box">未选</span>
          <span class="color-box color-active"></span>
          <span class="text-box">已选</span>
        </div>
        <div class="weektime-help-ft" @click="initList()">清空选择</div>
      </div>
      <div class="weektime-help-select">
        <p v-for="(week,key) in weeks" :key="key" v-show="allTimeText[key]">
          <span class="weektime-help-week-tx">{{week+"："}}</span>
          <span>{{allTimeText[key]}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "byte-weektime-picker",
  props: {
    value: String
  },
  data() {
    return {
      isMove: false,
      list: [],
      timeSlots: 7 * 24 * 2,
      timeTextList: [],
      weeks: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      startIndex: 0,
      preAxis: {},
      preViewIndex: [],
      allTimeText: []
    }
  },
  methods: {
    tiptxt(index) {
      let timeIndex = index % 48;
      let weekIndex = ~~(index / 48);
      return `${this.weeks[weekIndex]} ${this.timeTextList[timeIndex]}~${this.timeTextList[timeIndex + 1]}`
    },
    initTimeText() {
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
      this.isMove = true;
      this.startIndex = event.target.getAttribute('data-index');
      this.preAxis.startx = this.startIndex % 48;
      this.preAxis.starty = ~~(this.startIndex / 48);
    },
    handleMouseup(event) {
      this.handleMousemove(event);
      this.resetMousemove()
    },
    handleMousemove(event) {
      if (!this.isMove) return;
      let index = event.target.getAttribute('data-index');
      this.preAxis.endx = index % 48;
      this.preAxis.endy = ~~(index / 48);
      this.preViewIndex = this.getSelectIndex(this.preAxis)
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
    setSelectIndex(indexList) {
      let valueLength = indexList.length;
      let newData = this.list[this.startIndex] === '1' ? '0' : '1';
      for (let i = 0; i < valueLength; i++) {
        this.list.splice(indexList[i], 1, newData);
        this.$emit('input', this.list.join(''));
      }
      this.showSelectTime(this.list);
    },
    showSelectTime(list) {
      let weeksSelect = [], listlength = list.length;
      this.allTimeText = [];
      if (listlength === 0) return;
      for (var i = 0; i < listlength; i += 48) {
        weeksSelect.push(list.slice(i, i + 48));
      }
      weeksSelect.forEach(item => {
        this.allTimeText.push(this.getTimeText(item))
      });
    },
    getTimeText(arrTime) {
      let timeLength = arrTime.length,
        isSelect = false,
        textTimeIndex = [],
        timeText = "";

      arrTime.forEach((value, index) => {
        if (value === '1') {
          if (!isSelect) {
            textTimeIndex.push(index);
            isSelect = true;
          }
          if (index === timeLength - 1) textTimeIndex.push(index + 1);
        } else {
          if (isSelect) {
            textTimeIndex.push(index);
            isSelect = false;
          }
        }
      })

      textTimeIndex.forEach((item, index) => {
        if (index % 2 === 1) {
          timeText += '~' + this.timeTextList[item] + '、'
        } else {
          timeText += this.timeTextList[item]
        }
      });

      return timeText.slice(0, -1)
    },
    resetMousemove() {
      if (!this.isMove) return;
      this.setSelectIndex(this.preViewIndex);
      this.isMove = false;
      this.preAxis = {};
      this.preViewIndex = [];
    },
    initList(value) {
      let reg = new RegExp("^[01]{" + this.timeSlots + "}$");
      if (value && reg.test(value)) {
        this.list = value.split('');
        return this.showSelectTime(this.list);
      }
      this.list = [];
      for (let i = 0; i < this.timeSlots; i++) {
        this.list[i] = '0';
      }
      this.$emit('input', this.list.join(''));
      this.showSelectTime(this.list);
    }
  },
  destroyed() {
    document.removeEventListener('mouseup', this.resetMousemove)
  },
  created() {
    this.initTimeText();
    document.addEventListener('mouseup', this.resetMousemove);
    this.initList(this.value);
  }
}
</script>

<style scoped>
.weektime {
  width: 658px;
  font-size: 14px;
  line-height: 32px;
  color: #515a6e;
  user-select: none;
}
.weektime .weektime-main {
  border: 1px solid #dcdee2;
  position: relative;
}
.weektime .weektime-hd {
  display: flex;
  background: #f8f8f9;
}
.weektime .weektime-hd-title {
  display: flex;
  align-items: center;
  padding: 0 6px;
  width: 80px;
  height: 65px;
  font-weight: 700;
}
.weektime .weektime-hd-con {
  flex: 1;
  display: flex;
  -webkit-box-orient: vertical;
  flex-direction: column;
}
.weektime .weektime-hd-con-top {
  display: flex;
  border-bottom: 1px solid #dcdee2;
}
.weektime .weektime-date-range {
  width: 288px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-left: 1px solid #dcdee2;
  font-weight: 700;
}
.weektime .weektime-hd-con-bottom {
  display: flex;
}
.weektime .weektime-date-cell {
  width: 24px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-left: 1px solid #dcdee2;
}
.weektime .weektime-bd {
  display: flex;
}
.weektime .week-body {
  width: 80px;
  flex-shrink: 0;
}
.weektime .week-item {
  border-top: 1px solid #dcdee2;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-weight: 700;
}
.weektime .time-body {
  width: 576px;
  height: 210px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  position: relative;
}
.weektime .time-cell {
  position: relative;
  width: 12px;
  height: 30px;
  border-left: 1px solid #efefef;
  border-top: 1px solid #efefef;
  overflow: hidden;
  transition: background 0.3s ease;
  outline-width: 0;
}
.weektime .time-cell.active {
  background: #2d8cf0;
}
.weektime .time-cell::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  opacity: 0.5;
  transition: background 888ms ease;
  z-index: 99999;
}
.weektime .pre-active::after {
  background: #113860;
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
.weektime .weektime-help {
  width: 658px;
  border: 1px solid #dcdee2;
  border-top: none;
  padding: 5px 15px;
}
.weektime .weektime-help-tx {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.weektime .weektime-help-week-tx {
  color: #999;
}

.weektime .weektime-help-bd {
  display: flex;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  padding: 4px 0;
}
.weektime .weektime-help .color-box {
  width: 14px;
  height: 20px;
  background: #fff;
  border: 1px solid #dddddd;
  display: block;
  margin-right: 6px;
}
.weektime .weektime-help-bd .color-box.color-active {
  background: #2d8cf0;
}
.weektime .weektime-help .text-box {
  margin-right: 15px;
}
.weektime .weektime-help .weektime-help-ft {
  color: #2d8cf0;
  cursor: pointer;
}
</style>