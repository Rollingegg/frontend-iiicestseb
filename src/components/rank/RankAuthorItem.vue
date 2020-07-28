<template>
    <div class="rank-experts-card">
        <div class="rank-experts-card-row1">
            <div class="rank-experts-card-img-box">
                <el-avatar shape="square" :size="90" fit="fill" src="\static\img\avatar_default.jpg"></el-avatar>
            </div>
            <div class="rank-experts-card-content">
                <el-link class="rank-experts-card-author-name"
                         :href="`/authorDetail?id=${authorInfo.id}`"
                         :underline="false">{{authorInfo.name}}</el-link>
                <div class="rank-experts-card-stat-line" v-if="authorInfo.hIndex">
                    <span class="rank-experts-card-stat-des"><em>h</em>-index：</span>
                    <span>{{authorInfo.hIndex}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="rank-experts-card-stat-des">论文数：</span>
                    <span>{{authorInfo.paperNum}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="rank-experts-card-stat-des">引用数：</span>
                    <span>{{authorInfo.references}}</span>
                </div>
                <div>
                    <el-link :underline="false"
                             :href="`/affiliationDetail?id=${authorInfo.affiliationId}`"
                             icon="el-icon-school">
                        {{authorInfo.affiliationName}}
                    </el-link>
                </div>
                <div>
                    <el-button size="mini"
                               type="primary"
                               v-for="(keyword, index) in authorInfo.keywords"
                               :key="index"
                               style="margin:5px">
                        {{keyword}}
                    </el-button>
                </div>
            </div>
        </div>
        <div class="rank-experts-card-row2">{{authorInfo.value}}</div>
        <div class="rank-experts-card-row3">{{rank}}</div>
    </div>
</template>

<script>
    export default {
        name: "RankAuthorItem",
        props: {
            authorInfo: Object,
            rank: Number
        }
    }
</script>

<style scoped lang="less">
    .rank-experts-card {
        border-bottom: 1px dashed #eee;
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        width: 100%;

        .rank-experts-card-row1 {
            flex-grow: 1;
            text-align: left;
            display: flex;
            width: calc(100% - 260px);

            .rank-experts-card-img-box {
                margin-right: 20px;
            }

            .rank-experts-card-content {
                text-align: left;

                .rank-experts-card-author-name {
                    font-size: 20px;
                    margin-bottom: 5px;
                }

                .rank-experts-card-stat-line {
                    margin: 5px 0;

                    .rank-experts-card-stat-des {
                        color: #a94442;
                        font-weight: 700;
                    }
                }
            }
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
</style>
