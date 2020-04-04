<template>
  <div class="main-container">
    <div class="author-header">
      <el-avatar :size="96" src="static\img\Jidong_Ge.jpg"></el-avatar>
      <div class="author-base">
        <div class="author-name">{{authorName}}</div>
        <el-link :underline="false" icon="el-icon-school">{{affiliationName}}</el-link>
      </div>
    </div>
    <el-tabs
      v-model="activeName"
      type="border-card"
      @tab-click="handleClick"
      class="main-container"
    >
      <el-tab-pane label="Overview" name="overview">
        <author-overview></author-overview>
      </el-tab-pane>
      <el-tab-pane label="Papers" name="papers">
        <component v-if="currentTab!==null" :is="currentTab" :keyword="keyword"></component>
      </el-tab-pane>
      <el-tab-pane label="SchGraph" name="graph">
        <h1>学术图谱</h1>
        <component v-if="currentTab2!==null" :is="currentTab2"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// const PaperList = resolve => require(['./PaperListPage.vue'], resolve);
import PaperList from "@/components/Article/LiteratureList";
import AuthorOverview from "./AuthorOverview";
import RelationGraph from "@/components/Author/RelationGraph";
export default {
  name: "AuthorPage",
  components: {
    AuthorOverview,
    RelationGraph
  },
  data() {
    return {
      activeName: "overview",
      type: "author_name",
      authorId: "",
      authorName: "Y. Liu",
      affiliationName: "Nanjing University",
      currentTab: null,
      currentTab2: null
    };
  },
  computed: {
    keyword() {
      return { type: "author_name", id: this.authorId };
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      switch (tab.name) {
        case "papers":
          console.log("papers");
          this.currentTab = PaperList;
          break;
        case 'graph':
          console.log("graph");
          this.currentTab2 = RelationGraph;
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.authorId = this.$route.query.id;
  }
};
</script>

<style lang="less" scoped>
@base-interval: 20px;
.main-container {
  .author-header {
    display: flex;
    padding-bottom: @base-interval;
    align-items: center;
    .author-base {
      flex: 1 0;
      margin-left: @base-interval;
      .author-name {
        font-size: 30px;
      }
    }
  }
}
</style>
