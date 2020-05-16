<template>
    <div class="overview-container"
         v-loading="loading"
         element-loading-background="rgba(255,255,255,0.95)">
        <el-row :gutter="15">
            <el-col :md="16">
                <el-card>
                    <div slot="header">Statistics</div>
                    <div class="statistic-container">
                        <el-row :gutter="10">
                            <el-col :md="12">
                                <div class="statistic-card">
                                    <div class="statistic-content">
                                        <div class="statistic-num">{{baseInfo.paperNum}}</div>
                                        <div class="statistic-type">Publications</div>
                                    </div>
                                    <div class="statistic-icon">
                                        <el-icon class="el-icon-document"/>
                                    </div>
                                </div>
                            </el-col>

                            <el-col :md="12">
                                <div class="statistic-card">
                                    <div class="statistic-content">
                                        <div class="statistic-num">{{baseInfo.authorNum}}</div>
                                        <div class="statistic-type">Members</div>
                                    </div>
                                    <div class="statistic-icon">
                                        <el-icon class="el-icon-user-solid"/>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>

                <el-card class="card-container">
                    <div slot="header">Research Domains Ranking</div>
                    <domain-pie height="600px"
                                :data="domainStatistics"
                                @on-click-term="clickDomain"/>
                </el-card>
            </el-col>

            <el-col :md="8">
                <hot-authors :hot-authors="hotAuthors" @clickAuthor="clickAuthor"/>

                <recent-paper :recent-papers="recentPapers" @clickArticle="clickArticle"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import RecentPaper from "@/components/paper/RecentPaper";
    import DomainPie from "@/components/Author/DomainsPieGraph";
    import HotAuthors from "@/components/Affiliation/HotAuthors";

    export default {
        name: "AffiliationOverviewPane",
        data () {
            return {
                loading: true,
                domainStatistics: [],
                hotAuthors: [],
                recentPapers: [],
            }
        },
        components: {
            DomainPie,
            RecentPaper,
            HotAuthors
        },
        props: {
            affiliationId: Number,
            baseInfo: Object
        },
        mounted () {
            this.init();
        },
        methods: {
            init () {
                this.loading = true;
                this.getDomainStatistics();
                this.getActiveMembers();
                this.getRecentPapers();
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
            },
            getDomainStatistics () {
                const id = this.affiliationId;
                const limit = 10;
                this.$get("/statistics/affiliation/hot/term", {
                    id: id,
                    limit: limit
                }).then(r => {
                    if (r.data.status) {
                        this.domainStatistics = r.data.result;
                    } else {
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                });
            },
            getActiveMembers () {
                const id = this.affiliationId;
                const limit = 1000;
                this.$get("/author/hotin/affiliation", {
                    id: id,
                    limit: limit
                }).then(r => {
                    if (r.data.status) {
                        this.hotAuthors = r.data.result;
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
                const id = this.affiliationId;
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
                    setTimeout(() => {
                        this.loading = false;
                    }, 500);
                }).catch(() => {
                    this.loading = false;
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    @base-interval: 20px;
    @statistic-font-size: 20px;
    @border-color: #ebeef5;
    .statistic-container {
        padding: 8px;

        .statistic-card {
            border: 1px solid @border-color;
            padding: 20px;
            display: flex;
            align-items: center;
            background-color: @border-color;

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
    }
</style>
