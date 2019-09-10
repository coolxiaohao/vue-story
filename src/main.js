//vue
import Vue from 'vue'
//主程入口
import App from '@/App.vue'
//router 路由
import router from '@/router'
//vuex 状态管理
import store from '@/store'
//i18n国际化
import i18n from '@/locales'
//自定义配置
import config from '@/config'
//iview
import iView from "iview";
//axios 请求
import '@/plugins/axios'
import '@/registerServiceWorker'
//iview.js
import '@/plugins/iview.js'
//设置自定义主题
import '@/index.less'

/**
 * i18n 配置
 */
Vue.use(iView,{
  i18n: (key, value) => i18n.t(key, value),
})
/**
 * @description 生产环境关掉提示
 * @type {boolean}
 */
Vue.config.productionTip = false
/**
 * 项目配置项
 * @type {{useI18n, baseUrl, cookieExpires, homeName, title}}
 */
Vue.prototype.$config=config
/**
 * 实例化
 */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
