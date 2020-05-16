<template>
    <el-card>
        <div slot="header">Recent Papers</div>
        <div class="recent-paper-container">
            <div class="recent-paper-item" v-for="(paper, index) in recentPapers" :key="index">
                <el-link type="primary" @click="clickArticle(paper.id)">
                    {{paper.title}}
                </el-link>
                <el-link icon="el-icon-date" :underline="false">
                    {{String(paper.chronDate).substr(0,4)}}
                </el-link>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "RecentPaper",
        props: {
            recentPapers: Array
        },
        methods: {
            clickArticle (id) {
                this.$emit("clickArticle", id);
            }
        }
    }
</script>

<style scoped>

</style>
