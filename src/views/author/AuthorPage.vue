<template>
  <div class="main-container">
    <div class="author-header">
      <el-avatar :size="120" src="static\img\ChunrongFang.jpg"></el-avatar>
      <div class="author-base">
        <div class="author-name">{{baseInfo.name}}</div>
        <el-link
          :underline="false"
          icon="el-icon-school"
          @click="openAffiliation(baseInfo.affiliationId)"
        >{{baseInfo.affiliationName}}</el-link>
        <div style="margin-top:5px"><el-button size="mini" type="primary" v-for="(item, index) in domainStatistics.slice(0,3)" :key="index" @click="openDomain(item.id)">{{item.name}}</el-button></div>
      </div>
    </div>
    <el-tabs
      v-model="activeName"
      type="border-card"
      @tab-click="handleClick"
      class="main-container"
    >
      <el-tab-pane label="Overview" name="overview">
        <div
          class="overview-container"
          v-loading="loading"
          element-loading-background="rgba(255,255,255,0.95)"
        >
          <el-row :gutter="15">
            <el-col :md="16">
              <el-card>
                <div slot="header">About {{baseInfo.name}}</div>
                <div class="statistic-container">
                  <el-row :gutter="10">
                    <el-col :md="12">
                      <div class="statistic-card">
                        <div class="statistic-content">
                          <div class="statistic-num">{{baseInfo.paperCount}}</div>
                          <div class="statistic-type">Total Published Papers</div>
                        </div>
                        <div class="statistic-icon">
                          <el-icon class="el-icon-document"></el-icon>
                        </div>
                      </div>
                    </el-col>
                    <el-col :md="12">
                      <div class="statistic-card">
                        <div class="statistic-content">
                          <div class="statistic-num">{{baseInfo.citationCount}}</div>
                          <div class="statistic-type">Citations</div>
                        </div>
                        <div class="statistic-icon">
                          <el-icon class="el-icon-paperclip"></el-icon>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="statistic-container">
                  <el-row :gutter="10">
                    <el-col :md="12">
                      <div class="statistic-card">
                        <div class="statistic-content">
                          <div
                            class="statistic-num"
                          >{{parseFloat(Number(statisticInfo.hindex).toFixed(1))}}</div>
                          <div>H-Index</div>
                        </div>
                        <div class="statistic-icon">
                          <el-tooltip
                            effect="light"
                            style="margin:4px"
                            content="h指数是一个人发表的所有学术论文中有N篇论文分别被引用了至少N次，是衡量一个人的研究成果及其引用影响的作者级指标"
                            placement="bottom"
                          >
                            <el-link
                              target="_blank"
                              icon="el-icon-info"
                              :underline="false"
                              href="https://explore.researchgate.net/display/support/h-index"
                            ></el-link>
                          </el-tooltip>
                        </div>
                      </div>
                    </el-col>
                    <el-col :md="12">
                      <div class="statistic-card">
                        <div class="statistic-content">
                          <div
                            class="statistic-num"
                          >{{parseFloat(Number(statisticInfo.gindex).toFixed(1))}}</div>
                          <div>G-Index</div>
                        </div>
                        <div class="statistic-icon">
                          <el-tooltip
                            effect="light"
                            style="margin:4px"
                            content="将论文按照被引次数降序排序，被引次数按序号叠加，当累计被引次数等于序号的平方时，该序号值即为g指数"
                            placement="bottom"
                          >
                            <el-icon class="el-icon-info"></el-icon>
                          </el-tooltip>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
              <el-card class="card-container">
                <div slot="header">Research Domains Ranking</div>
                <div>
                  <domain-pie height="300px" :data="domainStatistics"></domain-pie>
                </div>
              </el-card>
            </el-col>
            <el-col :md="8">
              <el-card>
                <div slot="header">Recent Papers</div>
                <div class="recent-paper-container">
                  <div class="recent-paper-item" v-for="(item, index) in recentPapers" :key="index">
                    <el-link type="primary" @click="openArticle(item.id)">{{item.title}}</el-link>
                    <el-link
                      icon="el-icon-date"
                      :underline="false"
                      style="float:right"
                    >{{String(item.chronDate).substr(0,4)}}</el-link>
                  </div>
                </div>
              </el-card>
              <el-card class="card-container">
                <div slot="header">Conferences Attendance</div>
                <div>
                  <conference-pie height="400px" :data="conferenceStatistics"></conference-pie>
                </div>
              </el-card>
              <el-card class="card-container">
                <div slot="header">Top co-authors</div>
                <div class="co-author-item" v-for="(item, index) in coAuthorList" :key="index">
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                  <div class="co-author-base">
                    <div>
                      <el-link
                        :underline="false"
                        type="primary"
                        class="co-author-name"
                        @click="openAuthor(item.id)"
                      >{{item.name}}</el-link>
                    </div>
                    <el-link
                      :underline="false"
                      icon="el-icon-school"
                      @click="openAffiliation(item.affiliationId)"
                    >{{item.affiliationName}}</el-link>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Papers" name="papers">
        <component v-if="currentTab!==null" :is="currentTab" searchType="author_name" :searchId="String(authorId)"></component>
      </el-tab-pane>
      <el-tab-pane label="SchGraph" name="graph">
        <component v-if="currentTab2!==null" :is="currentTab2" :keyword="keyword"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// const PaperList = resolve => require(['./PaperListPage.vue'], resolve);
