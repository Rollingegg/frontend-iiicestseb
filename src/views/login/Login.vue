<template>
    <div class="login">
        <el-form :model="loginForm" ref="loginForm" size="large" :rules="rules">
            <el-tabs v-model="activeTab" stretch>
                <el-tab-pane label="账户密码登录" name="username">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" clearable>
                            <i slot="prefix" class="el-icon-user"/>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input type="password"
                                  v-model="loginForm.password"
                                  clearable
                                  @keyup.enter.native="doLogin('loginForm')">
                            <i slot="prefix" class="el-icon-lock"/>
                        </el-input>
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane label="手机号登录" name="phone">
                    <el-form-item prop="tel">
                        <el-input size="large" v-model="loginForm.tel">
                            <i slot="prefix" class="el-icon-mobile-phone"/>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="smscode">
                        <el-row :gutter="8" style="margin: 0 -4px">
                            <el-col :span="16">
                                <el-input v-model="loginForm.smscode">
                                    <i slot="prefix" class="el-icon-connection"/>
                                </el-input>
                            </el-col>
                            <el-col :span="8" style="padding-left: 4px">
                                <el-button style="width: 100%" class="captcha-button" @click="getCaptcha">获取验证码
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>

            <el-form-item>
                <el-button :loading="loading"
                           style="width: 100%;"
                           @click="doLogin('loginForm')"
                           type="primary">
                    登录
                </el-button>
            </el-form-item>
            <div>
                <el-link type="primary" :underline="false" style="float: left" @click="noRegister">游客登陆</el-link>
            </div>
            <div>
                <el-link type="primary" :underline="false" style="float: right" @click="register">注册账户</el-link>
            </div>
        </el-form>
    </div>
</template>

<script>
    import {mapMutations, mapState} from "vuex";

    export default {
        name: "Login",
        data () {
            return {
                isReload: false,
                loading: false,
                activeTab: "username",
                loginForm: {
                    username: "",
                    password: "",
                    tel: "",
                    smscode: ""
                },
                rules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"}
                    ],
                    password: [{required: true, message: "请输入密码", trigger: "blur"}]
                }
            };
        },
        computed: {
            ...mapState({
                user: state => state.account.user
            })
        },
        created () {
            this.$db.clear();
            if (this.user.username) {
                return window.location.reload();
            }
            this.isReload = true;
        },
        methods: {
            doLogin (formName) {
                if (this.activeTab === "username") {
                    this.$refs[formName].validate(valid => {
                        if (valid) {
                            this.loading = true;
                            let name = this.loginForm.username;
                            let password = this.loginForm.password;
                            if (
                                !(
                                    this.handleUsernameCheck(name) &&
                                    this.handlePasswordLevel(password)
                                )
                            ) {
                                this.setMessageAndBtnLoading("用户名或者密码错误");
                                return;
                            }

                            this.$postJson("user/login", {
                                username: name,
                                password: password
                            }).then(r => {
                                if (r.data.status) {
                                    let data = r.data.result;
                                    this.saveLoginData(data);
                                    this.setMessageAndBtnLoading();
                                    this.$router.push("/searchFrame/searchHome");
                                } else {
                                    this.setMessageAndBtnLoading(r.data.result);
                                }
                            }).catch(() => {
                                this.setMessageAndBtnLoading();
                            });
                        }
                    });
                }
                if (this.activeTab === "phone") {
                    // 手机验证码登录
                    this.$message.warning("暂未开发");
                }
            },
            setMessageAndBtnLoading (message) {
                setTimeout(() => {
                    this.loading = false;
                    message && this.$message.error(message);
                }, 500);
            },
            register () {
                this.$emit("register", "Register");
            },
            noRegister () {
                this.$router.push("/searchFrame/searchHome");
            },
            getCaptcha () {
                this.$message.warning("暂未开发");
            },
            handleUsernameCheck (name) {
                return (
                    name.length &&
                    name.length < 21 &&
                    name.length > 3 &&
                    name.indexOf(" ") === -1
                );
            },
            handlePasswordLevel (value) {
                if (value.length < 6 || value.length > 20) return !1;
                let level = 0;
                return (
                    /[0-9]/.test(value) && level++,
                    /[a-zA-Z]/.test(value) && level++,
                    /[^0-9a-zA-Z_]/.test(value) && level++,
                    level >= 1
                );
            },
            ...mapMutations({
                setExpireTime: "account/setExpireTime",
                setUser: "account/setUser"
            }),
            saveLoginData (data) {
                this.setExpireTime(Date.now() + 3600000);
                this.setUser(data);
            }
        }
    };
</script>

<style lang="less" scoped>
    .login {
        .icon {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.2);
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
                color: #1890ff;
            }
        }
    }
</style>
