<template>
  <div>
    <search-box @do-simple-search="doSimpleSearch" @refresh="reset"></search-box>
    <el-container>
      <el-aside width="auto" style="padding:20px">
        <div class="one-line">
          <div style="color:white">选择过滤条件</div>
          <el-link type="primary" icon="el-icon-remove-outline" @click="reset">重置</el-link>
        </div>
        <el-card>
          <div slot="header" class="clearfix">发表时间</div>
          <el-date-picker v-model="startYear" type="year" clearable text="起始年份" value-format="yyyy"></el-date-picker>
          <div style="text-align: center">至</div>
          <el-date-picker v-model="endYear" type="year" clearable text="截止年份" value-format="yyyy"></el-date-picker>
          <div style="text-align:center;margin: 16px 6px">
            <el-button icon="el-icon-s-promotion" type="primary" @click="handleFilter">过滤</el-button>
          </div>
        </el-card>
      </el-aside>
      <el-main>
        <div
          v-loading="loading"
          element-loading-text="拼命搜索中..."
          element-loading-spinner="el-icon-loading"
          style="min-height: 35vw;"
        >
          <div class="one-line">
            <div style="color:white">Papers({{paperCount}})</div>
            <div></div>
          </div>
          <div v-if="!noResult">
            <LCard v-for="(item, index) of resList" :key="index" :article="item"></LCard>
          </div>
          <div class="no-info" v-else>
              <div class="no-data">
              <img src="/static/img/nodata02.png">
              <br> 什么也没找到 T^T
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import GlobalNav from '../common/GlobalNavigator';
import GlobalFooter from '../common/GlobalFooter';
import SearchBox from '../searchInput/SearchBox';
import LCard from '@/components/Article/LiteratureCard';
import db from '../../utils/localstorage';

export default {
  name: 'ResPage',
  data: function () {
    return {
      loading: true,
      resList: [],
      queryType: '',
      queryString: '',
      noResult: false,
      startYear: '2000',
      endYear: '2020'
    };
  },
  computed: {
    paperCount: function () {
      return this.resList == null ? 0 : this.resList.length;
    }
  },
  components: {
    GlobalNav,
    GlobalFooter,
    SearchBox,
    LCard
  },
  methods: {
    handleFilter () {
      console.log(this.startYear);
      console.log(this.endYear);
      if (this.endYear < this.startYear) {
        this.$message({
          showClose: true,
          message: '请选择正确的年份范围',
          type: 'warning'
        });
      } else {
        let newList = [];
        let artList = db.get('RESULT');
        for (let i = 0; i < artList.length; i++) {
          const ele = artList[i];
          let pdate = String(ele.publicationYear).substr(0, 4);
          if (this.startYear <= pdate && this.endYear >= pdate) {
            newList.push(ele);
          }
        }
        this.resList = newList;
        this.$message({
          message: '筛选完成',
          showClose: true,
          type: 'success'
        });
      }
    },
    doSimpleSearch (queryType, queryString) {
            if (queryString === '') {
              this.$message({
                        showClose: true,
                        message: '警告：您尚未输入有效搜索信息',
                        type: 'warning'
                });
                return;
            }
            this.loading = true;
            this.$get('search/simple', {
                type: queryType,
                keyword: queryString
            }).then((r) => {
                if (r.data.status) {
                    db.save('RESULT', r.data.result);
                    setTimeout(() => {
                        this.loading = false;
                    }, 500);
                    this.resList = r.data.result;
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
                }).catch((e) => {
                    this.$message({
                        showClose: true,
                        message: e,
                        type: 'warning'
                    });
                });
            },
    reset () {
      // console.log(db.get('RESULT'));
      console.log('reset');
      if (db.get('RESULT').length > 0) {
        this.resList = db.get('RESULT');
      } else {
        this.$message({
          showClose: true,
          message: '搜索记录为空',
          type: 'warning'
        });
      }
      this.loading = false;
    }
  },
  mounted () {
    this.queryType = this.$route.query.queryType;
    this.queryString = this.$route.query.queryString;
    this.doSimpleSearch(this.queryType, this.queryString);
  }
};
</script>

<style>
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
  }
  .no-info .no-data{
      align-self: center;
    }
.el-aside {
  overflow: hidden;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-card:hover {
  /* border: 3px; */
  box-shadow: 0 4px 8px 0 rgba(163, 128, 128, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
}
</style>
