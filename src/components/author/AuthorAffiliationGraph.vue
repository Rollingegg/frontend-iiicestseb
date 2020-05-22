<template>
    <common-echart chartId="author-partner-graph"
                   :height="height"
                   width="100%"
                   :options="options"/>
</template>

<script>
    import CommonEchart from "../common/CommonEchart";

    /**
     * @description 作者和同机构作者关系图
     * @param {String} height 图高度
     * @param {Array} data 数据
     * @version 1.0
     * @author dwxh
     * @see CommonEchart Echart包装
     */
    export default {
        components: {
            CommonEchart
        },
        props: {
            height: String,
            data: Object
        },
        computed: {
            nodes () {
                let nodes = [];
                let maxSize = 50;
                if (this.data.vertexes) {
                    this.data.vertexes.forEach(node => {
                        let collaborateImg = "image://static/icon/author.png";
                        let authorImg = "image://static/icon/KeyAuthor.png";
                        let affiliationImg = "image://static/icon/affiliation.png";
                        let isCenterAuthor = node.id === this.data.centerId;
                        let isAuthor = node.type === "author";
                        let symbolSize = isCenterAuthor || !isAuthor ? maxSize : maxSize / 5;
                        nodes.push({
                            name: node.id,
                            symbolSize: symbolSize,
                            category: isCenterAuthor ? 0 : isAuthor ? 1 : 2,
                            des:
                                `<div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px">${node.name}</div>` +
                                (isAuthor
                                    ? `发表文章数：${node.content.paperCount ? node.content.paperCount : 0}<br/>评分：${node.content.score}`
                                    : ""),
                            symbol: isCenterAuthor
                                ? authorImg
                                : isAuthor
                                    ? collaborateImg
                                    : affiliationImg
                        });
                    });
                }
                return nodes;
            },
            edges () {
                let edges = [];
                if (this.data.edges) {
                    this.data.edges.forEach(edge => {
                        edges.push({
                            source: edge.source,
                            target: edge.target,
                            weight: edge.weight
                        });
                    });
                }
                return edges;
            },
            options () {
                let categories = [
                    {name: "该作者"},
                    {name: "合作者"},
                    {name: "机构"}
                ];
                return {
                    title: {
                        text: "Subordinated Relationship",
                        textStyle: {
                            fontSize: 20
                        },
                        top: 0,
                        left: 0
                    },
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: "quinticInOut",
                    tooltip: {
                        formatter: function (params) {
                            if (params.data.source) {
                                return "隶属";
                            } else {
                                return params.data.des;
                            }
                        }
                    },
                    series: [
                        {
                            type: "graph",
                            layout: "force",
                            data: this.nodes,
                            links: this.edges,
                            categories: categories,
                            // 聚焦点及其相邻边
                            focusNodeAdjacency: true,
                            roam: true,
                            draggable: true,
                            force: {
                                repulsion: 1000,
                                edgeLength: 100
                            },
                            lineStyle: {
                                width: 4,
                                color: "source"
                            },
                            itemStyle: {
                                borderColor: "#fff",
                                borderWidth: 1,
                                shadowBlur: 10,
                                shadowColor: "rgba(0, 0, 0, 0.3)"
                            },
                            emphasis: {
                                label: {
                                    position: "inside",
                                    show: false
                                }
                            }
                        }
                    ]
                };
            }
        },
        methods: {},
        mounted () {
        }
    };
</script>
