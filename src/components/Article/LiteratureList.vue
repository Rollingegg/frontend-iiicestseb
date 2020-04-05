<!--todo 将 view/author/PaperListPage.vue 并到这里-->
<template>
    <el-row :gutter="20">
        <el-col :md="16">
            <div v-loading="loading" element-loading-background="rgba(255,255,255,0.95)">
                <div class="one-line">
                    <div>Papers({{paperCount}})</div>
                </div>

                <div v-if="!noResult">
                    <LCard :key="index"
                           :article="item"
                           v-on:deletedPaper="deletedPaper"
                           v-for="(item, index) of responseList"
                    />
                    <!--todo:需要分页！-->
                    <el-pagination :page-size="20"
                                   @current-change="handleCurrentChange"
                                   :current-page.sync="currentPage"
                                   layout="prev, pager, next, jumper"
                                   :total="paperCount"
                    />
                </div>

                <div class="no-info" v-else>
                    <div class="no-data">
                        <img src="/static/img/nodata02.png"/>
                        <br/>什么也没找到 T^T
                    </div>
                </div>
            </div>
        </el-col>

        <el-col :md="8">
            <div class="one-line">
                <div>Filter in Results</div>
            </div>
        </el-col>

    </el-row>
</template>

<script>
    import LCard from "./LiteratureCard";

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
                currentPage: 1,
                searchPath: ''
            };
        },
        props: {
            searchType: String,
            searchId: String
        },
        computed: {
            paperCount: function () {
                return this.responseList == null ? 0 : this.responseList.length;
            }
        },
        watch: {
            searchId () {
                this.fetch();
            },
            searchType () {
                this.fetch();
            }
        },
        methods: {
            handleCurrentChange (currentPage) {
                this.currentPage = currentPage;
            },
            fetch () {
                this.loading = true;
                if (this.searchType !== 'term') {
                    this.$get(this.searchPath, {id: this.searchId})
                        .then(r => {
                            if (r.data.status) {
                                setTimeout(() => {
                                }, 500);
                                this.responseList = r.data.result;
                                this.noResult = this.responseList == null;
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: r.data.result,
                                    type: "warning"
                                });
                                this.noResult = true;
                            }
                        })
                        .catch(() => {
                            this.noResult = true;
                        });
                } else {
                    //todo 我服了
                    this.$get(this.searchPath, {termId: this.searchId})
                        .then(r => {
                            if (r.data.status) {
                                setTimeout(() => {
                                }, 500);
                                this.responseList = r.data.result;
                                this.noResult = this.responseList == null;
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: r.data.result,
                                    type: "warning"
                                });
                                this.noResult = true;
                            }
                        })
                        .catch(() => {
                            this.noResult = true;
                        });
                }
                this.loading = false;
            },
            initParams () {
                const pathsMap = {
                    affiliation_name: "/paper/affiliation/all/publish",
                    author_name: "/paper/author/all/publish",
                    term: "/statistics/relativePapersOfTerm",
                };
                this.searchPath = pathsMap[this.searchType];
            },
            deletedPaper(deleted){
                console.log(deleted);
                this.fetch()
            }
        },
        mounted () {
            this.initParams();
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
