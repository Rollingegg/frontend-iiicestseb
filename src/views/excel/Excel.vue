<template>
    <div>
        <div class="option-area">
            <el-upload class="upload-area"
                       action="string"
                       ref="uploadAction"
                       :on-change="addFile"
                       :fileList="fileList"
                       :on-remove="removeFile"
                       :http-request="handleUpload"
                       :auto-upload="false">
                <el-button slot="trigger" size="medium" icon="el-icon-upload2">选择.json文件</el-button>
                <el-button size="medium"
                           @click="submitUpload('uploadAction')"
                           :disabled="hasSelected"
                           :loading="uploading">
                    {{uploading ? '导入中' : '导入json' }}
                </el-button>
                <div slot="tip" class="el-upload__tip">请按照预定的模板json文件格式上传，且每次只能上传一个文件</div>
            </el-upload>
            <div class="button-area">
                <el-button size="medium"
                           type="primary"
                           @click="downloadTemplate"
                           style="margin-right: .5rem">
                    模板下载
                </el-button>
                <el-button size="medium" type="success" @click="importActionVisible=true">后台导入</el-button>
            </div>
        </div>
        <el-dialog center
                   :visible.sync="importActionVisible"
                   width="70%"
                   :lock-scroll="false"
                   @close="importActionVisible = false">
            <div style="font-size:24px;border-bottom:1px solid" slot="title">选择后台导入文件</div>
            <el-radio-group v-model="selectedTemplate">
                <el-radio v-for="(item, index) in templateList" :key="index" :label="index">{{item}}</el-radio>
            </el-radio-group>
            <div slot="footer" class="dialog-footer">
                <el-button @click="importActionVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="importTemplate"
                           :loading="uploading">
                    {{uploading ? '导入中' : '导入' }}
                </el-button>
            </div>
        </el-dialog>
        <div class="card-area">
            <!-- 表格区域 -->
            <el-table style="width: 100%" :data="dataSource.slice((currentPage-1)*pageSize,currentPage*pageSize)">
                <el-table-column fixed prop="title" label="论文标题" width="300" :show-overflow-tooltip="true"/>
                <el-table-column prop="id" label="论文编号" width="50"/>
                <el-table-column prop="conferenceId" label="会议编号" width="50"/>
                <el-table-column prop="publisher" label="发布机关" width="80"/>
                <el-table-column prop="pdfUrl" label="pdf链接" width="250" :show-overflow-tooltip="true"/>
                <el-table-column prop="publicationTitle" label="刊物名称" width="250" :show-overflow-tooltip="true"/>
                <el-table-column prop="citationCountPaper" label="引用数" width="100"/>
                <el-table-column prop="citationCountPatent" label="被引数" width="100"/>
                <el-table-column prop="startPage" label="起始页" width="80"/>
                <el-table-column prop="endPage" label="结束页" width="80"/>
            </el-table>
            <el-pagination
                    v-if="dataSource.length"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="dataSource.length"/>
        </div>
        <import-result
                @close="closeImportResult"
                :importData="importData"
                :errors="errors"
                :times="times"
                :importResultVisible="importResultVisible"/>
    </div>
</template>
<script>
    import ImportResult from "./ImportResult";

    export default {
        components: {ImportResult},
        data () {
            return {
                downloadUrl: process.env.BASE_API + "/admin/StandardJSON",
                replace: true,
                msgPromise: Promise.resolve(),
                hasSelected: true,
                fileList: [],
                importData: [],
                times: "",
                errors: [],
                uploading: false,
                importResultVisible: false,
                dataSource: [],
                paginationInfo: null,
                currentPage: 1,
                pageSize: 20,
                templateList: [
                    "ase13_19(605).json",
                    "icse15_19(815).json",
                    "icse10_14(1200)",
                    "icse15_19(50).json"
                ],
                selectedTemplate: 0,
                importActionVisible: false
            };
        },
        computed: {},
        methods: {
            addFile (file, fileList) {
                if (file.status === "ready") {
                    this.hasSelected = false;
                    let myFile = file.raw;
                    if (myFile.type.toLowerCase() !== "application/json") {
                        fileList.pop();
                        this.handleMsg("JSON ONLY!", "warning");
                        return;
                    }
                    if (fileList.indexOf(file) > 0) {
                        if (this.replace) {
                            fileList[0] = file;
                            fileList.pop();
                            this.handleMsg(`一次只能上传一个文件，已覆盖该文件`, "warning");
                        } else {
                            fileList.pop();
                            this.handleMsg(`${myFile.name}文件重复，未覆盖该文件`, "warning");
                        }
                    }
                }
            },
            closeImportResult () {
                this.importResultVisible = false;
            },
            downloadTemplate () {
                window.open(this.downloadUrl);
            },
            removeFile (file) {
                if (this.uploading) {
                    this.$message.warning("文件导入中，请勿删除");
                    return;
                }
                this.hasSelected = true;
                const index = this.fileList.indexOf(file);
                const newFileList = this.fileList.slice();
                newFileList.splice(index, 1);
                this.fileList = newFileList;
            },
            submitUpload (uploadName) {
                //由button传递到el-upload
                this.$refs[uploadName].submit();
            },
            handleUpload (content) {
                const formData = new FormData();
                formData.append("file", content.file);
                this.uploadData('admin/uploadJSON', formData);
                this.hasSelected = true;
            },
            importTemplate () {
                const selectedFile = this.templateList[this.selectedTemplate];
                const formData = new FormData();
                formData.append("filename", selectedFile);
                this.uploadData('admin/loadJSON', formData);
            },
            uploadData (uri, formData) {
                this.uploading = true;
                let timeStart = new Date();
                this.$upload(uri, formData)
                    .then(r => {
                        this.times = (new Date() - timeStart) / 1000;
                        if (r.data.status) {
                            this.errors = r.data.result.errorLogs;
                            this.importData = r.data.result.papers;
                            this.fetch();
                            setTimeout(() => {
                                this.importResultVisible = true;
                            }, 500);
                        } else {
                            this.importData = [];
                            this.handleMsg(r.data.result, "error");
                        }
                        this.uploading = false;
                        this.fileList = [];
                        this.$postJson("/admin/paper/statistics/reCompute");
                        this.$postJson("/admin/author/statistics/reCompute");
                    })
                    .catch(r => {
                        this.uploading = false;
                        this.fileList = [];
                        this.handleMsg(r, "error");
                    });
            },
            fetch () {
                this.dataSource = this.importData;
            },
            handleMsg (message, type = "info") {
                const duration = 4000;
                const showClose = true;
                //一定要this.msgPromise = XXX才有用，这样后调用的才会.then接到后面
                //Promise.then().then()和Promise.then(); Promise.then();是不一样的，前者是真串行
                this.msgPromise = this.msgPromise.then(() => {
                    this.$message({message, type, duration, showClose});
                });
            },
            // 页码改变事件
            handleCurrentChange (val) {
                this.currentPage = val;
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../../static/less/Common";

    .option-area {
        display: flex;
        justify-content: space-around;
        padding: 0 0.9rem;
        margin: 0.5rem 0;

        .upload-area {
            align-items: flex-start;
            flex: 2;
        }

        .button-area {
            flex: 1;
            margin-left: 1rem;
            align-items: flex-end;
        }
    }

    .card-area {
        padding: 0 0.9rem;
        margin: 0.5rem 0;
    }
</style>
