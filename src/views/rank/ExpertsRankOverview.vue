<template>
    <div class="rank-container">
        <div class="rank-list">
            <div class="rank-list-title">
                <div class="rank-experts-card-row1">
                    <span class="rank-experts-card-text">前三按 h-index</span>
                </div>
                <div class="rank-experts-card-row2"><span class="rank-experts-card-text">h-index</span></div>
                <div class="rank-experts-card-row3"><span class="rank-experts-card-text">排名</span></div>
            </div>
            <rank-author-item v-for="(v,i) in Array(3).fill(0)" :key="i"/>
        </div>
    </div>
</template>

<script>
    import RankAuthorItem from "@/components/rank/RankAuthorItem";

    export default {
        name: "ExpertsRankOverview",
        components: {
            RankAuthorItem
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