import PaperList from "@/components/Article/LiteratureList";
import AuthorGraphPage from "./AuthorGraphPage";
import DomainPie from "@/components/Author/DomainsPieGraph";
import ConferencePie from "@/components/Author/ConferencePieGraph";
import { mapState } from "vuex";
export default {
  name: "AuthorPage",
  components: {
    DomainPie,
    ConferencePie
  },
  data() {
    return {
      activeName: "overview",
      type: "author_name",
      authorId: this.$route.query.id,
      baseInfo: {},
      statisticInfo: {},
      recentPapers: [],
      domainStatistics: [],
      coAuthorList: [],
      currentTab: null,
      currentTab2: null,
      loading: true
    };
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    }),
    keyword() {
      return { type: "author_name", id: this.authorId };
    },
    conferenceStatistics() {
      return [
        { count: this.statisticInfo.asePaperNum, name: "ASE" },
        { count: this.statisticInfo.icsePaperNum, name: "ICSE" }
      ];
    }
  },
  watch: {
    $route: "refreshData"
  },
  methods: {
    refreshData(newVal, oldVa) {
      this.init();
    },
    init(){
      this.authorId = this.$route.query.id;
      this.activeName= "overview";
      this.getAuthorBaseInfo();
      this.getAuthorStatisticsInfo();
      this.getRecentPapers();
      this.getTopCoAuthors();
      this.getDomainStatistics();
    },
    getAuthorBaseInfo() {
      const id = this.authorId;
      this.$get("/author/info", {
        id: id
      }).then(r => {
        if (r.data.status) {
          this.baseInfo = r.data.result;
        } else {
          this.$message({
            showClose: true,
            message: r.data.result,
            type: "warning"
          });
        }
      });
    },
    getAuthorStatisticsInfo() {
      const id = this.authorId;
      this.$get("/author/statistics", {
        id: id
      }).then(r => {
        if (r.data.status) {
          this.statisticInfo = r.data.result;
        } else {
          this.$message({
            showClose: true,
            message: r.data.result,
            type: "warning"
          });
        }
      });
    },
    getRecentPapers() {
      const id = this.authorId;
      const limit = 5;
      this.$get("/paper/affiliation/recently/publish", {
        id: id,
        limit: limit
      }).then(r => {
        if (r.data.status) {
          this.recentPapers = r.data.result;
        } else {
          this.$message({
            showClose: true,
            message: r.data.result,
            type: "warning"
          });
        }
      });
    },
    getTopCoAuthors() {
      const id = this.authorId;
      const limit = 5;
      this.$get("/author/partner", {
        id: id,
        limit: limit
      }).then(r => {
        if (r.data.status) {
          this.coAuthorList = r.data.result;
        } else {
          this.$message({
            showClose: true,
            message: r.data.result,
            type: "warning"
          });
        }
      });
    },
    openArticle(id) {
      this.openDetailPage("article", id);
    },
    openAuthor(id) {
      this.openDetailPage("author", id);
    },
    openAffiliation(id) {
      this.openDetailPage("affiliation", id);
    },
    openDomain(id) {
      this.openDetailPage("keyword", id);
    },
    openDetailPage(detailType, queryId) {
      const detailPath = {
        author: "/authorDetail",
        keyword: "/keywordDetail",
        affiliation: "/affiliationDetail",
        article: "/articleDetail"
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
    },
    handleClick(tab, event) {
      // console.log(tab, event);
      switch (tab.name) {
        case "papers":
          this.currentTab = PaperList;
          break;
        case "graph":
          this.currentTab2 = AuthorGraphPage;
          break;
        default:
          break;
      }
    },
    getDomainStatistics() {
      const id = this.authorId;
      const limit = 5;
      this.$get("/statistics/author/hot/term", {
        id: id,
        limit: limit
      })
        .then(r => {
          if (r.data.status) {
            this.domainStatistics = r.data.result;
            setTimeout(() => {
              this.loading = false;
            }, 500);
          } else {
            this.$message({
              showClose: true,
              message: r.data.result,
              type: "warning"
            });
            this.loading = false;
          }
        })
        .catch(e => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
@base-interval: 20px;
@statistic-font-size: 20px;
@border-color: #ebeef5;
@statistic-color: #ebeef5;
.statistic-container {
  padding: 8px;
  .statistic-card {
    border: 1px solid @border-color;
    padding: 20px;
    display: flex;
    align-items: center;
    background-color: @statistic-color;
    .statistic-content {
      align-items: flex-start;
      flex: 3;
      .statistic-num {
        font-size: @statistic-font-size;
        margin-bottom: 10px;
      }
      .statistic-type {
        font-size: 14px;
      }
    }
    .statistic-icon {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }
  }
}
.main-container {
  .author-header {
    display: flex;
    padding-bottom: @base-interval;
    align-items: center;
    .author-base {
      flex: 1 0;
      margin-left: @base-interval;
      margin-top: @base-interval;
      .author-name {
        font-size: 30px;
      }
    }
  }
  .co-author-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    .co-author-base {
      flex: 1 0;
      margin-left: 8px;
      .co-author-name {
        font-size: 16px;
      }
    }
  }
  .card-container {
    margin-top: @base-interval;
  }
}
</style>
