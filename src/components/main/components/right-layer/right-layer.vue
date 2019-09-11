<template>
    <div class="right-layer">
        <Icon type="md-more" :size="18" @click="right = true" placement="bottom"/>
        <Drawer :title="this.$t('主题风格设置')" :width="300" :closable="false" v-model="right">
<!--            <p>Some contents...</p>-->
<!--            <p>Some contents...</p>-->
<!--            <p>Some contents...</p>-->
        </Drawer>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                right: false
            }
        }
    }
</script>
<style lang="less">
    .right-layer{
        height: 64px;
        /*line-height: 56px;*/
        cursor: pointer;
    }
</style>