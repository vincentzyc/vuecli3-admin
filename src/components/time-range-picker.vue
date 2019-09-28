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
          <div class="week-item">星期一</div>
          <div class="week-item">星期二</div>
          <div class="week-item">星期三</div>
          <div class="week-item">星期四</div>
          <div class="week-item">星期五</div>
          <div class="week-item">星期六</div>
          <div class="week-item">星期日</div>
        </div>
        <div class="time-body" @mouseleave="handleMouseleave">
          <div
            v-for="(i,key) in 336"
            :key="key"
            class="time-cell"
            :class="{'active':list[key]==='1'}"
            @mousedown="handleMousedown(key,$event)"
            @mouseup="handleMouseup(key,$event)"
            @click="handleClick(key)"
          ></div>
          <!-- @click="handleClick(key)" -->
          <!-- @mousemove="handleMousemove(key,$event)" -->
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
      <div class="duration-help-ft">清空选择</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "duration-time-picker",
  data() {
    return {
      list: [],
      timeSlots: 7 * 24 * 2,
      isMove: false
    }
  },
  methods: {
    // moveSelectTime(i){},
    handleClick(i) {
      let newData = this.list[i] === '1' ? '0' : '1';
      this.list.splice(i, 1, newData);
    },
    handleMousedown(i, event) {
      this.isMove = true;
      // console.log(event.target.parentNode);
      // event.target.addEventListener('mousemove', (i, e) => {
      //   this.selectTime(i);
      // })
    },
    // handleMousemove(i) {
    // if(!this.isMove) return;
    // this.selectTime(i);
    // },
    handleMouseup(i) {
      this.isMove = false;
      // this.selectTime(i);
    },
    handleMouseleave() {
      this.isMove = false;
    },
    initList() {
      for (let i = 0; i < this.timeSlots; i++) {
        this.list[i] = '0'
      }
    }
  },
  created() {
    this.initList();
  }
}
</script>

<style scoped>
.duration {
  font-size: 14px;
  line-height: 32px;
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

.duration-bd {
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
}

.duration .time-cell.active {
  background: #2d8cf0;
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

.duration .duration-help-bd .color-active {
  background: #2d8cf0;
}

.duration .color-box {
  width: 14px;
  height: 20px;
  background: #fff;
  border: 1px solid #efefef;
  display: block;
  margin-right: 4px;
}

.duration .text-box {
  margin-right: 14px;
}

.duration .duration-help-ft {
  color: #2d8cf0;
  cursor: pointer;
}
</style>