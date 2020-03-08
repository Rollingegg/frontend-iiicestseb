<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#145AA3"
        text-color="#ffffff"
        active-text-color="#CDB737"
    >
        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2">
            <template slot="title">文献数据库</template>
            <!--            TODO -->
            <el-menu-item index="2-1">ASE会议</el-menu-item>
            <el-menu-item index="2-2">ICSE会议</el-menu-item>
        </el-submenu>
        <el-submenu index="3" v-if="isAdmin">
            <!--            TODO -->
            <template slot="title">后台管理</template>
            <el-menu-item index="3-1">文献管理</el-menu-item>
            <el-menu-item index="3-2">用户管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <a href="https://www.cnki.net" target="_blank">帮助</a>
        </el-menu-item>
    </el-menu>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'IMenu',
        data () {
            return {
                activeIndex: '1'
            };
        },
        computed: {
            ...mapState({
                user: state => state.account.user
            }),
            isAdmin () {
                return !this.$isEmpty(this.user) && this.user.privilegeLevel === '管理员';
            }
        },
        methods: {
            handleSelect (key, keyPath) {
                console.log(key, keyPath);
                if (key === '1') {
                    if (this.$router.app.$route.path !== '/searchInput') {
                                this.$router.push('/searchInput');
                    }
                } else {
                    this.$emit('expectedWarning', 'warning');
                }
            }
        }
    };
</script>

<style>

</style>
