<template>
  <div>
    <common-echart chartId="conference-pie-graph" :height="height" width="100%" :options="options"></common-echart>
  </div>
</template>

<script>
import CommonEchart from "../common/CommonEchart";
import PieBackgroundImage from "../../../static/img/pie.jpg"
export default {
  components: {
    CommonEchart
  },
  data() {
    return {};
  },
  props: {
    height: String,
    data: Array
  },
  computed: {
    optionData() {
      let arr = [];
      this.data.forEach(item => {
        arr.push({ value: item.count, name: item.name });
      });
      return arr;
    },
    categories() {
      let arr = [];
      this.data.forEach(item => {
        arr.push(item.name);
      });
      return arr;
    },
    options() {
        let piePatternSrc=PieBackgroundImage;
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
          formatter: "{b}<br/>Published Papers: {c} ({d}%)"
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
  },
  methods: {},
  mounted() {}
};
</script>

<style>
</style>