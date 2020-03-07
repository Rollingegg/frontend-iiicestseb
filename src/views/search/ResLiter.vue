<template>
    <div>
        <el-dialog :visible.sync="detailVisible" center>
            <template slot="title">
                <h1 style="font-size:26px">{{currentRow.paperTitle}}</h1>
            </template>
            <template slot="footer">
                <el-link target="_blank" icon="el-icon-download" v-bind:href="pdf_link" style="font-size:26px">文献传递</el-link>
            </template>
            <el-row class="info-row">
                <el-col :span="2">作者</el-col>
                <el-col :span="22"><el-button size="mini" round type="info" v-for="(item, index) in currentRow.authorInfoList" :key="index" class="info-button">{{item.name}}</el-button></el-col>
            </el-row>
            <el-row class="info-row">
                <el-col :span="2">机构</el-col>
                <el-col :span="22"><el-button size="mini" round type="info" v-for="(item, index) in currentRow.authorInfoList" :key="index" class="info-button">{{item.affiliationName}}</el-button></el-col>
            </el-row>
            <el-row class="info-row">
                <el-col :span="2">刊物</el-col>
                <el-col :span="22">{{currentRow.publicationTitle}}</el-col>
            </el-row>
            <el-row class="info-row">
                <el-col :span="2">关键词</el-col>
                <el-col :span="22"><el-button size="mini" round type="info" v-for="(item, index) in currentRow.termList" :key="index" class="info-button">{{item.word}}</el-button></el-col>
            </el-row>
            <el-row class="info-row">
                <el-col :span="2">会议</el-col>
                <el-col :span="22">{{String(currentRow.conferenceName).toUpperCase()}}</el-col>
            </el-row>
            <el-row class="info-row">
                <el-col :span="2">DOI</el-col>
                <el-col :span="22">{{currentRow.doi}}</el-col>
            </el-row>
            <el-row class="info-row">
                <el-col :span="12"><span style="margin-right:12px">发表时间</span>{{String(currentRow.publicationYear).substr(0,10)}}</el-col>
                <el-col :span="12"><span style="margin-right:12px">被引次数</span>{{currentRow.referenceCount}}</el-col>
            </el-row>
            <el-row class="info-row">
                <el-col :span="2">摘要</el-col>
                <el-col :span="22" style="background-color: #D3DCE6;">{{currentRow.paperAbstract}}</el-col>
            </el-row>

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
                min-width="400"
                align="center"
                :show-overflow-tooltip="true"
                :formatter="setTitle"
            ></el-table-column>
            <el-table-column
                prop="authors"
                label="作者"
                min-width="400"
                align="center"
                :show-overflow-tooltip="true"
                :formatter="setAuthor"
            ></el-table-column>
            <!-- <el-table-column
                prop="affiliations"
                label="来源"
                width
                align="center"
                :show-overflow-tooltip="true"
                :formatter="setAffiliations"
            ></el-table-column> -->
            <el-table-column
                prop="date"
                label="发表时间"
                width
                align="center"
                :show-overflow-tooltip="true"
                :formatter="setDate"
            ></el-table-column>
            <el-table-column
                prop="ref"
                label="被引"
                width
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
                artList: db.get('RESULT')
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
                    return false;
                }
            },
            filter: {
                type: Object,
                default () {
                    return {};
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
                return row.publicationYear.substr(0, 4);
            },
            setRef (row) {
                return row.referenceCount;
            },
            /* 查看详情 */
            jump2file (row, event, col) {
                this.detailVisible = true;
                this.currentRow = row;
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
    .el-tooltip{
        font: bold 14px blue;
    }
    .el-dialog{
        width: 66.7%;
    }
    .info-row{
        margin-bottom: 16px;
        font-size: 16px;
    }
    .info-button{
        margin-bottom: 4px;
        margin-left: 10px;
    }
</style>
