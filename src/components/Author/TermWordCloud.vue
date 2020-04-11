<template>
  <div>
    <common-echart chartId="domain-word-cloud" :height="height" width="100%" :options="options"></common-echart>
  </div>
</template>

<script>
import CommonEchart from "../common/CommonEchart";
require("echarts-wordcloud");
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
      let index=0;
      this.data.forEach(item => {
        arr.push({ value: item.count, name: (name=>{
            let splitedNames=String(name).split(' ')
            if(index<1){
                // 关键词长度超过20, 只显示第一个单词加...
                if(String(name).length>20)
                    return splitedNames[0]+'...';
            }
            return name;
        })(item.name) });
        index++;
      });
      return arr;
    },
    options() {
      return {
        series: [
          {
            type: "wordCloud",

            // The shape of the "cloud" to draw. Can be any polar equation represented as a
            // callback function, or a keyword present. Available presents are circle (default),
            // cardioid (apple or heart shape curve, the most known polar equation), diamond (
            // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

            shape: "pentagon",

            // A silhouette image which the white area will be excluded from drawing texts.
            // The shape option will continue to apply as the shape of the cloud to grow.

            // maskImage: maskImage,

            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.

            left: "center",
            top: "center",
            width: "100%",
            height: "100%",
            right: null,
            bottom: null,

            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.

            sizeRange: [8, 60],

            // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

            rotationRange: [-90, 90],
            rotationStep: 45,

            // size of the grid in pixels for marking the availability of the canvas
            // the larger the grid size, the bigger the gap between words.

            gridSize: 4,

            // set to true to allow word being draw partly outside of the canvas.
            // Allow word bigger than the size of the canvas to be drawn
            drawOutOfBound: false,

            // Global text style
            textStyle: {
              normal: {
                fontFamily: "sans-serif",
                fontWeight: "bold",
                // Color can be a callback function or a color string
                color: function() {
                  // Random color
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(",") +
                    ")"
                  );
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },

            // Data is an array. Each array item must have name and value property.
            data: this.optionData
          }
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