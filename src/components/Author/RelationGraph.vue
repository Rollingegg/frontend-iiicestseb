<template>
  <div>
    <common-echart chartId="author-rel-graph" :height="height" width="100%" :options="options"></common-echart>
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
    options: {}
    };
  },
  props: {
    height: String,
    data: Object
  },
  computed: {
    nodes(){
      return this.data.data;
    },
    edges(){
      return this.data.links;
    }
  },
  methods: {
    initOptions(){
      this.options={
        title: { text: "人民的名义关系图谱" },
        tooltip: {
          formatter: function(x) {
            return x.data.des;
          }
        },
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 80,
            roam: true,
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            force: {
              repulsion: 2500,
              edgeLength: [10, 50]
            },
            draggable: true,
            itemStyle: {
              normal: {
                color: "#4b565b"
              }
            },
            lineStyle: {
              // normal: {
              //   width: 2,
              //   color: "#4b565b"
              // },
              width: 4,
              color: 'source',
              curveness: 0.3
            },
            // 聚焦点及其相邻边
            focusNodeAdjacency: true,
            // 聚焦时边的样式
            emphasis: {
                lineStyle: {
                    width: 10
                }
            },
            edgeLabel: {
              normal: {
                show: true,
                formatter: function(x) {
                  return x.data.name;
                }
              }
            },
            label: {
              normal: {
                show: true,
                textStyle: {}
              }
            },
            data: this.nodes,
            links: this.edges
          }
        ]
      };
    }
  },
  mounted() {
    this.initOptions();
  }
};
</script>

<style>
</style>