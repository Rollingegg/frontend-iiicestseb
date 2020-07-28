<template>
    <div>
        <div style="font-size: 28px">科研人员排名</div>
        <el-menu :default-active="this.$route.params.rankType||'overview'" mode="horizontal" @select="handleSelect">
            <el-menu-item index="overview">全部</el-menu-item>
            <el-menu-item index="H_INDEX">H-index</el-menu-item>
            <el-menu-item index="G_INDEX">G-index</el-menu-item>
            <el-menu-item index="AVG_CITE"><i class="fa fa-hashtag" aria-hidden="true">Citations</i></el-menu-item>
            <el-menu-item index="PAPER_NUM"><i class="fa fa-hashtag" aria-hidden="true">Papers</i></el-menu-item>
            <el-menu-item index="SOCIABILITY">Sociability</el-menu-item>
        </el-menu>
        <el-row :gutter="20" style="margin-top: 20px">
            <el-col :md="16">
                <router-view/>
            </el-col>
            <el-col :md="8">
                <el-card>
                    <div slot="header" style="font-size: 20px;text-align: center">HELP</div>
                    <div>
                        <div style="font-size: 16px;font-weight: 700">Experts' Statistics</div>
                        <p>We calculate several features of authors, including h-index, G-Index, Average
                            citation number, Total paper number and Sociability. With the help of <a
                                    href="http://spark.apache.org/" target="_blank">spark</a> , We calculate <em
                                    style="color: #a94442; font-weight: 700">Sociability</em> by Algorithm <strong>Page
                                Rank</strong>. </p>
                        <a href="https://www.aminer.cn/ranks/ranks-res-help" target="_blank">please click
                            here.</a>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ExpertsRank",
        methods: {
            handleSelect(key) {
                if (`/rank/experts/${key}`!==this.$route.path) {
                    if (key!=='overview') {
                        this.$router.push({name: 'ExpertsRankViewPage', params: {rankType: key}});
                    } else {
                        this.$router.push({name: 'ExpertsRankOverviewPage'})
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
