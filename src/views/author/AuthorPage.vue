<template>
  <div class="main-container">
    <div class="author-header">
      <el-avatar
        :size="96"
        src="https://i1.rgstatic.net/ii/profile.image/273529509773320-1442225925601_Q128/Jidong_Ge.jpg"
      ></el-avatar>
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
        <el-row :gutter="20">
          <el-col :md="16" class="author-content">
            <el-card>
              <div slot="header">About {{authorName}}</div>
              <div></div>
            </el-card>
          </el-col>
          <el-col :md="8">
            <el-card>
              <div slot="header">About {{authorName}}</div>
              <div></div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Papers" name="papers">
        <component v-if="currentTab!==null" :is="currentTab" :type="type" :keyword="authorName"></component>
        <!-- <paper-list :type="author" :keyword="authorId"></paper-list> -->
      </el-tab-pane>
      <el-tab-pane label="SchGraph" name="graph">学术图谱</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// const PaperList = resolve => require(['./PaperListPage.vue'], resolve);
import PaperList from "./PaperListPage";
export default {
  name: "AuthorPage",
  data() {
    return {
      activeName: "overview",
      type: "author_name",
      authorId: "",
      authorName: "Jidong Ge",
      affiliationName: "Nanjing University",
      currentTab: null
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      switch (tab.name) {
        case "papers":
          console.log("papers");
          this.currentTab = PaperList;
          break;
        default:
          break;
      }
    }
  },
  created() {
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
      .author-name {
        font-size: 30px;
      }
    }
  }
  .author-content{
    
  }
}
</style>
