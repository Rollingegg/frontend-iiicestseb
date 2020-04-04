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
      <el-tab-pane label="Papers" name="papers">
        <component v-if="currentTab2!==null" :is="currentTab2" :keyword="keyword"></component>
      </el-tab-pane>
      <el-tab-pane label="SchGraph" name="graph">
        <h1>学术图谱</h1>
        <div style="width:100%;height:600px">
        <component v-if="currentTab3!==null" :is="currentTab3" height="600px"></component>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PaperList from "@/components/Article/LiteratureList";
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
      currentTab3: null,
      currentTab2: null
    };
  },
  computed: {
    keyword() {
      return { type: "affiliation_name", id: this.affiliationId };
    }
  },
  methods: {
    handleClick(tab, event) {
      switch (tab.name) {
        case 'papers':
          this.currentTab2 = PaperList;
          break;
        case 'graph':
          this.currentTab3 = chart;
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
