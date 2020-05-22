<template>
    <common-echart chartId="conference-pie-graph"
                   :height="height"
                   width="100%"
                   :options="options"/>
</template>

<script>
    import CommonEchart from "../common/CommonEchart";

    /**
     * @description 论文-会议饼图
     * @param {String} height 图高度
     * @param {Array} tableData 数据
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
            data: Array
        },
        computed: {
            optionData () {
                let arr = [];
                this.data.forEach(item => {
                    arr.push({value: item.count, name: item.name});
                });
                return arr;
            },
            categories () {
                let arr = [];
                this.data.forEach(item => {
                    arr.push(item.name);
                });
                return arr;
            },
            options () {
                return {
                    tooltip: {
                        trigger: "item",
                        formatter: '<div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px">{b}</div>Published Papers: {c} ({d}%)'
                    },
                    legend: {
                        orient: "horizontal",
                        x: "left",
                        data: this.categories
                    },
                    series: [
                        {
                            name: "Conferences",
                            type: "pie",
                            radius: ["50%", "70%"],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: "center"
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: "30",
                                        fontWeight: "bold"
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: this.optionData
                        }
                    ]
                };
            }
        }
    };
</script>

<style>
</style>
