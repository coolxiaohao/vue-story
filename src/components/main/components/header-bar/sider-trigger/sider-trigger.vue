<template>
    <a @click="handleChange" type="text" :class="['sider-trigger-a', collapsed ? 'collapsed' : '']">
        <Icon :type="icon" :size="size"/>
    </a>
</template>

<script>
    export default {
        name: "sider-trigger",
        components: {},
        props: {
            collapsed: Boolean,
            icon: {
                type: String,
                default: 'navicon-round'
            },
            size: {
                type: Number,
                default: 26
            }
        },
        data() {
            return {}
        },
        methods: {
            handleChange() {
                this.$emit('on-change', !this.collapsed)
            }
        },
    }
</script>

<style lang="less">
    @import './sider-trigger.less';
</style>