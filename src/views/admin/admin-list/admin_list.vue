<template>
    <div class="admin_list">
        <Card>
            <Table ref="table" :tip-text="this.$t('操作提示')" :tip-content-text="this.$t('这里是操作提示!!')" editable searchable
                   search-place="top" :columns="columns" v-model="data"/>
            <!--            <Button @click="modal2 = true">Custom header and footer</Button>-->
            <Modal v-model="modal2" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="ios-information-circle"></Icon>
                    <span>{{this.$t('删除确认')}}</span>
                </p>
                <div style="text-align:center">
                    <p>{{this.$t('删除此管理员后此管理员得信息将被彻底删除')}}</p>
                    <p>{{this.$t('是否继续删除?')}}</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long :loading="modal_loading" @click="del">{{this.$t('删除')}}</Button>
                </div>
            </Modal>
        </Card>
    </div>
</template>

<script>
    import Table from '_c/tables'
    import {forEach, getRelativeTime} from "@/utils/tools";

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
                        title: this.$t('管理员ID'),
                        key: 'id'
                    },
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
                    {
                        title: this.$t('操作'),
                        key: 'action',
                        // width: 150,
                        align: 'left',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'default'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.getAdminOnefo(params)
                                        }
                                    }
                                }, this.$t('详细')),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'default'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal2 = true
                                            this.admin_id=params.row.id
                                        }
                                    }
                                }, this.$t('删除'))
                            ]);
                        }
                    }
                ],
                data: [],
                modal2: false,
                modal_loading: false,
                admin_id: 0,
            }
        },
        methods: {
            getAdminOnefo(index) {
                // console.log(index.row.id)
            },
            // deleteAdmin(index){
            //
            // },
            del() {
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.modal2 = false;
                    console.log(this.admin_id)
                    this.$store.dispatch("deleteAdmin",this.admin_id).then(d => {
                        if (d.code === 200) {
                            this.$Message.success(this.$t('删除管理员成功'));
                            this.getAllAdmin();
                        }
                    }).catch(error => {
                        this.$Message.success(error);
                    })
                }, 2000);
            },
            getAllAdmin() {
                // console.log(123456)
                this.$store.dispatch("getAllAdmin").then(d => {
                    if (d.code && d.code === 200) {
                        forEach(d.data, (item) => {
                            item.rule_name = item.rule.rulename
                            if (item.addTime > 0) {
                                item.add_time = getRelativeTime(item.addTime)
                            } else {
                                item.add_time = '-'
                            }
                            item.action = '<button type="primary" class="ivu-slider-button-dragging">删除</button>'
                        })
                        this.data = d.data

                    } else {
                        this.$Message.error(d.msg);
                    }
                });
            }
        },
        watch: {
            data() {
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