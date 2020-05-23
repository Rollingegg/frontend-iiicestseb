<template>
    <div class="home">
        <div :class="{'homepage':isSearchMainPage}">
            <div class="welcome" v-show="isSearchMainPage">{{welcomeMessage}}</div>

            <SearchBox @do-search="doSearch"></SearchBox>

            <div v-show="isSearchMainPage" class="home-guide">
                <el-button size="large" icon="el-icon-arrow-down" type="primary" circle @click="scrollDown"></el-button>
            </div>
        </div>

        <router-view @showWelcome="showWelcome"/>
    </div>
</template>

<script>
    import SearchBox from '@/components/search/SearchBox';
    import {mapState} from 'vuex';

    export default {
        name: 'SearchMain',
        components: {
            SearchBox,
        },
        data() {
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
            doSearch(params) {
                this.$router.push({
                    path: '/searchFrame/searchResult',
                    query: {
                        search_condition: JSON.stringify(params)
                    }
                });
            },
            showWelcome(isSearchMainPage) {
                this.isSearchMainPage = isSearchMainPage;
                if (isSearchMainPage) {
                    this.welcome();
                }
            },
            welcome() {
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
            },
            scrollDown() {
                window.scrollTo({
                    top: window.screen.height - 220,
                    behavior: 'smooth'
                })
            }
        },
        mounted() {
            this.welcome();
        }
    };
</script>
<style lang="less" scoped>
    .home {
        display: flex;
        flex-direction: column;

        .welcome {
            margin: 20px 0 100px 0;
            text-align: center;
            font-size: 24px;
            color: white;
        }

        .homepage {
            margin: -20px;
            min-height: calc(100vh - 60px);
            background-color: #145aa3;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23ffffff' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23ffffff' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23e3eeeb' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23d7e6e6' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23c6ddd7' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23afcece' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23aaccc4' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%2387b6b6' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%238ebbb1' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%235e9e9f' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%2372aa9e' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%232c8788' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
            display: flex;
            flex-direction: column;
        }

        .home-guide {
            text-align: center;
            margin-top: calc(100vh - 320px);
            -webkit-animation: 1s shrinking infinite;
            background: transparent;
            @keyframes shrinking {
                40% {
                    transform: translateY(-5px);
                }
                80% {
                    transform: translateY(5px);
                }
            }

            &:hover {
                animation-play-state: paused;
            }
        }
    }
</style>
