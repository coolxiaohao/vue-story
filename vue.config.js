const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir)
};
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : '/';
module.exports = {
    publicPath:BASE_URL,
    css: {
        loaderOptions: {
            less: { //解决less文件无法调用的问题
                javascriptEnabled: true
            }
        }
    },
    devServer: {//设置代理
        proxy: {
            '/api': {
                target: 'http://localhost:3743',   //代理接口
                changeOrigin: true, //需要虚拟托管站点
                ws: true, //代理websockets
                pathRewrite: {
                    '^/api': ''    //代理的路径
                }
            }
        }
    },

    //webpack配置
    configureWebpack: {
        //警告 webpack 的性能提示
        performance: {
            hints: 'warning',
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    },
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false,
    chainWebpack:config => {
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
            // .set('_c', resolve('src/components'))
    },
    /**
     * 第三方插件设置
     */
    pluginOptions: {
        i18n: {
            locale: 'en-US', //  项目本地化的区域设置
            fallbackLocale: 'en-US',//项目本地化的后备区域设置
            localeDir: 'locales/lang', //项目的商店本地化消息的目录
            enableInSFC: false //在单个文件组件中启用区域设置消息
        },
        //自定义指令
        translation: {
            // vue-cli-plugin-translation 插件可以作为 `projectOptions.pluginOptions.translation` 访问这些选项，其他插件也可以拿到
            src: '*.vue',
            locale: 'en-US'
        },
    }
};
