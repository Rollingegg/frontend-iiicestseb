<template>
    <div class="container">
        <div class="content">
            <div class="top">
                <div class="header">
                    <img alt="logo" class="logo" src="static/img/logo.png"/>
                    <span class="title">{{systemName}}</span>
                </div>
                <div class="desc"></div>
            </div>

            <component :is="componentName" @register="handleRegister" class="main-content"/>
        </div>

        <global-footer :copyright="copyright"/>
    </div>
</template>

<script>
    import GlobalFooter from '@/components/headerAndFooter/GlobalFooter';
    import Login from './Login';
    import Register from './Register';

    /**
     * @description 登陆注册页面框架，通过路由引入子页面
     * @version 1.0
     * @author dwxh
     * @see Login 登陆页面
     * @see Register 注册页面
     */
    export default {
        name: 'Common',
        components: {
            GlobalFooter,
            Login,
            Register
        },
        data () {
            return {
                componentName: this.getPage()
            };
        },
        computed: {
            systemName () {
                return this.$store.state.setting.systemName;
            },
            copyright () {
                return this.$store.state.setting.copyright;
            }
        },
        methods: {
            getPage () {
                if (this.$isEmpty(this.$route.params.register)) {
                    return 'Login';
                }
                return this.$route.params.register;
            },
            handleRegister (val) {
                this.componentName = val;
            }
        }
    };
</script>

<style lang="less" scoped>
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: auto;
        background: #f0f2f5 url('~/static/img/common.svg') no-repeat center 110px;
        background-size: 100%;

        .content {
            padding: 32px 0;
            flex: 1;
            @media (min-width: 768px) {
                padding: 116px 0 10px;
            }

            .top {
                text-align: center;

                .header {
                    height: 50px;
                    line-height: 50px;

                    a {
                        text-decoration: none;
                    }

                    .logo {
                        width: 40px;
                        height: 19px;
                        vertical-align: center;
                        margin-right: 16px;
                    }

                    .title {
                        font-size: 28px;
                        color: rgba(0, 0, 0, .85);
                        font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
                        font-weight: 600;
                        position: relative;
                        top: 6px;
                    }
                }

                .desc {
                    font-size: 14px;
                    color: rgba(0, 0, 0, .45);
                    margin-top: 12px;
                    margin-bottom: 40px;
                }
            }

            .main-content {
                width: 368px;
                margin: 0 auto;
                @media screen and (max-width: 576px) {
                    width: 95%;
                }
                @media screen and (max-width: 320px) {
                    .captcha-button {
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>
