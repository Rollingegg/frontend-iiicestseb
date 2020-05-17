<template>
    <div>
        <el-container>
            <el-aside width="auto" style="padding:20px">
                <div class="one-line">
                    <div>选择过滤条件</div>
                    <el-link type="primary" icon="el-icon-remove-outline" @click="reset">重置</el-link>
                </div>
                <el-card>
                    <div slot="header" class="clearfix">发表时间</div>
                    <el-date-picker v-model="startYear" type="year" clearable text="起始年份" value-format="yyyy"/>
                    <div style="text-align: center;padding-top: 10px;padding-bottom: 10px;">至</div>
                    <el-date-picker v-model="endYear" type="year" clearable text="截止年份" value-format="yyyy"/>
                    <div style="text-align:center;margin: 16px 6px">
                        <el-button icon="el-icon-s-promotion" type="primary" @click="handleFilter">在结果中过滤</el-button>
                    </div>
                </el-card>
            </el-aside>

            <el-main>
                <paper-list :keyword="searchParams" :isById="false"/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import PaperList from '@/components/paper/PaperListWrapper';

    const initStartYear = '2010';
    const initEndYear = '2020';
    /**
     * @description 搜索结构的展示页面框架，使用PaperList组件进行具体展示
     * @see PaperList
     * @event showWelcome 该页面不需要展示欢迎信息<br/>- false
     * @version 1.0
     * @author dwxh
     */
    export default {
        name: 'SearchResult',
        data: function () {
            return {
                loading: true,
                resultList: [],
                queryType: '',
                queryString: '',
                noResult: false,
                startYear: initStartYear,
                endYear: initEndYear,
                searchParams: {}
            };
        },
        computed: {
            paperCount: function () {
                return this.resultList == null ? 0 : this.resultList.length;
            }
        },
        components: {
            PaperList
        },
        watch: {
            $route: "refreshData"
        },
        created () {
            this.refreshData();
            this.$emit('showWelcome', false);
        },
        methods: {
            refreshData () {
                this.searchParams = JSON.parse(this.$route.query.search_condition);
            },
            handleFilter () {
                if (this.endYear < this.startYear) {
                    this.$message({
                        showClose: true,
                        message: '请选择正确的年份范围',
                        type: 'warning'
                    });
                } else {
                    let newSearchParam = JSON.parse(JSON.stringify(this.searchParams));
                    newSearchParam['start_year'] = this.startYear;
                    newSearchParam['end_year'] = this.endYear;
                    newSearchParam['page'] = 0;
                    this.searchParams = newSearchParam;
                }
            },
            reset () {
                this.startYear = initStartYear;
                this.endYear = initEndYear;
                let newSearchParam = JSON.parse(JSON.stringify(this.searchParams));
                newSearchParam['start_year'] = initStartYear;
                newSearchParam['end_year'] = initEndYear;
                this.searchParams = newSearchParam;
            }
        }
    };
</script>

<style>
    .one-line {
        display: flex;
        height: 35px;
        -webkit-box-pack: justify;
        justify-content: space-between;
        line-height: 35px;
        font-size: 15px;
    }

    .paper-count {
        margin: 0 4px;
        font-size: 20px;
        color: rgba(0, 0, 0, 0.65);
    }

    .no-info {
        background: white;
        text-align: center;
        font-size: 30px;
        display: flex;
        flex-direction: column;
    }

    .no-info .no-data {
        align-self: center;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both;
    }
</style>
