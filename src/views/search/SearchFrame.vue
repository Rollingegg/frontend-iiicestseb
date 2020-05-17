<template>
    <div class="home">
        <div class="welcome" v-show="isSearchMainPage">{{welcomeMessage}}</div>

        <search-box @do-search="doSearch"/>

        <router-view @showWelcome="showWelcome"/>
    </div>
</template>

<script>
    import SearchBox from '@/components/search/SearchBox';
    import {mapState} from 'vuex';

    /**
     * @description 检索框架页面，引入了搜索框，通过 *子页面* 引入 **推荐页面** 和 **搜索结果页面**
     * @see SearchBox
     * @event do-search 用户点击检索按钮<br/>- json: 检索条件
     * @version 1.0
     * @author dwxh
     */
    export default {
        name: 'SearchMain',
        components: {
            SearchBox,
        },
        mounted () {
            this.welcome();
        },
        data () {
            return {
                welcomeMessage: '',
                isSearchMainPage: true
            };
        },
        computed: {
            ...mapState({
                user: state => state.account.user
            })
        },
        methods: {
            doSearch (params) {
                this.$router.push({
                    path: '/searchFrame/searchResult',
                    query: {
                        search_condition: JSON.stringify(params)
                    }
                });
            },
            showWelcome (isSearchMainPage) {
                this.isSearchMainPage = isSearchMainPage;
                if (isSearchMainPage) {
                    this.welcome();
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
                this.welcomeMessage = `${time}，${username}，${welcomeArr[index]}`;
            }
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
