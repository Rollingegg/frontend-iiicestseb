<template>
    <common-echart chartId="affiliation-paper-term-graph"
                   :height="height"
                   width="100%"
                   :options="options"/>
</template>

<script>
    import CommonEchart from "../common/CommonEchart";

    /**
     * @description 机构和论文关键字图谱
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
                if (this.data.vertexes) {
                    this.data.vertexes.forEach(node => {
                        let isPaper = node.type === "paper";
                        let isCenter = node.id === this.data.centerId;
                        let maxSize = 50;
                        let symbolSize = (id => {
                            if (id === this.data.centerId) {
                                return maxSize;
                            } else if (isPaper) {
                                return node.size > 0.5 ? maxSize / 5 : (node.size * maxSize) / 10;
                            }
                            // rank++;
                            return (node.size * maxSize);
                        })(node.id);
                        let title = isPaper ? node.content.title : node.name;
                        nodes.push({
                            name: node.id,
                            symbolSize: symbolSize,
                            category: isCenter ? 0 : isPaper ? 1 : 2,
                            title: title,
                            des:
                                `<div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px">${title}</div>` +
                                (isCenter
                                    ? ``
                                    : isPaper
                                        ? `被引数数：${
                                            node.content.citationCountPaper
                                                ? node.content.citationCountPaper
                                                : 0
                                        }<br/>发表年份：${node.content.chronDate}`
                                        : ``),
                            label: {
                                show: symbolSize > 20,
                                formatter: function (x) {
                                    return x.data.title;
                                }
                            }
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
                    {name: "中心机构"},
                    {
                        name: "发表文章",
                        itemStyle: {
                            color: "rgba(64,158,255, 0.5)"
                        }
                    },
                    {
                        name: "研究领域",
                        itemStyle: {
                            color: "#E6A23C"
                        }
                    }
                ];
                return {
                    title: {
                        text: "Research Domains Exploration",
                        subtext: "注：距离越近代表研究领域相关性越强",
                        textStyle: {
                            fontSize: 20
                        },
                        bottom: 0,
                        left: 0
                    },
                    legend: [
                        {
                            data: categories.map(function (a) {
                                return a.name;
                            })
                        }
                    ],
                    chartId: this.chartId,
                    backgroundColor: 'white',
                    toolbox: {
                        feature: {
                            myFull: {
                                show: true,
                                title: "全屏查看",
                                icon:
                                    "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
                                onclick: function (e) {
                                    console.log(e.option.value);
                                    const element = document.getElementById(e.option.chartId);
                                    if (element.requestFullScreen) {
                                        // HTML W3C 提议
                                        element.requestFullScreen();
                                    } else if (element.msRequestFullscreen) {
                                        // IE11
                                        element.msRequestFullScreen();
                                    } else if (element.webkitRequestFullScreen) {
                                        // Webkit (works in Safari5.1 and Chrome 15)
                                        element.webkitRequestFullScreen();
                                    } else if (element.mozRequestFullScreen) {
                                        // Firefox (works in nightly)
                                        element.mozRequestFullScreen();
                                    }
                                    // 退出全屏
                                    if (element.requestFullScreen) {
                                        document.exitFullscreen();
                                    } else if (element.msRequestFullScreen) {
                                        document.msExitFullscreen();
                                    } else if (element.webkitRequestFullScreen) {
                                        document.webkitCancelFullScreen();
                                    } else if (element.mozRequestFullScreen) {
                                        document.mozCancelFullScreen();
                                    }
                                }
                            }
                        }
                    },
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: "quinticInOut",
                    tooltip: {
                        formatter: function (params) {
                            if (params.data.source) {
                                return String(params.data.source).split("-")[0] === "affiliation"
                                    ? "发表"
                                    : "相关";
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
