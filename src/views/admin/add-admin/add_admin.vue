<template>
    <div class="add_admin">
        <Card>
            <!--操作提示-->
            <collapse :text="this.$t('操作提示')" :content_text="this.$t('这里是添加管理员操作页面，请根据注册流程进行添加!!')"/>
            <br/>
            <!--form表单-->
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem :label="this.$t('管理员账号')" prop="adminname">
                    <Input v-model="formValidate.adminname" :placeholder="this.$t('请输入管理员账号')"></Input>
                </FormItem>
                <FormItem :label="this.$t('手机号码')" prop="phone">
                    <Input v-model="formValidate.phone" :placeholder="this.$t('请输入手机号码')"></Input>
                </FormItem>
                <FormItem :label="this.$t('密码')" prop="pwd">
                    <Input v-model="formValidate.pwd" type="password" :placeholder="this.$t('请输入您的密码')"></Input>
                </FormItem>
                <FormItem :label="this.$t('确认密码')" prop="opwd">
                    <Input v-model="formValidate.opwd" type="password" :placeholder="this.$t('请输入确认密码')"></Input>
                </FormItem>
                <FormItem :label="this.$t('权限组')" prop="ruleid">
                    <Select v-model="formValidate.ruleid" :placeholder="this.$t('请选择权限组')">
                        <Option v-for="rule in ruleList" :value="rule.id">{{rule.rule_name}}</Option>
                        <!--                        <Option :value="2">{{this.$t('测试管理员')}}</Option>-->
                        <!--                        <Option :value="3">{{this.$t('演示版管理员')}}</Option>-->
                    </Select>
                </FormItem>
                <FormItem :label="this.$t('头像')" prop="img">
                    <div class="demo-upload-list" v-for="item in uploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.api+item.path">
                            <div class="demo-upload-list-cover">
                                <!--                                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>-->
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <!--上传组件-->
                    <Upload ref="upload"
                            :show-upload-list="false"
                            :default-file-list="defaultList"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png','gif']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            multiple
                            type="drag"
                            action="/api/upload/updateImg"
                            style="display: inline-block;width:120px;">
                        <div style="width: 120px;height:120px;line-height: 120px;">
                            <Icon type="ios-camera" size="40"></Icon>
                        </div>
                    </Upload>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    import collapse from '_c/tables/collapse-tip';

    export default {
        name: "add_admin",
        components: {collapse},
        props: {},
        data() {
            const validatePass = (rule, value, callback) => {
                // console.log(value)
                if (value === '') {
                    callback(new Error(this.$t('请输入您的密码')));
                } else {
                    if (this.ruleValidate.pwd !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formValidate.validateField('opwd');
                    }
                    callback();
                }
            };
            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('请输入电话号码！')));
                } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
                    callback(new Error(this.$t('请输入正确格式的手机号码！')));
                } else {
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('请再次输入您的密码')));
                } else if (value !== this.formValidate.pwd) {
                    callback(new Error(this.$t('两次输入密码不一致')));
                } else {
                    callback();
                }
            };
            const validateRule = (rule, value, callback) => {
                if (value <= 0) {
                    callback(new Error(this.$t('请选择权限')));
                } else {
                    callback();
                }
            };
            return {
                ruleList: [
                    {
                        id: 1,
                        rule_name: "默认",
                    },
                    {
                        id: 2,
                        rule_name: "测试",
                    },
                ],
                defaultList: [],
                imgName: '',
                visible: false,
                uploadList: [],
                formValidate: {
                    adminname: '',
                    phone: '',
                    pwd: '',
                    opwd: '',
                    ruleid: 1,
                    img: '',
                },
                ruleValidate: {
                    adminname: [
                        {required: true, message: this.$t('管理员账号不能为空！'), trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, validator: validatePhone, trigger: 'blur'}
                    ],
                    pwd: [
                        {required: true, validator: validatePass, trigger: 'blur'}
                    ],
                    opwd: [
                        {required: true, validator: validatePassCheck, trigger: 'blur'}
                    ],
                    ruleid: [
                        {required: true, validator: validateRule, trigger: 'blur'}
                    ],
                    // ruleid: [
                    //     {required: true, message: this.$t('请选择权限组！'), trigger: 'blur'}
                    // ],
                }
            }
        },
        methods: {

            handleRemove(file) { //删除图片
                const upload = this.$refs.upload;
                // const fileList = this.$refs.upload.fileList
                // this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
                this.$store.dispatch('removeImg', file.name).then((d) => {
                    if (d.code === 200) {
                        upload.fileList.splice(upload.fileList.indexOf(file), 1)
                        this.formValidate.img = ''
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                });
            },

            handleSuccess(res, file) { //上传图片成功后的操作
                file.path = res.data.path
                file.api = '/api';
                file.name = res.data.file_name;
                this.formValidate.img = file.path
            },
            handleFormatError(file) {
                this.$Notice.warning({ //图片格式验证
                    title: this.$t('The file format is incorrect'),
                    desc: this.$t('File format of ') + file.name + this.$t(' is incorrect, please select jpg or png or jpeg or gif.')
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({ //图片限制大小
                    title: this.$t('Exceeding file size limit'),
                    desc: this.$t('File ') + file.name + this.$t(' is too large, no more than 2M.')
                });
            },
            handleBeforeUpload() { //最多上传几张
                const check = this.uploadList.length < 1;
                if (!check) {
                    this.$Notice.warning({
                        title: this.$t('Up to five pictures can be uploaded.')
                    });
                }
                return check;
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    // console.log(valid)
                    if (valid) {
                        this.$store.dispatch('insertAdmin', this.formValidate).then((d) => {
                            if (d.code === 200) {
                                this.$Message.success(this.$t('Success!'));
                                this.$router.push({path: '/admin/index/list'})
                            }
                        }).catch((error) => {
                            console.log(111111)
                            this.$Message.error(error);
                        })
                    } else {
                        this.$Message.error(this.$t('请求失败'));
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            //获取权限列表

        },
        mounted() {
            this.uploadList = this.$refs.upload.fileList;
        }
    }
</script>

<style lang="less">
    .demo-upload-list {
        display: inline-block;
        width: 120px;
        height: 120px;
        text-align: center;
        line-height: 120px;
        border: 1px solid transparent;
        border-radius: 5rem;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 40px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>