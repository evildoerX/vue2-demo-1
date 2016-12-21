<template>
  <div>
    <el-row>
      <el-col :span="12">
        <chart ref="p" :options="polar"></chart>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">OPTIONS</span>
            <el-button style="float: right;" type="primary" @click="changeOption">Change Options</el-button>
          </div>
          <pre class='polar_code'>{{ polar }}</pre>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.polar_code {
  font-size: 10px;
}
</style>

<script>
// import axios from 'axios'
// import _ from 'lodash'
import Vue from 'vue'
import ECharts from 'vue2-echarts/src/ECharts/ECharts.vue'
Vue.component('chart', ECharts)
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
  data () {
    return {
      polar: {
        title: {
          text: 'initial title',
          subtext: '纯属虚构',
          x: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          y: 'bottom',
          // data: data['data']
          data: ['mysql-5.5', 'percona-5.5']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '30%',
          containLabel: false
        },
        series: [
          {
            name: '数据库类型',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '40%'],

            label: {
              normal: {
                show: false
                // position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            // data: data['data1']
            data: [{
              name: 'MySQL',
              value: 9449
            },
            {
              name: 'MongoDB',
              value: 641
            }]
          },
          {
            name: 'MySQL是否高可用',
            type: 'pie',
            radius: ['45%', '65%'],

            label: {
              normal: {
                show: false
                // position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },

            // data: data['data2']
            data: [{
              name: 'Nomal',
              value: 6980
            },
            {
              name: 'HA',
              value: 2469
            }]
          },
          {
            name: '数据库版本',
            type: 'pie',
            radius: ['70%', '80%'],

            // data: data['data3']
            data: [{
              name: 'mysql-5.5',
              value: 4946
            },
            {
              name: 'percona-5.5',
              value: 135
            }]
          }
        ]
      }
    }
  },
  methods: {
    changeOption () {
      this.polar = {
        title: {
          text: 'title chenged',
          subtext: '纯属虚构',
          x: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          y: 'bottom',
          // data: data['data']
          data: ['mysql-5.5', 'percona-5.5']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '30%',
          containLabel: false
        },
        series: [
          {
            name: '数据库类型',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '40%'],

            label: {
              normal: {
                show: false
                // position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            // data: data['data1']
            data: [{
              name: 'MySQL',
              value: 94490
            },
            {
              name: 'MongoDB',
              value: Math.random() * 10000
            }]
          },
          {
            name: 'MySQL是否高可用',
            type: 'pie',
            radius: ['55%', '65%'],

            label: {
              normal: {
                show: false
                // position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },

            // data: data['data2']
            data: [{
              name: 'Nomal',
              value: 6980
            },
            {
              name: 'HA',
              value: Math.random() * 1000
            }]
          },
          {
            name: '数据库版本',
            type: 'pie',
            radius: ['70%', '80%'],

            // data: data['data3']
            data: [{
              name: 'mysql-5.5',
              value: Math.random() * 100
            },
            {
              name: 'percona-5.5',
              value: 135
            }]
          }
        ]
      }
      this.polar.title.subtext = Math.random()
    },
    resizeMyself () {
      this.$refs.p.resize()
    }
  },
  beforeCreate () {
    console.log('Charts Component beforeCreate!')
    NProgress.start()
  },
  created () {
    console.log('Charts Component created!')
    console.log('data: ' + this.polar.legend.data)
    // var data = {}
    // axios.get('http://127.0.0.1:8000/outer/')
    //   .then(function (response) {
    //     var data = response
    //     console.log(data)
    //   })
    //   .catch(function (error) {
    //     data = error
    //     // console.log(data)
    //   })
  },
  mounted () {
    console.log('Charts Component mounted!')
    NProgress.done()
  },
  beforeUpdate () {
    console.log('Charts Component beforeUpdate!')
  },
  updated () {
    console.log('Charts Component updated!')
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