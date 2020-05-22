<template>
    <common-echart :height="height"
                   :options="options"
                   chartId="Affiliation-Of-TermGraph"
                   width="100%"
    />
</template>

<script>
    import CommonEchart from "../common/CommonEchart";

    /**
     * @description 关键词的机构排行图
     * @param {String} height 图高度
     * @param {Array} affiliation_times_data 数据
     * @version 1.0
     * @author dwxh
     * @see CommonEchart Echart包装
     */
    export default {
        name: "AffiliationOfTermGraph",
        components: {
            CommonEchart
        },
        props: {
            height: String,
            affiliation_times_data: Array
        },
        computed: {
            options () {
                const barColor = "#409EFF";
                let chartName = [];
                let chartData = [];

                let yMax = 0;
                for (let i = 0; i < this.affiliation_times_data.length; i += 1) {
                    chartData.push(this.affiliation_times_data[i].paperNum);
                    chartName.push(this.affiliation_times_data[i].name);
                    yMax = chartData[i];
                }

                let yMaxArr = []; // 全部都是最大值, 做图形的底部灰色打底
                for (let i = 0; i < chartData.length; i += 1) {
                    yMaxArr.push(yMax);
                }

                return {
                    tooltip: {
                        trigger: "axis",
                        backgroundColor: "#ccc",
                        textStyle: {
                            color: "#404a84"
                        },
                        formatter: "{a1}: {c1}"
                    },
                    legend: {
                        textStyle: {
                            color: "#ccc"
                        }
                    },
                    xAxis: {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: barColor,
                                width: 2,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                                shadowBlur: 10
                            }
                        },
                        show: true,
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: [
                        {
                            type: "category",
                            data: chartData,
                            inverse: true,
                            splitLine: {
                                show: false
                            },
                            show: false
                        },
                        {
                            // 第二个y轴 为了让数据在右侧末尾显示
                            show: false,
                            inverse: true,
                            data: chartData,
                            nameTextStyle: {},
                            axisLine: {
                                lineStyle: {
                                    color: barColor,
                                    width: 2
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    fontSize: 12, //坐标轴名称的大小
                                    color: barColor // 坐标轴名称的颜色
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            type: "pictorialBar",
                            symbol: "roundRect", // 类型
                            yAxisIndex: 0,
                            barWidth: 10,
                            itemStyle: {
                                normal: {
                                    color: "#ccc"
                                }
                            },
                            label: {
                                normal: {
                                    position: "right"
                                }
                            },
                            symbolRepeat: true,
                            symbolRotate: "45",
                            symbolSize: [15, 4],
                            symbolMargin: 4,
                            data: yMaxArr
                        },
                        {
                            name: "发表数量",
                            type: "pictorialBar",
                            symbol: "roundRect",
                            itemStyle: {
                                normal: {
                                    color: barColor
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: "#c8c8c8", // 颜色
                                        fontSize: 16
                                    },
                                    position: "left"
                                }
                            },
                            barWidth: 10,
                            symbolRepeat: true,
                            symbolRotate: "45",
                            symbolSize: [15, 4],
                            symbolMargin: 4,
                            data: chartData
                        },
                        {
                            show: true,
                            type: "bar",
                            // xAxisIndex: 1, //代表使用第二个X轴刻度
                            barGap: "-100%",
                            barWidth: "25%",
                            data: chartData,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 200,
                                    color: barColor
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: [0, "-20"],
                                    textStyle: {
                                        fontSize: 14,
                                        color: "blue"
                                    },
                                    formatter: function (data) {
                                        return chartName[data.dataIndex];
                                    }
                                }
                            }
                        }
                    ]
                };
            }
        }
    };
</script>

