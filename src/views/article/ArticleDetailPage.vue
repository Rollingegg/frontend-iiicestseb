<template>
  <div>
    <el-row>
      <el-col :md="16" class="col-container">
        <div class="one-line">Article Detail</div>
        <div class="main-container">
          <el-card shadow="always">
            <div class="info-container">
              <div class="art-title">{{article.title}}</div>
              <div class="author">
                <el-link v-for="(item, index) in article.authors" :key="index" @click="openAuthor(item.name)">{{item.name}}</el-link>
              </div>
              <div class="author">
                <span>Affiliations</span>
                <el-link v-for="(item, index) in affiliations" :key="index" @click="openAffiliation(item)">{{item}}</el-link>
              </div>
              <el-divider></el-divider>
              <el-row class="info-row">
                <el-col :md="4">Publication</el-col>
                <el-col :md="20">
                  <el-link :href="article.pubLink" target="_blank" class="pub-link">{{article.publication}}</el-link>
                </el-col>
              </el-row>
              <el-row class="info-row">
                <el-col :md="4">DOI</el-col>
                <el-col :md="20">{{article.doi}}</el-col>
              </el-row>
              <el-row class="info-row">
                <el-col :md="4">Publisher</el-col>
                <el-col :md="20">{{article.publisher.toUpperCase()}}</el-col>
              </el-row>
              <el-row class="info-row">
                <el-col :md="4">Page Range</el-col>
                <el-col :md="20">{{article.startPage}} / {{article.endPage}}</el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row class="info-row">
                <el-col :md="4">Keywords</el-col>
                <el-col :md="20">
                  <el-button
                    size="mini"
                    type="primary"
                    v-for="(item, index) in keywords"
                    :key="index"
                    class="info-button"
                    @click="openDomain(item)"
                  >{{item}}</el-button>
                </el-col>
              </el-row>
              <el-row class="info-row">
                <el-col :md="4">Abstract</el-col>
                <el-col :md="20">{{article.abstract}}</el-col>
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
                    v-bind:href="article.pdfLink"
                    class="link"
                >[{{article.pdfLink}}]</el-link>
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
      </el-col>
      <el-col :md="8" class="col-container">
        <div class="one-line">Reference ({{referenceList.length}})</div>
        <div class="list-container">
          <el-card v-for="(item, index) in referenceList" :key="index" class="item-container">
            <div>
                <div class="ref-title">{{item.title}}</div>
                <el-link
                    target="_blank"
                    type="primary"
                    icon="el-icon-s-opportunity"
                    :href="item.googleScholarLink"
                >View More in Google Scholar</el-link>
                <div class="ref-text">{{item.text}}</div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
