<template>
  <div>
    <common-echart chartId="paper-statistic-graph" :height="height" width="100%" :options="options"></common-echart>
  </div>
</template>

<script>
import CommonEchart from "../common/CommonEchart";
export default {
  components: {
    CommonEchart
  },
  data() {
    return {
      optionData: {},
      yearBase: "2010",
      yearEnd: "2020"
    };
  },
  props: {
    height: String,
    tableData: Array
  },
  computed: {
    category() {
      let dottedBase=Number(this.yearBase);
      let dottedEnd=Number(this.yearEnd);
      let category=[];
      while (dottedBase<dottedEnd) {
        category.push(String(dottedBase));
        dottedBase++;
      }
      return category;
    },
    barData() {
      let length=Number(this.yearEnd)-Number(this.yearBase);
      let barData=new Array(length).fill(0);
      this.tableData.forEach(item=>{
        barData[Number(item.year)-Number(this.yearBase)]=Number(item.count);
      });
      return barData;
    },
    options(){
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
          data: [ "papers"],
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
          splitLine: { show: false },
          type: 'value'
        },
        series: [
          {
            name: "papers",
            type: "bar",
            barWidth: 60,
            itemStyle: {
              barBorderRadius: 5,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: barColor1 },
                { offset: 1, color: barColor2 }
              ])
            },
            data: this.barData
          }
        ]
      };
    }
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style>
</style>