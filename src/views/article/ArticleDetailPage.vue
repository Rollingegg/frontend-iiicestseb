<template>
  <div>
    <el-row v-loading="loading" element-loading-background="rgba(255,255,255,0.95)">
      <el-col :md="16" class="col-container">
        <div class="one-line">
          <div>
            Article Detail
            <el-tooltip effect="light" style="margin:4px" content="Scores" placement="bottom">
              <span style="color:#409EFF">
                <i class="fa fa-volume-up" aria-hidden="true"></i>
                {{score}}
              </span>
            </el-tooltip>
          </div>
          <div>Citations: {{article.citationCountPaper}}</div>
        </div>
        <div class="main-container">
          <el-card shadow="always">
            <div class="info-container">
              <div class="art-title">{{article.title}}</div>
              <el-row class="author-row">
                <el-col :md="4">Authors</el-col>
                <el-col :md="20" class="author-content">
                  <el-link
                    v-for="(item, index) in authors"
                    :key="index"
                    @click="openAuthor(item.id)"
                    type="primary"
                  >{{item.name}}</el-link>
                </el-col>
              </el-row>
              <el-row class="author-row">
                <el-col :md="4">Affiliations</el-col>
                <el-col :md="20" class="author-content">
                  <el-link
                    v-for="(item, index) in affiliations"
                    :key="index"
                    @click="openAffiliation(item.affId)"
                    type="primary"
                  >{{item.affName}}</el-link>
                </el-col>
              </el-row>
              <el-row class="info-row">
                <el-col :md="4">Domains</el-col>
                <el-col :md="20">
                  <el-button
                    size="mini"
                    type="primary"
                    v-for="(item, index) in keywords"
                    :key="index"
                    class="info-button"
                    @click="openDomain(item.id)"
                  >{{item.name}}</el-button>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row class="info-row">
                <el-col :md="4">Publication</el-col>
                <el-col :md="20">
                  <el-link
                    :href="article.pubLink"
                    target="_blank"
                    class="pub-link"
                  >{{article.publicationTitle}}</el-link>
                </el-col>
              </el-row>
              <el-row class="info-row">
                <el-col :md="4">Conf Location</el-col>
                <el-col :md="20">{{article.confLoc}}</el-col>
              </el-row>
              <el-row class="info-row">
                <el-col :md="4">DOI</el-col>
                <el-col :md="20">{{article.doi}}</el-col>
              </el-row>
              <el-row class="info-row">
                <el-col :md="4">Publisher</el-col>
                <el-col :md="20">{{article.publisher}}</el-col>
              </el-row>
              <el-row class="info-row">
                <el-col :md="4">Page Range</el-col>
                <el-col :md="20">{{article.startPage}} / {{article.endPage}}</el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row class="info-row">
                <el-col :md="4">Keywords</el-col>
                <el-col :md="20">{{article.authorKeywords}}</el-col>
              </el-row>
              <el-row class="info-row">
                <el-col :md="4">Abstract</el-col>
                <el-col :md="20">{{article.paperAbstract}}</el-col>
              </el-row>
            </div>
          </el-card>

          <el-card shadow="always" class="link-container">
            <div>
              <div class="doc-link">Relative Links</div>
              <div>
                <el-link
                  target="_blank"
                  icon="el-icon-download"
                  v-bind:href="article.pdfUrl"
                  class="link"
                >[{{article.pdfUrl}}]</el-link>
              </div>
              <div>
                <el-link
                  target="_blank"
                  icon="el-icon-link"
                  v-bind:href="article.issueLink"
                  class="link"
                >[{{article.issueLink}}]</el-link>
              </div>
            </div>
          </el-card>
        </div>
        <rec-papers :papers="recommendedPapers"></rec-papers>
      </el-col>
      <el-col :md="8" class="col-container">
        <div class="one-line">
          <div>Reference ({{references.length}})</div>
          <div>
            <el-link :underline="false" style="font-size:24px" @click="resetArticleScore">重算评分</el-link>
          </div>
        </div>
        <div class="list-container">
          <el-card
            v-for="(item, index) in references.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            :key="index"
            class="item-container"
          >
            <div>
              <div class="ref-title">{{item.title}}</div>
              <div class="ref-text">{{item.refType}}</div>
              <el-link
                target="_blank"
                type="primary"
                icon="el-icon-s-opportunity"
                :href="item.googleScholarLink"
              >View More in Google Scholar</el-link>
              <div class="ref-text">{{item.text}}</div>
            </div>
          </el-card>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="references.length"
            small
          ></el-pagination>
        </div>
        <rec-authors :authors="recommendedAuthors"></rec-authors>
        <rec-affiliations :affiliations="recommendedAffiliations"></rec-affiliations>
      </el-col>
    </el-row>
    <div style="padding:0 20px">
      <paper-term-graph height="600px" :data="paperTermGraphData"></paper-term-graph>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import RecPapers from "@/components/recommendation/PaperRecommendation";
