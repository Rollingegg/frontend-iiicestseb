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

    /**
     * @description 最近发表文章列表
     * @param {Array} recentPapers 最近发表文章
     * @version 1.0
     * @author dwxh
     * @event clickArticle 点击文章，跳转到文章详情页面<br/>- {Number} 文章id
     */
    export default {
        name: "RecentPaperList",
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
