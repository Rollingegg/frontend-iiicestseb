<template>
  <el-card shadow="always">
    <div class="rec-affiliation-header">
      <div class="rec-affiliation-title">Recommended Affiliations</div>
      <el-link
        type="primary"
        @click="viewMore"
        class="affiliation-title"
      >{{showSize===4?'View More':'Pack Up'}}</el-link>
    </div>
    <div class="affiliations-container">
      <div
        v-for="(item, index) in affiliations.slice(0,showSize)"
        :key="index"
        class="affiliation-item"
      >
        <el-avatar shape="square" icon="el-icon-school"></el-avatar>
        <div><el-link type="primary" class="affiliation-name">{{String(item.name).substr(0,25)+'...'}}</el-link></div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "AffiliationRecommendation",
  data() {
    return {
      showSize: 4
    };
  },
  props: {
    affiliations: Array
  },
  methods: {
    viewMore() {
      this.showSize =
        this.showSize === this.affiliations.length
          ? 4
          : this.affiliations.length;
    }
  }
};
</script>

<style lang="less" scoped>
.affiliation-name {
  * {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.rec-affiliation-header {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #f5f5f5;
  .rec-affiliation-title {
    font-size: 18px;
    line-height: 30px;
  }
  .affiliation-title {
    font-size: 18px;
    margin: 5px 0;
  }
}
.affiliations-container {
  display: flex;
  flex-wrap: wrap;
  .affiliation-item {
    width: 50%;
    margin: 10px 0;
  }
}
</style>>