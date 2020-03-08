<template>
    <el-container>
        <global-nav/>
        <el-main>
            <slot></slot>
        </el-main>
        <el-footer>
            <global-footer :copyright="copyright" style="margin-bottom:0"/>
        </el-footer>
    </el-container>
</template>

<script>
    import GlobalFooter from '../common/GlobalFooter';
    import GlobalNav from '../common/GlobalNavigator';
    import {mapState} from 'vuex';

    export default {
        name: 'Layout',
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
    .el-container {
        height: 100vh;
        background: url("../../../static/img/Large-Triangles.svg");
    }
</style>
