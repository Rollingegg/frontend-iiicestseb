<template>
    <div>
        <el-dialog :visible.sync="detailVisible" center distroy-on-close>
            <template slot="title">
                <h1>文献详情</h1>
            </template>
            <template slot="footer">
                <el-link target="_blank" icon="el-icon-download" v-bind:href="pdf_link">下载</el-link>
            </template>
            <art-detail :items="detailData"></art-detail>
        </el-dialog>
        <el-row type="flex" justify="center">
            <el-col :span="16">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[10, 20, 50, 100, 200, 500]"
                    :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="artList.length"
                ></el-pagination>
            </el-col>
        </el-row>
        <el-table :data="tableData" stripe style="width: 100%" size="small" @row-click="jump2file">
            <el-table-column
                prop="title"
                label="题名"
                width
                align="center"
                :show-overflow-tooltip="true"
                :formatter="setTitle"
            ></el-table-column>
            <el-table-column
                prop="authors"
                label="作者"
                width
                align="center"
                :show-overflow-tooltip="true"
                :formatter="setAuthor"
            ></el-table-column>
            <el-table-column
                prop="affiliations"
                label="来源"
                width
                align="center"
                :show-overflow-tooltip="true"
                :formatter="setAffiliations"
            ></el-table-column>
            <el-table-column
                prop="date"
                label="发表时间"
                width="90"
                align="center"
                :show-overflow-tooltip="true"
                :formatter="setDate"
            ></el-table-column>
            <el-table-column
                prop="ref"
                label="被引"
                width="90"
                align="center"
                :show-overflow-tooltip="true"
                :formatter="setRef"
            ></el-table-column>
            <el-table-column label="操作" width="180" align="center" v-if="isAdmin">
                <template slot-scope="scope">
                    <el-button size="mini" @click="showEditView(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-row type="flex" justify="center">
            <el-col :span="16">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[10, 20, 50, 100, 200, 500]"
                    :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="artList.length"
                ></el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import db from '../../utils/localstorage';
    import ArtDetail from '@/components/ArticleDetail';

    export default {
        beforeCreate () {
            this.artList = db.get('RESULT');
            if (!this.artList || this.$isEmpty(this.artList)) {
                this.$message({
                    showClose: true,
                    message: '搜索结果为空！',
                    type: 'warning'
                });
                this.$router.push('/searchInput');
            }
        },
        name: 'ResLiter',
        data: function () {
            return {
                currentPage: 1,
                size: 10,
                detailVisible: false,
                currentRow: {},
                authorStr: '',
                affiliationStr: ''
            };
        },
        computed: {
            tableData: {
                get: function () {
                    const tablePush = [];
                    if (!this.$isEmpty(this.artList)) {
                        this.artList.forEach((item, index) => {
                            if (
                                this.size * (this.currentPage - 1) <= index &&
                                index <= this.size * this.currentPage - 1
                            ) {
                                tablePush.push(item);
                            }
                        });
                    }
                    return tablePush;
                },
                set: function () {
                }
            },
            detailData: {
                get () {
                    return [
                        {
                            type: '论文标题',
                            cont: this.currentRow.paperTitle
                        },
                        {
                            type: '作者',
                            cont: this.authorStr
                        },
                        {
                            type: '机构',
                            cont: this.affiliationStr
                        },
                        {
                            type: '摘要',
                            cont: this.currentRow.paperAbstract
                        },
                        {
                            type: '关键词',
                            cont: this.currentRow.authorKeywords
                        },
                        {
                            type: '出版刊物名称',
                            cont: this.currentRow.publicationTitle
                        },
                        {
                            type: '会议名称',
                            cont: this.currentRow.conferenceName
                        },
                        {
                            type: 'DOI',
                            cont: this.currentRow.doi
                        }
                    ];
                },
                set () {
                }
            },
            pdf_link: {
                get () {
                    return this.currentRow.pdfLink;
                },
                set () {
                }
            }
        },
        props: {
            isAdmin: {
                type: Boolean,
                default () {
                    return true;
                }
            }
        },
        methods: {
            setTitle (row) {
                return row.paperTitle;
            },
            setAuthor (row) {
                let authorList = row.authorInfoList;
                let author = '';
                authorList.forEach(value => {
                    author += value.name;
                    author += '; ';
                });
                return author.substr(0, author.length - 2);
            },
            setAffiliations (row) {
                let authorList = row.authorInfoList;
                let author = '';
                authorList.forEach(value => {
                    author += value.affiliationName;
                    author += '; ';
                });
                return author.substr(0, author.length - 2);
            },
            setDate (row) {
                return row.publicationYear;
            },
            setRef (row) {
                return row.referenceCount;
            },
            /* 查看详情 */
            jump2file (row, event, col) {
                console.log(row);
                this.detailVisible = true;
                this.currentRow = row;
                let authorList = row.authorInfoList;
                let author = '';
                let affiliation = '';
                authorList.forEach(value => {
                    author += value.name;
                    author += '; ';
                    affiliation += value.affiliationName;
                    affiliation += '; ';
                });
                this.authorStr = author.substr(0, author.length - 2); // 作者
                this.affiliationStr = affiliation.substr(0, affiliation.length - 2); // 机构
            },
            showEditView (index, row) {
                console.log(index, row);
            },
            handleDelete (index, row) {
                console.log(index, row);
            },
            // 页数改变事件
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`);
                this.size = val;
                this.tableData = this.paging(val, this.index);
            },
            // 页码改变事件
            handleCurrentChange (val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.tableData = this.paging(this.size, val);
            },
            // 本地分页的方法
            paging (size, current) {
                const tableList = Array(this.artlist);
                const tablePush = [];
                tableList.forEach((item, index) => {
                    if (size * (current - 1) <= index && index <= size * current - 1) {
                        tablePush.push(item);
                    }
                });
                return tablePush;
            }
        },
        components: {
            ArtDetail
        }
    };
</script>

<style>
    .el-table__row:hover {
        cursor: pointer;
    }

    .el-pagination__total {
        color: cornsilk;
    }

    .el-pagination__jump {
        color: cornsilk;
    }
</style>
