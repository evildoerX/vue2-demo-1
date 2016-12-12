<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <echarts-demo></echarts-demo>
  </div>
</template>

<script>
import Hello from './components/Hello'
import ECharts from 'vue-echarts/components/ECharts.vue'
import EchartsDemo from './components/EchartsDemo'
console.log(ECharts)
import Vue from 'vue'
Vue.component('chart', ECharts)

export default {
  name: 'app',
  components: {
    Hello,
    'echarts-demo': EchartsDemo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
