<template>
  <div>
    <h1>{{affiliationId}}</h1>
    <el-tabs
      v-model="activeName"
      type="border-card"
      @tab-click="handleClick"
      class="main-container"
    >
      <el-tab-pane label="Overview" name="overview">机构简介</el-tab-pane>
      <el-tab-pane label="Members" name="members">成员列表</el-tab-pane>
      <el-tab-pane label="Papers" name="papers">发表文章</el-tab-pane>
      <el-tab-pane label="SchGraph" name="graph">
        <h1>学术图谱</h1>
        <div style="width:100%;height:600px">
        <component v-if="currentTab!==null" :is="currentTab" height="600px"></component>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import chart from '@/components/graphs/PaperStatisticGraph';
export default {
  name: "AffiliationPage",
  component: {
    chart
  },
  data() {
    return {
      activeName: "overview",
      affiliationId: "",
      currentTab: null
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      switch (tab.name) {
        case 'graph':
          console.log("graph");
          this.currentTab = chart;
          break;
        default:
          break;
      }
    }
  },
  created() {
    this.affiliationId = this.$route.query.id;
  }
};
</script>

<style lang="less" scoped>
.main-container {
  background: white;
}
</style>
