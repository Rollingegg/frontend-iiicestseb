<template>
    <el-row :gutter="20">
        <el-col>
            <div v-loading="gettingResult" element-loading-background="rgba(255,255,255,0.95)">
                <div class="one-line">
                    <div>Papers({{paperCount}})</div>
                </div>

                <div v-if="!noResult">
                    <l-card :key="index"
                           :article="item"
                           @deletedPaper="deletedPaper"
                           v-for="(item, index) of paperList"
                    />
                    <!--todo:需要分页！-->
                    <el-pagination :page-size="10"
                                   @current-change="handleCurrentChange"
                                   :current-page.sync="params.page + 1"
                                   layout="prev, pager, next, jumper"
                                   :total="paperCount"
                    />
                </div>

                <div class="no-info" v-else>
                    <div class="no-data">
                        <img src="/static/img/nodata02.png" alt="没有数据哦"/>
                        <br/>什么也没找到 T^T
                    </div>
                </div>
            </div>
        </el-col>

        <!--
        <el-col :md="8">
                    <div class="one-line">
                        <div>Filter in Results</div>
                    </div>
                </el-col>
                -->

    </el-row>
</template>

<script>
    import LCard from "./LiteratureCard";

    /**
     * 文献列表,对多个文献card的封装，根据提供的选项请求文献数据
     *
     * @see LCard
     * @version 1.0
     * @author dwxh
     * @param {Boolean} [isById] - 是否根据ID检索
     * @param {String} [searchType] - 检索关键词名，可选
     * @param {Number} [searchId] - 检索对象的ID，可选
     * @param {Object} [keyword] - 关键字，可选
     * @example 调用示例
     *
     * <PaperListWrapper searchType="author_name" :isById="true" :searchId="1" />
     */
    export default {
        name: "PaperListWrapper",
        components: {
            LCard
        },
        data () {
            return {
                paperList: [],
                paperTotalNumber: 0,
                noResult: false,
                gettingResult: true,
                searchPath: '',
                params: {
                    allKeyword: null,
                    titleKeyword: null,
                    paperAbstractKeyword: null,
                    doiKeyword: null,
                    authorKeyword: null,
                    affiliationKeyword: null,
                    termKeyword: null,
                    type: null,
                    page: 0,
                    limit: 10,
                    chronDateMaxKeyword: '2020',
                    chronDateMinKeyword: '2011'
                }
            };
        },
        props: {
            searchType: {
                type: String,
                require: false,
            },
            searchId: {
                type: Number,
                require: false,
            },
            isById: Boolean,
            keyword: {
                type: Object,
                require: false,
            }
        },
        mounted () {
            this.isById ? this.initIdParams() : this.initSearchParams(this.keyword);
            this.fetch();
        },
        computed: {
            paperCount: function () {
                return this.paperTotalNumber;
            }
        },
        watch: {
            searchId () {
                this.isById && this.fetch();
            },
            searchType () {
                this.isById && this.fetch();
            },
            keyword (newValue) {
                if (!this.isById) {
                    this.initSearchParams(newValue);
                    this.fetch();
                }
            }
        },
        methods: {
            handleCurrentChange (currentPage) {
                this.params.page = currentPage - 1;
                this.fetch();
            },
            fetch () {
                this.gettingResult = true;
                // console.log(this.gettingResult);
                if (this.isById) {
                    // todo:后端接口这里需要改名
                    let paramName = this.searchType !== 'term' ? 'id' : "termId";
                    let param = {};
                    param[paramName] = this.searchId;
                    this.$get(this.searchPath, param)
                        .then(r => {
                            if (r.data.status) {
                                this.paperTotalNumber = r.data.result.length;
                                this.paperList = r.data.result;
                                this.noResult = false;
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: r.data.result,
                                    type: "warning"
                                });
                                this.noResult = true;
                                this.paperTotalNumber = 0;
                            }
                        })
                        .catch(() => {
                            this.noResult = true;
                            this.paperTotalNumber = 0;
                        })
                        .finally(() => {
                            this.gettingResult = false;
                        });
                } else {
                    this.$postJson("search/advanced", this.params)
                        .then(r => {
                            if (r.data.status) {
                                this.paperList = r.data.result.searchResultVOCollection;
                                this.paperTotalNumber = r.data.result.paperCount;
                                this.noResult = false;
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: r.data.result,
                                    type: "warning"
                                });
                                this.noResult = true;
                                this.paperTotalNumber = 0;
                            }
                        })
                        .catch(() => {
                            this.noResult = true;
                            this.paperTotalNumber = 0;
                        })
                        .finally(() => {
                            this.gettingResult = false;
                        });
                }
            },
            initIdParams () {
                const pathsMap = {
                    affiliation_name: "/paper/affiliation/all/publish",
                    author_name: "/paper/author/all/publish",
                    term: "/statistics/relativePapersOfTerm",
                };
                this.searchPath = pathsMap[this.searchType];
            },
            initSearchParams (keyword) {
                const paramsMap = {
                    affiliation_name: "affiliationKeyword",
                    title: "titleKeyword",
                    paper_abstract: "paperAbstractKeyword",
                    doi: "doiKeyword",
                    author_name: "authorKeyword",
                    term: "termKeyword",
                    all: "allKeyword",
                    page: "page",
                    type: "type",
                    limit: "limit",
                    start_year: "chronDateMinKeyword",
                    end_year: "chronDateMaxKeyword"
                };
                for (const key in keyword) {
                    if (keyword.hasOwnProperty(key)) {
                        this.params[paramsMap[key]] = keyword[key];
                    }
                }
            },
            deletedPaper (deleted) {
                // console.log(deleted);
                this.fetch()
            }
        }
    };
</script>

<style lang="less" scoped>
    .one-line {
        display: flex;
        height: 35px;
        -webkit-box-pack: justify;
        justify-content: space-between;
        line-height: 35px;
        font-size: 16px;
    }

    .no-info {
        background: white;
        text-align: center;
        font-size: 30px;
        display: flex;
        flex-direction: column;

        .no-data {
            align-self: center;
        }
    }
</style>
