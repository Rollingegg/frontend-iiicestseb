<template>
<div class="overview-container">
  <el-row :gutter="15">
    <el-col :md="16">
    <el-card>
        <div slot="header">About {{authorName}}</div>
        <div class="statistic-container">
            <el-row :gutter="10">
                <el-col :md="12">
                    <div class="statistic-card">
                    <div class="statistic-content">
                        <div class="statistic-num">
                            {{paperCount}}
                        </div>
                        <div class="statistic-type">
                            Total Published Papers
                        </div>
                    </div>
                    </div>
                </el-col>
                <el-col :md="12">
                    <div class="statistic-card">
                    <div class="statistic-content">
                        <div class="statistic-num">
                            {{paperCount}}
                        </div>
                        <div class="statistic-type">
                            Citations
                        </div>
                    </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="statistic-container">
            <el-row :gutter="10">
                <el-col :md="12">
                    <div class="statistic-card">
                    <div class="statistic-content">
                        <div class="statistic-num">
                            {{paperCount}}
                        </div>
                        <div>
                            H-Index
                        </div>
                    </div>
                    </div>
                </el-col>
                <el-col :md="12">
                    <div class="statistic-card">
                    <div class="statistic-content">
                        <div class="statistic-num">
                            {{paperCount}}
                        </div>
                        <div>
                            IF(x)
                        </div>
                    </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-card>
    </el-col>
    <el-col :md="8">
    <el-card>
        <div slot="header">Recent Papers</div>
        <div>
            <my-chart></my-chart>
        </div>
    </el-card>
    </el-col>
</el-row>
</div>
</template>

<script>
import MyChart from '@/components/Author/MyChart';
export default {
name: 'AuthorOverview',
components:{
    MyChart
},
data() {
    return {
        authorName: 'Jidong Ge',
        paperCount: '20'
    }
}
}
</script>

<style lang="less" scoped>
@statistic-font-size:20px;
@border-color:#EBEEF5;
.statistic-container{
    padding: 8px;
    .statistic-card{
        border: 1px solid @border-color;
        padding: 20px;
        display: flex;
        .statistic-content{
            align-items: flex-start;
            .statistic-num{
                font-size: @statistic-font-size;
                margin-bottom: 10px;
            }
            .statistic-type{
                font-size: 14px;
            }
        }
    }
}
</style>>