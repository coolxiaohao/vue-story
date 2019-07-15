import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/locales'
import config from '@/config'
import iView from "iview";
import '@/plugins/axios'
import '@/registerServiceWorker'
import '@/plugins/iview.js'
//设置自定义主题
import '@/index.less'


Vue.use(iView,{
  i18n: (key, value) => i18n.t(key, value),
})
/**
 * @description 生产环境关掉提示
 * @type {boolean}
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 * @type {{useI18n, baseUrl, plugin, cookieExpires, homeName, title}}
 */

Vue.prototype.$config=config
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
