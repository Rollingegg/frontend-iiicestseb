<template>
    <el-container id="container" direction="vertical">
        <global-nav/>
        <el-main>
            <router-view/>
        </el-main>
        <global-footer :copyright="copyright" />
    </el-container>
</template>

<script>
    import GlobalFooter from './common/GlobalFooter';
    import GlobalNav from './common/GlobalNavigator';
    import {mapState} from 'vuex';

    export default {
        name: 'Index',
        components: {
            GlobalFooter,
            GlobalNav
        },
        computed: {
            ...mapState({
                user: state => state.account.user
            }),
            copyright () {
                return this.$store.state.setting.copyright;
            }
        },
        props: {},
        methods: {
        }
    };
</script>

<style lang="less" scoped>
    #container {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        min-height: 100vh;
        background: url("~/static/img/Large-Triangles.svg");
    }
</style>
