<template>
    <el-card shadow="always" :loading="loading">
        <div class="card-head-title" slot="header">{{title}}</div>

        <el-table :data="authorList"
                  stripe
                  style="width: 100%"
                  @cell-click="openAuthor"
                  :cell-style="cellStyle"
                  v-if="searchType===1">
            <el-table-column min-width="10%">
                <el-avatar icon="el-icon-user-solid" size="small" fit="fit"/>
            </el-table-column>
            <el-table-column min-width="30%" sortable prop="name" label="作者"/>
            <el-table-column min-width="40%" sortable prop="affiliationName" label="机构"/>
            <el-table-column min-width="20%" sortable prop="publishNum" label="文章数"/>
        </el-table>

        <el-table :data="wordList"
                  stripe
                  style="width: 100%"
                  @cell-click="openTerm"
                  :cell-style="cellStyle"
                  v-else-if="searchType===2">
            <el-table-column min-width="70%" sortable prop="name" label="关键词"/>
            <el-table-column min-width="20%" sortable prop="hot" label="文章数"/>
        </el-table>
    </el-card>
</template>

<script>
    const limit = 8;
    /**
     * @description 推荐内容卡片，根据参数决定需要展示的内容
     * @param {String} title 标题
     * @param {Number} searchType 推荐类型<br/>- 1: 显示作者的推荐信息<br/>- 2: 显示关键词的推荐信息
     * @event open-page 根据用户点击打开对应详情页面<br/>- String: 要打开的页面类型[affiliation, author, keyword]<br/>- Number: 相应的id
     * @version 1.0
     * @author dwxh
     */
    export default {
        name: "HotCard",
        created () {
            this.getData();
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
            },
            searchType: Number
        },
        methods: {
            getData () {
                switch (this.searchType) {
                    case 1: {
                        this.$get("/statistics/maxPublishAuthor", {
                            num: limit
                        })
                            .then(r => {
                                if (r.data.status) {
                                    this.authorList = r.data.result;
                                } else {
                                    this.authorList = [];
                                }
                            })
                            .catch(e => {
                                this.authorList = [];
                            });
                        break;
                    }
                    case 2: {
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
                        break;
                    }
                    default:
                        break
                }
            },
            openAuthor (row, col) {
                if (col.label === "机构") {
                    this.$emit("open-page", "affiliation", row.affiliationId);
                    return;
                }
                if (col.label === "作者") {
                    this.$emit("open-page", "author", row.id);
                }
            },
            openTerm (row, col) {
                if (col.label === "关键词") {
                    this.$emit("open-page", "keyword", row.id);
                }
            },
            cellStyle (row) {
                switch (row.column.label) {
                    case "作者":
                    case "关键词":
                        return "font-size: 20px;line-height:26px;text-align:center;cursor: pointer;";
                    case "机构":
                        return "color: rgba(0, 0, 0, 0.65);font-size:20px;text-align:center;cursor: pointer;";
                    case "文章数":
                        return "font-size:18px;text-align:center;color: rgba(0, 0, 0, 0.65);";
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
</style>
