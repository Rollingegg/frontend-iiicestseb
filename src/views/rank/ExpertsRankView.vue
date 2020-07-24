<template>
    <div class="rank-container">
        <div class="rank-list">
            <div class="rank-list-title">
                <div class="rank-experts-card-row1">
                    <span class="rank-experts-card-text"></span>
                </div>
                <div class="rank-experts-card-row2"><span class="rank-experts-card-text">h-index</span></div>
                <div class="rank-experts-card-row3"><span class="rank-experts-card-text">排名</span></div>
            </div>
            <rank-author-item v-for="(v,i) in rankList" :key="i" :author-info="v"/>
        </div>
        <el-pagination background
                       :hide-on-single-page="true"
                       @current-change="handleCurrentChange"
                       layout="prev, pager, next, jumper"
                       :page-size="20"
                       :current-page="pageNum+1"
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
                loading: true
            }
        },
        computed: {
            ...mapState({
                rankList: state => state.rank.currentRankList,
                rankType: state => state.rank.currentRankType,
                pageNum: state => state.rank.currentPageNum,
                total: state => state.rank.currentTotalNum
            })
        },
        mounted() {
            this.setRankType(this.$route.params.rankType);
            this.getRankList()
        },
        beforeRouteUpdate(to, from, next) {
            this.setRankType(to.params.rankType);
            this.getRankList();
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
                this.setPageNum(val-1)
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

