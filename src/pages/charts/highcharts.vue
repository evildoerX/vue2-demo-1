<template>
  <div id="app">
    <h-chart :id="id" :option="option"></h-chart>
  </div>
</template>

<script>
// 导入自己定义的组件
import HChart from 'components/Highcharts.vue'
// 导入模拟数据
import options from '../charts-options/options'
export default {
  name: 'app',
  data () {
    let option = options.bar
    return {
      id: 'test',
      option: option
    }
  },
  components: {
    HChart
  }
}
</script>

<style>
#test {
  width: 500px;
  height: 500px;
  margin: 40px auto;
}
</style>