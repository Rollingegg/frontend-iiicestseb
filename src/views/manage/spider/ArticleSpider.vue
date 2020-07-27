<template>
    <div>
        <div class="execute-container">
            <el-select v-model="conference" placeholder="请选择会议">
                <el-option v-for="(item,index) in conferenceList"
                           :key="index"
                           :label="item.label"
                           :value="item.label">
                    <el-tooltip effect="light" placement="right" :content="item.name">
                        <span>{{item.label}}</span>
                    </el-tooltip>
                </el-option>
            </el-select>

            <el-date-picker type="year"
                            v-model="startYear"
                            placeholder="起始年份"
            ></el-date-picker>
            <el-date-picker type="year"
                            v-model="endYear"
                            placeholder="结束年份"
            ></el-date-picker>

            <el-button type="primary">启动任务</el-button>

        </div>
        <el-table
                :data="recordList"
                stripe
                border
                style="margin-top: 40px">
            <el-table-column
                    prop="id"
                    label="编号">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="爬取会议">
            </el-table-column>
            <el-table-column
                    prop="startTime"
                    label="启动时间">
            </el-table-column>
            <el-table-column
                    prop="endTime"
                    label="结束时间">
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="recordNum"
                    label="爬取文献数">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "ArticleSpider",
        data() {
            return {
                conferenceList: [
                    {
                        label: 'ICSE',
                        name: 'International Conference on Software Engineering (ICSE)'
                    },
                    {
                        label: 'ASE',
                        name: 'Automated Software Engineering (ASE)'
                    },
                    {
                        label: 'CVPR',
                        name: 'Computer Vision and Pattern Recognition (CVPR)'
                    },
                    {
                        label: 'ICCV',
                        name: 'Computer Vision (ICCV)'
                    },
                    {
                        label: 'VTS',
                        name: 'VLSI Test Symposium'
                    },
                    {
                        label: 'ICMLA',
                        name: 'International Conference on Machine Learning and Applications (ICMLA)'
                    },
                    {
                        label: 'ISCA',
                        name: 'Annual International Symposium on Computer Architecture'
                    },
                    {
                        label: 'ICIP',
                        name: 'IEEE International Conference Image Processing'
                    },
                    {
                        label: 'DSN',
                        name: 'Dependable Systems and Networks'
                    }
                ],
                conference: '',
                startYear: '',
                endYear: '',
                recordList: []
            }
        }
    }
</script>

<style scoped lang="less">
    .execute-container {
        display: flex;
        justify-content: space-between;
    }
</style>
