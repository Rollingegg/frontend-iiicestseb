<template>
    <el-header class="homeHeader" id="homeHeader" :class="{'isFixed':isTabBar}">
        <a class="title" href="/">OASIS</a>
        <head-bar v-on:expectedWarning="handleUserClick"/>
        <div v-if="hasLogin" class="user-avatar">
            <el-button icon="el-icon-message-solid"
                       type="text"
                       size="large"
                       style="margin-right:20px"
            />
            <el-dropdown class="userInfo" @command="handleUserClick">
                <el-avatar :size="50">{{user.username}}</el-avatar>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                    <el-dropdown-item command="setting">设置</el-dropdown-item>
                    <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div v-else>
            <el-button type="primary" @click="doLogin">登录</el-button>
            <el-button @click="doRegister">注册</el-button>
        </div>
    </el-header>

</template>

<script>
    import HeadBar from './HeadBar';
    import {mapState} from 'vuex';

    /**
     * @description 全局首部
     * @version 1.0
     * @author dwxh
     * @see HeadBar 首部功能条
     * @example
     * <global-navigator />
     */
    export default {
        name: 'GlobalNav',
        data() {
            return {
                isTabBar: false
            };
        },
        computed: {
            ...mapState({
                user: state => state.account.user
            }),
            hasLogin() {
                return !this.$isEmpty(this.user);
            }
        },
        methods: {
            doLogin() {
                this.$router.push('/login');
            },
            doRegister() {
                this.$router.push({name: 'LoginPage', params: {register: 'Register'}});
            },
            handleUserClick(command) {
                if (command==='logout') {
                    this.logout();
                } else {
                    this.$message({
                        showClose: true,
                        message: '功能敬请期待',
                        type: 'warning'
                    });
                }
            },
            async logout() {
                await this.$store.dispatch('account/logout')
                await this.$router.push('/login');
            },
            handleScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                this.isTabBar = (scrollTop > 400);
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll); // Dom树加载完毕
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll) // 销毁页面时清除
        },
        components: {
            HeadBar
        }
    };
</script>

<style>
    .homeHeader {
        background-color: #145aa3;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px;
        box-sizing: border-box;
    }

    .homeHeader .title {
        text-align: center;
        border-radius: 4px;
        padding: 0 18px;
        font-size: 24px;
        color: #ffffff;
        background-color: #0ce6c9;
        cursor: pointer;
    }

    .homeHeader .userInfo {
        cursor: pointer;
    }

    .user-avatar {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .isFixed {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 10;
    }
</style>
