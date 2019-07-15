import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Language from '@/components/Language'
import Admin_Login from '@/views/admin/login/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
    }
  ]
})
