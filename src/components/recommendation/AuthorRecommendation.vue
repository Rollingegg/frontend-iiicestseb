<template>
  <el-card shadow="always">
    <div class="rec-author-header">
      <div class="rec-author-title">Recommended Authors</div>
      <el-link
        type="primary"
        @click="viewMore"
        class="author-title"
      >{{showSize===4?'View More':'Pack Up'}}</el-link>
    </div>
    <div class="authors-container">
      <div v-for="(item, index) in authors.slice(0,showSize)" :key="index" class="author-item">
        <el-avatar shape="square" icon="el-icon-user-solid"></el-avatar>
        <el-link type="primary">{{String(item.name).substr(0,10)+'...'}}</el-link>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "authorRecommendation",
  data() {
    return {
      showSize: 4
    };
  },
  props: {
    authors: Array
  },
  methods: {
    viewMore() {
      this.showSize =
        this.showSize === this.authors.length ? 4 : this.authors.length;
    }
  }
};
</script>

<style lang="less" scoped>
.rec-author-header {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #f5f5f5;
  .rec-author-title {
    font-size: 18px;
    line-height: 30px;
  }
  .author-title{
    font-size: 18px;
    margin: 5px 0;
  }
}
.authors-container {
  display: flex;
  flex-wrap: wrap;
  .author-item {
    width: 25%;
    margin: 10px 0;
  }
}
</style>>