<template>
    <div style="padding:0 15%">
        <el-row type="flex" justify="space-between">
            <el-col :span="20">
                <el-autocomplete style="width:100%"
                                 popper-class="my-autocomplete"
                                 v-model="queryWord"
                                 :fetch-suggestions="searchSuggest"
                                 placeholder="开始您的学术探索之旅"
                                 clearable
                                 class="input-with-select"
                                 @clear="clearSearch"
                                 @keyup.enter.native="doSimpleSearch(getSelect(),queryWord)">

                    <el-select v-model="select" slot="prepend">
                        <el-option v-for="(item, index) in selectItems" :key="index" :value="item"/>
                    </el-select>

                    <el-button :loading="loading"
                               slot="append"
                               type="primary"
                               icon="el-icon-search"
                               @click="doSimpleSearch(getSelect(),queryWord)"/>

                    <template slot-scope="{ item }">
                        <div class="name">
                            <i class="el-icon-caret-right icon"></i>
                            {{ item.value }}
                        </div>
                    </template>

                </el-autocomplete>
            </el-col>

            <el-col :span="3">
                <ad-search-box @doAdvancedSearch="doAdvancedSearch"/>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import AdSearchBox from "./AdvanceSearchBox";
    import db from "@/utils/localstorage";

    /**
     * @description 检索框，引入了高级检索框
     * @see AdSearchBox
     * @event do-search 用户点击检索按钮<br/>- json: 检索条件
     * @version 1.0
     * @author dwxh
     * @example
     * <search-box @do-search="doSearchFunction"/>
     */
    export default {
        name: "SearchBox",
        data: function () {
            return {
                loading: false,
                recommends: [],
                queryWord: db.get("SEARCH_WORD", ""),
                select: "全选",
                selectItems: ["全选", "作者", "标题", "摘要", "机构", "DOI", "关键词"]
            };
        },
        mounted () {
            // TODO: 1.推荐，或者考虑删除
            this.recommends = this.loadAll();
        },
        components: {
            AdSearchBox
        },
        methods: {
            getSelect () {
                const labelsMap = {
                    全选: "all",
                    作者: "author_name",
                    标题: "title",
                    摘要: "paper_abstract",
                    机构: "affiliation_name",
                    DOI: "doi",
                    关键词: "term"
                };
                let query = this.select;
                return labelsMap[query];
            },
            doSimpleSearch (queryType, queryString) {
                if (queryString !== "") {
                    db.save('SEARCH_WORD', queryString);
                    this.notifySearch(queryType, queryString);
                } else {
                    this.$message({
                        showClose: true,
                        message: "警告：您尚未输入有效搜索信息",
                        type: "warning"
                    });
                }
            },
            doAdvancedSearch (params) {
                this.notifySearch('advanced', params);
            },
            notifySearch (queryType, queryField) {
                // 统一处理两种搜索
                let params = queryField;
                if (queryType !== 'advanced') {
                    let par = {};
                    par[queryType] = queryField;
                    params = par;
                }
                params.type = queryType;
                this.$emit('do-search', params);
            },
            createFilter (queryString) {
                return recommend => {
                    return (
                        recommend.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                    );
                };
            },
            clearSearch () {
                db.remove("SEARCH_WORD");
            },
            // TODO: 1.推荐，或者考虑删除
            searchSuggest (queryString, callback) {
                let recommends = this.recommends;
                let results = queryString
                    ? recommends.filter(this.createFilter(queryString))
                    : recommends;
                callback(results);
            },
            // TODO: 1.推荐，或者考虑删除
            loadAll () {
                return [
                    {id: 1, value: "Literature Review"},
                    {id: 2, value: "Artificial Intelligence"},
                    {id: 3, value: "Big Data"},
                    {id: 4, value: "Block Chain"},
                    {id: 5, value: "Cloud Computing"},
                    {id: 6, value: "Automatic Software Testing"},
                    {id: 7, value: "Nanjing University"},
                    {id: 8, value: "Python"}
                ];
            }
        }
    };
</script>
<style lang="less">
    [role] > .el-input .el-input-group__prepend {
        background-color: #fff;
        width: 100px;
    }

    [popperclass] {
        font-size: 22px;
    }
</style>
