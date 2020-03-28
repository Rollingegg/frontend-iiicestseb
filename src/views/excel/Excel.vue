<template>
    <div style="width: 100%">
        <div class="option-area">
            <a-upload
                class="upload-area"
                :fileList="fileList"
                :remove="handleRemove"
                :disabled="fileList.length === 1"
                :beforeUpload="beforeUpload">
                <a-button>
                    <a-icon type="upload"/>
                    选择.csv文件
                </a-button>
            </a-upload>
            <div class="button-area">
                <a-button type="primary" @click="downloadTemplate" style="margin-right: .5rem">
                    模板下载
                </a-button>
                <a-button
                    @click="handleUpload"
                    :disabled="fileList.length === 0"
                    :loading="uploading">
                    {{uploading ? '导入中' : '导入csv' }}
                </a-button>
            </div>
        </div>
        <a-card :bordered="false" class="card-area">
            <!-- 表格区域 -->
            <a-table ref="TableInfo"
                     :rowKey="record =>record.id"
                     :columns="columns"
                     :dataSource="dataSource"
                     :pagination="pagination"
                     :loading="loading"
                     @change="handleTableChange"
                     :scroll="{ x: 900 }">
            </a-table>
        </a-card>
        <import-result
            @close="handleClose"
            :importData="importData"
            :errors="errors"
            :times="times"
            :importResultVisible="importResultVisible">
        </import-result>
    </div>
</template>
<script>
    import ImportResult from './ImportResult';

    export default {
        components: {ImportResult},
        data () {
            return {
                fileList: [],
                importData: [],
                times: '',
                errors: [],
                uploading: false,
                importResultVisible: false,
                dataSource: [],
                paginationInfo: null,
                pagination: {
                    pageSizeOptions: ['10', '20', '30', '40', '100'],
                    defaultCurrent: 1,
                    defaultPageSize: 10,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
                },
                loading: false
            };
        },
        computed: {
            columns () {
                return [
                    {
                        title: '发布标题',
                        dataIndex: 'publicationTitle',
                        customRender: (text) => {
                            if (text.length > 10) {
                                text = text.substring(0, 8) + '...';
                            }
                            return text;
                        }
                    }, {
                        title: '发布编号',
                        dataIndex: 'publisherId'
                    }, {
                        title: '会议编号',
                        dataIndex: 'conferenceId'
                    }, {
                        title: 'pdf链接',
                        dataIndex: 'pdfLink',
                        customRender: (text) => {
                            if (text.length > 30) {
                                text = text.substring(0, 28) + '...';
                            }
                            return text;
                        }
                    }, {
                        title: 'doi',
                        dataIndex: 'doi'
                    }, {
                        title: '标题',
                        dataIndex: 'paperTitle',
                        customRender: (text) => {
                            if (text.length > 30) {
                                text = text.substring(0, 28) + '...';
                            }
                            return text;
                        }
                    }, {
                        title: '摘要',
                        dataIndex: 'paperAbstract',
                        customRender: (text) => {
                            if (text.length > 30) {
                                text = text.substring(0, 28) + '...';
                            }
                            return text;
                        }
                    }, {
                        title: '引用数',
                        dataIndex: 'referenceCount'
                    }, {
                        title: '被引数',
                        dataIndex: 'citationCount'
                    }, {
                        title: '发布时间',
                        dataIndex: 'publicationYear',
                        customRender: (text) => {
                            return text.substr(0, 4);
                        }
                    }, {
                        title: '开始页',
                        dataIndex: 'startPage'
                    }, {
                        title: '终了页',
                        dataIndex: 'endPage'
                    }, {
                        title: '认定机构',
                        dataIndex: 'documentIdentifier'
                    }];
            }
        },
        mounted () {
        },
        methods: {
            handleClose () {
                this.importResultVisible = false;
            },
            downloadTemplate () {
                window.open(process.env.BASE_API + '/admin/paper/StandardJSON');
            },
            handleRemove (file) {
                if (this.uploading) {
                    this.$message.warning('文件导入中，请勿删除');
                    return;
                }
                const index = this.fileList.indexOf(file);
                const newFileList = this.fileList.slice();
                newFileList.splice(index, 1);
                this.fileList = newFileList;
            },
            beforeUpload (file) {
                const isCSV = file.type === 'application/vnd.ms-excel';
                if (!isCSV) {
                    this.$message({
                        showClose: true,
                        message: 'CSV ONLY!',
                        type: 'warning'
                    });
                } else {
                    this.fileList = [...this.fileList, file];
                }
                return false;
            },
            handleUpload () {
                const {fileList} = this;
                const formData = new FormData();
                formData.append('file', fileList[0]);
                this.uploading = true;
                let timeStart = new Date();
                this.$upload('statistics/uploadCSV', formData).then((r) => {
                    this.times = (new Date() - timeStart) / 1000;
                    if (r.data.status) {
                        this.errors = r.data.result.errors;
                        this.importData = r.data.result.papers;
                        this.importResultVisible = true;
                        this.fetch();
                    } else {
                        this.importData = [];
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: 'warning'
                        });
                    }
                    this.uploading = false;
                    this.fileList = [];
                }).catch((r) => {
                    console.error(r);
                    this.uploading = false;
                    this.fileList = [];
                });
            },
            handleTableChange (pagination, filters, sorter) {
                this.paginationInfo = pagination;
                // this.fetch();
            },
            fetch (params = {}) {
                this.loading = true;
                this.loading = false;
                this.dataSource = this.importData;
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../../static/less/Common";

    .option-area {
        display: inline-block;
        width: 100%;
        padding: 0 .9rem;
        margin: .5rem 0;

        .upload-area {
            display: inline;
            float: left;
            width: 50%
        }

        .button-area {
            margin-left: 1rem;
            display: inline;
            float: right;
            width: 30%;
        }
    }
</style>
