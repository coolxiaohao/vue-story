<template>
    <div class="admin_list">
        <Card>
            <Table ref="table" :tip-text="this.$t('操作提示')" :tip-content-text="this.$t('这里是操作提示!!')" editable searchable search-place="top" :columns="columns" v-model="data"/>
        </Card>
    </div>
</template>

<script>
    import Table from '_c/tables'

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
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        methods: {},
        mounted() {     /*请求数据，操作dom , 放在这个里面  mounted*/
            //模板编译完成
        },
    }
</script>

<style lang="less">

</style>