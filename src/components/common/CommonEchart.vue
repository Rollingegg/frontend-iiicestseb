<template>
  <div>
    <div
      :class="className"
      :id="chartId"
      :ref="chartId"
      :style="{height:height,width:width}"
    ></div>
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
      charts: null,
    };
  },
  methods: {
    initChart() {
      let charts = this.$echarts.init(this.$refs[this.chartId]);
      charts.setOption(this.options, true);
      this.charts = charts;
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
          } else {
            this.charts.setOption(oldVal);
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