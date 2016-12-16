<template>
  <div id="app">
    <top-nav></top-nav>
    <el-row type="flex" :gutter="40" class="row-bg blow-top-nav" justify="space-around">
      <el-col :span="4">
        <left-nav></left-nav>
      </el-col>
      <el-col :span="20">
        <el-card class="box-card">
          <transition name='fade'>
            <router-view></router-view>
          </transition>
        </el-card>
      </el-col>
      <!--<echarts-demo></echarts-demo>-->
    </el-row>

  </div>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import TopNav from './components/TopNav'
import LeftNav from './components/LeftNav'
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
    'left-nav': LeftNav,
    'yes-or-no': YesOrNo
  }
}
</script>

<style>
  /*.box-card {
    width: 480px;
  }*/
  body {
    margin: 0;
  }
  .blow-top-nav {
    padding: 10px 0;
  }
</style>