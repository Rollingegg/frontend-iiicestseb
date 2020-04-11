<template>
    <div>
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
    import HotCard from '@/components/search/HotCard';
    import {mapState} from 'vuex';
    import db from '@/utils/localstorage';

    const heatAuthors = '发表论文数作者排行';
    const heatWords = '文献关键词热度排行';

    export default {
        name: 'SearchHome',
        components: {
            HotCard
        },
        data () {
            return {
                heatAuthors: heatAuthors,
                heatWords: heatWords
            };
        },
        computed: {
            ...mapState({
                user: state => state.account.user
            })
        },
        created () {
            db.remove('RESULT');
            this.$emit('showWelcome', true);
        },
        methods: {
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
            }
        }
    };
</script>
