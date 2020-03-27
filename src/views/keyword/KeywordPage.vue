<template>
  <div class="main-container">
    <el-row>
      <el-col :md="16" class="domain-content">
      <div class="domain-title">{{researchDomain}}</div>
      <el-card class="info-container">
        <div slot="header" class="card-head-title">领域描述</div>
        <div class="domain-description">
          {{domainDesciption}}
        </div>
      </el-card>
      
      <el-card class="info-container">
        <div slot="header" class="card-head-title">活跃学者</div>
        <div class="info-infinite-container">
        <div >
          活跃学者统计图
        </div>
        </div>
      </el-card>
      
      <el-card class="info-container">
        <div slot="header" class="card-head-title">活跃机构</div>
        <div class="info-infinite-container">
        <div >
          活跃机构统计图
        </div>
        </div>
      </el-card>
      
      <component v-if="currentTab!==null" :is="currentTab" :type="type" :keyword="researchDomain"></component>
      </el-col>
      <el-col :md="8" class="domain-recommend">
        
      <el-card class="info-container">
        <div slot="header" class="card-head-title">论文发表</div>
        <div class="info-infinite-container">
          论文发表统计图
        </div>
      </el-card>

      <el-card class="info-container">
        <div slot="header" class="card-head-title">相关领域</div>
        <div class="info-infinite-container">
          与其相关的研究领域
        </div>
      </el-card>
      
      <el-card class="info-container">
        <div slot="header" class="card-head-title">推荐会议</div>
        <div class="info-infinite-container">
          与该研究领域有较深关系的会议列表
        </div>
      </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PaperList from '../author/PaperListPage';
export default {
    name: 'KeywordPage',
    data () {
      return {
        currentTab: PaperList,
        activeName: 'overview',
        keywordId: '',
        type:'term',
        researchDomain: 'Artificial Intelligence System',
        domainDesciption: 'Artificial Intelligence System (AIS) was a distributed computing project undertaken by Intelligence Realm, Inc. with the long-term goal of simulating the human brain in real time, complete with artificial consciousness and artificial general intelligence. They claimed to have found, in research, the "mechanisms of knowledge representation in the brain which is equivalent to finding artificial intelligence", before moving into the developmental phase.'
      };
    },
    methods: {
      
    },
    created () {
        this.keywordId = this.$route.query.id;
    }
};
</script>

<style lang="less" scoped>
@head-font-size:30px;
@title-font-size:24px;
.main-container{
    .domain-content{
      padding-right: @title-font-size;
      .domain-title{
        font-size: @head-font-size;
        line-height: 36px;
      }
      .domain-description{
        overflow: auto;
        height: 100px;
        font-size: 14px;
      }
    .domain-recommend{
      padding-left: @title-font-size;
    }
    }
    .info-container{
      margin: 20px 0;
    .card-head-title {
      font-size: @title-font-size;
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
    }
    .info-infinite-container {
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      overflow: auto;
      padding: 8px @title-font-size;
      padding-top: 0;
      height: 400px;
    }
    }
}
</style>
