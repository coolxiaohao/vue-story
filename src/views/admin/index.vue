<template>
    <Card shadow style="text-align: center">
        <img alt="Vue logo" :src="Logo">
    </Card>
</template>

<script>
    import Logo from '@/assets/logo.png'
    export default {
        name: "index",
        components: {},
        props: {},
        data() {
            return {
                Logo,
            }
        },
        methods: {}
    }
</script>

<style lang="less">

</style>