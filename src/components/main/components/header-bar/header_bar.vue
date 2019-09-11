<template>
    <div class="header_bar">
        <!--收缩按钮-->
        <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
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

    export default {
        name: "header_bar",
        components: {
            siderTrigger,
            customBreadCrumb
        },
        props: {
            collapsed: Boolean
        },
        data() {
            return {}
        },
        methods: {
            handleCollpasedChange(state) {
                this.$emit('on-coll-change', state)
            }
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
