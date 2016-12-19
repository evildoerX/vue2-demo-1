// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由库
import VueRouter from 'vue-router'
// 加载模拟模块的css（js使用的时候加载）
import 'nprogress/nprogress.css'
// 引入element css
import 'element-ui/lib/theme-default/index.css'
// 引入element国际化
import locale from 'element-ui/lib/locale/lang/zh-CN'
// 完整引入Element
import ElementUI from 'element-ui'
// 使用ElementUI，同时配置国际化库
Vue.use(ElementUI, { locale })
// 使用vue-router
Vue.use(VueRouter)

// 引入路由配置
import routes from './config/routes'
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
