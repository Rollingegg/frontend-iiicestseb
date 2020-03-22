<template>
  <div class="home">
    <el-row style="margin-top:10px">
      <el-col :span="24" style="text-align:center">
        <div style="font-size: 20px;color: #ffffff">{{welcomeMessage}}</div>
      </el-col>
    </el-row>

    <search-box @do-simple-search="doSimpleSearch"></search-box>

    <a-row type="flex" justify="space-around" style="margin-top:50px">
      <a-col :span="10">
        <Card :title="heatAuthors" />
      </a-col>

      <a-col :span="10">
        <Card :title="heatWords" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import GlobalFooter from '../common/GlobalFooter';
import GlobalNav from '../common/GlobalNavigator';
import SearchBox from './SearchBox';
import Card from './HotCard';
import { mapState } from 'vuex';
import db from '../../utils/localstorage';

const heatAuthors = '发表论文数作者排行';
const heatWords = '文献关键词热度排行';

export default {
  name: 'Home',
  components: {
    GlobalFooter,
    GlobalNav,
    SearchBox,
    Card
  },
  data () {
    return {
      welcomeMessage: '',
      heatAuthors: heatAuthors,
      heatWords: heatWords
    };
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    })
  },
  props: {},
  created () {
    db.remove('RESULT');
  },
  methods: {
    doSimpleSearch (queryType, queryString) {
      this.$router.push({
        path: '/searchRes',
        query: {
          queryType: queryType,
          queryString: queryString
        }
      });
    },
    welcome () {
      const date = new Date();
      const hour = date.getHours();
      let time =
        hour < 6
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour <= 18
          ? '下午好'
          : '晚上好';
      let welcomeArr = [
        '喝杯咖啡休息下吧☕',
        '要不要和朋友打局LOL',
        '要不要和朋友打局王者荣耀',
        '几天没见又更好看了呢😍',
        '今天又写了几个Bug🐞呢',
        '今天在群里吹水了吗',
        '今天吃了什么好吃的呢',
        '今天您微笑了吗😊',
        '今天帮助别人解决问题了吗',
        '准备吃些什么呢',
        '周末要不要去看电影？'
      ];
      let index = Math.floor(Math.random() * welcomeArr.length);
      let username = '游客';
      if (this.user.username) {
        username = this.user.username;
      }
      return `${time}，${username}，${welcomeArr[index]}`;
    }
  },
  mounted () {
    this.welcomeMessage = this.welcome();
  }
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
}
</style>
