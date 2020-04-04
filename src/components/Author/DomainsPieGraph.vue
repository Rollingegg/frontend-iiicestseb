<template>
  <el-card>
    <common-echart chartId="domain-pie-graph" :height="height" width="100%" :options="options"></common-echart>
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
      
    };
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
    options(){
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
            name: "Domains",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.optionData
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