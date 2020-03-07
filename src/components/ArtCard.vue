<template>
  <a-card hoverable :loading="loading" :title="title" style="width: 500px">
    <div class="info-infinite-container" :infinite-scroll-distance="10">
      <a-list
        itemLayout="horizontal"
        :dataSource="authorList"
        loadMore
        v-if="String(title).indexOf('作者')!==-1">
        <a-list-item slot="renderItem" slot-scope="item" key="item.name">
          <a-list-item-meta :description="item.affiliationName">
            <a-button type="text" slot="title" @click="queryAuthor">{{item.name}}</a-button>
            <a-avatar slot="avatar" icon="user" />
          </a-list-item-meta>
          <span>
            发表文章数
            <h1 id="p-num">{{item.publishNum}}</h1>
          </span>
        </a-list-item>
      </a-list>
      <a-list
        itemLayout="horizontal"
        :dataSource="wordList"
        v-else-if="String(title).indexOf('关键词')!==-1"
      >
        <a-list-item slot="renderItem" slot-scope="item" key="item.word">
          <a-list-item-meta>
            <a-button type="primary" slot="title" @click="queryAuthor">{{item.word}}</a-button>
            <a-avatar slot="avatar">W</a-avatar>
          </a-list-item-meta>
          <span>
            关键词热度
            <h1 id="p-num">{{item.hot}}</h1>
          </span>
        </a-list-item>
      </a-list>
    </div>
  </a-card>
</template>

<script>
// import infiniteScroll from 'vue-infinite-scroll';
const authors = [
  {
    name: '郝晓冬',
    affiliationName: '南京大学',
    publishNum: 100
  },
  {
    name: '郝晓冬',
    affiliationName: '南京大学',
    publishNum: 100
  },
  {
    name: '郝晓冬',
    affiliationName: '南京大学',
    publishNum: 100
  },
  {
    name: '郝晓冬',
    affiliationName: '南京大学',
    publishNum: 100
  },
  {
    name: '郝晓冬',
    affiliationName: '南京大学',
    publishNum: 100
  }
];
const words = [
  { word: '新型冠状病毒', hot: 500 },
  { word: '新冠肺炎', hot: 300 },
  { word: '文献综述', hot: 200 },
  { word: '外文文献', hot: 100 },
  { word: '人工智能', hot: 50 },
  { word: '大数据', hot: 40 },
  { word: '区块链', hot: 30 },
  { word: '自动化测试', hot: 20 }
];

export default {
  name: 'Card',
  data () {
    return {
      loading: false,
      authorList: authors,
      wordList: words
    };
  },
  props: {
    title: {
      type: String,
      default () {
        return '发表文章最多的学者';
      }
    }
  },
  methods: {
    queryAuthor (val) {
      console.log(val.toElement.textContent);
    }
  }
};
</script>

<style>
.ant-card-head-title {
  font-size: 24px;
}
.info-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 600px;
}
</style>
