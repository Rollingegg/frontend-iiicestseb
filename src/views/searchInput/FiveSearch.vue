<template>
  <div>
    <div class="drawer-title">输入检索条件</div>
    <div class="search-condition">
      <el-input
        clearable
        placeholder="请输入内容"
        v-for="(item, index) in items"
        :key="index"
        v-model="item.val"
        v-show="item.shown"
      >
        <div style="width:50px" slot="prepend">{{item.label}}</div>
        <el-button slot="append" icon="el-icon-remove" @click="remove(index)"></el-button>
      </el-input>
    </div>
    <div class="content-bottom">
      <el-button type="primary" @click="reset">重置</el-button>
      <el-button :loading="loading" type="warning" @click="search">高级检索</el-button>
    </div>
  </div>
</template>

<script>
import db from "../../utils/localstorage";
const limit = 200;
export default {
  name: "fsearch",
  data() {
    return {
      loading: false,
      items: [
        {
          label: "篇名",
          val: "",
          shown: true
        },
        {
          label: "作者",
          val: "",
          shown: true
        },
        {
          label: "作者单位",
          val: "",
          shown: true
        },
        {
          label: "摘要",
          val: "",
          shown: true
        },
        {
          label: "DOI",
          val: "",
          shown: true
        },
        {
          label: "关键词",
          val: "",
          shown: true
        }
      ]
    };
  },
  methods: {
    search() {
        // console.log(this.items);
      let isValid = false;
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].val !== "") {
          isValid = true;
          break;
        }
      }
      // console.log(isValid);
      if (isValid) {
        this.loading = true;
        this.$emit("do-five-search", {
          title: this.items[0].val,
          author_name: this.items[1].val,
          affiliation_name: this.items[2].val,
          paper_abstract: this.items[3].val,
          doi: this.items[4].val,
          term: this.items[5].val
        });
        this.loading=false;
      } else {
        this.$message({
          showClose: true,
          message: "警告：您尚未输入有效搜索信息",
          type: "warning"
        });
      }
    },
    reset() {
      this.items.forEach(item => {
        item.shown = true;
      });
    },
    remove(index) {
      this.items[index].shown = false;
      this.items[index].val = '';
    }
  }
};
</script>

<style lang="less">
@import "../../../static/less/Common.less";
.drawer-title {
  .content-header();
  text-align: center;
  margin-bottom: 30px;
}
.search-condition {
  margin: 20px;
}
.content-bottom {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.label-prepend {
  width: 100px !important;
}
</style>
