<template>
  <el-card shadow="always" :loading="loading">
    <div class="card-head-title" slot="header">{{title}}</div>
    <div class="info-infinite-container" :infinite-scroll-distance="10">
      <div v-if="String(title).indexOf('作者')!==-1" class="card-list">
        <div class="card-list-item" v-for="(item, index) in authorList" :key="index">
          <div class="item-meta">
            <div class="item-avatar">
              <el-avatar icon="el-icon-user-solid"></el-avatar>
            </div>
            <div class="item-meta-content">
              <div class="item-meta-content-title">
                <el-link @click="openAuthor(item.name)" class="author-link">{{item.name}}</el-link>
              </div>
              <div class="item-meta-content-description">{{item.affiliationName}}</div>
            </div>
          </div>
          <div class="item-data">
            <span>
              发表文章数
              <div class="num">{{item.publishNum}}</div>
            </span>
          </div>
        </div>
      </div>
      <div v-else-if="String(title).indexOf('关键词')!==-1" class="card-list">
        <div class="card-list-item" v-for="(item, index) in wordList" :key="index">
          <div class="item-meta">
            <div class="item-meta-content">
              <div class="item-meta-content-title">
                <el-link :underline="false" @click="openTerm(item.word)" class="author-link">{{item.word}}</el-link>
              </div>
            </div>
          </div>
          <div class="item-data">
            <span>
              关键词热度
              <div class="num">{{item.hot}}</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
const limit = 6;
export default {
  name: "Card",
  created() {
    this.$get("statistics/hotTerms", {
      num: limit
    })
      .then(r => {
        if (r.data.status) {
          this.wordList = r.data.result;
        } else {
          this.wordList = {};
        }
      })
      .catch(e => {
        this.wordList = {};
      });
    this.$get("/statistics/maxPublishAuthor", {
      num: limit
    })
      .then(r => {
        if (r.data.status) {
          this.authorList = r.data.result;
        } else {
          this.authorList = {};
        }
      })
      .catch(e => {
        this.authorList = {};
      });
  },
  data() {
    return {
      loading: false,
      authorList: {},
      wordList: {}
    };
  },
  props: {
    title: {
      type: String,
      default() {
        return "发表文章最多的学者";
      }
    }
  },
  methods: {
    openAuthor(authorId) {
      this.$emit('open-page','author',authorId);
    },
    openTerm(keywordId) {
      this.$emit('open-page','keyword',keywordId);
    }
  }
};
</script>

<style lang="less">
@title-font-size: 24px;
@text-font-size: 14px;
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
  height: 600px;
  color: black;
  .card-list {
    .card-list-item {
      padding: 12px 0;
      display: flex;
      border-top: 1px solid #e8e8e8;
      align-items: center;
      .item-meta {
        align-items: flex-start;
        display: flex;
        flex: 3;
        .item-avatar {
          margin-right: 16px;
        }
        .item-meta-content {
          flex: 1 0;
          .item-meta-content-title {
            margin-bottom: 4px;
            .author-link {
              font-size: @title-font-size;
            }
          }
          .item-meta-content-description {
            line-height: 22px;
            font-size: @text-font-size;
            color: rgba(0, 0, 0, 0.65);
          }
        }
      }
      .item-data {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        .num {
          text-align: center;
          font-size: @title-font-size;
          color: rgba(0, 0, 0, 0.65);
        }
      }
    }
  }
}
</style>
