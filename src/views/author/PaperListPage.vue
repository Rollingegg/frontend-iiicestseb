<template>
  <el-row>
    <el-col :md="16">
      <div
        v-loading="loading"
        element-loading-text="拼命搜索中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255,255,255,0.95)"
        style="min-height: 35vw;"
      >
        <div class="one-line">
          <div>Papers({{paperCount}})</div>
          <div></div>
        </div>
        <div v-if="!noResult">
          <LCard v-for="(item, index) of resList" :key="index" :article="item"></LCard>
          <!-- <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="20"
              layout="prev, pager, next, jumper"
              :total="paperCount">
          </el-pagination>-->
        </div>
        <div class="no-info" v-else>
          <div class="no-data">
            <img src="/static/img/nodata02.png" />
            <br />什么也没找到 T^T
          </div>
        </div>
      </div>
    </el-col>
    <el-col :md="8">相关推荐</el-col>
  </el-row>
</template>

<script>
import LCard from '@/components/Article/LiteratureCard';

export default {
  name: 'PaperList',
  components: {
    LCard
  },
  data () {
    return {
      resList: [],
      noResult: false,
      loading: true
    };
  },
  props: {
    type: String,
    keyword: String
  },
  computed: {
    paperCount: function () {
      return this.resList == null ? 0 : this.resList.length;
    }
  },
  methods: {
    fetch (queryType, queryString) {
      this.loading = true;
      this.$get('search/simple', {
        type: queryType,
        keyword: queryString
      })
        .then(r => {
          if (r.data.status) {
            // db.save('RESULT', r.data.result);
            setTimeout(() => {
              this.loading = false;
            }, 500);
            this.resList = r.data.result;
            // console.log(this.resList);
            if (this.resList == null) {
              this.loading = false;
              this.noResult = true;
            } else {
              this.noResult = false;
            }
          } else {
            this.$message({
              showClose: true,
              message: r.data.result,
              type: 'warning'
            });
          }
        })
        .catch(e => {
            this.loading = false;
            this.noResult = true;
        });
    }
  },
  mounted () {
    console.log(this.type, this.keyword);
    this.fetch(this.type, this.keyword);
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
  font-size: 15px;
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
