<template>
    <el-card shadow="always" :loading="loading">
        <div class="card-head-title" slot="header">{{title}}</div>

        <el-table :data="authorList"
                  stripe style="width: 100%"
                  @cell-click="openAuthor"
                  :cell-style="cellStyle"
                  v-if="String(title).indexOf('作者')!==-1">
            <el-table-column min-width="10%">
                <el-avatar icon="el-icon-user-solid" size="small" fit="fit"></el-avatar>
            </el-table-column>
            <el-table-column min-width="30%" sortable prop="name" label="作者"/>
            <el-table-column min-width="40%" sortable prop="affiliationName" label="机构"/>
            <el-table-column min-width="20%" sortable prop="publishNum" label="文章数"/>
        </el-table>

        <el-table :data="wordList"
                  stripe style="width: 100%"
                  @cell-click="openTerm"
                  :cell-style="cellStyle"
                  v-else-if="String(title).indexOf('关键词')!==-1">
            <el-table-column min-width="70%" sortable prop="name" label="关键词"/>
            <el-table-column min-width="20%" sortable prop="hot" label="文章数"/>
        </el-table>
    </el-card>
</template>

<script>
    const limit = 8;
    export default {
        name: "HotCard",
        created () {
            this.$get("statistics/hotTerms", {
                num: limit
            }).then(r => {
                if (r.data.status) {
                    this.wordList = r.data.result;
                } else {
                    this.wordList = [];
                }
            }).catch(e => {
                this.wordList = [];
            });

            this.$get("/statistics/maxPublishAuthor", {
                num: limit
            }).then(r => {
                if (r.data.status) {
                    this.authorList = r.data.result;
                } else {
                    this.authorList = [];
                }
            }).catch(e => {
                this.authorList = [];
            });
        },
        data () {
            return {
                loading: false,
                authorList: [],
                wordList: []
            };
        },
        props: {
            title: {
                type: String,
                default () {
                    return "发表文章最多的学者";
                }
            }
        },
        methods: {
            openAuthor (row, col) {
                if (col.label === "机构") {
                    this.$emit('open-page', 'affiliation', row.affiliationName);
                    return
                }
                if (col.label === "作者") {
                    this.$emit('open-page', 'author', row.name);
                }
            },
            openTerm (row, col) {
                if (col.label === "关键词") {
                    this.$emit('open-page', 'keyword', row.name);
                }
            },
            cellStyle (row) {
                switch (row.column.label) {
                    case "作者":
                    case "关键词":
                        return 'font-size: 20px;line-height:26px;text-align:center;cursor: pointer;';
                    case "机构":
                        return 'color: rgba(0, 0, 0, 0.65);font-size:20px;text-align:center;cursor: pointer;';
                    case "文章数":
                        return 'font-size:18px;text-align:center;color: rgba(0, 0, 0, 0.65);';
                }
            }
        }
    };
</script>

<style lang="less">
    .card-head-title {
        font-size: 24px;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
    }

    .el-card {
        border: 1px solid #f8f8f8;
        border-radius: 4px;
        overflow: auto;

        .el-card__body {
            padding: 10px;

            .el-table__row {
                height: 100px;
            }
        }

        .has-gutter tr th div {
            text-align: center;
        }

        .el-table--enable-row-hover .el-table__body tr:hover > td {
            background: #e9f8f9;
            border: 1px solid #f0f1ff;
            box-shadow: 0 0 1px 1px #ffffff, inset 0 0 10px 5px #f2fcf8;
        }
    }
</style>
