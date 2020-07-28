<template>
    <div class="rank-container" v-loading="loading">
        <div class="rank-list">
            <div class="rank-list-title">
                <div class="rank-experts-card-row1">
                    <span class="rank-experts-card-text">前三按 h-index</span>
                </div>
                <div class="rank-experts-card-row2"><span class="rank-experts-card-text">h-index</span></div>
                <div class="rank-experts-card-row3"><span class="rank-experts-card-text">排名</span></div>
            </div>
            <rank-author-item v-for="(v,i) in hIndexData" :key="i" :author-info="v" :rank="i+1"/>
        </div>
        <div class="rank-list">
            <div class="rank-list-title">
                <div class="rank-experts-card-row1">
                    <span class="rank-experts-card-text">前三按 g-index</span>
                </div>
                <div class="rank-experts-card-row2"><span class="rank-experts-card-text">g-index</span></div>
                <div class="rank-experts-card-row3"><span class="rank-experts-card-text">排名</span></div>
            </div>
            <rank-author-item v-for="(v,i) in gIndexData" :key="i" :author-info="v" :rank="i+1"/>
        </div>
        <div class="rank-list">
            <div class="rank-list-title">
                <div class="rank-experts-card-row1">
                    <span class="rank-experts-card-text">前三按 平均被引</span>
                </div>
                <div class="rank-experts-card-row2"><span class="rank-experts-card-text">平均被引</span></div>
                <div class="rank-experts-card-row3"><span class="rank-experts-card-text">排名</span></div>
            </div>
            <rank-author-item v-for="(v,i) in citationData" :key="i" :author-info="v" :rank="i+1"/>
        </div>
        <div class="rank-list">
            <div class="rank-list-title">
                <div class="rank-experts-card-row1">
                    <span class="rank-experts-card-text">前三按 论文数</span>
                </div>
                <div class="rank-experts-card-row2"><span class="rank-experts-card-text">论文数</span></div>
                <div class="rank-experts-card-row3"><span class="rank-experts-card-text">排名</span></div>
            </div>
            <rank-author-item v-for="(v,i) in paperData" :key="i" :author-info="v" :rank="i+1"/>
        </div>
        <div class="rank-list">
            <div class="rank-list-title">
                <div class="rank-experts-card-row1">
                    <span class="rank-experts-card-text">前三按 Sociability</span>
                </div>
                <div class="rank-experts-card-row2"><span class="rank-experts-card-text">社交性</span></div>
                <div class="rank-experts-card-row3"><span class="rank-experts-card-text">排名</span></div>
            </div>
            <rank-author-item v-for="(v,i) in socialData" :key="i" :author-info="v" :rank="i+1"/>
        </div>
    </div>
</template>

<script>
    import RankAuthorItem from "@/components/rank/RankAuthorItem";

    export default {
        name: "ExpertsRankOverview",
        components: {
            RankAuthorItem
        },
        data(){
            return {
                loading: true,
                hIndexData: [],
                gIndexData: [],
                citationData: [],
                paperData: [],
                socialData: []
            }
        },
        mounted() {
          this.fetchRankData()
        },
        methods:{
            async fetchRankData(){
                this.loading=true
                try {
                    const r=await this.$post('rank/overview',{})
                    // console.log(r)
                    if(r.data.status){
                        this.hIndexData=r.data.result.hrank.authorRankDataVOList
                        this.gIndexData=r.data.result.grank.authorRankDataVOList
                        this.citationData=r.data.result.avgCiteRank.authorRankDataVOList
                        this.paperData=r.data.result.paperNumRank.authorRankDataVOList
                        this.socialData=r.data.result.sociabilityRank.authorRankDataVOList
                    }else{
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                }catch (e) {
                    this.$message({
                        showClose: true,
                        message: e,
                        type: "warning"
                    });
                }
                this.loading=false
            }
        }
    }
</script>

<style scoped lang="less">
    .rank-container {
        .rank-list {
            margin-bottom: 20px;
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
