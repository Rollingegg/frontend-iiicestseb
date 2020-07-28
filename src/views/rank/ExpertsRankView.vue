<template>
    <div class="rank-container">
        <div class="rank-list">
            <div class="rank-list-title" v-loading="loading">
                <div class="rank-experts-card-row1">
                    <span class="rank-experts-card-text"></span>
                </div>
                <div class="rank-experts-card-row2"><span class="rank-experts-card-text">{{statisticsTitle}}</span></div>
                <div class="rank-experts-card-row3"><span class="rank-experts-card-text">排名</span></div>
            </div>
            <rank-author-item v-for="(v,i) in rankList" :key="i" :author-info="v" :rank="i+1+(pageNum-1)*pageSize"/>
        </div>
        <el-pagination background
                       :hide-on-single-page="true"
                       @current-change="handleCurrentChange"
                       layout="prev, pager, next, jumper"
                       :page-size="pageSize"
                       :current-page="pageNum"
                       :total="total"></el-pagination>
    </div>
</template>

<script>
    import RankAuthorItem from "@/components/rank/RankAuthorItem";
    import {mapState, mapActions, mapMutations} from 'vuex'

    export default {
        name: "ExpertsRankView",
        components: {
            RankAuthorItem
        },
        data() {
            return {
                loading: true,
                pageSize: 20
            }
        },
        computed: {
            ...mapState({
                rankList: state => state.rank.currentRankList,
                rankType: state => state.rank.currentRankType,
                pageNum: state => state.rank.currentPageNum,
                total: state => state.rank.currentTotalNum
            }),
            statisticsTitle(){
                if(!this.rankType){
                    return ''
                }
                const dict={
                    "H_INDEX": "h-index",
                    "G_INDEX": "g-index",
                    "AVG_CITE": "平均被引",
                    "PAPER_NUM": "论文数",
                    "SOCIABILITY": "社交性",
                }
                return dict[this.rankType]
            }
        },
        async mounted() {
            this.setRankType(this.$route.params.rankType);
            this.loading=true
            await this.getRankList()
            this.loading=false
        },
        async beforeRouteUpdate(to, from, next) {
            this.setRankType(to.params.rankType);
            this.loading=true
            await this.getRankList()
            this.loading=false
            next();
        },
        methods: {
            ...mapMutations({
                setRankType: 'rank/set_currentRankType',
                setPageNum: 'rank/set_currentPageNum'
            }),
            ...mapActions({
                getRankList: "rank/getRankList"
            }),
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.setPageNum(val)
                this.getRankList()
            }
        }
    }
</script>

<style scoped lang="less">
    .rank-container {
        .rank-list {
            .rank-list-title {
                display: flex;
                justify-content: space-between;
                width: 100%;

                .rank-experts-card-row1 {
                    flex-grow: 1;
                    text-align: left;
                    width: calc(100% - 260px);
                }

                .rank-experts-card-row2 {
                    min-width: 100px;
                    max-width: 100px;
                    font-size: 24px;
                    line-height: 33px;
                    font-weight: 300;
                    text-align: center;
                }

                .rank-experts-card-row3 {
                    min-width: 60px;
                    max-width: 60px;
                    font-size: 24px;
                    line-height: 33px;
                    font-weight: 300;
                    text-align: center;
                }
            }
        }
    }

    .rank-experts-card-text {
        font-size: 24px;
        line-height: 27px;
        border-bottom: 2px solid #428bca;
    }
</style>

