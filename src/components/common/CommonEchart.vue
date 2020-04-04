<template>
  <div>
    <div
      :class="className"
      :id="chartId"
      :ref="chartId"
      :style="{height:height,width:width}"
      :loading="loading"
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
      loading: true,
      initCnt: 0
    };
  },
  methods: {
    initChart() {
      this.loading = true;
      let charts = this.$echarts.init(this.$refs[this.chartId]);
      charts.setOption(this.options, true);
      this.charts = charts;
      this.loading = false;
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