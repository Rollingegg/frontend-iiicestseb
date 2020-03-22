<template>
    <a-card :loading="loading" :title="title" >
        <div class="info-infinite-container" :infinite-scroll-distance="10">
            <a-list
                itemLayout="horizontal"
                :dataSource="authorList"
                loadMore
                v-if="String(title).indexOf('作者')!==-1">
                <a-list-item slot="renderItem" slot-scope="item" key="item.name">
                    <a-list-item-meta :description="item.affiliationName">
                        <a-button type="primary" slot="title" @click="searchByAuthor">{{item.name}}</a-button>
                        <a-avatar slot="avatar" icon="user"/>
                    </a-list-item-meta>
                    <span>发表文章数<h2 id="p-num">{{item.publishNum}}</h2></span>
                </a-list-item>
            </a-list>

            <a-list
                itemLayout="horizontal"
                :dataSource="wordList"
                v-else-if="String(title).indexOf('关键词')!==-1">
                <a-list-item slot="renderItem" slot-scope="item" key="item.word">
                    <a-list-item-meta>
                        <a-button type="primary" size="large" slot="title" @click="searchByTerm">{{item.word}}</a-button>
                    </a-list-item-meta>
                    <span>关键词热度<h2 id="p-hot">{{item.hot}}</h2></span>
                </a-list-item>
            </a-list>
        </div>
    </a-card>
</template>

<script>
    const limit = 6;
    export default {
        name: 'Card',
        created () {
            this.$get('statistics/hotTerms', {
                num: limit
            }).then((r) => {
                if (r.data.status) {
                    this.wordList = r.data.result;
                } else {
                    this.wordList = {};
                }
            }).catch((e) => {
                this.wordList = {};
            });
            this.$get('/statistics/maxPublishAuthor', {
                num: limit
            }).then((r) => {
                if (r.data.status) {
                    this.authorList = r.data.result;
                } else {
                    this.authorList = {};
                }
            }).catch((e) => {
                this.authorList = {};
            });
        },
        data () {
            return {
                loading: false,
                authorList: {},
                wordList: {}
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
            searchByAuthor (button) {
                this.doSearch('author_name', button.toElement.textContent);
            },
            searchByTerm (button) {
                this.doSearch('term', button.toElement.textContent);
            },
            doSearch (queryType, queryString) {
                this.$router.push({
                path: '/searchRes',
                query: {
                queryType: queryType,
                queryString: queryString
                }
                });
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
