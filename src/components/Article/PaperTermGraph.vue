<template>
    <common-echart chartId="paper-term-graph"
                   :height="height"
                   width="100%"
                   :options="options"/>
</template>

<script>
    import CommonEchart from "../common/CommonEchart";

    export default {
        components: {
            CommonEchart
        },
        props: {
            height: String,
            data: Object
        },
        computed: {
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
                let nodes = [];
                let categories = [
                    {name: "中心文章"},
                    {
                        name: "关联文章",
                        itemStyle: {
                            color: "rgba(64,158,255, 0.5)"
                        }
                    }
                ];
                if (this.data.vertexes) {
                    let categoryIndex = 1; //初始下标是1
                    this.data.vertexes.forEach(node => {
                        let isPaper = node.type == "paper";
                        let isCenter = node.id == this.data.centerId;
                        let maxSize = 50;
                        let symbolSize = (id => {
                            if (id == this.data.centerId) {
                                return maxSize;
                            } else if (isPaper) {
                                return node.size > 0.5 ? maxSize / 5 : (node.size * maxSize) / 10;
                            }
                            return (node.size * maxSize) / 1.5;
                        })(node.id);
                        let title = isPaper ? node.content.title : node.name;
                        if (!isPaper) {
                            categoryIndex++;
                            categories.push({name: node.name});
                        }
                        nodes.push({
                            name: node.id,
                            symbolSize: symbolSize,
                            category: isCenter ? 0 : isPaper ? 1 : categoryIndex,
                            title: title,
                            des:
                                `<div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px">${title}</div>` +
                                (isPaper
                                    ? `被引数数：${
                                        node.content.cite ? node.content.cite : 0
                                    }<br/>评分：${node.content.score}`
                                    : ""),
                            label: {
                                show: symbolSize > 30,
                                formatter: function (x) {
                                    return x.data.title;
                                }
                            }
                        });
                    });
                }
                let seletedItem = {};
                const showLimit = 3;
                for (let i = 0; i < categories.length; i++) {
                    let key_name = categories[i].name;
                    seletedItem[key_name] = i <= showLimit + 1;
                }
                return {
                    title: {
                        text: "Literatures Relationship",
                        subtext: "注：文章之间的距离代表相关程度",
                        textStyle: {
                            fontSize: 20
                        },
                        top: 0,
                        left: 0
                    },
                    legend: [
                        {
                            data: categories.map(function (a) {
                                return a.name;
                            }),
                            orient: "vertical",
                            right: 0,
                            selected: seletedItem
                        }
                    ],
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: "quinticInOut",
                    tooltip: {
                        formatter: function (params) {
                            if (params.data.source) {
                                return `共涉及${Number(params.data.weight).toFixed(0)}次`;
                            } else {
                                return params.data.des;
                            }
                        }
                    },
                    series: [
                        {
                            type: "graph",
                            layout: "force",
                            data: nodes,
                            links: this.edges,
                            categories: categories,
                            // 聚焦点及其相邻边
                            focusNodeAdjacency: true,
                            roam: true,
                            draggable: true,
                            force: {
                                repulsion: 1000
                            },
                            lineStyle: {
                                width: 2,
                                color: "source",
                                curveness: 0.3
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
                                    show: true
                                }
                            }
                        }
                    ]
                };
            }
        }
    };
</script>

