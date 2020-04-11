<template>
  <div>
    <div :class="className" :id="chartId" :ref="chartId" :style="{height:height,width:width}"></div>
  </div>
</template>

<script>
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
      charts: null
    };
  },
  methods: {
    initChart() {
      let charts = this.$echarts.init(this.$refs[this.chartId]);
      charts.setOption(this.options, true);
      window.addEventListener("resize", function() {
        charts.resize();
      });
      this.charts = charts;
      let that=this;
      this.charts.on('click',function(param){
        that.$emit('on-click-echart',param);
      });
    }
  },
  mounted() {
    // this.initChart();
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        if (this.charts) {
          if (newVal) {
            console.log("update");
            this.charts.setOption(newVal);
            window.addEventListener("resize", function() {
              this.charts.resize();
            });
          } else {
            this.charts.setOption(oldVal);
            window.addEventListener("resize", function() {
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
