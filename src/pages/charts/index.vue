<template>
  <div>
    <el-row v-loading.fullscreen.lock="fullscreenLoading">
      <el-col :span="18" v-if="keys">
        <el-row>
          <el-col :span="24">
            <chart v-if=polar :options=polar ref="p"></chart>
          </el-col>
          <el-col :span="24">
            <hr>
            <el-radio-group v-model="state">
              <el-radio-button v-for="key in keys" :label=key></el-radio-button>
            </el-radio-group>
            <hr>
            <span style="color:darkcyan">{{ tips }}</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">{{ state }}</span>
          </div>
          <pre class='polar_code'>{{ polar }}</pre>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.polar_code {
  font-size: 15px;
  color:darkcyan;
}
</style>

<script>
import axios from 'axios'
import _ from 'lodash'
import Vue from 'vue'
import ECharts from 'vue2-echarts/src/ECharts/ECharts.vue'
Vue.component('chart', ECharts)
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
  data () {
    return {
      state: 'AK',
      keys: null,
      polar: null,
      fullscreenLoading: true,
      tips: 'Pick one...'
    }
  },
  watch: {
    state () {
      this.tips = 'Waiting...'
      this.loadStateData(this.state)
    }
  },
  methods: {
    changeOption () {
      this.polar.title.subtext = Math.random()
    },
    resizeMyself () {
      this.$refs.p.resize()
    },
    loadStateData:
      _.debounce(
        function (state) {
          let vm = this
          vm.tips = 'Loading...'
          axios.get('http://127.0.0.1:8000/quandl_analysis/test/', {
            params: {
              'state': state
            }
          })
          .then(function (response) {
            vm.polar.title.text = response.data.title
            vm.polar.xAxis.data = response.data.index
            vm.polar.series.data = response.data.value
            vm.polar.series.name = response.data.title
            vm.tips = 'Done...'
          })
          .catch(function (error) {
            console.log(error)
          })
        },
      1000
      )
  },
  beforeCreate () {
    console.log('Charts Component beforeCreate!')
    NProgress.start()
  },
  created () {
    console.log('Charts Component created!')
  },
  mounted () {
    var vm = this
    axios.get('http://127.0.0.1:8000/quandl_analysis/test/', {
      params: {
        'state': this.state
      }
    })
    .then(function (response) {
      vm.keys = response.data.key
      vm.polar = {
        title: {
          text: response.data.title
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: response.data.index
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: 'center',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{
          startValue: '1978-08-31T00:00:00'
        }, {
          type: 'inside'
        }],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [{
            gt: 0,
            lte: 50,
            color: '#096'
          }, {
            gt: 50,
            lte: 100,
            color: '#ffde33'
          }, {
            gt: 100,
            lte: 150,
            color: '#ff9933'
          }, {
            gt: 150,
            color: '#7e0023'
          }],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: response.data.title,
          type: 'line',
          data: response.data.value,
          markLine: {
            silent: true,
            data: [{
              yAxis: 50
            }, {
              yAxis: 100
            }, {
              yAxis: 150
            }]
          }
        }
      }
      vm.fullscreenLoading = false
    })
    .catch(function (error) {
      console.log(error)
    })
    console.log('Charts Component mounted!')
    NProgress.done()
  },
  beforeUpdate () {
    console.log('Charts Component beforeUpdate!')
    NProgress.start()
  },
  updated () {
    console.log('Charts Component updated!')
    NProgress.done()
  },
  beforeDestroy () {
    console.log('Charts Component beforeDestroy!')
    NProgress.done()
  },
  destroyed () {
    console.log('Charts Component destroyed!')
  }
}
</script>