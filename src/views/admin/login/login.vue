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
                                <FormItem prop="password" style="margin-bottom:10px;">
                                    <Input type="password" v-model="formInline.password"
                                           @keyup.enter.native="handleSubmit('formInline')"
                                           :placeholder="$t('login.login-pwd-null')">
                                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                                    </Input>
                                </FormItem>
                                <FormItem class="not-margin" style="margin-bottom:0.1rem;">
                                    <Row>
                                        <Col class="col-rtp-left" :xs="{ span: 12, offset: 0 }"
                                             :lg="{ span: 12, offset: 0 }">
                                            <Checkbox v-model="formInline.single"><span class="rtp">{{$t('login.remember-pwd')}}</span>
                                            </Checkbox>
                                        </Col>
                                        <Col class="col-rtp-right" :xs="{ span: 12, offset: 0 }"
                                             :lg="{ span: 12, offset: 0 }">
                                            <router-link to="/">{{$t('login.pwd-forgot')}}</router-link>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem style="margin-bottom:10px;">
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
            let single=JSON.parse(this.$store.state.base.single)
            return {
                formInline: {
                    username:single.username ,
                    password: single.password ,
                    single:single.single,
                    form: '',
                    model: 'admin',
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
                videoOptions: backMp4,
            }
        },
        methods: {
            ...mapMutations([
                'setPort',
                'setSingle'
            ]),
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        //先请求store文件下的xxxx/xxxx方法
                        this.$store.dispatch("login", this.formInline).then(d => {
                            if (d.code && d.code == 200) {
                                //判断是否记住密码
                                let single={}
                                if (this.formInline.single){
                                    single.username=this.formInline.username
                                    single.password=this.formInline.password
                                    single.single=this.formInline.single
                                }else {
                                    single.username=""
                                    single.password=""
                                    single.single=false
                                }
                                //解决路由加载问题 由退出路由返回的是一个对象
                                //而刷新访问是一个字符串 所以直接存json字符串拿的时候再转对象
                                this.setSingle(JSON.stringify(single))
                                this.$Message.success(this.$t('login.login-success'));
                                //路由跳转
                                this.$router.push({path: '/'})
                            } else {
                                this.$data.formInline.username=""
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
        },
        computed:{ //依赖值设置在此 也就是依赖其它的属性计算所得出最后的值
        }
    }
</script>