function uniq (array) {
  let temp = [];
  let index = [];
  let l = array.length;
  for (let i = 0; i < l; i++) {
    for (let j = i + 1; j < l; j++) {
      if (array[i] === array[j]) {
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
  name: 'ArticlePage',
  data () {
    return {
      articleId: '',
      article: {
        title:
          'Statistical Errors in Software Engineering Experiments: A Preliminary Literature Review',
        authors: [
          {
            name: 'Rolando P. Reyes Ch.',
            affiliation: 'Univ. Politec. de Madrid, Madrid, Spain',
            firstName: 'Rolando P.',
            lastName: 'Reyes Ch.'
          },
          {
            name: 'Oscar Dieste',
            affiliation: 'Univ. Politec. de Madrid, Madrid, Spain',
            firstName: 'Oscar',
            lastName: 'Dieste'
          },
          {
            name: 'Efra\u00edn R. Fonseca C.',
            affiliation: '',
            firstName: 'Efra\u00edn R.',
            lastName: 'Fonseca C.'
          },
          {
            name: 'Natalia Juristo',
            affiliation: 'Univ. Politec. de Madrid, Madrid, Spain',
            firstName: 'Natalia',
            lastName: 'Juristo'
          }
        ],
        abstract:
          'Background: Statistical concepts and techniques are often applied incorrectly, even in mature disciplines such as medicine or psychology. Surprisingly, there are very few works that study statistical problems in software engineering (SE). Aim: Assess the existence of statistical errors in SE experiments. Method: Compile the most common statistical errors in experimental disciplines. Survey experiments published in ICSE to assess whether errors occur in high quality SE publications. Results: The same errors as identified in others disciplines were found in ICSE experiments, where 30 of the reviewed papers included several error types such as: a) missing statistical hypotheses, b) missing sample size calculation, c) failure to assess statistical test assumptions, and d) uncorrected multiple testing. This rather large error rate is greater for research papers where experiments are confined to the validation section. The origin of the errors can be traced back to: a) researchers not having sufficient statistical training, and b) a profusion of exploratory research. Conclusions: This paper provides preliminary evidence that SE research suffers from the same statistical problems as other experimental disciplines. However, the SE community appears to be unaware of any shortcomings in its experiments, whereas other disciplines work hard to avoid these threats. Further research is necessary to find the underlying causes and set up corrective measures, but there are some potentially effective actions and are a priori easy to implement: a) improve the statistical training of SE researchers, and b) enforce quality assessment and reporting guidelines in SE publications.',
        keywords: [
          {
            type: 'IEEE Keywords',
            kwd: [
              'Software engineering',
              'Bibliographies',
              'Training',
              'Guidelines',
              'Error analysis',
              'Back'
            ]
          },
          {
            type: 'INSPEC: Controlled Indexing',
            kwd: [
              'psychology',
              'research and development',
              'software engineering',
              'statistical testing'
            ]
          },
          {
            type: 'INSPEC: Non-Controlled Indexing',
            kwd: [
              'software engineering experiments',
              'SE experiments',
              'high quality SE publications',
              'ICSE experiments',
              'statistical hypotheses',
              'statistical test assumptions',
              'SE community',
              'SE researchers',
              'quality assessment',
              'statistical errors',
              'statistical training',
              'SE research'
            ]
          },
          {
            type: 'Author Keywords ',
            kwd: [
              'Literature review',
              'Survey',
              'Prevalence',
              'Statistical errors'
            ]
          }
        ],
        publication:
          '2018 IEEE/ACM 40th International Conference on Software Engineering (ICSE)',
        doi: '10.1145/3180155.3180161',
        pdfLink: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=8453201',
        articleId: '8453201',
        startPage: '1195',
        endPage: '1206',
        pubLink: 'https://ieeexplore.ieee.org/xpl/conhome/8452039/proceeding',
        issueLink:
          'https://ieeexplore.ieee.org/xpl/tocresult.jsp?isnumber=8453044',
        publisher: 'IEEE',
        confLoc: 'Gothenburg, Sweden',
        pubYear: '2018',
        metrics: {
          citationCountPaper: 0,
          citationCountPatent: 0,
          totalDownloads: 84
        }
      },
      referenceList: [
        {
          order: '1',
          text:
            '<em>Configuration error brings down the Azure cloud platform</em>,  [online]  Available: http://www.evolven.com/blog/configuration-error-brings-down-the-azure-cloud-platform.html.',
          title: 'Configuration error brings down the Azure cloud platform',
          googleScholarLink:
            'https://scholar.google.com/scholar?as_q=Configuration+error+brings+down+the+Azure+cloud+platform&as_occt=title&hl=en&as_sdt=0%2C31'
        },
        {
          order: '2',
          text:
            '<em>DejaGnu</em>,  [online]  Available: http://www.gnu.org/software/dejagnu/.',
          title: 'DejaGnu',
          googleScholarLink:
            'https://scholar.google.com/scholar?as_q=DejaGnu&as_occt=title&hl=en&as_sdt=0%2C31'
        },
        {
          order: '3',
          text:
            '<em>DNS misconfiguration</em>,  [online]  Available: http://www.circleid.com/posts/misconfiguration_brings_down_entire_se_domain_in_sweden.',
          title: 'DNS misconfiguration',
          googleScholarLink:
            'https://scholar.google.com/scholar?as_q=DNS+misconfiguration&as_occt=title&hl=en&as_sdt=0%2C31'
        },
        {
          order: '4',
          text:
            '<em>Firefox web browser</em>,  [online]  Available: http://hg.mozilla.org.',
          title: 'Firefox web browser',
          googleScholarLink:
            'https://scholar.google.com/scholar?as_q=Firefox+web+browser&as_occt=title&hl=en&as_sdt=0%2C31'
        }
      ]
    };
  },
  computed: {
    affiliations () {
        // TODO 需要提取机构ID
      let affiliations = [];
      this.article.authors.forEach(item => {
        affiliations.push(item.affiliation);
      });
      return uniq(affiliations);
    },
    keywords () {
      let kwd = [];
      if (
        this.article.keywords !== undefined &&
        this.article.keywords.length > 0
      ) {
        kwd = this.article.keywords[0].kwd;
      }
      return kwd;
    },
    ...mapState({
      user: state => state.account.user
    })
  },
  methods: {
    getArticleDetail (id) {
      this.articleId = id;
      // TODO 发送请求获取文章的详情信息
      console.log(id);
    },
    openAuthor (id) {
        // TODO 把调用方法处的传入参数改为id
      this.openDetailPage('author',id);
    },
    openAffiliation (id) {
        // TODO 把调用方法处的传入参数改为id
      this.openDetailPage('affiliation',id);
    },
    openDomain (id) {
        // TODO 把调用方法处的传入参数改为id
      this.openDetailPage('keyword',id);
    },
    openDetailPage(detailType,queryId){
      const detailPath={'author':'/authorDetail','keyword':'/keywordDetail','affiliation':'/affiliationDetail'};
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
  },
  created () {
    let id = this.$route.query.id;
    this.getArticleDetail(id);
  }
};
</script>

<style lang="less" scoped>
@label-font-size: 24px;
@label-height: 36px;
@label-color: white;
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
    .info-container {
      .art-title {
        font-size: @label-font-size;
      }
      .author {
        * {
          font-size: @detail-font-size;
          margin: 5px 30px 5px 0;
          height: @space-interval;
        }
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
    }
    .link-container {
      margin-top: @space-interval;
      .doc-link{
        font-size: @label-font-size;
      }
      .link{
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
