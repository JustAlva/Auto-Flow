<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userNo">
                            <Input v-model="form.userNo" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button :loading="loading" @click="handleSubmit" type="primary" long>
                                <span v-if="!loading">登录</span>
                                <span v-else>登录中...</span>
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';

    export default {
        data () {
            return {
                loading: false,
                form: {
                    userNo: 'root',
                    password: '123456'
                },
                rules: {
                    userNo: [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleSubmit () {
                this.loading = true;
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.$api.post('login/check', {
                            'userNo': this.form.userNo,
                            'userPsd': this.form.password
                        }, response => {
                            console.log(this.form.userNo);
                            console.log(this.form.password);
                            console.log(response);
                            if (response.status === 200 && response.status < 300) {
                                if (response.data.status === 200) {
                                    this.$Message.success('登录成功！');
                                    this.loading = false;
                                    Cookies.set('user', this.form.userNo);
                                    Cookies.set('password', this.form.password);
                                    this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                                    this.$router.push({
                                        name: 'home_index'
                                    });
                                    // 权限控制
                                    Cookies.set('access', 0);
                                } else {
                                    this.$Message.error(response.data.message);
                                    this.loading = false;
                                }
                            } else {
                                this.$Message.error('登录失败！');
                                this.loading = false;
                            }
                        });
                    }
                });
            }
        }
    };
</script>

<style>

</style>
