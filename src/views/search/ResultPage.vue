<template>
  <el-container>
    <global-nav></global-nav>
    <el-main>
      <el-container>
        <el-aside width="200px">
          <el-row type="flex" justify="space-between" align="middle">
            <el-col :span="8">
              <h1 style="color:white;margin: 6px 0">Filter By</h1>
            </el-col>
            <el-col :span="6">
              <el-button type="text" icon="el-icon-remove-outline" @click="reset">重置</el-button>
            </el-col>
          </el-row>
          <el-card shadow="hover">
            <div slot="header" class="clearfix">发表时间</div>
            <el-date-picker
              v-model="startYear"
              type="year"
              clearable
              text="起始年份"
              value-format="yyyy"
              style="width: 150px;"
            ></el-date-picker>
            <div style="text-align: center">至</div>
            <el-date-picker
              v-model="endYear"
              type="year"
              clearable
              text="截止年份"
              value-format="yyyy"
              style="width: 150px;"
            ></el-date-picker>
            <div style="text-align:center;margin: 16px 6px">
                    <el-button icon="el-icon-s-promotion" type="primary" @click="handleFilter">过滤</el-button>
            </div>
          </el-card>
        </el-aside>
        <el-container>
          <el-main>
            <search-box v-on:refresh="reset"/>
            <res-lister ref="resultTable"></res-lister>
          </el-main>
          <el-footer></el-footer>
        </el-container>
      </el-container>
    </el-main>
    <el-footer>
      <global-footer :copyright="copyright" />
    </el-footer>
  </el-container>
</template>

<script>
import GlobalNav from '../common/GlobalNavigator';
import GlobalFooter from '../common/GlobalFooter';
import SearchBox from '../searchInput/SearchBox';
import ResLister from './ResLiter';
import db from '../../utils/localstorage';

export default {
  name: 'ResPage',
  data: function () {
    return {
      resList: [],
      startYear: '1970',
      endYear: '2020'
    };
  },
  computed: {
    copyright () {
      return this.$store.state.setting.copyright;
    }
  },
  components: {
    GlobalNav,
    GlobalFooter,
    SearchBox,
    ResLister
  },
  methods: {
      handleFilter () {
          let newList = [];
          let artList = db.get('RESULT');
          for (let i = 0; i < artList.length; i++) {
              const ele = artList[i];
              let pdate = String(ele.publicationYear).substr(0, 4);
              if (this.startYear <= pdate && this.endYear >= pdate) {
                  newList.push(ele);
              }
          }
        this.$refs.resultTable.artList = newList;
      },
      reset () {
          console.log(db.get('RESULT'));
          if (db.get('RESULT').length > 0) {
          this.$refs.resultTable.artList = db.get('RESULT');
          } else {
              this.$message({
                        showClose: true,
                        message: '搜索记录为空',
                        type: 'warning'
            });
          }
      }
  }
};
</script>

<style>
.el-container {
  background: url("../../../static/img/Large-Triangles.svg");
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
  border: 3px;
  box-shadow: 0 4px 8px 0 rgba(163, 128, 128, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
}
</style>
