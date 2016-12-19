import TopNav from '../components/TopNav'
import LeftNav from '../components/LeftNav'

export default [
  {
    path: '/',
    component: TopNav,
    children: [
      {
        path: '/',
        component: LeftNav,
        children: [
          {
            path: 'charts',
            component: resolve => require(['../pages/charts'], resolve)
          },
          {
            path: 'question',
            component: resolve => require(['../pages/question'], resolve)
          },
          {
            path: 'home',
            component: resolve => require(['../pages/home'], resolve)
          }
        ]
      },
      // 注意列表有序
      {
        path: '*',
        component: {
          template: '<div class="text-align:center">' +
          '<h1>Not Found</h1>' +
          '</div>'
        }
      }]
  }
]
