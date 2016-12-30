<template>
  <div>
    <el-row v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中">
      <el-col :span="24">
        <chart v-if=polar :options=polar ref="p"></chart>
      </el-col>
      <el-col :span="24">
        <pre>{{ pureValue }}</pre>
      </el-col>
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
      fullscreenLoading: true,
      polar: null,
      describe: 'std',
      pureValue: null
    }
  },
  watch: {
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
        function () {
          let vm = this
          vm.tips = 'Loading...'
          axios.get('http://127.0.0.1:8000/quandl_analysis/describe/', {
            params: {
              describe: vm.describe
            }
          })
          .then(function (response) {
            vm.polar.title.text = vm.describe.toUpperCase()
            vm.polar.xAxis.data = response.data.index
            vm.polar.series.data = response.data.value
            vm.polar.series.name = response.data.title
            vm.tips = 'Done'
          })
          .catch(function (error) {
            console.log(error)
          })
        },
      1000
      )
  },
  mounted () {
    var vm = this
    axios.get('http://127.0.0.1:8000/quandl_analysis/describe/', {
      params: {
        describe: vm.describe
      }
    })
    .then(function (response) {
      vm.keys = response.data.key
      // var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
      vm.pureValue = response.data.pure_value
      var data = response.data.value
      var dataAxis = response.data.key
      vm.polar = {
        title: {
          text: vm.describe.toUpperCase(),
          subtext: 'of describe'
        },
        radar: [
          {
            indicator: [
              {text: '品牌', max: 100},
              {text: '内容', max: 100},
              {text: '可用性', max: 100},
              {text: '功能', max: 100}
            ],
            center: ['25%', '40%'],
            radius: 80
          }],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: dataAxis,
          name: '50洲',
          axisLabel: {
            inside: true,
            textStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true
          },
          z: 10
        },
        yAxis: {
          name: '万人',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [85, 90, 90, 95, 95],
                name: '某主食手机'
              },
              {
                value: [95, 80, 95, 90, 93],
                name: '某水果手机'
              }
            ]
          },
          {
            name: vm.describe.toUpperCase(),
            type: 'bar',
            data: data
          }
        ]
      }
      vm.fullscreenLoading = false
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  beforeUpdate () {
    NProgress.start()
  },
  updated () {
    NProgress.done()
  }
}
</script>