<template>
    <el-container id="container" direction="vertical">
        <global-nav/>
        <el-main>
            <transition name="el-fade-in">
                <router-view/>
            </transition>
        </el-main>
        <el-backtop></el-backtop>
        <global-footer :copyright="copyright"/>
        <feedback></feedback>
    </el-container>
</template>

<script>
    import GlobalFooter from '@/components/headerAndFooter/GlobalFooter';
    import GlobalNav from '@/components/headerAndFooter/GlobalNavigator';
    import Feedback from "@/components/common/Feedback";

    /**
     * @description 主体页面框架，通过路由引入子页面
     * @version 1.0
     * @author dwxh
     * @see GlobalNav 页面首部
     * @see GlobalFooter 页面尾部
     */
    export default {
        name: 'Index',
        components: {
            Feedback,
            GlobalFooter,
            GlobalNav
        },
        computed: {
            copyright() {
                return this.$store.state.setting.copyright;
            }
        }
    };
</script>

<style lang="less">
    .el-card:hover {
        box-shadow: 0 4px 8px 0 rgba(163, 128, 128, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    #container {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        min-height: 100vh;
    }

    .my-back-top {
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0, 0, 0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
        &:hover{
            background-color: #ebeef5;
        }
    }

    .el-card {
        border: 1px solid #f8f8f8;
        border-radius: 4px;
        overflow: auto;

        .el-card__body {
            padding: 10px;

            .el-table__row {
                height: 50px;
            }
        }

        .has-gutter tr th div {
            text-align: center;
        }

        .el-table--enable-row-hover .el-table__body tr:hover > td {
            background: #e9f8f9;
            box-shadow: 0 0 1px 1px #ffffff, inset 0 0 10px 5px #f2fcf8;
        }
    }
</style>
