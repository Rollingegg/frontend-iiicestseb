<template>
    <el-header class="homeHeader">
        <a class="title" href="/">OASIS</a>
        <IMenu v-on:expectedWarning="handleUserClick"></IMenu>
        <div v-if="hasLogin">
            <el-button
                icon="el-icon-bell"
                type="text"
                style="margin-right: 8px;color: #000000;"
                size="normal"
            ></el-button>
            <el-dropdown class="userInfo" @command="handleUserClick">
          <span class="el-dropdown-link">
            {{user.name}}
            <i>
              <img src="@/assets/logo.png" alt/>
            </i>
          </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                    <el-dropdown-item command="setting">设置</el-dropdown-item>
                    <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div v-else>
            <el-button type="primary" @click="doLogin">登录</el-button>
            <el-button @click="doRegis">注册</el-button>
        </div>
    </el-header>

</template>

<script>
    import IMenu from '@/components/IMenu';
    import {mapState} from 'vuex';

    export default {
        name: 'GlobalNav',
        data () {
            return {};
        },
        computed: {
            ...mapState({
                user: state => state.account.user
            }),
            hasLogin () {
                return !this.$isEmpty(this.user);
            }
        },
        methods: {
            doLogin () {
                this.$router.push('/login');
            },
            doRegis () {
                this.$router.push({name: '登录页', params: {regist: 'Regist'}});
            },
            handleUserClick (command) {
                // this[command]();
                if (command === 'logout') {
                    this.logout();
                } else {
                this.$message({
                        showClose: true,
                        message: '功能敬请期待',
                        type: 'warning'
                });
                }
            },
            logout () {
                this.$router.push('/login');
                window.location.reload();
            }
        },
        components: {
            IMenu
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

    .el-dropdown-link img {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }

    .el-dropdown-link {
        color: #ffffff;
        display: flex;
        align-items: center;
    }
</style>
