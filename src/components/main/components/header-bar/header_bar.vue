<template>
    <div class="header_bar">
        <!--收缩按钮-->
        <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
        <!--刷新按钮-->
<!--        <a href="javascript:;">-->
<!--            <Icon type="md-refresh"></Icon>-->
<!--        </a>-->
        <refresh-button :sonRefresh="sonRefresh" icon="md-refresh" @on-change="handlesonRefreshChange"></refresh-button>
        <!--当前页路径-->
        <custom-bread-crumb show-icon style="margin-left: 20px;" :list="breadCrumbList"></custom-bread-crumb>
        <!--用户信息，多语言设置等-->
        <div class="custom-content-con">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import siderTrigger from './sider-trigger'
    import customBreadCrumb from './custom-bread-crumb'
    import RefreshButton from "_c/main/components/header-bar/refresh-button/refresh-button";

    export default {
        name: "header_bar",
        components: {
            RefreshButton,
            siderTrigger,
            customBreadCrumb
        },
        props: {
            sonRefresh:Boolean,
            collapsed: Boolean
        },
        data() {
            return {}
        },
        methods: {
            handleCollpasedChange(state) {
                this.$emit('on-coll-change', state)
            },
            handlesonRefreshChange(state) {
                this.$emit('on-coll-sonrefresh-change', state)
            },
        },
        computed: {
            breadCrumbList() {
                return this.$store.state.app.breadCrumbList
            }
        },
    }
</script>

<style lang="less">
    @import 'header_bar.less';
</style>
