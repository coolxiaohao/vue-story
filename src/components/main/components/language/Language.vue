<template>
    <div class="Language">
        <Dropdown trigger="click" @on-click="selectLang">
            <a href="javascript:void(0)">
                {{ title }}
                <Icon :size="18" type="md-arrow-dropdown" />
            </a>
            <DropdownMenu slot="list">
                <!--实际上selectLang是根据:name直接传的值 声明一个:key变量 用来声明lang值-->
                <DropdownItem v-for="(value, key) in localList" :name="key" :key="`lang-${key}`">{{ value }}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
    /*
    执行顺序：用户点击触发点击事件selectLang 传:name的值 也就是当前选中的语言
    -> 由于绑定节点的操作共享事件 所以运行setLocal方法
    ->运行localSave方法 修改 or 新增一个key为local值为 页面传过来的值的本地储存
    ->更新单一状态树 state.local = lang
    -> 页面执行local()方法 更新lang值 也就是从vuex中拿出 state.local
    ->执行页面watch （用于监测vue实例上的数据变动） 监测lang值变化 替换语言包
    ->最后执行页面computed 更新title值
    */
    export default {
        name: 'Language',
        props: {
            lang: String //判断lang的数据类型 新建一个外部传值的变量 （子组件用父组件传过来的值）
        },
        data () {
            return {
                langList: {
                    'zh-CN': '语言',
                    'zh-TW': '語言',
                    'en-US': 'Lang'
                },
                localList: {
                    'zh-CN': '中文简体',
                    'zh-TW': '中文繁体',
                    'en-US': 'English'
                }
            }
        },
        watch: { //用于检测Vue实例上的数据变动
            lang (lang) { //监测lang值的数据变动
                //重新加载语言包
                this.$i18n.locale = lang
            }
        },
        computed: { //computed用来监控自己定义的变量，该变量不在data里面声明，
            // 直接在computed里面定义，然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理
            title () {
                //根据lang值返回title值
                return this.langList[this.lang]
            }
        },
        methods: {
            selectLang (name) {
                /*绑定节点操作 好处就是无需多写一个setLocal 直接用自定义的节点事件 name===:name*/
                this.$emit('on-lang-change', name)
            }
        }
    }
</script>
