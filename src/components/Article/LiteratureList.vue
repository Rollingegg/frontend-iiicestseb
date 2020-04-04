<template>
  <el-row :gutter="20">
    <el-col :md="16">
      <div
        v-loading="loading"
        element-loading-background="rgba(255,255,255,0.95)"
      >
        <div class="one-line">
          <div>Papers({{paperCount}})</div>
          <div></div>
        </div>
        <div v-if="!noResult">
          <LCard v-for="(item, index) of resList" :key="index" :article="item"></LCard>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="paperCount"
          ></el-pagination>
        </div>
        <div class="no-info" v-else>
          <div class="no-data">
            <img src="/static/img/nodata02.png" />
            <br />什么也没找到 T^T
          </div>
        </div>
      </div>
    </el-col>
    <el-col :md="8">
        <div class="one-line">
            <div>Filter in Results</div>
        </div>
    </el-col>
  </el-row>
</template>

<script>
import LCard from "@/components/Article/LiteratureCard";

export default {
  name: "PaperList",
  components: {
    LCard
  },
  data() {
    return {
      resList: [],
      noResult: false,
      loading: true,
      currentPage: 1,
      searchId: '',
      searchType: '',
      searchPath: ''
    };
  },
  props: {
      // 参数形式：{type: searchType, id:searchId}
    keyword: Object
  },
  computed: {
    paperCount: function() {
      return this.resList == null ? 0 : this.resList.length;
    }
  },
  watch: {
    keyword(newValue, oldValue){
      this.initParams(newValue);
      this.fetch();
    }
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    fetch() {
      this.loading = true;
      this.$get(this.searchPath, {id:this.searchId})
        .then(r => {
          if (r.data.status) {
            setTimeout(() => {
              this.loading = false;
            }, 500);
            this.resList = r.data.result;
            // console.log(this.resList);
            if (this.resList == null) {
              this.noResult = true;
            } else {
              this.noResult = false;
            }
          } else {
            this.$message({
              showClose: true,
              message: r.data.result,
              type: "warning"
            });
            this.loading = false;
            this.noResult = true;
          }
        })
        .catch(e => {
          this.loading = false;
          this.noResult = true;
        });
    },
    initParams(keyword) {
      const pathsMap = {
        affiliation_name: "/paper/affiliation/all/publish",
        author_name: "/paper/author/all/publish",
        term: "termKeyword",
      };
      // console.log(this.params);
      this.searchType = this.keyword['type']
      this.searchPath = pathsMap[this.searchType];
      this.searchId = this.keyword['id'];
    }
  },
  mounted() {
    this.initParams(this.keyword);
    this.fetch();
  }
};
</script>

<style lang="less" scoped>
.one-line {
  display: flex;
  height: 35px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  line-height: 35px;
  font-size: 16px;
}
.no-info {
  background: white;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  .no-data {
    align-self: center;
  }
}
</style>
