<style lang="less">
    @import 'add.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="ios-personadd"></Icon>
                新增用户
            </p>
            <div>
                <Form
                        ref="userForm"
                        :model="userForm"
                        :label-width="100"
                        label-position="right"
                        :rules="inforValidate">
                    <FormItem label="用户ID" prop="userNo">
                        <div class="add-user-div-input">
                            <Input v-model="userForm.userNo" placeholder="请输入用户ID"/>
                        </div>
                    </FormItem>
                    <FormItem label="登录密码" prop="userPsd">
                        <div class="add-user-div-input">
                            <Input v-model="userForm.userPsd" placeholder="请输入用户密码"/>
                        </div>
                    </FormItem>
                    <FormItem label="用户姓名" prop="userName">
                        <div class="add-user-div-input">
                            <Input v-model="userForm.userName" placeholder="请输入用户姓名"/>
                        </div>
                    </FormItem>
                    <FormItem label="手机号" prop="userPhone">
                        <div class="add-user-div-input">
                            <Input v-model="userForm.userPhone" placeholder="请输入用户手机号"/>
                        </div>
                    </FormItem>
                    <FormItem label="性别" prop="userGender">
                        <div>
                            <RadioGroup v-model="userForm.userGender">
                                <Radio label="male" value="0">男</Radio>
                                <Radio label="female" value="1">女</Radio>
                            </RadioGroup>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div>
                            <Button type="dashed" class="add-user-div-button" @click="cancelEdit">取消</Button>
                            <Button type="primary" class="add-user-div-button" :loading="save_loading"
                                    @click="saveEdit">保存
                            </Button>
                        </div>
                    </FormItem>
                </Form>
            </div>

        </Card>
    </div>
</template>

<script>
    export default {
        name: 'add-user',
        data () {
            return {
                userForm: {
                    userNo: '13623',
                    userPsd: '1234567',
                    userName: 'zkd',
                    userPhone: '18862611033',
                    userGender: 'male'
                },
                inforValidate: {
                    userNo: [
                        {required: true, message: '用户ID不能为空', trigger: 'blur'}
                    ],
                    userPsd: [
                        {required: true, message: '登录密码不能为空', trigger: 'blur'}
                    ]
                },
                save_loading: false
            };
        },
        methods: {
            cancelEdit () {

            },
            saveEdit () {
                this.save_loading = true;
                this.$refs['userForm'].validate((valid) => {
                    if (valid) {
                        this.$api.post('user/add', {
                            'userNo': this.userForm.userNo,
                            'userPsd': this.userForm.userPsd,
                            'userName': this.userForm.userName,
                            'userPhone': this.userForm.userPhone,
                            'userGender': this.userForm.userGender === 'male' ? 0 : 1
                        }, response => {
                            console.log(response);
                            if (response.status === 200 && response.status < 300) {
                                console.log(response.data);
                            }
                        });
                    }
                });
            }
        }
    };
</script>


