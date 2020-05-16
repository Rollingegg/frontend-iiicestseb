<template>
    <el-card>
        <div slot="header">Most Influenced Authors</div>
        <div class="hot-author-container">
            <div class="hot-author-item"
                 v-for="(author, index) in hotAuthors.slice(0,4)"
                 :key="index">
                <el-avatar icon="el-icon-user-solid"/>
                <div style="margin-left:5px">
                    <el-link :underline="false"
                             style="font-size:16px"
                             @click="clickAuthor(author.id)">
                        {{author.name}}
                    </el-link>
                    <div class="hot-author-description">
                        <el-tooltip effect="light" content="H-Index" placement="bottom">
                            <span style="margin-left:5px">
                                <i class="fa fa-signal"/>
                                {{author.hindex}}
                            </span>
                        </el-tooltip>

                        <el-tooltip effect="light" content="发表论文数" placement="bottom">
                            <span style="margin-left:5px">
                                <i class="fa fa-file"/>
                                {{author.paperNum}}
                            </span>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div>

        <active-author-graph height="150px" :data="hotAuthors"/>
    </el-card>
</template>

<script>
    import ActiveAuthorGraph from "@/components/Affiliation/ActiveAuthorGraph";

    export default {
        name: "HotAuthors",
        components: {
            ActiveAuthorGraph
        },
        props: {
            hotAuthors: Array
        },
        methods: {
            clickAuthor (id) {
                this.$emit("clickAuthor", id)
            }
        }
    }
</script>

<style lang="less" scoped>
    @base-interval: 20px;

    .hot-author-container {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: @base-interval;

        .hot-author-item {
            margin-bottom: 5px;
            width: 50%;
            display: flex;
            align-items: center;
        }
    }
</style>
