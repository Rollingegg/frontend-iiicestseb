<template>
    <div>
        <search-box @do-search="doSearch"></search-box>

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
                <paper-list :keyword="searchParams"></paper-list>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import GlobalNav from '../common/GlobalNavigator';
    import GlobalFooter from '../common/GlobalFooter';
    import SearchBox from '../searchInput/SearchBox';
    import LCard from '@/components/Article/LiteratureCard';
    import PaperList from '../author/PaperListPage';
    import moment from "moment";

    export default {
        name: 'ResPage',
        data: function () {
            return {
                loading: true,
                resList: [],
                queryType: '',
                queryString: '',
                noResult: false,
                startYear: '2010',
                endYear: '2019',
                searchParams: {}
            };
        },
        computed: {
            paperCount: function () {
                return this.resList == null ? 0 : this.resList.length;
            }
        },
        components: {
            GlobalNav,
            GlobalFooter,
            SearchBox,
            LCard,
            PaperList
        },
        methods: {
            handleFilter () {
                if (this.endYear < this.startYear) {
                    this.$message({
                        showClose: true,
                        message: '请选择正确的年份范围',
                        type: 'warning'
                    });
                } else {
                    let newSearchParam = JSON.parse(JSON.stringify(this.searchParams));
                    newSearchParam['start_year'] = moment(new Date(this.startYear,0,1)).format("YYYY-MM-DD");
                    newSearchParam['end_year'] = moment(new Date(this.endYear,11,31)).format("YYYY-MM-DD");
                    this.searchParams = newSearchParam;
                }
            },
            doSearch (params) {
                this.searchParams = params;
            },
            reset () {
                let newSearchParam = JSON.parse(JSON.stringify(this.searchParams));
                newSearchParam['start_year'] = null;
                newSearchParam['end_year'] = null;
                this.searchParams = newSearchParam;
            }
        },
        created () {
            this.searchParams = JSON.parse(this.$route.query.search_condition);
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
