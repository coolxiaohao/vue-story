<style lang="less">
    @import './login.less';
</style>
<template>
    <div class="login">
            <div class="login-video">
                <video autoplay loop muted>
                    <source :src="videoOptions"/>
                </video>
            </div>
        <div class="login-content" >
            <div class="login-card">
                <Card icon="log-in" :title="this.$t('login.login_title')">
                    <Tabs>
                        <TabPane :label="this.$t('login.form1')" icon="ios-desktop-outline">
                            <Form ref="formInline" :model="formInline" v-model="formInline.form=1" :rules="ruleInline">
                                <!--                                <Input  type="hidden" v-model="formInline.form" value="1"></Input>-->
                                <FormItem prop="username">
                                    <Input type="text" v-model="formInline.username"
                                           :placeholder="$t('login.login-name-null')">
                                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                                    </Input>
                                </FormItem>
                                <FormItem prop="password">
                                    <Input type="password" v-model="formInline.password"
                                           @keyup.enter.native="handleSubmit('formInline')"
                                           :placeholder="$t('login.login-pwd-null')">
                                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                                    </Input>
                                </FormItem>
                                <FormItem class="not-margin">
                                    <Row>
                                        <Col class="col-rtp-left" :xs="{ span: 12, offset: 0 }"
                                             :lg="{ span: 12, offset: 0 }">
                                            <Checkbox v-model="single"><span class="rtp">{{$t('login.remember-pwd')}}</span>
                                            </Checkbox>
                                        </Col>
                                        <Col class="col-rtp-right" :xs="{ span: 12, offset: 0 }"
                                             :lg="{ span: 12, offset: 0 }">
                                            <router-link to="/">{{$t('login.pwd-forgot')}}</router-link>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" long @click="handleSubmit('formInline')">
                                        {{$t('login.login_title')}}
                                    </Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane :label="this.$t('login.form2')" icon="ios-phone-portrait">

                        </TabPane>
                        <TabPane :label="this.$t('login.form3')" icon="ios-people">

                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
    import backMp4 from '@/assets/admin/login/login.mp4'
    import {mapMutations} from "vuex";

    export default {
        name: "login",
        components: {},
        props: {},
        data() {
            return {
                formInline: {
                    username: '',
                    password: '',
                    form: '',
                    model: 'admin'
                },
                ruleInline: {
                    username: [
                        {required: true, message: this.$t('login.login-name-null'), trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: this.$t('login.login-pwd-null'), trigger: 'blur'},
                        {type: 'string', min: 6, message: this.$t('login.login-pwd-error'), trigger: 'blur'}
                    ]
                },
                single: false,
                videoOptions: backMp4,
            }
        },
        methods: {
            ...mapMutations([
                'setPort',
            ]),
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // console.log(this.$store)
                        //先请求store文件下的xxxx/xxxx方法
                        this.$store.dispatch("login", this.formInline).then(d => {
                            if (d.code && d.code == 200) {
                                this.$Message.success(this.$t('login.login-success'));
                                this.$router.push({path: '/', query: {data: d}})
                            } else {
                                this.$Message.error(d.msg);
                            }
                        });
                    } else {
                        this.$Message.error(this.$t('login.login-error'));
                    }
                })
            }
        },
        mounted(){
            this.setPort('admin')
        }
    }
</script>