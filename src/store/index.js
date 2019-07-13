import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//指定store js文件
const modulesFiles = require.context('@/store/module', false, /\.js$/)
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
//配置项
export default new Vuex.Store({
  modules, //用这种方式就不需要每个module下的js||ts文件都需要引用一次
})
