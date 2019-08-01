<template>
    <Layout style="height: 100%" class="main">
        <Sider hide-trigger collapsible :width="256" :collapsed-width="86" v-model="collapsed" class="left-sider"
               :style="{overflow: 'hidden'}">
            <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed"
                       @on-select="turnToPage"
                       :menu-list="menuList">
                <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
                <div class="logo-con">
                    <img v-show="!collapsed" :src="maxLogo" key="max-logo"/>
                    <img v-show="collapsed" :src="minLogo" key="min-logo"/>
                </div>
            </side-menu>
        </Sider>
        <Layout>
            <Header class="header-con">
                <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
                    <!--<user :message-unread-count="unreadCount" :user-avatar="userAvatar"/>-->
                    <!--多语言组件-->
                    <language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;"
                              :lang="local"/>
                    <!--<error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader"
                                 :has-read="hasReadErrorPage" :count="errorCount"></error-store>-->
                    <!--<fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>-->
                </header-bar>
            </Header>
            <Content class="main-content-con">
                <Layout class="main-layout-con">
                    <div class="tag-nav-wrapper">
                        <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
                    </div>
                    <Content class="content-wrapper">
                        <keep-alive :include="cacheList">
                            <router-view/>
                        </keep-alive>
                        <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </Layout>
</template>
<script>
    import Language from '@/components/Language'
    import TagsNav from '@/components/admin/main/components/tags-nav'
    import ABackTop from '@/components/admin/main/components/a-back-top'
    import SideMenu from '@/components/admin/main/components/side-menu'
    import minLogo from '@/assets/admin/main/index_rabbit.gif'
    import maxLogo from '@/assets/admin/main/index_rabbit.gif'
    import HeaderBar from './components/header-bar'
    import {mapMutations, mapActions} from 'vuex'
    import routers from '@/router'
    import {getNewTagList, routeEqual} from "@/utils";

    export default {
        name: "main",
        components: {
            Language,
            SideMenu,
            HeaderBar,
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
            tagNavList() {
                return this.$store.state.app.tagNavList
            },
            // tagRouter() {
            //     return this.$store.state.app.tagRouter
            // },
            // userAvatar() {
            //     return this.$store.state.user.avatarImgPath
            // },
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
            // unreadCount() {
            //     return this.$store.state.user.unreadCount
            // }
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
    @import "./main.less";
</style>