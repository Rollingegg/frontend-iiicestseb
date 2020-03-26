<template>
  <div>
      <h1>{{authorId}}</h1>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="main-container">
        <el-tab-pane label="Overview" name="overview">个人简介</el-tab-pane>
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
import PaperList from './PaperListPage';
export default {
    name: 'AuthorPage',
    data () {
      return {
        activeName: 'overview',
        type: 'author_name',
        authorId: '',
        authorName: 'Y. Liu',
        currentTab: null
      };
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event);
        switch (tab.name) {
            case 'papers':
                console.log('papers');
                this.currentTab = PaperList;
                break;
            default:
                break;
        }
      }
    },
    created () {
        this.authorId = this.$route.query.authorId;
    }
};
</script>

<style lang="less" scoped>
.main-container{
    background: white;
}
</style>
