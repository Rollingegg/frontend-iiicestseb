<template>
    <el-card shadow="always">
        <div class="rec-paper-header">
            <div class="rec-paper-title">Recommended Papers</div>
            <el-link type="primary" @click="viewMore" class="paper-title">
                {{showSize===3?'View More':'Pack Up'}}
            </el-link>
        </div>
        <div v-for="(item, index) in papers.slice(0,showSize)" :key="index" class="paper-item">
            <el-link type="primary" class="paper-title">{{item.title}}</el-link>
            <div>Keywords: <span>{{item.authorKeywords}}</span></div>
            <mul-wrapper :index=item.id :content=item.paperAbstract />
            <div>Published: <span>{{String(item.chronDate).substr(0,4)}}</span></div>
        </div>
    </el-card>
</template>

<script>
    import MulWrapper from '../common/MultipleLines';

    /**
     * @description 相关文章推荐
     * @param {Array} papers 相关文章
     * @version 1.0
     * @author dwxh
     * @see MulWrapper 显示多行内容
     */
    export default {
        name: 'PaperRecommendation',
        components: {
            MulWrapper
        },
        data () {
            return {
                showSize: 3
            }
        },
        props: {
            papers: Array
        },
        methods: {
            viewMore () {
                this.showSize = (this.showSize === this.papers.length ? 3 : this.papers.length);
            }
        }
    }
</script>

<style lang="less" scoped>
    .paper-title {
        font-size: 18px;
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .rec-paper-header {
        display: flex;
        justify-content: space-around;

        .rec-paper-title {
            font-size: 18px;
            line-height: 30px;
        }
    }

    .paper-item {
        border-top: 1px solid #f5f5f5;
        margin: 10px 0;
    }
</style>>
