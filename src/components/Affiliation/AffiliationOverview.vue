<template>
    <el-card>
        <div slot="header">Statistics</div>
        <div class="statistic-container">
            <el-row :gutter="10">
                <el-col :md="12">
                    <div class="statistic-card">
                        <div class="statistic-content">
                            <div class="statistic-num">{{baseInfo.paperNum}}</div>
                            <div class="statistic-type">Publications</div>
                        </div>
                        <div class="statistic-icon">
                            <el-icon class="el-icon-document"/>
                        </div>
                    </div>
                </el-col>

                <el-col :md="12">
                    <div class="statistic-card">
                        <div class="statistic-content">
                            <div class="statistic-num">{{baseInfo.authorNum}}</div>
                            <div class="statistic-type">Members</div>
                        </div>
                        <div class="statistic-icon">
                            <el-icon class="el-icon-user-solid"/>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "AffiliationOverviewPane",
        props: {
            baseInfo: {}
        }
    }
</script>
<style lang="less" scoped>
    @statistic-font-size: 20px;
    @border-color: #ebeef5;
    .statistic-container {
        padding: 8px;

        .statistic-card {
            border: 1px solid @border-color;
            padding: 20px;
            display: flex;
            align-items: center;
            background-color: @border-color;

            .statistic-content {
                align-items: flex-start;
                flex: 3;

                .statistic-num {
                    font-size: @statistic-font-size;
                    margin-bottom: 10px;
                }

                .statistic-type {
                    font-size: 14px;
                }
            }

            .statistic-icon {
                display: flex;
                flex: 1;
                justify-content: flex-end;
            }
        }
    }

</style>
