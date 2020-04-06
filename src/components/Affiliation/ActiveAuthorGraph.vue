<template>
  <div>
    <common-echart chartId="active-author-graph" :height="height" width="100%" :options="options"></common-echart>
  </div>
</template>

<script>
import CommonEchart from "../common/CommonEchart";
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
    categories() {
      let categories = [];
      this.data.forEach(node => {
        categories.push({ name: node.name });
      });
      return categories;
    },
    nodes() {
      let nodes = [];
      let index = 0; // node对应的category的下标
      this.data.forEach(node => {
        nodes.push({
          name: node.name,
          des: `<div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px">${node.name}</div>H-index: ${node.hindex}<br />G-index: ${
            node.gindex
          }<br />发表论文数: ${node.paperNum}<br />平均被引量: ${parseFloat(
            Number(node.avgCite).toFixed(3)
          )}`,
          symbolSize: (node.hindex >= 1 ? node.hindex : 1) * 10,
          itemStyle: null,
          category: index,
          label: {
            show: (node.hindex >= 1 ? node.hindex : 1) * 10 > 30
          }
        });
        index++;
      });
      return nodes;
    },
    options() {
      return {
        title: {
          text: "Impact Factor Ranking Graph",
          textStyle: {
            fontSize: 20
          },
          top: 0,
          left: 0
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        tooltip: {
          formatter: function(x) {
            return x.data.des;
          }
        },
        series: [
          {
            type: "graph",
            layout: "force",
            data: this.nodes,
            categories: this.categories,
            // 聚焦点及其相邻边
            focusNodeAdjacency: true,
            roam: true,
            draggable: true,
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.3)"
            },
            emphasis: {
              label: {
                position: "inside",
                show: true
              }
            }
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