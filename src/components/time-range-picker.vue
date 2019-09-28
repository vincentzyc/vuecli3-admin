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
        <div class="time-body">
          <div
            v-for="(i,key) in 336"
            :key="key"
            class="time-cell"
            :class="{'active':list[key]==='1'}"
            @click="select(key)"
          ></div>
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
  name: "time-range-picker",
  data() {
    return {
      list: [],
    }
  },
  methods: {
    select(i) {
      console.log(this.list[i]);
      this.list[i] = this.list[i] === '0' ? '1' : '0';
    },
    initList(){
      for (let index = 0; index < 336; index++) {
        this.list.push('1')
      }
    }
  },
  created() {
    this.initList();
    console.log(this.list);
  }
}
</script>

<style lang="stylus" scoped>