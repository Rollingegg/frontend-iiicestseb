<template>
  <el-card shadow="always" class="box-card">
    <div class="item-container">
      <el-link class="document-title" @click="openArticle(article.id)">{{article.paperTitle}}</el-link>
      <div class="author">
        <el-link v-for="(item, index) in article.authorInfoList" :key="index" @click="openAuthor(item.id)">{{item.name}}</el-link>
      </div>
      <div class="abstract">
        <!-- <p class="document-abstract">Abstract: {{article.paperAbstract}}</p> -->
        <mul-wrapper class="document-abstract" :index=article.id :content=article.paperAbstract></mul-wrapper>
      </div>
      <div class="keywords">
        <span>Keywords:</span>
        <el-tag v-for="(item, index) in article.termList" :key="index">{{item.word}}</el-tag>
      </div>
    </div>
    <div>
      <el-link icon="el-icon-date" class="pub-year">{{article.publicationYear.substr(0, 4)}}</el-link>
      <el-link
        target="_blank"
        icon="el-icon-download"
        v-bind:href="article.pdfLink"
        class="download-link"
      >Download</el-link>
      <el-link type="primary" class="viewmore-link" @click="openArticle(article.id)">View More</el-link>
      <span class="citation">Citations( <span class="citation-cnt">{{article.citationCount}}</span> )</span>
    </div>
  </el-card>
</template>

<script>
import MulWrapper from '../common/MultipleLines';
import { mapState } from 'vuex';

export default {
  name: 'LCard',
  components: {
    MulWrapper
  },
  props: {
    article: Object
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    })
  },
  methods: {
    openArticle (id) {
      this.openDetailPage('article',id);
    },
    openAuthor (id) {
      this.openDetailPage('author',id);
    },
    openDetailPage(detailType,queryId){
      const detailPath={'article':'/articleDetail','author':'/authorDetail','keyword':'/keywordDetail'};
      if (this.user.username) {
          this.$router.push({
            path: detailPath[detailType],
            query: {
              id: queryId
            }
          });
      }else{
        this.$message({
          showClose: true,
          message: '亲爱的游客，请先登录哟！',
          type: 'warning'
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 10px;
  .item-container {
    border-bottom-style: solid;
    border-width: 1px 0;
    .document-title {
      text-align: left;
      font-size: 25px;
      margin: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .author {
      * {
        font-size: 16px;
        margin: 5px;
        height: 20px;
      }
    }
    .abstract,
    .keywords {
      text-align: left;
      overflow: hidden;
      span {
        margin: 5px;
        font-size: 14px;
        height: 25px;
        line-height: 25px;
      }
      .document-abstract {
        margin: 5px;
      }
    }
  }
  .pub-year,
  .download-link {
    margin-left: 5px;
    padding: 5px;
    float: left;
  }
  .citation{
    padding: 5px;
    float: left;
    .citation-cnt{
      font-weight: 500;
      color: darkblue;
    }
  }
  .viewmore-link {
    float: right;
    padding: 5px 0;
  }
}
</style>
