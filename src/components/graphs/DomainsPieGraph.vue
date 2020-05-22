<template>
    <div>
        <common-echart chartId="domain-pie-graph"
                       :height="height" width="100%"
                       :options="options"
                       @on-click-echart="handleClickEchart"/>
    </div>
</template>

<script>
    import CommonEchart from "../common/CommonEchart";
    import PieBackgroundImage from "../../../static/img/pie.jpg"

    /**
     * @description 关键词饼图
     * @param {String} height 图高度
     * @param {Array} data 关键词组
     * @version 1.0
     * @author dwxh
     * @see CommonEchart 最近发布文章
     * @event on-click-term 点击关键词，需要进行页面跳转 <br/>- {Number} 关键词id
     */
    export default {
        components: {
            CommonEchart
        },
        props: {
            height: String,
            data: Array
        },
        methods: {
            handleClickEchart (param) {
                this.$emit('on-click-term', param.data.termId);
            }
        },
        computed: {
            optionData () {
                let arr = [];
                this.data.forEach(item => {
                    arr.push({value: item.count, name: item.name, termId: item.id});
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
                let piePatternSrc = PieBackgroundImage;
                let piePatternImg = new Image();
                piePatternImg.src = piePatternSrc;
                let itemStyle = {
                    normal: {
                        opacity: 0.7,
                        color: {
                            image: piePatternImg,
                            repeat: 'repeat'
                        },
                        borderWidth: 3,
                        borderColor: '#235894'
                    }
                };
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
                            name: "Domains",
                            type: "pie",
                            selectedMode: "single",
                            selectedOffset: 30,
                            clockwise: true,
                            label: {
                                fontSize: 18,
                                color: "#235894"
                            },
                            labelLine: {
                                lineStyle: {
                                    color: "#235894"
                                }
                            },
                            data: this.optionData,
                            itemStyle: itemStyle
                        },
                    ]
                };
            }
        }
    };
</script>

<style>
</style>
