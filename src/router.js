import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import * as types from '@/store/types'
import { getToken, getUsername } from '@/utils/auth'
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'
import Layout from '@/views/layout/Layout'
import AddShop from '@/views/layout/AddShop'
import AddCommodity from '@/views/layout/AddCommodity'
import ShopList from '@/views/layout/ShopList'
import CommodityList from '@/views/layout/CommodityList'
import NotFound from '@/views/404'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: '登录',
    component: Login,
    hidden: true,
  },
  {
    path: '/signup',
    name: '注册',
    component: SignUp,
    hidden: true,
  },
  {
    path: '/',
    name: '数据管理',
    component: Layout,
    iconClass: 'el-icon-s-management',
    meta: {
      requireAuth: true,
    },
    redirect: '/shoplist',
    children: [
      {
        path: '/shoplist',
        name: '店铺列表',
        component: ShopList,
      },
      {
        path: '/commoditylist',
        name: '商品列表',
        component: CommodityList,
      },
    ],
  },
  {
    path: '/',
    name: '添加数据',
    component: Layout,
    iconClass: 'el-icon-circle-plus',
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: '/addshop',
        name: '添加商铺',
        component: AddShop,
      },
      {
        path: '/addcommodity',
        name: '添加商品',
        component: AddCommodity,
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/404',
        name: '找不到页面',
        component: NotFound,
      },
    ],
  },
  { path: '*', redirect: '/404', hidden: true },
]

const router = new Router({
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else if (getToken() && getUsername()) {
      store.commit(types.LOGIN, { token: getToken(), username: getUsername() })
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    }
  } else {
    if (to.path === '/login') {
      if (store.state.token) {
        next({
          path: '/',
        })
      } else if (getToken() && getUsername()) {
        store.commit(types.LOGIN, {
          token: getToken(),
          username: getUsername(),
        })
        next({
          path: '/',
        })
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

export default router
