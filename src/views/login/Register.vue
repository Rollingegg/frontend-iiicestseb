<template>
    <div class="user-layout-register">
        <el-form ref="registerForm" :model="registerForm" id="formRegister" size="large" :rules="rules">
            <el-form-item prop="username">
                <el-input v-model="registerForm.username"
                          placeholder="账号为4-20位字符且不能有空格"
                          autocomplete="new-password"
                          clearable
                />
            </el-form-item>

            <el-popover placement="right-start" trigger="click" visible="state.passwordLevelChecked">
                <div :style="{ width: '240px' }">
                    <div :class="['user-register', passwordLevelClass]">
                        强度：<span>{{ passwordLevelName }}</span>
                    </div>
                    <el-progress :percentage="state.percent"
                                 :stroke-width="8"
                                 :show-text="false"
                                 :color=" passwordLevelColor "
                    />
                    <div style="margin-top: 8px;">
                        <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                    </div>
                </div>

                <el-form-item slot="reference" prop="password">
                    <el-input type="password"
                              @click="handlePasswordInputClick"
                              v-model="registerForm.password"
                              autocomplete="new-password" show-password
                              placeholder="至少6位密码"
                    />
                </el-form-item>
            </el-popover>

            <el-form-item prop="checkPass">
                <el-input type="password"
                          show-password
                          autocomplete="new-password"
                          placeholder="确认密码"
                          v-model="registerForm.checkPass"
                />
            </el-form-item>

            <el-form-item>
                <el-button type="primary"
                           htmlType="submit"
                           class="register-button"
                           :loading="registerBtn"
                           @click.stop.prevent="handleSubmit('registerForm')"
                           :disabled="registerBtn">
                    立即注册
                </el-button>
                <el-link type="primary" :underline="false" class="login" @click="returnLogin">使用已有账户登录</el-link>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    const levelNames = {
        0: '低',
        1: '低',
        2: '中',
        3: '强'
    };
    const levelClass = {
        0: 'error',
        1: 'error',
        2: 'warning',
        3: 'success'
    };
    const levelColor = {
        0: '#ff0000',
        1: '#ff0000',
        2: '#ff7e05',
        3: '#52c41a'
    };

    /**
     * @description 注册页面
     * @version 1.0
     * @author dwxh
     * @event register 切换页面，根据参数决定需要切到的页面名<br/> - Login: 登陆页面
     */
    export default {
        name: 'Register',
        components: {},
        data () {
            return {
                registerForm: {
                    username: '',
                    password: '',
                    checkPass: ''
                },
                rules: {
                    username: [{
                        required: true,
                        message: '请输入注册账号',
                        validateTrigger: ['change', 'blur']
                    }, {
                        validator: this.handleUsernameCheck
                    }],
                    password: [{
                        required: true,
                        message: '至少6位密码',
                        validateTrigger: ['change', 'blur']
                    }, {
                        validator: this.handlePasswordLevel
                    }],
                    checkPass: [{
                        required: true,
                        message: '至少6位密码',
                        validateTrigger: ['change', 'blur']
                    }, {
                        validator: this.handlePasswordCheck
                    }]
                },
                state: {
                    time: 60,
                    smsSendBtn: false,
                    passwordLevel: 0,
                    passwordLevelChecked: false,
                    percent: 10,
                    progressColor: '#FF0000'
                },
                registerBtn: false
            };
        },
        computed: {
            passwordLevelClass () {
                return levelClass[this.state.passwordLevel];
            },
            passwordLevelName () {
                return levelNames[this.state.passwordLevel];
            },
            passwordLevelColor () {
                return levelColor[this.state.passwordLevel];
            }
        },
        methods: {
            isMobile () {
                return this.$store.state.setting.isMobile;
            },
            handlePasswordLevel (rule, value, callback) {
                if (value.length < 6) {
                    this.state.percent = 10;
                    callback(new Error('密码应该大于6位'));
                    return
                }
                if (value.length > 20) {
                    this.state.percent = 10;
                    callback(new Error('密码应该小于于20位'));
                    return
                }
                let level = 0;

                // 判断这个字符串中有没有数字
                if (/[0-9]/.test(value)) {
                    level++;
                }
                // 判断字符串中有没有字母
                if (/[a-zA-Z]/.test(value)) {
                    level++;
                }
                // 判断字符串中有没有特殊符号
                if (/[^0-9a-zA-Z_]/.test(value)) {
                    level++;
                }
                this.state.passwordLevel = level;
                this.state.percent = level * 30;
                if (level >= 2) {
                    if (level >= 3) {
                        this.state.percent = 100;
                    }
                    callback();
                } else {
                    if (level === 0) {
                        this.state.percent = 10;
                    }
                    callback(new Error('密码强度不够'));
                }
            },

            handlePasswordCheck (rule, value, callback) {
                let password = this.registerForm.password;
                if (value === undefined) {
                    callback(new Error('请输入密码'));
                }
                if (value && password && value.trim() !== password.trim()) {
                    callback(new Error('两次密码不一致'));
                }
                callback();
            },

            handleUsernameCheck (rule, value, callback) {
                let username = this.registerForm.username;
                if (username.length) {
                    if (username.length > 20) {
                        callback(new Error('用户名不能超过20个字符'));
                    } else if (username.length < 4) {
                        callback(new Error('用户名不能少于4个字符'));
                    } else if (username.indexOf(' ') !== -1) {
                        callback(new Error('用户名不能出现空格字符'));
                    } else {
                        this.$get(`user/judge`, {username: username}).then((r) => {
                            if (r.data.status) {
                                callback();
                            } else {
                                callback(new Error(r.data.result));
                            }
                        });
                    }
                } else {
                    callback();
                }
            },

            handlePasswordInputClick () {
                if (!this.isMobile()) {
                    this.state.passwordLevelChecked = true;
                    return;
                }
                this.state.passwordLevelChecked = false;
            },

            handleSubmit (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$postJson('user/register', {
                            username: this.registerForm.username,
                            password: this.registerForm.password
                        }).then((r) => {
                            if (r.data.status) {
                                this.$message.success('注册成功');
                                this.returnLogin();
                            } else {
                                this.$message.error('抱歉，注册账号失败   ' + r.data.result);
                            }
                        }).catch(() => {
                            this.$message.error('抱歉，注册账号失败，请稍后再试');
                        });
                    }
                });
            },
            returnLogin () {
                this.$emit('register', 'Login');
            }
        }
    };
</script>
<style lang="less">
    .user-register {
        &.error {
            color: #ff0000;
        }

        &.warning {
            color: #ff7e05;
        }

        &.success {
            color: #52c41a;
        }
    }

    .user-layout-register {
        .ant-input-group-addon {
            &:first-child {
                background-color: #fff;
            }
        }

        & > h3 {
            font-size: 16px;
            margin-bottom: 20px;
        }

        .getCaptcha {
            display: block;
            width: 100%;
            height: 40px;
        }

        .register-button {
            width: 50%;
        }

        .login {
            float: right;
            line-height: 40px;
        }
    }
</style>
