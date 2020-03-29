<template>
    <el-dialog
        class="import-result"
        :visible="importResultVisible"
        center
        width="70%"
        @close="handleCancel">
        <div style="font-size:24px;border-bottom:1px solid" slot="title">导入结果</div>
        <div class="import-desc">
          <span v-if="importData.length === 0 && errors.length === 0">
            <el-alert :closable="false"
                title="暂无导入记录"
                type="info">
            </el-alert>
          </span>

            <span v-if="importData.length !== 0 && errors.length !== 0">
            <el-alert :closable="false"
                title="部分导入成功"
                type="warning">
              <div slot>
                成功导入 <a>{{importData.length}}</a> 条记录，<a>{{errors.length}}</a> 条记录导入失败，共耗时 <a>{{times}}</a> 秒
              </div>
            </el-alert>
          </span>

            <span v-if="importData.length !== 0 && errors.length === 0">
            <el-alert :closable="false"
                title="全部导入成功"
                type="success">
              <div slot>
                成功导入 <a>{{importData.length}}</a> 条记录，共耗时 <a>{{times}}</a> 秒
              </div>
            </el-alert>
          </span>

            <span v-if="importData.length === 0 && errors.length !== 0">
            <el-alert :closable="false"
                title="全部导入失败"
                type="error">
              <div slot>
                <a>{{errors.length}}</a> 条记录导入失败，共耗时  <a>{{times}}</a> 秒
              </div>
            </el-alert>
          </span>
        </div>

        <el-tabs v-model="activeName">
            <el-tab-pane label="失败记录" name="1" v-if="errors.length">
                <div style="overflow: auto;height:300px">
                <div v-for="(item, index) in errors" :key="index">{{item}}</div>
                </div>
            </el-tab-pane>

            <el-tab-pane label="成功记录" name="2" v-if="importData.length">
                <el-table :data="importData.slice((currentPage2-1)*size2,currentPage2*size2)" style="width: 100%" height="250">
                <el-table-column fixed prop="title" label="论文标题" width="300" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="id" label="论文编号" width="50"></el-table-column>
                <el-table-column prop="conferenceId" label="会议编号" width="50"></el-table-column>
                <el-table-column prop="publisher" label="发布机关" width="80"></el-table-column>
                <el-table-column prop="pdfUrl" label="pdf链接" :show-overflow-tooltip="true" width="300"></el-table-column>
                <el-table-column prop="publicationTitle" label="刊物名称" :show-overflow-tooltip="true" width="300"></el-table-column>
                <el-table-column prop="citationCountPaper" label="引用数" width="50"></el-table-column>
                <el-table-column prop="citationCountPatent" label="被引数" width="50"></el-table-column>
                <el-table-column prop="startPage" label="起始页" width="50"></el-table-column>
                <el-table-column prop="endPage" label="结束页" width="50"></el-table-column>
            </el-table>
                <el-pagination
                v-if="importData.length"
                @current-change="handleCurrentChange2"
                :current-page.sync="currentPage2"
                :page-size="size2"
                layout="total, prev, pager, next, jumper"
                :total="importData.length"
                ></el-pagination>

            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>
<script>
    export default {
        props: {
            importResultVisible: {
                required: true,
                default: false
            },
            importData: {
                required: true
            },
            errors: {
                required: true
            },
            times: {
                required: true
            }
        },
        data () {
            return {
                activeName: '1',
                tableData1: [],
                tableData2: [],
                size1: 5,
                size2: 10,
                currentPage1: 1,
                currentPage2: 1,
                dataSource: []
            };
        },
        computed: {
            show: {
                get: function () {
                    return this.importResultVisible;
                },
                set: function () {
                }
            }
        },
        methods: {
            handleCancel () {
                this.$emit('close');
            },
            paging(size, current,dataSource) {
            const tableList = Array(dataSource);
            const tablePush = [];
            tableList.forEach((item, index) => {
                if (size * (current - 1) <= index && index <= size * current - 1) {
                tablePush.push(item);
                }
            });
            return tablePush;
            },
            // 页码改变事件
            handleCurrentChange2(val) {
            this.currentPage2 = val;
            }
        }
    };
</script>
<style lang="less">
    .import-result {
        .import-desc {
            margin-bottom: .5rem;

            a {
                font-weight: 600;
            }
        }
    }
</style>
