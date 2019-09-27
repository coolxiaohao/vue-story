<template>
    <Layout class="main">
        <!--左侧边栏-->
        <Sider breakpoint="md" hide-trigger collapsible :collapsed-width="64" :width="264" v-model="collapsed">
            <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed"
                       @on-select="turnToPage"
                       :menu-list="menuList">
                <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
                <div class="logo-con">
                    <img v-show="!collapsed" style="max-width: 254px;" :src="maxLogo" key="max-logo"/>
                    <img v-show="collapsed" style="max-width: 48px;" :src="minLogo" key="min-logo"/>
                </div>
                <h2 v-show="!collapsed" style="text-align: center;margin-top: 0.5rem;margin-bottom: 1rem;">
                    {{$t('欢迎您')}}!{{adminName}}</h2>
            </side-menu>
        </Sider>
        <Layout>
            <!--头部-->
            <Header class="header-con">
                <header_bar :collapsed="collapsed" :sonRefresh="sonRefresh" @on-coll-sonrefresh-change="handlesonRefreshChange" @on-coll-change="handleCollapsedChange">
                    <right-layer/>
                    <!--用户头像插件-->
                    <user :message-unread-count="unreadCount" style="margin-right: 10px;" :user-avatar="userAvatar"/>
                    <!--多语言组件-->
                    <language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;"
                              :lang="local"/>
                    <!--<error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader"
                                 :has-read="hasReadErrorPage" :count="errorCount"></error-store>-->
                    <fullscreen class="header-pc" v-model="isFullscreen" style="margin-right: 10px;"/>
                </header_bar>
            </Header>
            <!--主内容-->
            <Content class="main-content-con">
                <Layout class="main-layout-con">
                    <!--页面路径-->
                    <div class="tag-nav-wrapper">
                        <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
                    </div>
                    <!--页面内容-->
                    <Content class="content-wrapper">
                        <keep-alive :include="cacheList">
                            <router-view v-if="sonRefresh"/>
                        </keep-alive>
                        <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
                    </Content>
                </Layout>
            </Content>
            <!--底部-->
            <Footer>
                <font>{{$t('©2019 ')}} coolhao.all rights reserved.</font>
            </Footer>
        </Layout>

    </Layout>

</template>

<script>
    import header_bar from './components/header-bar';
    import RightLayer from './components/right-layer'
    import Language from './components/language'
    import Fullscreen from './components/fullscreen'
    import TagsNav from './components/tags-nav'
    import User from './components/user'
    import ABackTop from './components/a-back-top'
    import SideMenu from './components/side-menu'
    import minLogo from '@/assets/admin/main/index_rabbit.gif'
    import maxLogo from '@/assets/max-logo2.png'
    import {mapMutations, mapActions} from 'vuex'
    import routers from '@/router'
    import {getNewTagList, routeEqual} from "@/utils";

    export default {
        name: "Main",
        components: {
            RightLayer,
            Fullscreen,
            User,
            Language,
            SideMenu,
            header_bar,
            TagsNav,
            ABackTop
        },
        methods: {
            ...mapMutations([
                'setBreadCrumb',
                'setTagNavList',
                'addTag',
                'setLocal',
                'setHomeRoute',
                'closeTag'
            ]),
            ...mapActions([
                'handleLogin',
                'getUnreadMessageCount'
            ]),
            turnToPage(route) {
                let {name, params, query} = {}
                if (typeof route === 'string') name = route
                else {
                    name = route.name
                    params = route.params
                    query = route.query
                }
                if (name.indexOf('isTurnByHref_') > -1) {
                    window.open(name.split('_')[1])
                    return
                }
                this.$router.push({
                    name,
                    params,
                    query
                })
            },
            handleCollapsedChange(state) {
                this.collapsed = state
            },
            handlesonRefreshChange(state){
                this.sonRefresh = state
            },
            handleCloseTag(res, type, route) {
                if (type !== 'others') {
                    if (type === 'all') {
                        this.turnToPage(this.$config.homeName)
                    } else {
                        if (routeEqual(this.$route, route)) {
                            this.closeTag(route)
                        }
                    }
                }
                this.setTagNavList(res)
            },
            handleClick(item) {
                this.turnToPage(item)
            }
        },
        computed: { /*computed是计算属性，也就是依赖其它的属性计算所得出最后的值*/
            // ...mapGetters([
            // 'errorCount'
            // ]),
            adminName() {
                return this.$store.state.base.admin_name
            },
            tagNavList() {
                return this.$store.state.app.tagNavList
            },
            tagRouter() {
                return this.$store.state.app.tagRouter
            },
            userAvatar() {
                return this.$store.state.base.avatarImgPath
            },
            cacheList() {
                const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
                return list
            },
            menuList() {
                return this.$store.getters.menuList
            },
            local() {
                return this.$store.state.app.local
            },
            // hasReadErrorPage() {
            //     return this.$store.state.app.hasReadErrorPage
            // },
            unreadCount() {
                return this.$store.state.base.unreadCount
            }
        },
        watch: { /*watch的作用可以监控一个值的变换，并调用因为变化需要执行的方法。可以通过watch动态改变关联的状态。*/
            '$route'(newRoute) {
                const {name, query, params, meta} = newRoute
                this.addTag({
                    route: {name, query, params, meta},
                    type: 'push'
                })
                this.setBreadCrumb(newRoute)
                this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
                this.$refs.sideMenu.updateOpenName(newRoute.name)
            }
        },
        data() {
            return {
                sonRefresh:true,
                collapsed: false,
                minLogo,
                maxLogo,
                isFullscreen: false
            }
        },
        mounted() { /*html加载完成后执行。执行顺序：子组件-父组件*/
            /**
             * @description 初始化设置面包屑导航和标签导航
             */
            this.setTagNavList()
            this.setHomeRoute(routers.options.routes)
            const {name, params, query, meta} = this.$route
            this.addTag({
                route: {name, params, query, meta}
            })
            this.setBreadCrumb(this.$route)
            // 设置初始语言
            this.setLocal(this.$i18n.locale)
            // 如果当前打开页面不在标签栏中，跳到homeName页
            if (!this.tagNavList.find(item => item.name === this.$route.name)) {
                this.$router.push({
                    name: this.$config.homeName
                })
            }
            // 获取未读消息条数
            // this.getUnreadMessageCount()
        }
    }
</script>

<style lang="less">
    @import './main.less';
</style>