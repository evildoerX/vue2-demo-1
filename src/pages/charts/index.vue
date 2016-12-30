<template>
  <div>
    <el-row v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中">
      <el-col :span="18" v-if="keys">
        
        <h3>美国各大洲人口数量 时间序列 DataFrame</h3>

        <el-row>
          <el-col :span="24">
            <chart v-if=polar :options=polar ref="p"></chart>
          </el-col>
        </el-row>
        <hr>

        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="11">
            <h3>Frequency</h3>
            <el-select v-model="resample_alias" clearable placeholder="请选择">
              <el-option
                v-for="item in sample_alias"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <h2 style="color:darkcyan">{{ tips }}</h2>
          </el-col>
          <el-col :span="11">
            <h3>States of U.S.</h3>
            <el-radio-group v-model="state">
              <el-radio-button v-for="key in keys" :label=key></el-radio-button>
            </el-radio-group>
            <hr>
          </el-col>
        </el-row>

      </el-col>
      
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">{{ state }}</span>
            <el-tag style="float: right;">{{ resample_alias? resample_alias : 'None'}}</el-tag>
          </div>
          <pre class='polar_code' v-if=polar>{{ polar.series }}</pre>
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
      resample_alias: null,
      fullscreenLoading: true,
      tips: 'Pick one...',
      sample_alias: [{
        value: 'AS',
        label: 'Year start frequency'
      }, {
        value: 'A',
        label: 'Year end frequency'
      }, {
        value: 'MS',
        label: 'Month start frequency'
      }, {
        value: 'M',
        label: 'Month end frequency'
      }]
    }
  },
  watch: {
    state () {
      this.tips = 'Waiting...'
      this.loadStateData(this.state)
    },
    resample_alias () {
      this.tips = 'Waiting...'
      this.loadStateData()
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
        function () {
          let vm = this
          vm.tips = 'Loading...'
          axios.get('http://127.0.0.1:8000/quandl_analysis/test/', {
            params: {
              'state': vm.state,
              'resample_alias': vm.resample_alias
            }
          })
          .then(function (response) {
            vm.polar.title.text = response.data.title
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
        state: vm.state
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