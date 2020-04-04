<template>
    <el-row>
        <el-col :md="16">
            <div v-loading="loading" element-loading-background="rgba(255,255,255,0.95)">
                <div class="one-line">
                    <div>Papers({{paperCount}})</div>
                </div>

                <div v-if="!noResult">
                    <LCard :key="index"
                           :article="item"
                           v-on:deletedPaper="deletedPaper"
                           v-for="(item, index) of responseList.searchResultVOCollection"/>
                    <el-pagination @current-change="handleCurrentChange"
                                   :current-page="params.page+1"
                                   :page-size="10"
                                   layout="prev, pager, next, jumper"
                                   :total="paperCount"/>
                </div>

                <div v-else class="no-info">
                    <div class="no-data">
                        <img src="/static/img/nodata02.png" alt="没有数据"/>
                        <br/>什么也没找到 T^T
                    </div>
                </div>
            </div>
        </el-col>

        <el-col :md="8">相关推荐</el-col>
    </el-row>
</template>

<script>
    import LCard from "@/components/Article/LiteratureCard";

    export default {
        name: "PaperList",
        components: {
            LCard
        },
        data () {
            return {
                responseList: [],
                noResult: false,
                loading: true,
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
            keyword: Object
        },
        computed: {
            paperCount: function () {
                return this.responseList.paperCount;
            }
        },
        watch: {
            keyword (newValue, oldValue) {
                this.initParams(newValue);
                this.fetch();
            }
        },
        methods: {
            handleCurrentChange (currentPage) {
                this.params.page = currentPage - 1;
                this.fetch();
            },
            fetch () {
                this.loading = true;
                this.$postJson("search/advanced", this.params)
                    .then(r => {
                        if (r.data.status) {
                            setTimeout(() => {
                                this.loading = false;
                            }, 500);
                            this.responseList = r.data.result;
                            this.noResult = this.responseList.paperCount === 0;
                        } else {
                            this.$message({
                                showClose: true,
                                message: r.data.result,
                                type: "warning"
                            });
                            this.loading = false;
                            this.noResult = true;
                        }
                    })
                    .catch(e => {
                        this.loading = false;
                        this.noResult = true;
                    });
            },
            initParams (keyword) {
                const paramsMap = {
                    affiliation_name: "affiliationKeyword",
                    title: "titleKeyword",
                    paper_abstract: "paperAbstractKeyword",
                    doi: "doiKeyword",
                    author_name: "authorKeyword",
                    term: "termKeyword",
                    all: "allKeyword",
                    page: "page",
                    start_year: "chronDateMinKeyword",
                    end_year: "chronDateMaxKeyword"
                };
                this.params.type = keyword.type;
                for (const key in keyword) {
                    if (keyword.hasOwnProperty(key) && key !== "type") {
                        this.params[paramsMap[key]] = keyword[key];
                    }
                }
            },
            deletedPaper(deleted){
                console.log(deleted);
                this.fetch()
            }
        },
        mounted () {
            this.initParams(this.keyword);
            this.fetch();
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
