<template>
    <div class="home">
        <div class="welcome">{{welcomeMessage}}</div>

        <search-box @do-search="doSearch"></search-box>

        <el-row :gutter="120" style="margin: 0 40px;margin-top:60px">
            <el-col :md="12">
                <HotCard :title="heatAuthors" @open-page="openDetailPage"/>
            </el-col>

            <el-col :md="12">
                <HotCard :title="heatWords" @open-page="openDetailPage"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import GlobalFooter from '../common/GlobalFooter';
    import GlobalNav from '../common/GlobalNavigator';
    import SearchBox from './SearchBox';
    import HotCard from './HotCard';
    import {mapState} from 'vuex';
    import db from '../../utils/localstorage';

    const heatAuthors = '发表论文数作者排行';
    const heatWords = '文献关键词热度排行';

    export default {
        name: 'Home',
        components: {
            GlobalFooter,
            GlobalNav,
            SearchBox,
            HotCard: HotCard
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
            doSearch (params) {
              // console.log(params);
                this.$router.push({
                    path: '/searchRes',
                    query: {
                      search_condition: JSON.stringify(params)
                    }
                });
            },
            openDetailPage (detailType, queryId) {
                const detailPath = {
                    'author': '/authorDetail',
                    'affiliation': '/affiliationDetail',
                    'keyword': '/keywordDetail'
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
                        message: '亲爱的游客，请先登录哟！',
                        type: 'warning'
                    });
                }
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

        .welcome {
            margin-bottom: 20px;
            text-align: center;
            font-size: 24px;
        }
    }
</style>
