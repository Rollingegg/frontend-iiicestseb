<template>
  <el-container>
    <global-nav></global-nav>
    <el-main>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">历史记录</el-aside>
        <el-container>
          <el-header>
          </el-header>
          <el-main>
            <search-box />
            <res-lister :artList="resList"></res-lister>
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
export default {
  name: 'ResPage',
  data: function () {
    return {
      resList: []
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
    initResList () {
      let item = {
        title: '机器学习导论',
        authors: ['Zhihua Zhou', 'Yang Gao'],
        affiliations: 'Nanjing University',
        date: '2017.01.01',
        ref: 50000
      };
      let res = [];
      for (let i = 0; i < 500; i++) {
        res.push(item);
      }
      this.resList = res;
      console.log(res);
    }
  },
  mounted () {
    this.initResList();
  }
};
</script>

<style>
.el-container {
  background: url("../../../static/img/Large-Triangles.svg");
}
</style>
