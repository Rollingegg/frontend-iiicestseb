<template>
    <div class="overview-container"
         v-loading="loading"
         element-loading-background="rgba(255,255,255,0.95)">
        <el-row :gutter="15">
            <el-col :md="16">
                <el-card>
                    <div slot="header">About : {{baseInfo.name}}</div>

                    <el-row :gutter="10">
                        <el-col :md="12">
                            <div class="statistic-card">
                                <div class="statistic-content">
                                    <div class="statistic-num">{{baseInfo.paperCount}}</div>
                                    <div class="statistic-type">Total Published Papers</div>
                                </div>
                                <div class="statistic-icon">
                                    <el-icon class="el-icon-document"/>
                                </div>
                            </div>
                        </el-col>

                        <el-col :md="12">
                            <div class="statistic-card">
                                <div class="statistic-content">
                                    <div class="statistic-num">{{baseInfo.citationCount}}</div>
                                    <div class="statistic-type">Citations</div>
                                </div>
                                <div class="statistic-icon">
                                    <el-icon class="el-icon-paperclip"/>
                                </div>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row :gutter="10">
                        <el-col :md="12">
                            <div class="statistic-card">
                                <div class="statistic-content">
                                    <div class="statistic-num">{{statisticInfo.hindex}}</div>
                                    <div>H-Index</div>
                                </div>
                                <div class="statistic-icon">
                                    <el-tooltip effect="light"
                                                style="margin:4px"
                                                content="h指数是一个人发表的所有学术论文中有N篇论文分别被引用了至少N次，是衡量一个人的研究成果及其引用影响的作者级指标"
                                                placement="bottom">
                                        <el-link target="_blank"
                                                 icon="el-icon-info"
                                                 :underline="false"
                                                 href="https://explore.researchgate.net/display/support/h-index"
                                        />
                                    </el-tooltip>
                                </div>
                            </div>
                        </el-col>

                        <el-col :md="12">
                            <div class="statistic-card">
                                <div class="statistic-content">
                                    <div class="statistic-num">{{statisticInfo.gindex}}</div>
                                    <div>G-Index</div>
                                </div>
                                <div class="statistic-icon">
                                    <el-tooltip effect="light"
                                                style="margin:4px"
                                                content="将论文按照被引次数降序排序，被引次数按序号叠加，当累计被引次数等于序号的平方时，该序号值即为g指数"
                                                placement="bottom">
                                        <el-icon class="el-icon-info"/>
                                    </el-tooltip>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>

                <el-card class="card-container">
                    <div slot="header">Research Domains Ranking</div>
                    <div>
                        <domain-pie height="300px"
                                    :data="domainStatistics"
                                    @on-click-term="clickDomain"
                        />
                    </div>
                </el-card>
            </el-col>

            <el-col :md="8">
                <recent-paper :recent-papers="recentPapers" @clickArticle="clickArticle"/>

                <el-card class="card-container">
                    <div slot="header">Conferences Attendance</div>
                    <conference-pie height="400px" :data="conferenceStatistics"/>
                </el-card>

                <el-card class="card-container">
                    <div slot="header">Top co-authors</div>
                    <div class="co-author-item" v-for="(coAuthor, index) in coAuthorList" :key="index">
                        <el-avatar icon="el-icon-user-solid"/>
                        <div class="co-author-base">
                            <div>
                                <el-link :underline="false"
                                         type="primary"
                                         class="co-author-name"
                                         @click="clickAuthor(coAuthor.id)">
                                    {{coAuthor.name}}
                                </el-link>
                            </div>
                            <el-link :underline="false"
                                     icon="el-icon-school"
                                     @click="clickAffiliation(coAuthor.affiliationId)">
                                {{coAuthor.affiliationName}}
                            </el-link>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import DomainPie from "@/components/graphs/DomainsPieGraph";
    import RecentPaper from "@/components/paper/RecentPaperList";
    import ConferencePie from "@/components/author/ConferencePieGraph";

    /**
     * 作者的详情tab
     * @version 1.1
     * @param {Number} [authorId] - 作者ID
     * @param {Object} [baseInfo] - 作者的基本信息
     * @param {Object} [domainStatistics] - 作者的领域信息
     * @see DomainPie 关键词饼图
     * @see RecentPaper 最近发表文章列表
     * @see ConferencePie 各个会议论文占比饼图
     * @example 调用示例
     * <overview-pane :base-info="baseInfo" :author-id="authorId" :domain-statistics="domainStatistics" @clickItem="openDetailPage"/>
     */
    export default {
        name: "AuthorOverviewPane",
        components: {
            DomainPie,
            ConferencePie,
            RecentPaper
        },
        data () {
            return {
                loading: true,
                statisticInfo: {},
                recentPapers: [],
                coAuthorList: []
            }
        },
        computed: {
            conferenceStatistics () {
                // TODO 需要添加多个会议的统计
                return [
                    {count: this.statisticInfo.asePaperNum, name: "ASE"},
                    {count: this.statisticInfo.icsePaperNum, name: "ICSE"}
                ];
            }
        },
        props: {
            authorId: 0,
            baseInfo: {},
            domainStatistics: {},
        },
        watch: {
            authorId () {
                this.init();
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            init () {
                this.loading = true;
                this.getAuthorStatisticsInfo();
                this.getRecentPapers();
                this.getTopCoAuthors();
            },
            getAuthorStatisticsInfo () {
                const id = this.authorId;
                this.$get("/author/statistics", {
                    id: id
                }).then(r => {
                    if (r.data.status) {
                        this.statisticInfo = r.data.result;
                    } else {
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                });
            },
            getRecentPapers () {
                const id = this.authorId;
                const limit = 5;
                this.$get("/paper/affiliation/recently/publish", {
                    id: id,
                    limit: limit
                }).then(r => {
                    if (r.data.status) {
                        this.recentPapers = r.data.result;
                    } else {
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                });
            },
            getTopCoAuthors () {
                const id = this.authorId;
                const limit = 5;
                this.$get("/author/partner", {
                    id: id,
                    limit: limit
                }).then(r => {
                    if (r.data.status) {
                        this.coAuthorList = r.data.result;
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
            },
            clickDomain (id) {
                this.$emit("clickItem", "keyword", id);
            },
            clickArticle (id) {
                this.$emit("clickItem", "article", id);
            },
            clickAuthor (id) {
                this.$emit("clickItem", "author", id);
            },
            clickAffiliation (id) {
                this.$emit("clickItem", "affiliation", id);
            }
        }
    }
</script>

<style lang="less" scoped>
    @base-interval: 20px;
    @statistic-font-size: 20px;
    @border-color: #ebeef5;
    @statistic-color: #ebeef5;

    .statistic-card {
        margin: 8px;

        border: 1px solid @border-color;
        padding: 20px;
        display: flex;
        align-items: center;
        background-color: @statistic-color;

        .statistic-content {
            align-items: flex-start;
            flex: 3;

            .statistic-num {
                font-size: @statistic-font-size;
                margin-bottom: 10px;
            }

            .statistic-type {
                font-size: 14px;
            }
        }

        .statistic-icon {
            display: flex;
            flex: 1;
            justify-content: flex-end;
        }
    }


    .co-author-item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        .co-author-base {
            flex: 1 0;
            margin-left: 8px;

            .co-author-name {
                font-size: 16px;
            }
        }
    }

    .recent-paper-item {
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
    }

    .card-container {
        margin-top: @base-interval;
    }
</style>
