<template>
  <div class="main-container">
    <div class="affiliation-header">
      <el-avatar :size="96" src="static\img\NJU.jpg"></el-avatar>
      <div class="affiliation-base">
        <div class="affiliation-name">{{baseInfo.name}}</div>
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
                <div slot="header">Statistics</div>
                <div class="statistic-container">
                  <el-row :gutter="10">
                    <el-col :md="12">
                      <div class="statistic-card">
                        <div class="statistic-content">
                          <div class="statistic-num">{{baseInfo.paperNum}}</div>
                          <div class="statistic-type">Publications</div>
                        </div>
                        <div class="statistic-icon">
                          <el-icon class="el-icon-document"></el-icon>
                        </div>
                      </div>
                    </el-col>
                    <el-col :md="12">
                      <div class="statistic-card">
                        <div class="statistic-content">
                          <div class="statistic-num">{{baseInfo.authorNum}}</div>
                          <div class="statistic-type">Members</div>
                        </div>
                        <div class="statistic-icon">
                          <el-icon class="el-icon-user"></el-icon>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
              <el-card class="card-container">
                <div slot="header">Research Domains Ranking</div>
                <div>
                  <domain-pie height="600px" :data="domainStatistics"></domain-pie>
                </div>
              </el-card>
            </el-col>
            <el-col :md="8">
              <el-card>
                <div slot="header">Most Influenced Authors</div>
                <div class="hot-author-container">
                  <div
                    class="hot-author-item"
                    v-for="(item, index) in hotAuthors.slice(0,4)"
                    :key="index"
                  >
                    <el-avatar icon="el-icon-user-solid"></el-avatar>
                    <div style="margin-left:5px">
                      <el-link
                        :underline="false"
                        style="font-size:16px"
                        @click="openAuthor(item.id)"
                      >{{item.name}}</el-link>
                      <div class="hot-author-description">
                        <el-tooltip effect="light" content="H-Index" placement="bottom">
                          <span style="margin-left:5px">
                            <i class="fa fa-signal"></i>
                            {{item.hindex}}
                          </span>
                        </el-tooltip>
                        <el-tooltip effect="light" content="发表论文数" placement="bottom">
                          <span style="margin-left:5px">
                            <i class="fa fa-file"></i>
                            {{item.paperNum}}
                          </span>
                        </el-tooltip>
                      </div>
                    </div>
                  </div>
                </div>
                <active-author-graph height="150px" :data="hotAuthors"></active-author-graph>
              </el-card>
              <el-card class="card-container">
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
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Members" name="members">
        <el-row :gutter="20">
          <el-col :md="16">
            <div class="one-line">
              <div>Members ({{baseInfo.authorNum}})</div>
            </div>
            <div v-for="(item, index) in totalMembers" :key="index" class="member-item">
              <div class="one-line">
                <div>
                  <el-link type="primary" @click="openAuthor(item.id)">{{item.name}}</el-link>
                </div>
                <div>
                  <el-icon class="el-icon-user"></el-icon>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :md="8">
            <div class="one-line">
              <div>Filter in Results</div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Papers" name="papers">
        <component v-if="currentTab2!==null" :is="currentTab2" searchType="affiliation_name" :searchId="affiliationId"></component>
      </el-tab-pane>
      <el-tab-pane label="SchGraph" name="graph">
        <component v-if="currentTab3!==null" :is="currentTab3" :keyword="keyword"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PaperList from "@/components/Article/LiteratureList";
import AuthorGraphPage from "../author/AuthorGraphPage";
import DomainPie from "@/components/Author/ConferencePieGraph";
import ActiveAuthorGraph from "@/components/Affiliation/ActiveAuthorGraph";
import { mapState } from "vuex";
export default {
  name: "AffiliationPage",
  components: {
    DomainPie,
    ActiveAuthorGraph
  },
  data() {
    return {
      activeName: "overview",
      affiliationId: this.$route.query.id,
      baseInfo: {},
      recentPapers: [],
      totalMembers: [],
      domainStatistics: [],
      currentTab3: null,
      currentTab2: null,
      loading: true,
      hotAuthors: []
    };
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    }),
    keyword() {
      return { type: "affiliation_name", id: this.affiliationId };
    }
  },
  methods: {
    getAffiliationBaseInfo() {
      const id = this.affiliationId;
      this.$get("/affiliation/info", {
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
    getRecentPapers() {
      const id = this.affiliationId;
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
    getAllMembers() {
      const id = this.affiliationId;
      this.$get("/author/allin/affiliation", {
        id: id
      }).then(r => {
        if (r.data.status) {
          this.totalMembers = r.data.result;
        } else {
          this.$message({
            showClose: true,
            message: r.data.result,
            type: "warning"
          });
        }
      });
    },
    getActiveMembers() {
      const id = this.affiliationId;
      const limit = 1000;
      this.$get("/author/hotin/affiliation", {
        id: id,
        limit: limit
      }).then(r => {
        if (r.data.status) {
          this.hotAuthors = r.data.result;
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
      switch (tab.name) {
        case "papers":
          this.currentTab2 = PaperList;
          break;
        case "graph":
          this.currentTab3 = AuthorGraphPage;
          break;
        default:
          break;
      }
    },
    getDomainStatistics() {
      const id = this.affiliationId;
      const limit = 10;
      this.$get("/statistics/affiliation/hot/term", {
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
    this.affiliationId = this.$route.query.id;
    this.getAffiliationBaseInfo();
    this.getRecentPapers();
    this.getAllMembers();
    this.getActiveMembers();
    this.getDomainStatistics();
  }
};
</script>

<style lang="less" scoped>
@base-interval: 20px;
@statistic-font-size: 20px;
@border-color: #ebeef5;
.one-line {
  display: flex;
  height: 35px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  line-height: 35px;
  font-size: 16px;
}
.statistic-container {
  padding: 8px;
  .statistic-card {
    border: 1px solid @border-color;
    padding: 20px;
    display: flex;
    align-items: center;
    background-color: @border-color;
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
  .affiliation-header {
    display: flex;
    padding-bottom: @base-interval;
    align-items: center;
    .affiliation-base {
      flex: 1 0;
      margin-left: @base-interval;
      .affiliation-name {
        font-size: 30px;
      }
    }
  }
  .member-item {
    border-bottom: 1px solid gainsboro;
  }
  .recent-paper-item {
    margin-bottom: 5px;
  }
  .card-container {
    margin-top: @base-interval;
  }
  .hot-author-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: @base-interval;
    .hot-author-item {
      margin-bottom: 5px;
      width: 50%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
