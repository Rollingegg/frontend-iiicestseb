<template>
    <el-menu :default-active="$route.path"
             class="my-menu"
             mode="horizontal"
             @select="handleSelect"
             background-color="#145AA3"
             text-color="#ffffff"
             active-text-color="#CDB737">
        <el-menu-item index="/searchFrame/searchHome">首页</el-menu-item>
        <el-submenu index="2">
            <template slot="title">文献数据库</template>
            <el-menu-item index="/ase">ASE会议</el-menu-item>
            <el-menu-item index="/icse">ICSE会议</el-menu-item>
        </el-submenu>
        <el-submenu index="/admin" v-if="isAdmin">
            <template slot="title">后台管理</template>
            <el-menu-item index="/articleManage">文献管理</el-menu-item>
            <el-menu-item index="/user/manage">用户管理</el-menu-item>
            <el-menu-item index="/upload">上传数据</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
            <div>帮助</div>
        </el-menu-item>
    </el-menu>
</template>

<script>
    import {mapState} from 'vuex';

    /**
     * @description 首部功能条
     *
     * @version 1.0
     * @author dwxh
     * @example
     * <head-bar />
     */
    export default {
        name: 'HeadBar',
        computed: {
            ...mapState({
                user: state => state.account.user
            }),
            isAdmin () {
                return !this.$isEmpty(this.user) && this.user.privilegeLevel === '管理员';
            }
        },
        methods: {
            handleSelect (key) {
                if (key === '4') {
                    window.open('https://ieeexplore.ieee.org/');
                } else {
                    if (key !== this.$route.path) {
                        this.$router.push(key);
                    }
                }
            }
        }
    };
</script>
<style lang="less">
    .my-menu {
        border-bottom: 0 !important;
        .el-menu-item {
            border-bottom: 0 !important;
        }
    }
</style>
