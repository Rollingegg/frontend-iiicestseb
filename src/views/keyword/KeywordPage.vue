<template>
    <div class="main-container">
        <el-row :gutter="20">
            <el-col :md="16" class="domain-content">
                <div class="domain-title">{{researchDomain}}</div>
                <!--todo: 后端数据没有存描述，后面可能加入
                    <el-card class="info-container">
                        <div slot="header" class="card-head-title">领域描述</div>
                        <div class="domain-description">
                            {{domainDesciption}}
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
                            <el-icon class="el-icon-user"/>
                        </el-table-column>
                        <el-table-column width="250" prop="name" label="作者"/>
                        <el-table-column prop="affiliationName" label="所在机构"/>
                    </el-table>
                </el-card>

                <el-card class="info-container">
                    <div slot="header" class="card-head-title">活跃机构</div>
                    <div class="info-infinite-container">
                        <div>
                            活跃机构统计图
                        </div>
                    </div>
                </el-card>

                <PaperList :keyword="keywordAndLimitation"></PaperList>
            </el-col>

            <el-col :md="8" class="domain-recommend">

                <el-card class="info-container">
                    <div slot="header" class="card-head-title">论文发表</div>
                    <div class="info-infinite-container">
                        论文发表统计图
                    </div>
                </el-card>

                <el-card class="info-container">
                    <div slot="header" class="card-head-title">相关领域</div>
                    <div class="info-infinite-container">
                        与其相关的研究领域
                    </div>
                </el-card>

                <el-card class="info-container">
                    <div slot="header" class="card-head-title">推荐会议</div>
                    <div class="info-infinite-container">
                        与该研究领域有较深关系的会议列表
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import PaperList from '../author/PaperListPage';

    export default {
        name: 'KeywordPage',
        components: {PaperList},
        data () {
            return {
                currentTab: PaperList,
                activeName: 'overview',
                keywordId: '',
                type: 'term',
                researchDomain: 'Artificial Intelligence System',
                domainDesciption: 'Artificial Intelligence System (AIS) was a distributed computing project undertaken by Intelligence Realm, Inc. with the long-term goal of simulating the human brain in real time, complete with artificial consciousness and artificial general intelligence. They claimed to have found, in research, the "mechanisms of knowledge representation in the brain which is equivalent to finding artificial intelligence", before moving into the developmental phase.',
                recentPapers: [],
                relativeAuthors: [],
            };
        },
        computed: {
            keywordAndLimitation () {
                return {type: this.type, term: this.researchDomain, limit: 5};
            }
        },
        methods: {
            init () {
                this.getTermBaseInfo();
                this.getActiveAuthorsOfTerm();

            },
            getTermBaseInfo () {
                this.researchDomain = 'a';
                /*todo 从关键词id获得关键字信息
                this.$get("/Term/info", {
                    id: this.keywordId
                }).then(r => {
                    if (r.data.status) {
                        this.researchDomain = r.data.result.researchDomain;
                        this.domainDesciption = '';
                    } else {
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                });
                */
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
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                        this.loading = false;
                    }
                }).catch(e => {
                    this.loading = false;
                });
            },
            cellStyle () {
                return "color: rgba(0, 30, 135, 0.6); font-size: 18px; cursor: pointer;";
            },
            openAuthorOrAffiliation (row, col) {
                if (col.label !== "所在机构") {
                    this.openDetailPage("author", row.id);
                } else {
                    this.openDetailPage("affiliation", row.affiliationId)
                }
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
        created () {
            this.keywordId = this.$route.query.id;
        },
        mounted () {
            this.init();
        }
    };
</script>

<style lang="less" scoped>
    @head-font-size: 30px;
    @title-font-size: 24px;
    .main-container {
        .domain-content {

            .domain-title {
                font-size: @head-font-size;
                line-height: 36px;
                margin-bottom: 20px;
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
            margin-bottom: 20px;

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
    }
</style>
