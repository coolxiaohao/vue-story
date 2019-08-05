/**
 * 翻译使用方法
 * 1.首先将需要翻译的中文将$T()包裹起来
 * 2.找到需要翻译的文件包 批量 or 单文件 修改package.json 中的translation 的src
 * (如:vue-cli-service translation --src=src/views/*.vue --locales=src/locales/lang/*.json) 详细请参考 translation
 * 3.找到当前项目目录运行yarn run translation 或者 vue-cli-service translation --src=src/views/*.vue --locales=src/locales/lang/*.json
 * 4.查看 locales 翻译是否成功
 * @author tanhao
 * @time 2019-8-05 14:44:09
 */
const {chalk} = require(require.resolve('@vue/cli-shared-utils'))
const {resolve} = require('path')
const querystring = require('querystring');
const got = require('got');
const safeEval = require('safe-eval');
const languages = require('google-translate-api-china').languages
const token = require('./google')
const i18nExtract = require('vue-i18n-extract').default
const fs = require("fs")
/**
 * 类型
 * @type {number}
 */
const EXTRACT_MISSING = 1
const EXTRACT_UNUSED = 2
const EXTRACT_ALL = 3

/**
 * 类型
 * @param args
 * @returns {number}
 */
function resolveReportType(args) {
    let type = EXTRACT_ALL
    if (args.type === 'missing') {
        type = EXTRACT_MISSING
    } else if (args.type === 'unused') {
        type = EXTRACT_UNUSED
    }
    return type
}

/**
 * 翻译
 * @param text
 * @param opts
 * @returns {Q.Promise<any>}
 */
function lang(text, opts) {
    this.data = token.get(text).then(function (token) {
        var url = 'https://translate.google.cn/translate_a/single';
        var data = {
            client: 't',
            sl: opts.from,
            tl: opts.to,
            hl: opts.to,
            dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
            ie: 'UTF-8',
            oe: 'UTF-8',
            otf: 1,
            ssel: 0,
            tsel: 0,
            kc: 7,
            q: text
        };
        data[token.name] = token.value;
        var fullUrl = url + '?' + querystring.stringify(data);
        if (fullUrl.length > 2083) {
            delete data.q;
            return [
                url + '?' + querystring.stringify(data),
                {method: 'POST', body: {q: text}}
            ];
        }
        return [fullUrl];
    }).then(function (url) {
        this.res = got.apply(got, url).then(function (res) {
            var result = {
                text: '',
                from: {
                    language: {
                        didYouMean: false,
                        iso: ''
                    },
                    text: {
                        autoCorrected: false,
                        value: '',
                        didYouMean: false
                    }
                },
                raw: ''
            };

            if (opts.raw) {
                result.raw = res.body;
            }

            var body = safeEval(res.body);
            body[0].forEach(function (obj) {
                if (obj[0]) {
                    result.text += obj[0];
                }
            });

            if (body[2] === body[8][0][0]) {
                result.from.language.iso = body[2];
            } else {
                result.from.language.didYouMean = true;
                result.from.language.iso = body[8][0][0];
            }

            if (body[7] && body[7][0]) {
                var str = body[7][0];

                str = str.replace(/<b><i>/g, '[');
                str = str.replace(/<\/i><\/b>/g, ']');

                result.from.text.value = str;

                if (body[7][5] === true) {
                    result.from.text.autoCorrected = true;
                } else {
                    result.from.text.didYouMean = true;
                }
            }
            return result;
        }).catch(function (err) {
            var e;
            e = new Error();
            if (err.statusCode !== undefined && err.statusCode !== 200) {
                e.code = 'BAD_REQUEST';
            } else {
                e.code = 'BAD_NETWORK';
            }
            throw e;
        });
        return this.res
    })
    return this.data
}

/**
 * 查找所有未定义的翻译
 * @param args
 * @param api
 * @returns {Promise<I18NReport>}
 */
async function service(args = {}) {
    if (!args.src) {
        console.log(chalk.red(`not specified 'src' argument.`))
        return
    }

    if (!args.locales) {
        console.log(chalk.red(`not specified 'locales' argument.`))
        return
    }

    const currentDir = process.cwd()
    const srcFiles = resolve(currentDir, args.src)
    const localeFiles = resolve(currentDir, args.locales)
    const extractType = resolveReportType(args)

    const i18nReport = i18nExtract.createI18NReport(srcFiles, localeFiles, extractType)
    i18nExtract.logI18NReport(i18nReport)

    if (args.output) {
        await i18nExtract.writeReportToFile(i18nReport, args.output)
    }
    //for循环使用替换翻译 写入json文件 i18nReport.missingKeys
    i18nReport.missingKeys.forEach((fn) => {
        let text = fn.path
        let language = ''
        if (fn.language === 'en-US') {
            language = 'en'
        } else {
            language = fn.language.toLowerCase()
        }
        const opts = {form: 'zh-cn', to: language}
        var e;
        [opts.from, opts.to].forEach(function (lang) {
            if (lang && !languages.isSupported(lang)) {
                e = new Error();
                e.code = 400;
                e.message = 'The language \'' + lang + '\' is not supported';
            }
        })
        if (e) {
            return new Promise(function (resolve, reject) {
                reject(e);
            });
        }

        opts.from = opts.from || 'auto';
        opts.to = opts.to || 'en';

        opts.from = languages.getCode(opts.from);
        opts.to = languages.getCode(opts.to);
        //请求谷歌翻译接口
        lang(text, opts).then((val) => {
            const json=require('../locales/lang/'+fn.language)
            //获取到翻译后的值 将它写进json数组对象里
            json[fn.path]=val.text
            const data=JSON.stringify(json);
            //修改文件内容
            fs.writeFile('src/locales/lang/'+fn.language+'.json', data,(res)=>{
                if (res===null){
                    console.log(language+"--"+val.text)
                }
            })
        })
    })
    return i18nReport
}


/**
 * 注册自定义命令
 * @param api
 * @param projectOptions
 */
module.exports = (api) => {
    api.registerCommand('translation', {
        description: 'translation plugin for vue cli 3',
        usage: 'vue-cli-service translation',
        options: {}
    }, service)
}