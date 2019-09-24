<template>
    <div class="admin_list">
        <Card>
            <Table ref="table" :tip-text="this.$t('操作提示')" :tip-content-text="this.$t('这里是操作提示!!')" editable searchable search-place="top" :columns="columns" v-model="data"/>
        </Card>
    </div>
</template>

<script>
    import Table from '_c/tables'
    import {forEach,getRelativeTime} from "@/utils/tools";

    export default {
        name: "admin_list",
        components: {
            Table
        },
        props: {},
        data() {
            return {
                columns: [
                    {
                        title: this.$t('管理员账号'),
                        key: 'adminName'
                    },
                    {
                        title: this.$t('管理员电话'),
                        key: 'phone'
                    },
                    {
                        title: this.$t('权限组名称'),
                        key: 'rule_name'
                    },
                    {
                        title: this.$t('添加时间'),
                        key: 'add_time'
                    },

                ],
                data: []
            }
        },
        methods: {
            getAllAdmin(){
                // console.log(123456)
                this.$store.dispatch("getAllAdmin").then(d => {
                    if (d.code && d.code === 200) {
                        forEach(d.data,(item)=>{
                            item.rule_name=item.rule.rulename
                            if (item.addTime>0){
                                item.add_time=getRelativeTime(item.addTime)
                            }else {
                                item.add_time='-'
                            }

                        })
                        this.data=d.data

                    } else {
                        this.$Message.error(d.msg);
                    }
                });
            }
        },
        watch:{
            data(){
                // this.getAllAdmin()
            }
        },
        mounted() {     /*请求数据，操作dom , 放在这个里面  mounted*/
            //模板编译完成
            this.getAllAdmin()
        },
    }
</script>

<style lang="less">

</style>