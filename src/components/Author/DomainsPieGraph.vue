<template>
  <div>
    <common-echart chartId="domain-pie-graph" :height="height" width="100%" :options="options" @on-click-echart="handleClickEchart"></common-echart>
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
        arr.push({ value: item.count, name: item.name, termId: item.id});
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
  },
  methods: {
    handleClickEchart(param){
      this.$emit('on-click-term',param.data.termId);
    }
  },
  mounted() {}
};
</script>

<style>
</style>