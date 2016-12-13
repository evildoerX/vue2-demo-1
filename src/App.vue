<template>
  <div id="app">
    <top-nav/>

    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="12">
        <echarts-demo/>
      </el-col>
      <el-col :span="12">
        <yes-or-no/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import TopNav from './components/TopNav'
import EchartsDemo from './components/EchartsDemo'
import YesOrNo from './components/YesOrNo'

// 引入
// import { Loading } from 'element-ui'

// 使用
// const ld = Loading.service({ fullscreen: true })
// ld.close()

import Vue from 'vue'

Vue.component('chart', ECharts)
export default {
  name: 'app',
  components: {
    'echarts-demo': EchartsDemo,
    'top-nav': TopNav,
    'yes-or-no': YesOrNo
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
