import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Language from '@/components/Language'
import Admin_Login from '@/views/admin/login/login'
import error404 from '@/views/error-page/404.vue'
import error401 from '@/views/error-page/401.vue'
import error500 from '@/views/error-page/500.vue'
import Main from  '@/components/admin/main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '_home',
      redirect: '/admin/index',
      component: Main,
      meta: {
        hideInMenu: true,
        notCache: true
      },
      children: [
        {
          path: '/admin/index',
          name: 'admin_index',
          meta: {
            hideInMenu: true,
            title: '首页',
            notCache: true,
            icon: 'md-home'
          },
          component: Home
        }
      ]
    },
    {
      path:'/language',
      name:'language',
      component:Language
    },
    {
      path: '/admin/login',
      name:'admin_login',
      component:Admin_Login
    },
    {
      path: '/404',
      name: '404',
      component: error404
    },
    {
      path: '/401',
      name: '401',
      component: error401
    },
    {
      path: '/500',
      name: '500',
      component: error500
    }
  ]
})
