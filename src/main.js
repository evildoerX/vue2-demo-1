// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App'
import VueRouter from 'vue-router'
import EchartsDemo from './components/EchartsDemo'
import YesOrNo from './components/YesOrNo'

const routes = [
  { path: '/yes-or-no', component: YesOrNo },
  { path: '/', component: EchartsDemo }
]

const router = new VueRouter({
  routes
})

// 完整引入Element
Vue.use(ElementUI, { locale })

// 使用vue-router
Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
