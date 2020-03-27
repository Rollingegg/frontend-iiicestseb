<template>
  <div>
      <h1>{{affiliationId}}</h1>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="main-container" >
        <el-tab-pane label="Overview" name="overview">机构简介</el-tab-pane>
        <el-tab-pane label="Members" name="members">成员列表</el-tab-pane>
        <el-tab-pane label="Papers" name="papers">发表文章</el-tab-pane>
        <el-tab-pane label="SchGraph" name="graphs">学术图谱</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
    name: 'AffiliationPage',
    data () {
      return {
        activeName: 'overview',
        affiliationId: ''
      };
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event);
      }
    },
    created () {
        this.affiliationId = this.$route.query.id;
    }
};
</script>

<style lang="less" scoped>
.main-container{
    background: white;
}
</style>
