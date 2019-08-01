import Vue from 'vue'
import {setTitle} from "@/utils";
import Router from 'vue-router';
import iView from "iview";
import store from '@/store'

Vue.use(Router)

//指定Routers js文件
const modulesFiles = require.context('@/router/routers', false, /\.js$/)
//扫描
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    //名称
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    //值
    const value = modulesFiles(modulePath)
    //以数组的形式返回
    modules[moduleName] = value.default
    return modules
}, {});

//获取端口 admin home app
let port = store.state.app.port
//如果本地缓存没有 则进入默认入口
if (typeof modules[port] === "undefined" || port === "") {
    port = 'base'
}
//获取相应的路由
const routers = modules[port];
//实例化
const router = new Router({
    routes: routers,
    mode: 'history'
})

/**
 * to 请求页面信息
 * form 上一个页面的信息
 * next 跳转函数
 */
router.beforeEach((to, from, next) => {
        iView.LoadingBar.start() //进度条开始
        //判断是否存在该路由
        if (to.name == null || to.name === "") {
            next({
                name: '404'
            })
        } else {
            next()
        }
    }
)

/**
 * 屏蔽下拉条
 */
router.afterEach(to => {
    setTitle(to, router.app)
    iView.LoadingBar.finish() //进度条结束
    window.scrollTo(0, 0)
})

export default router

