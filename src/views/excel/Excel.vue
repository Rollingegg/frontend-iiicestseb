<template>
  <div style="width: 100%">
    <div class="option-area">
      <el-upload
        class="upload-area"
        action="string"
        ref="uploadAction"
        :on-change="handleChange"
        :fileList="fileList"
        :on-remove="handleRemove"
        :http-request="handleUpload"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="medium" icon="el-icon-upload2">选择.json文件</el-button>
        <el-button
          size="medium"
          @click="submitUpload('uploadAction')"
          :disabled="hasSelected"
          :loading="uploading"
        >{{uploading ? '导入中' : '导入json' }}</el-button>
        <div slot="tip" class="el-upload__tip">请按照预定的模板json文件格式上传，且每次只能上传一个文件</div>
      </el-upload>
      <div class="button-area">
        <el-button
          size="medium"
          type="primary"
          @click="downloadTemplate"
          style="margin-right: .5rem"
        >模板下载</el-button>
      </div>
    </div>
    <div class="card-area">
      <!-- 表格区域 -->
      <el-table :data="tableData" style="width: 100%" height="250">
        <el-table-column fixed prop="title" label="论文标题" width="300"></el-table-column>
        <el-table-column prop="id" label="论文编号" width="50"></el-table-column>
        <el-table-column prop="conferenceId" label="会议编号" width="50"></el-table-column>
        <el-table-column prop="publisher" label="发布机关" width="50"></el-table-column>
        <el-table-column prop="pdfUrl" label="pdf链接" :show-overflow-tooltip="true" width="150"></el-table-column>
        <el-table-column prop="publicationTitle" label="刊物名称" :show-overflow-tooltip="true" width="300"></el-table-column>
        <el-table-column prop="citationCountPaper" label="引用数" width="50"></el-table-column>
        <el-table-column prop="citationCountPatent" label="被引数" width="50"></el-table-column>
        <el-table-column prop="startPage" label="起始页" width="50"></el-table-column>
        <el-table-column prop="endPage" label="结束页" width="50"></el-table-column>
      </el-table>
        <el-pagination
        v-if="dataSource.length"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="size"
        layout="total, prev, pager, next, jumper"
        :total="dataSource.length"
        ></el-pagination>
    </div>
    <import-result
      @close="handleClose"
      :importData="importData"
      :errors="errors"
      :times="times"
      :importResultVisible="importResultVisible"
    ></import-result>
  </div>
</template>
<script>
import ImportResult from "./ImportResult";
export default {
  components: { ImportResult },
  data() {
    return {
      uploadUrl: process.env.BASE_API + "/admin/paper/StandardJSON",
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
      tableData: [],
      paginationInfo: null,
      currentPage: 1,
      size: 20,
      loading: false
    };
  },
  methods: {
    handleChange(file, fileList) {
      //这表示是添加行为
      // console.log(`准备修改文件${file.raw.name}, 此时文件列表长度为${fileList.length}`);
      // console.log(`此时this.fileList的长度为${this.fileList.length}`);
      if (file.status === "ready") {
        this.hasSelected = false;
        console.log(`添加了文件${file.raw.name}`);
        let myFile = file.raw;
        const type = myFile.type.toLowerCase();
        const isJSON = type === "application/json";
        if (!isJSON) {
          fileList.pop();
          this.handleMsg("JSON ONLY!", "warning");
          return;
        }
        const fileIndex = fileList.indexOf(file);
        if (fileIndex > 0) {
          if (this.replace) {
            fileList[0] = file;
            fileList.pop();
            this.handleMsg(`${myFile.name}文件重复，已覆盖该文件`, "warning");
          } else {
            fileList.pop();
            this.handleMsg(`${myFile.name}文件重复，未覆盖该文件`, "warning");
          }
        }
      }
    },
    handleClose() {
      this.importResultVisible = false;
    },
    downloadTemplate() {
      window.open(this.uploadUrl);
    },
    handleRemove(file) {
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
    submitUpload(uploadName) {
      this.$refs[uploadName].submit();
    },
    handleUpload(content) {
      // const {fileList} = this;
      console.log(content.file); // 已选择的文件
      const formData = new FormData();
      formData.append("file", content.file);
      this.uploading = true;
      let timeStart = new Date();
      this.$upload("admin/paper/uploadJSON", formData)
        .then(r => {
          this.times = (new Date() - timeStart) / 1000;
          if (r.data.status) {
            this.errors = r.data.result.errorLogs;
            this.importData = r.data.result.papers;
            this.fetch();
            setTimeout(()=>{
                this.importResultVisible = true;
            },500);
          } else {
            this.importData = [];
            this.handleMsg(r.data.result, "error");
          }
          this.uploading = false;
          this.fileList = [];
        })
        .catch(r => {
          console.error(r);
          this.uploading = false;
          this.fileList = [];
        });
      this.hasSelected = true;
    },
    fetch() {
      this.loading = true;
      this.loading = false;
      this.dataSource = this.importData;
      this.handleCurrentChange(this.currentPage);
    },
    handleMsg(message, type = "info") {
      const duration = 4000;
      const showClose = true;
      //一定要this.msgPromise = XXX才有用，这样后调用的才会.then接到后面
      //Promise.then().then()和Promise.then(); Promise.then();是不一样的，前者是真串行
      this.msgPromise = this.msgPromise.then(() => {
        this.$message({ message, type, duration, showClose });
      });
    },
    paging(size, current) {
      const tableList = Array(this.dataSource);
      const tablePush = [];
      tableList.forEach((item, index) => {
        if (size * (current - 1) <= index && index <= size * current - 1) {
          tablePush.push(item);
        }
      });
      return tablePush;
    },
    // 页码改变事件
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableData = this.paging(this.size, val);
      console.log(this.tableData[0]);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../static/less/Common";

.option-area {
  display: inline-block;
  width: 100%;
  padding: 0 0.9rem;
  margin: 0.5rem 0;

  .upload-area {
    float: left;
    width: 30%;
  }

  .button-area {
    width: 30%;
    margin-left: 1rem;
    float: right;
  }
}
.card-area {
  padding: 0 0.9rem;
  margin: 0.5rem 0;
}
</style>
