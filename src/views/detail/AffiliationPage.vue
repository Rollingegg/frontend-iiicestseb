<template>
    <div class="main-container">
        <div class="affiliation-header">
            <el-avatar :size="96" src="static\img\NJU.jpg"></el-avatar>
            <div class="affiliation-base">
                <div class="affiliation-name">{{baseInfo.name}}</div>
            </div>
        </div>

        <el-tabs v-model="activeName"
                 type="border-card"
                 @tab-click="handleClick"
                 class="main-container">

            <el-tab-pane label="Overview" name="overview">
                <affiliation-overview-pane :base-info="baseInfo"
                                           :affiliation-id="Number(affiliationId)"
                                           @clickItem="openDetailPage"/>
            </el-tab-pane>

            <el-tab-pane label="Members" name="members">
                <el-row :gutter="20">
                    <el-col :md="16">
                        <div class="one-line">
                            <div>Members ({{baseInfo.authorNum}})</div>
                        </div>
                        <div v-for="(item, index) in totalMembers" :key="index" class="member-item">
                            <div class="one-line">
                                <div>
                                    <el-link type="primary" @click="openDetailPage('author', item.id)">{{item.name}}
                                    </el-link>
                                </div>
                                <div>
                                    <el-icon class="el-icon-user-solid"></el-icon>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :md="8">
                        <div class="one-line">
                            <div>Filter in Results</div>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>

            <el-tab-pane label="Papers" name="papers">
                <component :is="paperListTab"
                           searchType="affiliation_name"
                           :isById="true"
                           :searchId="Number(affiliationId)"
                />
            </el-tab-pane>

            <el-tab-pane label="SchGraph" name="graph">
                <component :is="SchGraphTab"
                           searchType="affiliation_name"
                           :searchId="Number(affiliationId)"
                />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import PaperList from "@/components/paper/PaperListWrapper";
    import SchGraph from "@/components/graphs/SchGraph";
    import DomainPie from "@/components/Author/DomainsPieGraph";
    import AffiliationOverviewPane from "@/components/Affiliation/AffiliationOverviewPane";
    import {mapState} from "vuex";

    export default {
        name: "AffiliationPage",
        components: {
            AffiliationOverviewPane,
            DomainPie,
        },
        data () {
            return {
                activeName: "overview",
                affiliationId: this.$route.query.id,
                baseInfo: {},
                totalMembers: [],
                SchGraphTab: null,
                paperListTab: null,
            };
        },
        mounted () {
            this.affiliationId = this.$route.query.id;
            this.getAffiliationBaseInfo();
            this.getAllMembers();
        },
        computed: {
            ...mapState({
                user: state => state.account.user
            }),
            keyword () {
                return {type: "affiliation_name", id: this.affiliationId};
            }
        },
        methods: {
            getAffiliationBaseInfo () {
                const id = this.affiliationId;
                this.$get("/affiliation/info", {
                    id: id
                }).then(r => {
                    if (r.data.status) {
                        this.baseInfo = r.data.result;
                    } else {
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                });
            },
            getAllMembers () {
                const id = this.affiliationId;
                this.$get("/author/allin/affiliation", {
                    id: id
                }).then(r => {
                    if (r.data.status) {
                        this.totalMembers = r.data.result;
                    } else {
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                });
            },
            openDetailPage (detailType, queryId) {
                const detailPath = {
                    author: "/authorDetail",
                    keyword: "/keywordDetail",
                    affiliation: "/affiliationDetail",
                    article: "/articleDetail"
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
                        message: "亲爱的游客，请先登录哟！",
                        type: "warning"
                    });
                }
            },
            handleClick (tab) {
                switch (tab.name) {
                    case "papers":
                        this.paperListTab = PaperList;
                        break;
                    case "graph":
                        this.SchGraphTab = SchGraph;
                        break;
                    default:
                        break;
                }
            },

        }
    };
</script>

<style lang="less" scoped>
    @base-interval: 20px;
    @statistic-font-size: 20px;
    @border-color: #ebeef5;
    .one-line {
        display: flex;
        height: 35px;
        -webkit-box-pack: justify;
        justify-content: space-between;
        line-height: 35px;
        font-size: 16px;
    }

    .main-container {
        .affiliation-header {
            display: flex;
            padding-bottom: @base-interval;
            align-items: center;

            .affiliation-base {
                flex: 1 0;
                margin-left: @base-interval;

                .affiliation-name {
                    font-size: 30px;
                }
            }
        }

        .member-item {
            border-bottom: 1px solid gainsboro;
        }

        .recent-paper-item {
            margin-bottom: 5px;
            display: flex;
            justify-content: space-between;
        }

        .card-container {
            margin-top: @base-interval;
        }

        .hot-author-container {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: @base-interval;

            .hot-author-item {
                margin-bottom: 5px;
                width: 50%;
                display: flex;
                align-items: center;
            }
        }
    }
</style>
