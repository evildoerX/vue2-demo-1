<template>
  <div>
    <el-row>
      <el-col :span="24">
        <chart ref="p" :options="polar"></chart>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="8">
        <el-button @click="reloadCharts">Change Title</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style>

</style>

<script>
// import axios from 'axios'
import Vue from 'vue'
import ECharts from 'vue-echarts/components/ECharts'
Vue.component('chart', ECharts)
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
  data () {
    console.log('data () { <I\'m here> }')
    return {
      polar: {
        title: {
          text: '外部DB类型 & 版本分布',
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
    reloadCharts () {
      this.polar.title.text = Math.random()
      // this.$refs.p.showLoading({
      //   textColor: 'gray',
      //   text: '加载中...'
      // })
    },
    resizeMyself () {
      this.$refs.p.resize()
    }
  },
  watch: {
    'polar': {
      handler: function () {
        // this.resizeMyself()
        console.log('options changed!')
        console.log('data: ' + this.polar.legend.data)
      },
      deep: true
    }
  },
  beforeCreate () {
    console.log('Charts Component beforeCreate!')
    NProgress.start()
  },
  created () {
    console.log('Charts Component created!')
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
    // var vm = this
    // window.onresize = function () {
    //   console.log('onsize')
    //   if (vm.resizeTimer) clearTimeout(vm.resizeTimer)
    //   vm.resizeTimer = setTimeout(function () {
    //     vm.resizeMyself()
    //   }, 500)
    // }
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