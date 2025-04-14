import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import MyOrder from '@/views/myorder'
import Pay from '@/views/pay'
import ProDetail from '@/views/prodetail'
import Search from '@/views/search'
import SearchList from '@/views/search/list.vue'

import Cart from '@/views/layout/cart.vue'
import Category from '@/views/layout/category.vue'
import Home from '@/views/layout/home.vue'
import User from '@/views/layout/user.vue'

import store from '@/store'

Vue.use(VueRouter)

// 但凡是单个页面,独立展示的,都是一级路由

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/cart', component: Cart },
        { path: '/category', component: Category },
        { path: '/home', component: Home },
        { path: '/user', component: User }
      ]
    },
    { path: '/login', component: Login },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    // 动态路由传参,确认将来是哪个商品,路由参数中携带id
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

// 所有的路由在真正被访问到之前（解析渲染对应组件页面前），都会先经过全局前置守卫
// 只有全局前置守卫放行了，才会到达对应的页面

// 全局前置导航守卫
// to: 到哪去（路径，参数）
// from: 从哪来（路径，参数）
// next(): 是否放行
// 1.next() 直接放行，放行到to要去的路径
// 2.next(路径) 进行拦截，拦截到next里面配置的路径

// 定义一个数组，专门用户存放所有需要权限访问的页面
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // 看to.path是否在 authUrls 中出现过
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }
  // 是权限页面，拿token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
