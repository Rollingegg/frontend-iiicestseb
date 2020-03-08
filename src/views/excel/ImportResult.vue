<template>
    <a-modal
        class="import-result"
        title="导入结果"
        v-model="show"
        :centered="true"
        :footer="null"
        :maskClosable="false"
        :width=1000
        @cancel="handleCancel">
        <div class="import-desc">
          <span v-if="importData.length === 0 && errors.length === 0">
            <a-alert
                message="暂无导入记录"
                type="info">
            </a-alert>
          </span>

            <span v-if="importData.length !== 0 && errors.length !== 0">
            <a-alert
                message="部分导入成功"
                type="warning">
              <div slot="description">
                成功导入 <a>{{importData.length}}</a> 条记录，<a>{{errors.length}}</a> 条记录导入失败，共耗时 <a>{{times}}</a> 秒
              </div>
            </a-alert>
          </span>

            <span v-if="importData.length !== 0 && errors.length === 0">
            <a-alert
                message="全部导入成功"
                type="success">
              <div slot="description">
                成功导入 <a>{{importData.length}}</a> 条记录，共耗时 <a>{{times}}</a> 秒
              </div>
            </a-alert>
          </span>

            <span v-if="importData.length === 0 && errors.length !== 0">
            <a-alert
                message="全部导入失败"
                type="error">
              <div slot="description">
                <a>{{errors.length}}</a> 条记录导入失败，共耗时  <a>{{times}}</a> 秒
              </div>
            </a-alert>
          </span>
        </div>

        <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="失败记录" key="2" v-if="errors.length">
                <a-table ref="errorTable"
                         :columns="errorColumns"
                         :dataSource="errors"
                         :pagination="pagination"
                         :scroll="{ x: 900 }">
                </a-table>
            </a-tab-pane>

            <a-tab-pane tab="成功记录" key="1" v-if="importData.length">
                <a-table ref="successTable"
                         :columns="successColumns"
                         :dataSource="importData"
                         :pagination="pagination"
                         :scroll="{ x: 900 }">
                </a-table>
            </a-tab-pane>
        </a-tabs>
    </a-modal>
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
                pagination: {
                    pageSizeOptions: ['5', '10'],
                    defaultCurrent: 1,
                    defaultPageSize: 5,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
                }
            };
        },
        computed: {
            successColumns () {
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
                        title: 'pdf连接',
                        dataIndex: 'pdfLink',
                        customRender: (text) => {
                            if (text.length > 20) {
                                text = text.substring(0, 18) + '...';
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
                            if (text.length > 20) {
                                text = text.substring(0, 18) + '...';
                            }
                            return text;
                        }
                    }, {
                        title: '摘要',
                        dataIndex: 'paperAbstract',
                        customRender: (text) => {
                            if (text.length > 20) {
                                text = text.substring(0, 18) + '...';
                            }
                            return text;
                        }
                    }, {
                        title: '引用数',
                        dataIndex: 'referenceCount'
                    }, {
                        title: '什么数',
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
            },
            errorColumns () {
                return [
                    {
                        title: '行',
                        dataIndex: 'row',
                        customRender: (text, row, index) => {
                            return `第 ${text} 行`;
                        }
                    },
                    {
                        title: '错误信息',
                        dataIndex: 'msg'
                    }];
            },
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
