<template>
    <div class="section-container">
        <div class="section">
            <div class="section-title">团队成员</div>
            <div class="section-card-container">
                <a href="https://github.com/D-Mer" target="_blank">
                    <el-card class="data-card"
                             :body-style="{ padding: '0px'}">
                        <img src="/static/img/team_avatar.jpg" class="card-image">
                        <div class="card-person-container">
                            <img style="width: 48px;height: 48px"
                                 src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                            <div class="card-person-info">
                                <div class="person-name">江辉</div>
                                <div class="person-des">后端工程师</div>
                            </div>
                        </div>
                    </el-card>
                </a>
                <a href="https://github.com/D-W-X" target="_blank">
                    <el-card class="data-card"
                             :body-style="{ padding: '0px'}">
                        <img src="/static/img/team_avatar.jpg" class="card-image">
                        <div class="card-person-container">
                            <img style="width: 48px;height: 48px"
                                 src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                            <div class="card-person-info">
                                <div class="person-name">郝晓冬</div>
                                <div class="person-des">全栈工程师</div>
                            </div>
                        </div>
                    </el-card>
                </a>
                <a href="https://github.com/Rollingegg" target="_blank">
                    <el-card class="data-card"
                             :body-style="{ padding: '0px'}">
                        <img src="/static/img/team_avatar.jpg" class="card-image">
                        <div class="card-person-container">
                            <img style="width: 48px;height: 48px"
                                 src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                            <div class="card-person-info">
                                <div class="person-name">赖伟健</div>
                                <div class="person-des">划水哥</div>
                            </div>
                        </div>
                    </el-card>
                </a>
                <a href="https://github.com/kennyfortune" target="_blank">
                    <el-card class="data-card"
                             :body-style="{ padding: '0px'}">
                        <img src="/static/img/team_avatar.jpg" class="card-image">
                        <div class="card-person-container">
                            <img style="width: 48px;height: 48px"
                                 src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                            <div class="card-person-info">
                                <div class="person-name">翁溥鸿</div>
                                <div class="person-des">后端大师</div>
                            </div>
                        </div>
                    </el-card>
                </a>
            </div>
        </div>
        <div class="section">
            <div class="section-title">技术栈</div>
            <div class="section-card-container">
                <a href="https://spring.io/projects/spring-boot" target="_blank">
                    <el-card class="data-card">
                        <div class="card-header">
                            <div class="card-header-title">Spring Boot</div>
                            <img style="width: 40px;height: 40px" src="https://spring.io/icon_144x144.png"/>
                        </div>
                        <div class="card-info-item">
                            Spring
                            Boot是由Pivotal团队提供的全新框架，其设计目的是用来简化新Spring应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。通过这种方式，Spring
                            Boot致力于在蓬勃发展的快速应用开发领域(rapid application development)成为领导者
                        </div>
                    </el-card>
                </a>
                <a href="https://cn.vuejs.org/" target="_blank">
                    <el-card class="data-card">
                        <div class="card-header">
                            <div class="card-header-title">Vue.js</div>
                            <img style="width: 40px;height: 40px"
                                 src="https://cn.vuejs.org/images/logo.png"/>
                        </div>
                        <div class="card-info-item">
                            Vue.js是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue
                            的核心库只关注视图层，并且非常容易学习，非常容易与其它库或已有项目整合。另一方面，Vue 完全有能力驱动采用单文件组件和Vue生态系统支持的库开发的复杂单页应用。
                        </div>
                    </el-card>
                </a>
                <a href="http://spark.apache.org/" target="_blank">
                    <el-card class="data-card">
                        <div class="card-header">
                            <div class="card-header-title">Spark</div>
                            <img style="width: 40px;height: 40px" src="https://sqoop.apache.org/favicon.ico"/>
                        </div>
                        <div class="card-info-item">
                            Apache Spark 是专为大规模数据处理而设计的快速通用的计算引擎。Spark是UC Berkeley AMP lab (加州大学伯克利分校的AMP实验室)所开源的类Hadoop
                            MapReduce的通用并行框架，Spark，拥有Hadoop MapReduce所具有的优点，可用来构建大型的、低延迟的数据分析应用程序。
                        </div>
                    </el-card>
                </a>

                <a href="https://element.eleme.cn/#/zh-CN" target="_blank">
                    <el-card class="data-card">
                        <div class="card-header">
                            <div class="card-header-title">ElementUI</div>
                            <img style="width: 40px;height: 40px"
                                 src="https://element.eleme.cn/favicon.ico"/>
                        </div>
                        <div class="card-info-item">
                            Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。使用前端框架封装的代码帮助工程师快速开发；
                            在线主题编辑器，可视化定制和管理站点主题、组件样式；下载相关资源，用其快速搭建页面原型或高保真视觉稿，提升产品设计效率
                        </div>
                    </el-card>
                </a>

                <a href="https://www.jenkins.io/zh/" target="_blank">
                    <el-card class="data-card">
                        <div class="card-header">
                            <div class="card-header-title">Jenkins</div>
                            <img style="width: 40px;height: 40px"
                                 src="https://www.jenkins.io/zh/sites/default/files/jenkins_favicon.ico"/>
                        </div>
                        <div class="card-info-item">
                            Jenkins是一个开源的、提供友好操作界面的持续集成(CI)工具，起源于Hudson（Hudson是商用的），主要用于持续、自动的构建/测试软件项目、监控外部任务的运行。
                            Jenkins用Java语言编写，可在Tomcat等流行的servlet容器中运行，也可独立运行。通常与版本管理工具(SCM)、构建工具结合使用。
                        </div>
                    </el-card>
                </a>

                <a href="https://scrapy.org/" target="_blank">
                    <el-card class="data-card">
                        <div class="card-header">
                            <div class="card-header-title">Scrapy</div>
                            <img style="width: 40px;height: 40px"
                                 src="https://scrapy.org/favicons/favicon-160x160.png"/>
                        </div>
                        <div class="card-info-item">
                            Scrapy是一个为了爬取网站数据，提取结构性数据而编写的应用框架。 可以应用在包括数据挖掘，信息处理或存储历史数据等一系列的程序中。
                            其最初是为了 页面抓取 (更确切来说, 网络抓取 )所设计的， 也可以应用在获取API所返回的数据(例如 Amazon Associates Web Services )
                            或者通用的网络爬虫
                        </div>
                    </el-card>
                </a>
            </div>
        </div>
        <div class="section">
            <div class="section-title">
                <a href="https://ieeexplore.ieee.org/Xplore/home.jsp" target="_blank">数据来源: IEEE</a></div>
            <div class="section-card-container">
                <el-card class="conf-card" v-for="(item,index) in conferenceList" :key="index">
                    <div class="card-header">
                        <div class="card-header-title">{{item.label}}</div>
                        <i class="fa fa-graduation-cap" aria-hidden="true" :style="{fontSize: '36px' }"/>
                    </div>
                    <div class="card-info-item">
                        <el-link :href="item.url"
                                 :underline="false"
                                 target="_blank">
                            {{item.name}}
                        </el-link>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'About',
        data() {
            return {
                conferenceList: [
                    {
                        label: 'ICSE',
                        name: 'International Conference on Software Engineering (ICSE)',
                        url: 'https://ieeexplore.ieee.org/xpl/conhome/1000691/all-proceedings'
                    },
                    {
                        label: 'ASE',
                        name: 'Automated Software Engineering (ASE)',
                        url: 'https://ieeexplore.ieee.org/xpl/conhome/1000064/all-proceedings'
                    },
                    {
                        label: 'CVPR',
                        name: 'Computer Vision and Pattern Recognition (CVPR)',
                        url: 'https://ieeexplore.ieee.org/xpl/conhome/1000147/all-proceedings'
                    },
                    {
                        label: 'ICCV',
                        name: 'Computer Vision (ICCV)',
                        url: 'https://ieeexplore.ieee.org/xpl/conhome/1000149/all-proceedings'
                    },
                    {
                        label: 'VTS',
                        name: 'VLSI Test Symposium',
                        url: 'https://ieeexplore.ieee.org/xpl/conhome/1000804/all-proceedings'
                    },
                    {
                        label: 'ICMLA',
                        name: 'International Conference on Machine Learning and Applications (ICMLA)',
                        url: 'https://ieeexplore.ieee.org/xpl/conhome/1001544/all-proceedings'
                    },
                    {
                        label: 'ISCA',
                        name: 'Annual International Symposium on Computer Architecture',
                        url: 'https://ieeexplore.ieee.org/xpl/conhome/1000123/all-proceedings'
                    },
                    {
                        label: 'ICIP',
                        name: 'IEEE International Conference Image Processing',
                        url: 'https://ieeexplore.ieee.org/xpl/conhome/1000349/all-proceedings'
                    },
                    {
                        label: 'DSN',
                        name: 'Dependable Systems and Networks',
                        url: 'https://ieeexplore.ieee.org/xpl/conhome/1000192/all-proceedings'
                    }
                ]
            }
        },
        methods: {
            open(url) {
                window.open(url)
            }
        }
    }
