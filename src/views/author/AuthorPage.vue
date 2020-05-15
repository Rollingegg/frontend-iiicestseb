<template>
    <div class="main-container">
        <div class="author-header">
            <el-avatar :size="120" src="static\img\avatar_default.jpg"></el-avatar>
            <div class="author-base">
                <div class="author-name">{{baseInfo.name}}</div>
                <el-link :underline="false"
                         icon="el-icon-school"
                         @click="openDetailPage('affiliation',baseInfo.affiliationId)">
                    {{baseInfo.affiliationName}}
                </el-link>
                <div>
                    <el-button size="mini"
                               type="primary"
                               v-for="(domainStatistic, index) in domainStatistics.slice(0,3)"
                               :key="index"
                               @click="openDetailPage('keyword',domainStatistic.id)"
                               style="margin-top:5px">
                        {{domainStatistic.name}}
                    </el-button>
                </div>
            </div>
        </div>

        <el-tabs v-model="activeName"
                 type="border-card"
                 @tab-click="switchTab"
                 class="main-container">
            <el-tab-pane label="Overview" name="overview">
                <overview-pane :loading="loading"
                               :base-info="baseInfo"
                               :author-id="authorId"
                               :domain-statistics="domainStatistics"
                               @clickItem="openDetailPage"/>
            </el-tab-pane>

            <el-tab-pane label="Papers" name="papers">
                <component :is="paperListTab"
                           searchType="author_name"
                           :isById="true"
                           :searchId="String(authorId)"
                />
            </el-tab-pane>

            <el-tab-pane label="SchGraph" name="graph">
                <component :is="SchGraphTab"
                           searchType="author_name"
                           :searchId="String(authorId)"
                />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import OverviewPane from "@/components/Author/OverviewPane";
    import PaperList from "@/components/paper/PaperListWrapper";
    import SchGraph from "@/components/graphs/SchGraph";
    import {mapState} from "vuex";

    export default {
        name: "AuthorPage",
        components: {
            OverviewPane
        },
        mounted () {
            this.init();
        },
        data () {
            return {
                activeName: "overview",
                type: "author_name",
                authorId: this.$route.query.id,
                baseInfo: {},
                statisticInfo: {},
                recentPapers: [],
                domainStatistics: [],
                paperListTab: null,
                SchGraphTab: null,
                loading: true
            };
        },
        computed: {
            ...mapState({
                user: state => state.account.user
            }),
            keyword () {
                return {type: "author_name", id: this.authorId};
            }
        },
        watch: {
            $route: "refreshData"
        },
        methods: {
            refreshData () {
                this.init();
            },
            init () {
                this.authorId = this.$route.query.id;
                this.activeName = "overview";
                this.paperListTab = null;
                this.SchGraphTab = null; // 让图谱重新加载渲染
                this.getAuthorBaseInfo();
                this.getDomainStatistics();
            },
            openDetailPage (detailType, queryId) {
                const detailPath = {
                    author: "/authorDetail",
                    keyword: "/keywordDetail",
                    affiliation: "/affiliationDetail",
                    article: "/articleDetail"
                };
                if (this.user.username) {
                    this.$router.push({
                        path: detailPath[detailType],
                        query: {
                            id: queryId
                        }
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: "亲爱的游客，请先登录哟！",
                        type: "warning"
                    });
                }
            },
            switchTab (tab) {
                switch (tab.name) {
                    case "papers":
                        this.paperListTab = PaperList;
                        break;
                    case "graph":
                        this.SchGraphTab = SchGraph;
                        break;
                    default:
                        break;
                }
            },
            getAuthorBaseInfo () {
                const id = this.authorId;
                this.$get("/author/info", {
                    id: id
                }).then(r => {
                    if (r.data.status) {
                        this.baseInfo = r.data.result;
                    } else {
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                });
            },
            getDomainStatistics () {
                const id = this.authorId;
                const limit = 5;
                this.$get("/statistics/author/hot/term", {
                    id: id,
                    limit: limit
                }).then(r => {
                    if (r.data.status) {
                        this.domainStatistics = r.data.result;
                        setTimeout(() => {
                            this.loading = false;
                        }, 500);
                    } else {
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                        this.loading = false;
                    }
                }).catch(() => {
                    this.loading = false;
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    @base-interval: 20px;
    .main-container {
        .author-header {
            display: flex;
            padding-bottom: @base-interval;
            align-items: center;

            .author-base {
                flex: 1 0;
                margin-left: @base-interval;
                margin-top: @base-interval;

                .author-name {
                    font-size: 30px;
                }
            }
        }
    }
</style>
