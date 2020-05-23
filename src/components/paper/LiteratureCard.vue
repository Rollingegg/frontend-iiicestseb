<template>
    <el-card shadow="always" class="box-card">
        <div class="item-container">
            <el-link class="document-title" @click="openArticle(article.id)">{{article.title}}</el-link>

            <div class="author">
                <el-link v-for="(item, index) in article.authorList" :key="index" @click="openAuthor(item.id)">
                    {{item.name}}
                </el-link>
            </div>

            <div class="abstract">
                <mul-wrapper class="document-abstract" :index=article.id :content=article.paperAbstract />
            </div>

            <div class="keywords">
                <span>Keywords:</span>
                <el-tag v-for="(item, index) in article.termsList" :key="index">{{item.name}}</el-tag>
            </div>
        </div>

        <div>
            <el-link icon="el-icon-date" class="pub-year">{{article.chronDate}}</el-link>
            <el-link target="_blank"
                     icon="el-icon-download"
                     v-bind:href="article.pdfUrl"
                     class="download-link">
                Download
            </el-link>
            <span class="citation">Citations( <span class="citation-cnt">{{article.citationCountPaper}}</span> )</span>
            <el-button  v-if="isAdmin" type="danger" class="delete-btn" icon="el-icon-delete" circle @click="deletePaper"/>
            <el-link type="primary" class="viewmore-link" @click="openArticle(article.id)">View More</el-link>
        </div>
    </el-card>
</template>

<script>
    import MulWrapper from '../common/MultipleLines';
    import {mapState} from 'vuex';

    /**
     * 文献详情,调用 MultipleLines 展示多行内容
     *
     * @see MulWrapper
     * @version 1.0
     * @author dwxh
     * @param {Object} [article] - 文章详情对象
     * @event deletedPaper 删除了文章，需要更新页面 <br/>-{Boolean}: 是否删除成功
     */
    export default {
        name: 'LCard',
        components: {
            MulWrapper
        },
        data () {
            return {
                isAdmin: false
            }
        },
        props: {
            article: Object
        },
        mounted () {
            this.isAdmin = this.user && this.user.privilegeLevel === '管理员'
        },
        computed: {
            ...mapState({
                user: state => state.account.user
            })
        },
        methods: {
            openArticle (id) {
                this.openDetailPage('article', id);
            },
            openAuthor (id) {
                this.openDetailPage('author', id);
            },
            openDetailPage (detailType, queryId) {
                const detailPath = {
                    'article': '/articleDetail',
                    'author': '/authorDetail',
                    'keyword': '/keywordDetail'
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
                        message: '亲爱的游客，请先登录哟！',
                        type: 'warning'
                    });
                }
            },
            deletePaper () {
                this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'warn',
                        message: '正在开发中'
                    });
                    /* //todo jh说后端有问题，到时候可以恢复
                    this.$delete('/admin/paper/delete', {id: this.article.id})
                        .then((r) => {
                            if (r.data.status) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '删除失败' + r.data.result
                                });
                            }
                        }).catch(() => {
                        this.$message({
                            type: 'error',
                            message: '删除失败!请查看日志'
                        });
                    });
                    */
                    this.$emit('deletedPaper', true)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .box-card {
        margin-bottom: 10px;

        .item-container {
            border-bottom-style: solid;
            border-width: 1px 0;

            .document-title {
                text-align: left;
                font-size: 25px;
                margin: 5px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .author {
                * {
                    font-size: 16px;
                    margin: 5px;
                    height: 20px;
                }
            }

            .abstract,
            .keywords {
                text-align: left;
                overflow: hidden;

                span {
                    margin: 5px;
                    font-size: 14px;
                    height: 25px;
                    line-height: 25px;
                }

                .document-abstract {
                    margin: 5px;
                }
            }
        }

        .pub-year,
        .download-link {
            margin-left: 5px;
            padding: 5px;
            float: left;
        }

        .citation {
            padding: 5px;
            float: left;
            font-size: 14px;

            .citation-cnt {
                font-size: 16px;
                font-weight: 500;
                color: darkblue;
            }
        }

        .delete-btn {
            float: right;
            margin: 0 20px;
            padding: 5px;
        }

        .viewmore-link {
            float: right;
            padding: 5px 0;
        }
    }
</style>
