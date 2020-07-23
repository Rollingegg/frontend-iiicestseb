<template>
    <div>
        <div style="font-size: 28px">科研人员排名</div>
        <el-menu :default-active="$route.path" mode="horizontal" @select="handleSelect">
            <el-menu-item index="/rank/experts">全部</el-menu-item>
            <el-menu-item index="/rank/experts/h-index">H-index</el-menu-item>
            <el-menu-item index="/rank/experts/g-index">G-index</el-menu-item>
            <el-menu-item index="/rank/experts/citation">Citation</el-menu-item>
            <el-menu-item index="/rank/experts/paper">Paper</el-menu-item>
            <el-menu-item index="/rank/experts/sociability">Sociability</el-menu-item>
            <el-menu-item index="/rank/experts/diversity">Diversity</el-menu-item>
        </el-menu>
        <el-row :gutter="20" style="margin-top: 20px">
            <el-col :md="16">
                <router-view/>
            </el-col>
            <el-col :md="8">
                <el-card >
                    <div slot="header" style="font-size: 20px;text-align: center">HELP</div>
                    <div>
                        <div style="font-size: 16px;font-weight: 700">Experts' Statistics</div>
                        <p>We calculate several features of authors, including h-index: , A-Index, G-Index, Total
                            citation number, Diversity, Sociability, Activity, New Star and Rising Star. <a
                                    href="https://www.aminer.cn/ranks/ranks-res-help" target="_blank">please click
                                here.</a></p>
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
                if (key!==this.$route.path) {
                    this.$router.push(key);
                }
            }
        }
    }
</script>

<style scoped>

</style>
