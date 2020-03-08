<template>
    <div style="margin-top: 15px;padding:0 15%">
        <el-row type="flex" justify="space-between">
            <el-col :span="20">
        <el-autocomplete
            style="width:100%"
            popper-class="my-autocomplete"
            v-model="state"
            :fetch-suggestions="searchSuggest"
            placeholder="开始您的学术探索之旅"
            highlight-first-item
            clearable
            class="input-with-select"
            @keyup.enter.native ="doSearch(getSelect(),state)"
        >
            <el-select v-model="select" slot="prepend" >
                <el-option v-for="(item, index) in items" :key="index" :value="item.label"></el-option>
            </el-select>

            <el-button :loading="loading" slot="append" type="primary" icon="el-icon-search" @click="doSearch(getSelect(),state)"></el-button>

            <template slot-scope="{ item }">
                <div class="name">
                    <i class="el-icon-caret-right icon"></i>
                    {{ item.value }}
                </div>
            </template>
        </el-autocomplete>
            </el-col>
            <el-col :span="3">
        <ad-search-box v-on:refresh="refresh"/>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import AdSearchBox from './AdSearchBox';
    import db from '../../utils/localstorage';

    export default {
        name: 'SearchBox',
        data: function () {
            return {
                loading: false,
                recommends: [],
                state: String(db.get('SEARCH_WORD')) === '[object Object]' ? '' : db.get('SEARCH_WORD'),
                select: '全选',
                items: [
                    {
                        label: '全选'
                    },
                    {
                        label: '作者'
                    },
                    {
                        label: '标题'
                    },
                    {
                        label: '摘要'
                    },
                    {
                        label: '机构'
                    },
                    {
                        label: 'DOI'
                    },
                    {
                        label: '关键词'
                    }]
            };
        },
        methods: {
            getSelect () {
                let query = this.select;
                switch (query) {
                    case '全选':
                        return 'all';
                    case '作者':
                        return 'author_name';
                    case '标题' :
                        return 'paper_title';
                    case '摘要' :
                        return 'paper_abstract';
                    case '机构':
                        return 'affiliation_name';
                    case 'DOI':
                        return 'doi';
                    case '关键词':
                        return 'term';
                }
            },
            doSearch (queryType, queryString) {
                if (this.state !== '') {
                    this.loading = true;
                    db.save('SEARCH_WORD', queryString);
                    this.$get('search/simple', {
                        type: queryType,
                        keyword: queryString
                    }).then((r) => {
                        if (r.data.status) {
                            db.save('RESULT', r.data.result);
                            setTimeout(() => {
                                this.loading = false;
                            }, 500);
                            if (this.$router.app.$route.path !== '/searchRes') {
                                this.$router.push('/searchRes');
                            } else {
                                this.$emit('refresh');
                            }
                        } else {
                            this.$message({
                                showClose: true,
                                message: r.data.result,
                                type: 'warning'
                            });
                        }
                    }).catch((e) => {
                        this.$message({
                            showClose: true,
                            message: e,
                            type: 'warning'
                        });
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: '警告：您尚未输入有效搜索信息',
                        type: 'warning'
                    });
                }
            },
            // TODO: 1.推荐，或者考虑删除
            searchSuggest (queryString, callback) {
                let recommends = this.recommends;
                let results = queryString
                    ? recommends.filter(this.createFilter(queryString))
                    : recommends;
                callback(results);
            },
            createFilter (queryString) {
                return recommend => {
                    return (
                        recommend.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                    );
                };
            },
            // TODO: 1.推荐，或者考虑删除
            loadAll () {
                return [
                    {id: 1, value: 'Literature Review'},
                    {id: 2, value: 'Artificial Intelligence'},
                    {id: 3, value: 'Big Data'},
                    {id: 4, value: 'Block Chain'},
                    {id: 5, value: 'Cloud Computing'},
                    {id: 6, value: 'Automatic Software Testing'},
                    {id: 7, value: 'Nanjing University'},
                    {id: 8, value: 'Python'}
                ];
            },
            handleSelect (item) {
                console.log(item);
            },
            handleIconClick (ev) {
                console.log(ev);
            },
            refresh () {
                this.$emit('refresh');
            }
        },
        mounted () {
            // TODO: 1.推荐，或者考虑删除
            this.recommends = this.loadAll();
        },
        components: {
            AdSearchBox
        }
    };
</script>
<style>
    .my-autocomplete {
        width: 70%;
    }

    .my-autocomplete li {
        line-height: normal;
        padding: 7px;
    }

    .my-autocomplete li .name {
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .my-autocomplete li .icon {
        color: #b4b4b4;
        margin-right: 5px;
    }
    .input-with-select .el-input-group__prepend {
    background-color: #fff;
    width:80px
    }
</style>
