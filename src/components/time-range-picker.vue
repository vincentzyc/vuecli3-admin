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
            <span class="duration-date-cell" v-for="hour in 24" :key="hour">{{hour-1}}</span>
          </div>
        </div>
      </div>
      <div class="duration-bd">
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
      isMove: false,
      list: [],
      timeSlots: 7 * 24 * 2,
      timeTextList: [],
      weeks: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      selectIndex: [],
      preAxis: {},
      preViewIndex: [],
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
      let index = event.target.getAttribute('data-index');
      this.preAxis.startx = index % 48;
      this.preAxis.starty = ~~(index / 48);
    },
    handleMouseup(event) {
      let index = event.target.getAttribute('data-index');
      this.preAxis.endx = index % 48;
      this.preAxis.endy = ~~(index / 48);
      this.preViewIndex = this.getSelectIndex(this.preAxis);
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
    resetMousemove() {
      this.selectIndex = this.preViewIndex;
      this.isMove = false;
      this.preAxis = {};
      this.preViewIndex = [];
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
  destroyed() {
    document.removeEventListener('mouseup', this.resetMousemove)
  },
  created() {
    this.initList(this.value);
    this.initTimeText();
    document.addEventListener('mouseup', this.resetMousemove)
  }
}
</script>

<style scoped>