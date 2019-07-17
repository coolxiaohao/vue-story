<template>
    <Layout class="main">
        <Sider hide-trigger collapsible :width="256" :collapsed-width="64" class="left-sider"
               :style="{overflow: 'hidden'}">
            <side-menu accordion ref="sideMenu">
                <div class="logo-con">
<!--                    <img v-show="!collapsed" :src="maxLogo" key="max-logo"/>-->
                    <img :src="minLogo" key="min-logo"/>
                </div>
            </side-menu>
        </Sider>
        <Layout>
            <Header class="header-con">
                <header-bar >
<!--                    <user :message-unread-count="unreadCount" :user-avatar="userAvatar"/>-->
                    <language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/>
<!--                    <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader"-->
<!--                                 :has-read="hasReadErrorPage" :count="errorCount"></error-store>-->
<!--                    <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>-->
                </header-bar>
            </Header>
            <Content class="main-content-con">
                <Layout class="main-layout-con">
                    <div class="tag-nav-wrapper">
                        <tags-nav :value="$route" />
                    </div>
                    <Content class="content-wrapper">
<!--                        <keep-alive>-->
                            <router-view/>
<!--                        </keep-alive>-->
<!--                        <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>-->
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </Layout>
</template>
<script>
    import Language from '@/components/Language'
    import minLogo from '@/assets/admin/main/index_rabbit.gif'
    import { mapMutations, mapActions } from 'vuex'
    export default {
        name: "main",
        components: {
            Language
        },
        methods:{
            ...mapMutations([
                'setLocal',
            ]),
            ...mapActions([
                // 'handleLogin',
                // 'getUnreadMessageCount'
            ]),
        },
        computed:{
            local(){
                return this.$store.state.base.local
            }
        },
        props: {},
        data() {
            return {
                minLogo
            }
        },
        /*生命周期函数*/
        beforeCreate() { //实例刚刚被创建
        },
        created() { //实例已经创建完成
        },
        beforeMount() {//模板编译之前
        },
        mounted() {     /*请求数据，操作dom , 放在这个里面  mounted*/
            //模板编译完成
        },
        beforeUpdate() {
            //数据更新之前
        },
        updated() {
            //数据更新完毕
        },
        beforeDestroy() {   /*页面销毁的时候要保存一些数据，就可以监听这个销毁的生命周期函数*/
            //实例销毁之前
        },
        destroyed() {
            //实例销毁完成
        }
    }
</script>

<style lang="less">
    @import "./main.less";
</style>