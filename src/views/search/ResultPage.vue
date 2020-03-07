<template>
    <el-container>
        <global-nav></global-nav>
        <el-main>
            <el-container>
                <el-aside width="200px" >
                    <el-row type="flex" justify="space-between" align="middle">
                        <el-col :span="8"><h1 style="color:white;margin: 6px 0">Filter By</h1></el-col>
                        <el-col :span="6"><el-button type="text" icon="el-icon-search" >过滤</el-button></el-col>
                    </el-row>
                    <el-card shadow="hover">
                        <div slot="header" class="clearfix">发表时间</div>
                        <el-date-picker
                        v-model="startYear"
                        type="year"
                        clearable
                        text="起始年份"
                        style="width: 150px;">
                        </el-date-picker>
                        <div style="text-align: center">至</div>
                        <el-date-picker
                        v-model="endYear"
                        type="year"
                        clearable
                        text="截止年份"
                        style="width: 150px;">
                        </el-date-picker>
                    </el-card>
                </el-aside>
                <el-container>
                    <el-main>
                        <search-box/>
                        <res-lister></res-lister>
                    </el-main>
                    <el-footer></el-footer>
                </el-container>
            </el-container>
        </el-main>
        <el-footer>
            <global-footer :copyright="copyright"/>
        </el-footer>
    </el-container>
</template>

<script>
    import GlobalNav from '../common/GlobalNavigator';
    import GlobalFooter from '../common/GlobalFooter';
    import SearchBox from '../searchInput/SearchBox';
    import ResLister from './ResLiter';

    export default {
        name: 'ResPage',
        data: function () {
            return {
                resList: [],
                startYear: '1970',
                endYear: '2020'
            };
        },
        computed: {
            copyright () {
                return this.$store.state.setting.copyright;
            }
        },
        components: {
            GlobalNav,
            GlobalFooter,
            SearchBox,
            ResLister
        }
    };
</script>

<style>
    .el-container {
        background: url("../../../static/img/Large-Triangles.svg");
    }
    .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

</style>
