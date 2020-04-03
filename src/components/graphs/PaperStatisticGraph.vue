<template>
  <el-card>
    <common-echart chartId="paper-statistic-graph" :height="height" width="100%" :options="options"></common-echart>
  </el-card>
</template>

<script>
import CommonEchart from "../common/CommonEchart";
export default {
  components: {
    CommonEchart
  },
  data() {
    return {
      options: {},
      optionData: {}
    };
  },
  props: {
    height: String
  },
  methods: {
    initOption() {
      let category = [];
      let dottedBase = this.$moment('2000');
      let date = this.$moment(dottedBase);
      let lineData = [];
      let barData = [];
      const myColor = '#ccc';

      for (let i = 0; i < 20; i++) {
        category.push(
          date.format('YYYY')
        );
        let b = Math.random() * 200;
        let d = Math.random() * 200;
        barData.push(b);
        lineData.push(b);
        date=date.add(1,'y');
      }

      // option
      this.options = {
        backgroundColor: "#0f375f",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["line", "bar"],
          textStyle: {
            color: myColor
          }
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: myColor
            }
          }
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: myColor
            }
          }
        },
        series: [
          {
            name: "line",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 15,
            data: lineData
          },
          {
            name: "bar",
            type: "bar",
            barWidth: 20,
            itemStyle: {
              barBorderRadius: 5,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#14c8d4" },
                { offset: 1, color: "#43eec6" }
              ])
            },
            data: barData
          },
        //   {
        //     name: "line",
        //     type: "bar",
        //     barGap: "-100%",
        //     barWidth: 20,
        //     itemStyle: {
        //       color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //         { offset: 0, color: "rgba(20,200,212,0.5)" },
        //         { offset: 0.2, color: "rgba(20,200,212,0.2)" },
        //         { offset: 1, color: "rgba(20,200,212,0)" }
        //       ])
        //     },
        //     z: -12,
        //     data: lineData
        //   },
          {
            name: "dotted",
            type: "pictorialBar",
            symbol: "rect",
            itemStyle: {
              color: "#0f375f"
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData
          }
        ]
      };
    }
  },
  mounted() {
    this.initOption();   
  }
};
</script>

<style>
</style>