<template>
    <common-echart chartId="paper-year-graph"
                   :height="height"
                   width="100%"
                   :options="options"/>
</template>

<script>
    import CommonEchart from "../common/CommonEchart";

    /**
     * @description 论文-年柱图
     * @param {String} height 图高度
     * @param {String} searchId 主体id
     * @param {String} searchType 主体类型
     * @param {String} barWidth 可选，柱宽度
     * @version 1.0
     * @author dwxh
     * @see CommonEchart Echart包装
     */
    export default {
        components: {
            CommonEchart
        },
        data () {
            return {
                optionData: {},
                yearBase: "2010",
                yearEnd: "2020",
                tableData: []
            };
        },
        props: {
            height: String,
            searchId: Number,
            searchType: String,
            barWidth: {
                type: String,
                required: false,
                default: "60"
            }
        },
        watch: {
            searchId () {
                this.getPublishStatistics();
            }
        },
        mounted () {
            this.getPublishStatistics();
        },
        methods: {
            getPublishStatistics () {
                const pathsMap = {
                    affiliation_name: "/statistics/affiliation/publish/count/per/year",
                    author_name: "/statistics/author/publish/count/per/year",
                    term: "/statistics/term/count/per/year"
                };
                this.$get(pathsMap[this.searchType], {
                    id: this.searchId
                }).then(r => {
                    if (r.data.status) {
                        this.tableData = r.data.result;
                    } else {
                        this.$message({
                            showClose: true,
                            message: r.data.result,
                            type: "warning"
                        });
                    }
                });
            }
        },
        computed: {
            category () {
                let dottedBase = Number(this.yearBase);
                let dottedEnd = Number(this.yearEnd);
                let category = [];
                while (dottedBase < dottedEnd) {
                    category.push(String(dottedBase));
                    dottedBase++;
                }
                return category;
            },
            barData () {
                let length = Number(this.yearEnd) - Number(this.yearBase);
                let barData = new Array(length).fill(0);
                this.tableData.forEach(item => {
                    barData[Number(item.year) - Number(this.yearBase)] = Number(item.count);
                });
                return barData;
            },
            options () {
                const textColor = "#000";
                const backgroundColor = "#fff";
                const barColor1 = "#145aa3";
                const barColor2 = "#409EFF";
                return {
                    backgroundColor: backgroundColor,
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow"
                        }
                    },
                    legend: {
                        data: ["papers"],
                        textStyle: {
                            color: textColor,
                            fontSize: "24"
                        }
                    },
                    xAxis: {
                        data: this.category,
                        axisLine: {
                            lineStyle: {
                                color: textColor
                            }
                        }
                    },
                    yAxis: {
                        splitLine: {show: false},
                        type: 'value',
                        minInterval: 1
                    },
                    series: [
                        {
                            name: "papers",
                            type: "bar",
                            barWidth: this.barWidth,
                            itemStyle: {
                                barBorderRadius: 5,
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {offset: 0, color: barColor1},
                                    {offset: 1, color: barColor2}
                                ])
                            },
                            data: this.barData
                        }
                    ]
                };
            }
        }
    };
</script>