import RecAuthors from "@/components/recommendation/AuthorRecommendation";
import RecAffiliations from "@/components/recommendation/AffiliationRecommendation";
import PaperTermGraph from "@/components/Article/PaperTermGraph";
function uniq(array) {
  let temp = [];
  let index = [];
  let l = array.length;
  for (let i = 0; i < l; i++) {
    for (let j = i + 1; j < l; j++) {
      if (array[i].affId === array[j].affId) {
        i++;
        j = i;
      }
    }
    temp.push(array[i]);
    index.push(i);
  }
  // console.log(index);
  return temp;
}
export default {
  name: "ArticlePage",
  data() {
    return {
      articleId: "",
      article: {},
      references: [],
      keywords: [],
      authors: [],
      currentPage: 1,
      pageSize: 5,
      score: 0.0,
      recommendedPapers: [],
      recommendedAuthors: [],
      recommendedAffiliations: [],
      paperTermGraphData: {},
      loading: true
    };
  },
  components: {
    RecPapers,
    RecAuthors,
    RecAffiliations,
    PaperTermGraph
  },
  computed: {
    affiliations() {
      let affiliations = [];
      this.authors.forEach(item => {
        affiliations.push({
          affName: item.affiliationName,
          affId: item.affiliationId
        });
      });
      return uniq(affiliations);
    },
    ...mapState({
      user: state => state.account.user
    })
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getRecommendPapers() {
      let id = this.articleId;
      this.$get("/paper/recommend/papers", {
        paperId: id
      })
        .then(r => {
          if (r.data.status) {
            this.recommendedPapers = r.data.result;
          }
        })
        .catch(e => {
          this.recommendedPapers = [];
        });
    },
    getRecommendAuthors() {
      let id = this.articleId;
      this.$get("/paper/recommend/authors", {
        paperId: id
      })
        .then(r => {
          if (r.data.status) {
            this.recommendedAuthors = r.data.result;
          }
        })
        .catch(e => {
          this.recommendedAuthors = [];
        });
    },
    getRecommendAffiliations() {
      let id = this.articleId;
      this.$get("/paper/recommend/affiliations", {
        paperId: id
      })
        .then(r => {
          if (r.data.status) {
            this.recommendedAffiliations = r.data.result;
          }
        })
        .catch(e => {
          this.recommendedAffiliations = [];
        });
    },
    getArticleDetail() {
      let id = this.articleId;
      this.$get("/paper/detail", {
        paperId: id
      })
        .then(r => {
          if (r.data.status) {
            this.article = r.data.result.paper;
            this.keywords = r.data.result.termList;
            this.authors = r.data.result.authorList;
            this.references = r.data.result.referenceList;
            setTimeout(() => {
              this.loading = false;
            }, 500);
          } else {
            this.loading = false;
          }
        })
        .catch(e => {
          this.article = {};
          this.loading = false;
        });
    },
    getArticleScore() {
      let id = this.articleId;
      this.$get("/admin/paper/score", {
        paperId: id
      })
        .then(r => {
          if (r.data.status) {
            this.score = r.data.result.score;
          }
        })
        .catch(e => {
          this.score = 0.0;
        });
    },
    resetArticleScore() {
      let id = this.articleId;
      this.$post("/admin/paper/score", {
        paperId: Number(id)
      }).then(r => {
        if (r.data.status) {
          this.score = r.data.result.score;
          this.$message({
            showClose: true,
            message: "重算评分成功",
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: "重算评分失败",
            type: "error"
          });
        }
      });
    },
    getPaperTermGraphData() {
      let id = this.articleId;
      const limit=200;
      const minDegree=5;
      this.$get("/paper/graph/paper-term-paper/center", {
        id: id,
        paperNumLimit: limit,
        paperDegreeLimit: minDegree
      }).then(r => {
        if (r.data.status) {
          this.paperTermGraphData = r.data.result;
        }
      });
    },
    openAuthor(id) {
      // TODO 把调用方法处的传入参数改为id
      this.openDetailPage("author", id);
    },
    openAffiliation(id) {
      // TODO 把调用方法处的传入参数改为id
      this.openDetailPage("affiliation", id);
    },
    openDomain(id) {
      // TODO 把调用方法处的传入参数改为id
      this.openDetailPage("keyword", id);
    },
    openDetailPage(detailType, queryId) {
      const detailPath = {
        author: "/authorDetail",
        keyword: "/keywordDetail",
        affiliation: "/affiliationDetail"
      };
      if (this.user.username) {
        this.$router.push({
          path: detailPath[detailType],
          query: {
            id: queryId
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: "亲爱的游客，请先登录哟！",
          type: "warning"
        });
      }
    }
  },
  mounted() {
    this.articleId = this.$route.query.id;
    this.getArticleDetail();
    this.getArticleScore();
    this.getRecommendPapers();
    this.getRecommendAuthors();
    this.getRecommendAffiliations();
    this.getPaperTermGraphData();
  }
};
</script>

<style lang="less" scoped>
@label-font-size: 24px;
@label-height: 36px;
@label-color: rgb(8, 9, 77);
@allign-width: 12px;
@space-interval: 20px;
@detail-font-size: 16px;
.col-container {
  padding: @allign-width;
  .one-line {
    color: @label-color;
    display: flex;
    height: @label-height;
    -webkit-box-pack: justify;
    justify-content: space-between;
    line-height: @label-height;
    font-size: @label-font-size;
  }
  .main-container {
    margin-bottom: @space-interval;
    .info-container {
      .art-title {
        font-size: @label-font-size;
      }
      .info-row {
        font-size: @detail-font-size;
        .pub-link {
          font-size: @detail-font-size;
        }
        /* 组合定位 */
        .el-button.info-button {
          margin-bottom: 4px;
          margin-left: 10px;
        }
      }
      .author-row {
        font-size: @detail-font-size;
        margin: 5px 0;
        .author-content {
          * {
            font-size: @detail-font-size;
            margin-right: 30px;
          }
        }
      }
    }
    .link-container {
      margin-top: @space-interval;
      .doc-link {
        font-size: @label-font-size;
      }
      .link {
        font-size: @detail-font-size;
      }
    }
  }
  .item-container {
    margin-bottom: @space-interval;
    .ref-title {
      font-size: @detail-font-size;
    }
    .ref-text {
      overflow: hidden;
      font-size: 14px;
      word-break: break-all;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
    }
  }
}
</style>>
