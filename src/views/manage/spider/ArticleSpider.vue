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
                            value-format="yyyy"
                            v-model="startYear"
                            placeholder="起始年份"
            ></el-date-picker>
            <el-date-picker type="year"
                            value-format="yyyy"
                            v-model="endYear"
                            placeholder="结束年份"
            ></el-date-picker>

            <el-button type="primary" @click="addCrawler">启动任务</el-button>

        </div>
        <el-table
                :data="recordList"
                stripe
                border
                v-loading="loading"
                style="margin-top: 40px">
            <el-table-column
                    prop="crawlerId"
                    width="60"
                    label="编号">
            </el-table-column>
            <el-table-column
                    width="60"
                    prop="conferenceName"
                    label="爬取会议">
            </el-table-column>
            <el-table-column
                    width="60"
                    prop="startYear"
                    label="起始年份">
            </el-table-column>
            <el-table-column
                    width="60"
                    prop="endYear"
                    label="结束年份">
            </el-table-column>
            <el-table-column
                    sortable
                    width="160"
                    prop="addTime"
                    label="添加时间">
            </el-table-column>
            <el-table-column
                    sortable
                    width="160"
                    prop="startTime"
                    label="启动时间">
            </el-table-column>
            <el-table-column
                    sortable
                    width="160"
                    prop="endTime"
                    label="结束时间">
            </el-table-column>
            <el-table-column
                    prop="state"
                    width="80"
                    label="状态"
                    column-key="state"
                    :filters="[{text: '等待中', value: '等待中'}, {text: '运行中', value: '运行中'}, {text: '已完成', value: '已完成'}, {text: '已取消', value: '已取消'}, {text: '失败', value: '失败'}]"
                    :filter-method="filterHandler">
                <template slot-scope="scope">
                    <el-tag
                            :type="stateTag(scope.row.state)"
                            effect="dark"
                            disable-transitions>{{scope.row.state}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="totalCount"
                    label="爬取文献数">
            </el-table-column>
            <el-table-column
                    prop="successCount"
                    label="成功插入数">
            </el-table-column>
            <el-table-column
                    prop="existedCount"
                    label="已存在记录">
            </el-table-column>
            <el-table-column
                    prop="errorCount"
                    label="错误记录数">
            </el-table-column>
            <el-table-column label="操作"
                             width="80">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="danger"
                               plain
                               @click="handleCancel(scope.$index, scope.row)"
                               :disabled="scope.row.state!=='等待中'&&scope.row.state!=='运行中'">
                        取消
                    </el-button>
                </template>
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
                recordList: [],
                loading: true
            }
        },
        mounted() {
            this.fetchRecords()
        },
        methods: {
            async fetchRecords(){
                this.loading=true
                try {
                    const r=await this.$get('crawler/all')
                    // console.log(r)
                    if(r.status&&r.data.status){
                        this.recordList=r.data.result
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
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            stateTag(state){
                switch (state) {
                    case '等待中':
                        return 'info'
                    case '运行中':
                        return ''
                    case '已完成':
                        return 'success'
                    case '失败':
                        return 'danger'
                    case '已取消':
                        return 'warning'
                    default:
                        return ''
                }
            },
            handleCancel(index, row) {
                console.log(index, row);
            },
            async addCrawler(){
                if(!this.conference){
                    this.$message({
                        showClose: true,
                        message: '请选择正确的会议名称',
                        type: "warning"
                    });
                    return ''
                }
                if(!this.startYear||!this.endYear||this.startYear>this.endYear){
                    this.$message({
                        showClose: true,
                        message: '请选择合法的年份起止范围',
                        type: "warning"
                    });
                    return ''
                }
                // console.log(this.startYear,this.endYear)
                try {
                    const r=await this.$postJson('crawler/add',{
                        conferenceName:  this.conference,
                        startYear: this.startYear,
                        endYear: this.endYear
                    })
                    // console.log(r)
                    if(r.status&&r.data.status){
                        await this.fetchRecords()
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
