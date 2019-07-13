import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { localRead } from '@/utils/index'
//语言包
import customZhCn from './lang/zh-CN'
import customZhTw from './lang/zh-TW'
import customEnUs from './lang/en-US'
//iview 翻译
import zhCnLocale from 'iview/src/locale/lang/zh-CN'
import enUsLocale from 'iview/src/locale/lang/en-US'
import zhTwLocale from 'iview/src/locale/lang/zh-TW'

Vue.use(VueI18n)

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
//判断语言包是否正确
const localLang = (navLang === 'zh-CN' || navLang === 'en-US'||navLang === 'zh-TW') ? navLang : false
//拿到语言包名称
let lang = localLang || localRead('local') || 'zh-CN'
//写入config
Vue.config.lang = lang

// vue-i18n 6.x+写法
Vue.locale = () => {}
const messages = { //对应的翻译
  'zh-CN': Object.assign(zhCnLocale, customZhCn), //将自定义和默认翻译合在一个对象中
  'zh-TW': Object.assign(zhTwLocale, customZhTw),
  'en-US': Object.assign(enUsLocale, customEnUs)
}
const i18n = new VueI18n({//配置当前语言包
  locale: lang,
  messages
})
//初始化
export default i18n

// vue-i18n 5.x写法
// Vue.locale('zh-CN', Object.assign(zhCnLocale, customZhCn))
// Vue.locale('en-US', Object.assign(zhTwLocale, customZhTw))
// Vue.locale('zh-TW', Object.assign(enUsLocale, customEnUs))
