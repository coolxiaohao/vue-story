<template>
    <a href="javascript:;" @click="htmlReload()" :class="['refresh-trigger-a', sonRefresh ? 'sonRefresh' : '']"
       type="text">
        <Icon :type="icon" :size="size"/>
    </a>
</template>

<script>
    export default {
        name: "refresh-button",
        components: {},
        props: {
            sonRefresh: Boolean,
            icon: {
                type: String,
                default: 'md-refresh'
            },
            size: {
                type: Number,
                default: 22
            }
        },
        data() {
            return {}
        },
        methods: {
            htmlReload() { //点击刷新
                if (this.sonRefresh){  //此处添加禁止连续点击刷新一是为了降低服务器压力，
                    // 另外一个就是为了防止超快点击造成chrome本身的一些js文件的报错(不过貌似这个问题还是存在，不过概率小了很多)
                    this.$emit('on-change', !this.sonRefresh)
                    this.$nextTick(() => {
                        const $this=this
                        setTimeout(function () {
                            $this.$emit('on-change', !this.sonRefresh)
                        }, 1000)
                    });
                } else {
                    this.$Message.error(this.$t('您点击的速度超过了服务器的响应速度，还是等两秒再刷新吧！'))
                }
            }
        },
    }
</script>

<style lang="less">
    .trans {
        transition: transform .2s ease;
    }

    @size: 40px;
    .refresh-trigger-a {
        padding: 6px;
        width: @size;
        height: @size;
        display: inline-block;
        text-align: center;
        color: #5c6b77;
        margin-top: 14px;

        i {
            .trans;
            vertical-align: top;
        }

        &.collapsed i {
            transform: rotateZ(90deg);
            .trans;
        }
    }
</style>