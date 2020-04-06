<!--todo 本来应该整合的，lwj PaperStatisticGraph.vue没有包装好-->
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
      yearEnd: "2020",
      any_YearData: []
    };
  },
  props: {
    height: String,
    searchType: String,
    searchId: String,
    barWidth: {
        type: Number,
        default(){
            return 30;
        }
    }
  },
  mounted() {
    this.getPublishStatistics();
  },
  computed: {
    category() {
      let dottedBase = Number(this.yearBase);
      let dottedEnd = Number(this.yearEnd);
      let category = [];
      while (dottedBase < dottedEnd) {
        category.push(String(dottedBase));
        dottedBase++;
      }
      return category;
    },
    barData() {
      let length = Number(this.yearEnd) - Number(this.yearBase);
      let barData = new Array(length).fill(0);
      this.any_YearData.forEach(item => {
        barData[Number(item.year) - Number(this.yearBase)] = Number(item.count);
      });
      return barData;
    },
    options() {
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
          axisLabel: {
            show: true,
            interval: 0, // {number}表示隔几个标签显示一个标签
            rotate: 60
          },
          axisLine: {
            lineStyle: {
              color: textColor
            }
          }
        },
        yAxis: {
          splitLine: { show: false },
          type: "value"
        },
        series: [
          {
            name: "papers",
            type: "bar",
            barWidth: this.barWidth,
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
    getPublishStatistics() {
      const pathsMap = {
        affiliation_name: "/statistics/affiliation/publish/count/per/year",
        author_name: "/statistics/author/publish/count/per/year",
        term: "/statistics/term/count/per/year"
      };
      this.$get(pathsMap[this.searchType], {
        id: this.searchId
      }).then(r => {
        if (r.data.status) {
          this.any_YearData = r.data.result;
        } else {
          this.$message({
            showClose: true,
            message: r.data.result,
            type: "warning"
          });
        }
      });
    }
  }
};
</script>
