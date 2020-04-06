<template>
  <div v-loading="loading" element-loading-background="rgba(255,255,255,0.95)">
    <el-row :gutter="20">
      <el-col :md="16">
        <el-card>
          <div slot="header" class="graph-card-header">学术关系图谱</div>
          <div v-if="searchType==='author_name'">
            <author-partner-graph height="300px" :data="authorPartnerGraphData"></author-partner-graph>
            <author-affiliation-graph height="300px" :data="authorAffiliationGraphData"></author-affiliation-graph>
          </div>
          <div v-if="searchType==='affiliation_name'">
            <!-- <affiliation-paper-term-graph height="600px" :data="affiliationPaperTermGraphData"></affiliation-paper-term-graph> -->
          </div>
        </el-card>
      </el-col>
      <el-col :md="8">
        <el-card>
          <div slot="header" class="graph-card-header">研究领域词云</div>
          <component :is="cg1" height="600px" :data="domainStatistics"></component>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="card-container">
      <component :is="cg2" height="300px" :tableData="papersPublishPerYear"></component>
    </el-card>
  </div>
</template>

<script>
import PaperStatisticGraph from "@/components/graphs/PaperStatisticGraph";
import TermWordCloud from "@/components/Author/TermWordCloud";
import AuthorPartnerGraph from "@/components/Author/AuthorPartnerGraph";
import AuthorAffiliationGraph from "@/components/Author/AuthorAffiliationGraph";
import AffiliationPaperTermGraph from "@/components/Affiliation/AffiliationPaperTermGraph";
export default {
  name: "AuthorGraphPage",
  data() {
    return {
      cg1: null,
      cg2: null,
      cg3: null,
      papersPublishPerYear: [],
      limit: 1000,
      searchId: "",
      searchType: "",
      loading: true,
      domainStatistics: [],
      authorPartnerGraphData: {},
      authorAffiliationGraphData: {},
      affiliationPaperTermGraphData: {}
    };
  },
  components: {
    AuthorPartnerGraph,
    AuthorAffiliationGraph,
    AffiliationPaperTermGraph
  },
  props: {
    keyword: Object
  },
  methods: {
    getPublishStatistics() {
      const pathsMap = {
        affiliation_name: "/statistics/affiliation/publish/count/per/year",
        author_name: "/statistics/author/publish/count/per/year",
        term: "/statistics/term/count/per/year"
      };
      const searchPath = pathsMap[this.searchType];
      const id = this.searchId;
      this.$get(searchPath, {
        id: id
      }).then(r => {
        if (r.data.status) {
          this.papersPublishPerYear = r.data.result;
        } else {
          this.$message({
            showClose: true,
            message: r.data.result,
            type: "warning"
          });
        }
      });
    },
    getDomainStatistics() {
      const pathsMap = {
        affiliation_name: "/statistics/affiliation/hot/term",
        author_name: "/statistics/author/hot/term"
      };
      const searchPath = pathsMap[this.searchType];
      const id = this.searchId;
      this.$get(searchPath, {
        id: id,
        limit: this.limit
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
    },
    getAuthorPartners() {
      const id = this.searchId;
      this.$get("/author/graph/partner", {
        id: id,
        limit: this.limit
      }).then(r => {
        if (r.data.status) {
          this.authorPartnerGraphData = r.data.result;
        } else {
          this.$message({
            showClose: true,
            message: r.data.result,
            type: "warning"
          });
        }
      });
    },
    getAuthorAffiliationPartners() {
      const id = this.searchId;
      this.$get("/author/graph/affiliation", {
        id: id,
        limit: this.limit
      }).then(r => {
        if (r.data.status) {
          this.authorAffiliationGraphData = r.data.result;
        } else {
          this.$message({
            showClose: true,
            message: r.data.result,
            type: "warning"
          });
        }
      });
    },
    getAffiliationPaperTermGraphData() {
      const id = this.searchId;
      this.$get("/author/graph/partner", {
        id: id,
        limit: this.limit
      }).then(r => {
        if (r.data.status) {
          this.affiliationPaperTermGraphData = r.data.result;
        } else {
          this.$message({
            showClose: true,
            message: r.data.result,
            type: "warning"
          });
        }
      });
    },
    initGraphData() {
      this.getPublishStatistics();
      this.getDomainStatistics();
      if (this.searchType === "author_name") {
        this.getAuthorPartners();
        this.getAuthorAffiliationPartners();
      }else if(this.searchType === "affiliation_name"){
        // this.getAffiliationPaperTermGraphData();
      }
      this.cg2 = PaperStatisticGraph;
      this.cg1 = TermWordCloud;
    },
    initParams(keyword) {
      this.searchType = this.keyword["type"];
      this.searchId = this.keyword["id"];
    }
  },
  mounted() {
    this.initParams();
    this.initGraphData();
  }
};
</script>

<style lang="less" scoped>
@base-interval: 20px;
.card-container {
  margin-top: @base-interval;
}
.graph-card-header {
  font-size: 24px;
}
</style>