<template>
        <div :class="className"
             :id="chartId"
             :ref="chartId"
             :style="{height:height,width:width}"/>
</template>

<script>
    /**
     * @description echart包装
     * @param {String} height 图高度
     * @param {String} width 图宽度
     * @param {String} id 生成的组件id
     * @param {String} className 生成的类名
     * @param {Object} options 图片选项
     * @version 1.0
     * @author dwxh
     * @event on-click-echart 点击关键词，需要进行页面跳转 <br/>- {Number} 关键词id
     */
    export default {
        props: {
            className: String,
            chartId: String,
            height: String,
            width: String,
            options: Object
        },
        data () {
            return {
                charts: null
            };
        },
        methods: {
            initChart () {
                let charts = this.$echarts.init(this.$refs[this.chartId]);
                charts.setOption(this.options, true);
                window.addEventListener("resize", function () {
                    charts.resize();
                });
                this.charts = charts;
                let that = this;
                this.charts.on('click', function (param) {
                    that.$emit('on-click-echart', param);
                });
            }
        },
        watch: {
            options: {
                handler (newVal, oldVal) {
                    if (this.charts) {
                        if (newVal) {
                            console.log("update");
                            this.charts.setOption(newVal);
                            window.addEventListener("resize", function () {
                                this.charts.resize();
                            });
                        } else {
                            this.charts.setOption(oldVal);
                            window.addEventListener("resize", function () {
                                this.charts.resize();
                            });
                        }
                    } else {
                        this.initChart();
                    }
                },
                deep: true
            }
        }
    };
</script>

<style>
</style>