</script>

<style scoped lang="less">
    .section-container {
        .section {
            margin-bottom: 60px;

            .section-title {
                text-align: center;
                font-size: 30px;
                font-weight: 400;
                margin-bottom: 30px;
            }

            .section-card-container {
                display: flex;
                flex-direction: row;
                justify-content: center;
                flex-wrap: wrap;

                .data-card {
                    margin: 10px;
                    min-height: 260px;
                    width: 300px;
                    color: rgba(0, 0, 0, .6);
                    font-size: 16px;

                    &:hover {
                        cursor: pointer;
                        background-color: #1890ff;
                        color: #fff;
                        border: none;
                    }

                    .card-header {
                        display: flex;
                        justify-content: space-around;
                        margin: 10px 0;

                        .card-header-title {
                            line-height: 40px;
                            font-size: 24px;
                            font-weight: 700;
                            vertical-align: center;
                        }
                    }

                    .card-image {
                        width: 100%;
                        display: block;
                    }

                    .card-person-container {
                        padding: 10px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .card-person-info {
                            .person-name {
                                font-size: 20px;
                                font-weight: 600;
                            }

                            .person-des {
                                color: rgba(0, 0, 0, .45);
                            }
                        }
                    }

                    .card-info-item {
                        padding-bottom: 10px;
                    }
                }

                .conf-card {
                    margin: 10px;
                    width: 200px;
                    color: rgba(0, 0, 0, .6);
                    font-size: 16px;

                    .card-header {
                        display: flex;
                        justify-content: space-around;
                        margin: 10px 0;

                        .card-header-title {
                            line-height: 40px;
                            font-size: 24px;
                            font-weight: 700;
                            vertical-align: center;
                        }
                    }

                    .card-info-item {
                        text-align: center;
                        padding-bottom: 10px;
                    }
                }

            }
        }
    }
</style>
