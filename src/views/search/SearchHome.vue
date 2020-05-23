<template>
    <div>
        <el-row :gutter="120" style="margin: 0 40px;margin-top:60px">
            <el-col :md="12">
                <hot-card title="发表论文数作者排行" :search-type="1" @open-page="openDetailPage"/>
            </el-col>

            <el-col :md="12">
                <hot-card title="文献关键词热度排行" :search-type="2" @open-page="openDetailPage"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import HotCard from '@/components/search/HotCard';
    import {mapState} from 'vuex';
    import db from '@/utils/localstorage';

    /**
     * @description 系统默认展示的主页面，显示推荐内容
     * @see HotCard
     * @event showWelcome 该页面需要展示欢迎信息<br/>- true
     * @version 1.0
     * @author dwxh
     */
    export default {
        name: 'SearchHome',
        components: {
            HotCard
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
