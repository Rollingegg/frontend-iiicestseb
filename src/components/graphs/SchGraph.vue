<template>
    <div v-loading="loading" element-loading-background="rgba(255,255,255,0.95)">
        <el-row :gutter="20">
            <el-col :md="16">
                <el-card>
                    <div slot="header" class="graph-card-header">学术关系图谱</div>
                    <div v-if="searchType==='author_name'">
                        <author-partner-graph height="300px" :data="authorPartnerGraphData"/>
                        <author-affiliation-graph height="300px" :data="authorAffiliationGraphData"/>
                    </div>

                    <div v-else>
                        <affiliation-paper-term-graph height="600px" :data="affiliationPaperTermGraphData"/>
                    </div>
                </el-card>
            </el-col>

            <el-col :md="8">
                <el-card>
                    <div slot="header" class="graph-card-header">研究领域词云</div>
                    <term-word-cloud height="600px" :data="domainStatistics"/>
                </el-card>
            </el-col>
        </el-row>

        <el-card class="card-container">
            <paper-year-graph height="300px"
                              :search-type="searchType"
                              :search-id="searchId"/>
        </el-card>
    </div>
</template>

<script>
    import AuthorPartnerGraph from "@/components/author/AuthorPartnerGraph";
    import AuthorAffiliationGraph from "@/components/author/AuthorAffiliationGraph";
    import AffiliationPaperTermGraph from "@/components/affiliation/AffiliationPaperTermGraph";
    import TermWordCloud from "@/components/graphs/TermWordCloud";
    import PaperYearGraph from "@/components/graphs/PaperYearGraph";

    /**
     * 学术图相关页面
     *
     * @version 1.0
     * @author dwxh
     * @param {Number} [searchId] - 被检索的ID
     * @param {String} [searchType] - 检索类型： 作者/机构
     * @see AuthorPartnerGraph 作者合作关系图
     * @see AuthorAffiliationGraph 作者和同机构作者关系图
     * @see AuthorAffiliationGraph 作者和同机构作者关系图
     * @see AffiliationPaperTermGraph 机构和论文关键字图谱
     * @see TermWordCloud 关键词词云
     * @see PaperYearGraph 论文-年柱图
     * @example
     * <SchGraphTab searchType="author_name" searchId="String(1)"/>
     *
     * <SchGraphTab searchType="affiliation_name" searchId="String(1)"/>
     */
    export default {
        name: "AuthorGraphPage",
        data () {
            return {
                limit: 1000,
                loading: true,
                domainStatistics: [],
                authorPartnerGraphData: {},
                authorAffiliationGraphData: {},
                affiliationPaperTermGraphData: {}
            };
        },
        components: {
            AuthorPartnerGraph,
            AuthorAffiliationGraph,
            AffiliationPaperTermGraph,
            PaperYearGraph,
            TermWordCloud
        },
        props: {
            searchType: String,
            searchId: Number,
        },
        mounted () {
            this.initGraphData();
        },
        methods: {
            initGraphData () {
                this.getDomainStatistics();
                if (this.searchType === "author_name") {
                    this.getAuthorPartners();
                    this.getAuthorAffiliationPartners();
                } else {
                    this.getAffiliationPaperTermGraphData();
                }
            },
            getDomainStatistics () {
                const pathsMap = {
                    affiliation_name: "/statistics/affiliation/hot/term",
                    author_name: "/statistics/author/hot/term"
                };
                const searchPath = pathsMap[this.searchType];
                const id = this.searchId;
                this.$get(searchPath, {
                    id: id,
                    limit: this.limit
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
                }).catch(e => {
                    this.loading = false;
                });
            },
            getAuthorPartners () {
                const id = this.searchId;
                this.$get("/author/graph/partner", {
                    id: id,
                    limit: this.limit
                }).then(r => {
                    if (r.data.status) {
                        this.authorPartnerGraphData = r.data.result;
                    } else {
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                });
            },
            getAuthorAffiliationPartners () {
                const id = this.searchId;
                this.$get("/author/graph/affiliation", {
                    id: id,
                    limit: this.limit
                }).then(r => {
                    if (r.data.status) {
                        this.authorAffiliationGraphData = r.data.result;
                    } else {
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                });
            },
            getAffiliationPaperTermGraphData () {
                const id = this.searchId;
                this.$get("/affiliation/graph/paper/with/term", {
                    id: id
                }).then(r => {
                    if (r.data.status) {
                        this.affiliationPaperTermGraphData = r.data.result;
                    } else {
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                });
            },
        }
    };
</script>

<style lang="less" scoped>
    @base-interval: 20px;
    .card-container {
        margin-top: @base-interval;
    }

    .graph-card-header {
        font-size: 24px;
    }
</style>
