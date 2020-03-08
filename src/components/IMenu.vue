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
            <el-menu-item index="upload">上传数据</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
            <div>帮助</div>
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
                if (key === '1') {
                    if (this.$router.app.$route.path !== '/searchInput') {
                        this.$router.push('/');
                    }
                } else if (key === '4') {
                    window.open('https://www.cnki.net');
                } else if (key === 'upload') {
                    this.$router.push('/upload');
                } else {
                    this.$emit('expectedWarning', 'warning');
                }
            }
        }
    };
</script>

<style>

</style>
