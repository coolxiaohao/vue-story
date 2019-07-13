import Vue from 'vue'
import '@/plugins/axios'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/registerServiceWorker'
import config from '@/config'
import '@/plugins/iview.js'
import i18n from '@/locales'

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
