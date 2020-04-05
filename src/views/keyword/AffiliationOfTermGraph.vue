<template>
    <div>
        <common-echart chartId="Affiliation-Of-TermGraph" :height="height" width="100%" :options="options"/>
    </div>
</template>

<script>
    import CommonEchart from "@/components/common/CommonEchart";

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
                let chartName = [];
                let chartData = [];

                for (let i = 0; i < this.affiliation_times_data.length; i += 1) {
                    //todo:push实际的出现数量
                    chartData.push(50 - i);
                    chartName.push(this.affiliation_times_data[i].name);
                    yMax = chartData[i];
                }
                let yMax = 55;

                let yMaxArr = []; // 全部都是最大值, 做图形的底部灰色打底
                for (let i = 0; i < chartData.length; i += 1) {
                    yMaxArr.push(yMax);
                }

                return {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            // type: 'none', // 去除鼠标移入的时候的阴影/竖线等
                        },
                        backgroundColor: '#ccc', // 浮层的文本背景
                        textStyle: {
                            color: '#404a84', // 浮层的文本颜色
                        },
                        // formatter: '{a0}: {c0}<br />{a1}: {c1}'
                        formatter: '{a} : {c}', //浮层内容格式 a: series中的name c 数据值
                    },
                    legend: {
                        textStyle: {
                            color: '#ccc'
                        },
                    },
                    xAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: 'blue'
                            }
                        },
                        show: true,
                        splitLine: {
                            show: false
                        },
                    },
                    yAxis: [{ // 第二个y轴 为了让数据在右侧末尾显示
                        show: true,
                        inverse: true,
                        data: chartData,
                        nameTextStyle: {},// 坐标轴名称的文字样式。 官网上是这样的解释, 但是 我试了这个并不能改变坐标轴的文字样式
                        axisLabel: {
                            textStyle: {
                                fontSize: 12, //坐标轴名称的大小
                                color: 'blue', // 坐标轴名称的颜色
                            },
                        },
                    }],
                    series: [{
                        name: '我是打底',
                        type: 'pictorialBar',
                        symbol: 'rect', // 类型
                        yAxisIndex: 0,
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                color: '#ccc',
                            }
                        },
                        label: {
                            normal: {
                                position: 'right',
                            }
                        },
                        symbolRepeat: true,
                        symbolRotate: '45',
                        symbolSize: [12, 4],
                        symbolMargin: 4,
                        data: yMaxArr,
                    }, {
                        name: '我是上层方块',
                        type: 'pictorialBar',
                        symbol: 'rect',
                        itemStyle: {
                            normal: {
                                color: 'red'
                            }
                        },
                        label: {
                            normal: {
                                show: true, // 数据大小的显示, 100 200 300
                                textStyle: {
                                    color: '#000000', // 颜色
                                },
                                position: 'right',
                            },
                        },
                        barWidth: 10,
                        symbolRepeat: true,
                        symbolRotate: '45',
                        symbolSize: [12, 4],
                        symbolMargin: 4,
                        data: chartData,
                    },
                        // 数据条--------------------我是分割线君------------------------------//
                        {
                            show: true,
                            type: 'bar',
                            // xAxisIndex: 1, //代表使用第二个X轴刻度
                            barGap: '-100%',
                            barWidth: '10%',
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 200,
                                    color: 'yellow'
                                    // color: 'rgba(22,203,115,0.05)' //数据条柱状图的填充颜色,, 一开始我的有一点点背景颜色
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: [0, '-20'],
                                    textStyle: {
                                        fontSize: 14,
                                        color: 'pink',
                                    },
                                    formatter: function (data) {
                                        return chartName[data.dataIndex];
                                    }
                                }
                            },
                            data: chartData
                        }
                    ]
                }

            }
        }
    }
</script>

<style scoped>

</style>
