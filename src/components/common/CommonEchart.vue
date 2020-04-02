<template>
  <div>
      <div :class="className" :id="chartId" :style="{height:height,width:width}">
      </div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
    props: {
        className: String,
        chartId: String,
        height: String,
        width: String,
        options: Object
    },
    data() {
        return {
            charts: ''
        }
    },
    methods: {
        initChart(){
            this.charts=echarts.init(document.getElementById(this.chartId));
            this.charts.setOption(this.options);
        }
    },
    mounted() {
        this.$nextTick(function() {
        this.initChart();
        let that = this;
        let resizeTimer = null;
        window.onresize = function() {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
            that.initChart();
            }, 100);
        };
        });
    }
}
</script>

<style>

</style>