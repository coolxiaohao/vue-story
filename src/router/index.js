import Vue from 'vue'
import {setTitle, getToken,setToken} from "@/utils";
import Router from 'vue-router';
import iView, {Message} from "iview";
import store from '@/store'
import config from "@/config";
const { homeName } = config

Vue.use(Router)
const ADMIN_LOGIN_NAME='admin_login'
//指定Routers js文件
const modulesFiles = require.context('@/router/routers', false, /\.js$/)
//扫描
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // console.log(modules)
    //名称
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    //值
    const value = modulesFiles(modulePath).default
    //以数组的形式返回
    modules[moduleName] = value
    return modules
}, {});

//获取端口 admin home app
let port = store.state.app.port
// 判断当前游览器是否有其他端口处于打开状态 如有 把路由加上去

//如果本地缓存没有 则进入默认入口
if (typeof modules[port] === "undefined" || port === "") {
    port = 'admin'
}
//获取相应的路由
const routers = modules[port];
//实例化
const router = new Router({
    // base:'story',
    routes: routers,
    mode: 'history'
})


/**
 * to 请求页面信息
 * form 上一个页面的信息
 * next 跳转函数
 */
router.beforeEach((to, from, next) => {
    //判断是否已经登陆了 如果没有登陆 就跳到登陆页面
    iView.LoadingBar.start() //进度条开始
    const token = getToken()
    //判断是否存在该路由
    if (!token && to.name !== ADMIN_LOGIN_NAME) {
        //未登陆且要跳转的页面不是登录页
        next({
            name: 'admin_login'
        })
    }else if (!token && to.name === ADMIN_LOGIN_NAME) {
        // 未登陆且要跳转的页面是登录页
        next() // 跳转
    }else  if (token && to.name === ADMIN_LOGIN_NAME){
        // 已登录且要跳转的页面是登录页
        next({
            name: homeName // 跳转到homeName页
        })
    } else if (to.matched.length > 0) {
        //正常路由跳转
        store.dispatch('getAdminInfo').then(() => {
            // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
            next()
        }).catch(() => {
            // Message.s(this.$t(res.msg));
            setToken('')
            next({
                name: ADMIN_LOGIN_NAME
            })
        })
    } else if (to.name !== '404') {
        //页面不存在
        next({
            name: '404'
        })
    }else {
        //逻辑500错误
        next({
            name: '500'
        })
    }
})

/**
 * 屏蔽下拉条
 */
router.afterEach(to => {
    setTitle(to, router.app)
    iView.LoadingBar.finish() //进度条结束
    window.scrollTo(0, 0)
})

export default router

