<template>
    <div class="main-container">
        <el-row :gutter="20" v-loading="loading" element-loading-background="rgba(255,255,255,0.95)">
            <el-col :md="16" class="domain-content">
                <div class="domain-title">{{researchDomain}}</div>
                <!--todo: 后端数据没有存描述，后面可能加入
                            <el-card class="info-container">
                                <div slot="header" class="card-head-title">领域描述</div>
                                <div class="domain-description">
                                    {{domainDescription}}
                                </div>
                            </el-card>
                -->
                <el-card class="info-container">
                    <div slot="header" class="card-head-title">活跃学者</div>
                    <el-table :data="relativeAuthors"
                              style="width: 100%"
                              @cell-click="openAuthorOrAffiliation"
                              :cell-style="cellStyle">
                        <el-table-column width="40">
                            <el-icon class="el-icon-user-solid"/>
                        </el-table-column>
                        <el-table-column width="250" prop="name" label="作者"/>
                        <el-table-column prop="affiliationName" label="所在机构"/>
                    </el-table>
                </el-card>

                <el-card class="info-container">
                    <div slot="header" class="card-head-title">活跃机构</div>
                    <div class="info-infinite-container">
                        <AffiliationOfTermGraph
                                height="400px"
                                :affiliation_times_data="affiliation_times_data"
                        />
                    </div>
                </el-card>

                <literature-list searchType="term" :isById="true" :searchId="String(keywordId)"></literature-list>
            </el-col>

            <el-col :md="8" class="domain-recommend">
                <el-card class="info-container">
                    <div slot="header" class="card-head-title">论文发表</div>
                    <div class="info-infinite-container">
                        <any_-year-graph
                                height="400px"
                                :barWidth="25"
                                :searchId="String(keywordId)"
                                searchType="term"
                        ></any_-year-graph>
                    </div>
                </el-card>

                <el-card class="info-container">
                    <div slot="header" class="card-head-title">相关领域</div>
                    <div class="info-infinite-container">
                        <div class="relative-term-container">
                            <el-button
                                    class="relative-term-button"
                                    type="primary"
                                    v-for="(item, index) in relativeTerms"
                                    :key="index"
                                    @click="openTermDetail(item.id)"
                            >{{item.name}}
                            </el-button>
                        </div>
                    </div>
                </el-card>
                <!--
                        <el-card class="info-container">
                            <div slot="header" class="card-head-title">推荐会议</div>
                            <div class="info-infinite-container">
                                与该研究领域有较深关系的会议列表
                            </div>
                        </el-card>
                -->
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import LiteratureList from "@/components/paper/PaperListWrapper";
    import AffiliationOfTermGraph from "@/components/keyword/AffiliationOfTermGraph";
    import Any_YearGraph from "@/components/graphs/Any_YearGraph";

    export default {
        name: "KeywordPage",
        components: {
            LiteratureList,
            AffiliationOfTermGraph,
            Any_YearGraph
        },
        data () {
            return {
                activeName: "overview",
                keywordId: this.$route.query.id,
                type: "term",
                researchDomain: "",
                domainDescription: "",
                recentPapers: [],
                relativeAuthors: [],
                relativeAffiliations: [],
                relativeTerms: [],
                affiliation_times_data: [],
                times_yaer_data: {},
                loading: true
            };
        },
        computed: {
            keywordAndLimitation () {
                return {type: this.type, term: this.researchDomain, limit: 5};
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
                this.keywordId = this.$route.query.id;
                this.loading = true;
                this.getTermBaseInfo();
                this.getActiveAuthorsOfTerm();
                this.getActiveAffiliationsOfTerm();
                this.getRelativeTermsOfTerm();
            },
            getTermBaseInfo () {
                this.$get("/term/info", {
                    id: this.keywordId
                }).then(r => {
                    if (r.data.status) {
                        this.researchDomain = r.data.result.researchDomain;
                        this.domainDescription = "";
                    } else {
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                });
            },
            getActiveAffiliationsOfTerm () {
                let limit = 5;
                this.$get("/statistics/term/activeAffiliation", {
                    termId: this.keywordId,
                    max: limit
                }).then(r => {
                    if (r.data.status) {
                        this.affiliation_times_data = r.data.result;
                    } else {
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                });
            },
            getActiveAuthorsOfTerm () {
                let limit = 5;
                this.$get("/statistics/activeAuthorsOfTerm", {
                    termId: this.keywordId,
                    limit: limit
                }).then(r => {
                    if (r.data.status) {
                        this.relativeAuthors = r.data.result;
                        setTimeout(() => {
                            this.loading = false;
                        }, 500);
                    } else {
                        this.loading = false;
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                });
            },
            getRelativeTermsOfTerm () {
                let limit = 5;
                this.$get("/statistics/relativeTermsOfTerm", {
                    termId: this.keywordId,
                    limit: limit
                }).then(r => {
                    if (r.data.status) {
                        this.relativeTerms = r.data.result;
                    } else {
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                });
            },
            cellStyle () {
                return "color: rgba(0, 30, 135, 0.6); font-size: 18px; cursor: pointer;";
            },
            openAuthorOrAffiliation (row, col) {
                if (col.label !== "所在机构") {
                    this.openDetailPage("author", row.id);
                } else {
                    this.openDetailPage("affiliation", row.affiliationId);
                }
            },
            openTermDetail (id) {
                this.openDetailPage("keyword", id);
            },
            openDetailPage (detailType, queryId) {
                const detailPath = {
                    author: "/authorDetail",
                    keyword: "/keywordDetail",
                    affiliation: "/affiliationDetail",
                    article: "/articleDetail"
                };
                this.$router.push({
                    path: detailPath[detailType],
                    query: {
                        id: queryId
                    }
                });
            }
        },
        mounted () {
            this.init();
        }
    };
</script>

<style lang="less" scoped>
    @head-font-size: 30px;
    @title-font-size: 24px;
    @base-interval: 20px;
    .main-container {
        .domain-content {
            .domain-title {
                font-size: @head-font-size;
                line-height: 36px;
                margin-bottom: @base-interval;
            }

            .domain-description {
                overflow: auto;
                height: 100px;
                font-size: 14px;
            }

            .domain-recommend {
            }
        }

        .info-container {
            margin-bottom: @base-interval;

            .card-head-title {
                font-size: @title-font-size;
                flex: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: center;
            }

            .info-infinite-container {
                border: 1px solid #e8e8e8;
                border-radius: 4px;
                overflow: auto;
                padding: 8px @title-font-size;
                padding-top: 0;
                height: 400px;
            }
        }

        .relative-term-container {
            margin-top: @base-interval;

            .relative-term-button {
                margin: 10px 0;
                margin-left: 10px;
            }
        }
    }
</style>
