<template>
    <div class="user-avatar-dropdown">
        <Dropdown @on-click="handleClick">
            <Badge :dot="!!messageUnreadCount">
                <Avatar :src="userAvatar"/>
            </Badge>
            <Icon :size="18" type="md-arrow-dropdown"></Icon>
            <DropdownMenu slot="list">
                <!--        <DropdownItem>{{adminName}}</DropdownItem>-->
                <DropdownItem>{{$t('个人信息')}}</DropdownItem>
                <DropdownItem name="message">
                    {{$t('消息中心')}}
                    <Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
                </DropdownItem>
                <DropdownItem name="logout">{{$t('退出登录')}}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>

    import {mapActions} from 'vuex'

    export default {
        name: 'User',
        props: {
            userAvatar: {
                type: String,
                default: ''
            },
            messageUnreadCount: {
                type: Number,
                default: 0
            }
        },
        methods: {
            ...mapActions([
                'handleLogOut'
            ]),
            logout() {
                this.handleLogOut().then(() => {
                    this.$Message.success(this.$t('账号已注销'));
                    this.$router.push({
                        name: 'login'
                    })
                })
            },
            message() {
                this.$router.push({
                    name: 'message_page'
                })
            },
            handleClick(name) {
                switch (name) {
                    case 'logout':
                        this.logout()
                        break
                    case 'message':
                        this.message()
                        break
                }
            },
            // selectAdminName(adminName) {
            //     /*绑定节点操作 给父组件传值*/
            //     this.$emit('change-admin-name', adminName)
            // }
        },
        computed: {
            // adminName() {
            //     // this.selectAdminName(this.$store.state.base.admin_name)
            //     return this.$store.state.base.admin_name
            // }
        }
    }
</script>
<style lang="less">
    @import './user.less';
</style>