<template>
  <div>
    <common-echart chartId="author-partner-graph" :height="height" width="100%" :options="options"></common-echart>
  </div>
</template>

<script>
import CommonEchart from "../common/CommonEchart";
export default {
  name: "AuthorPartnerGraph",
  components: {
    CommonEchart
  },
  data() {
    return {};
  },
  props: {
    height: String,
    data: Object
  },
  computed: {
    nodes() {
      let nodes = [];
      let maxSize = 50;
      if (this.data.vertexes) {
        let centerId = "";
        let typeNum = String(this.data.centerId).split("-");
        if (isNaN(typeNum[0])) {
          centerId = this.data.centerId;
        } else {
          centerId = typeNum[1] + "-" + typeNum[0];
        }
        this.data.vertexes.forEach(node => {
          let isCenterAuthor = node.id == centerId;
          let symbolSize=isCenterAuthor ? maxSize : (node.size<=10?(node.size * maxSize/5):maxSize);
          nodes.push({
            name: node.id,
            symbolSize: symbolSize,
            category: isCenterAuthor ? 0 : 1,
            des: node.name,
            label: {
                show: symbolSize>30,
                formatter: function(x){
                    return x.data.des;
                }
            }
          });
        });
      }
      return nodes;
    },
    edges() {
      let edges = [];
      if (this.data.edges) {
        this.data.edges.forEach(edge => {
          edges.push({
            source: (str => {
              let sourceId = "";
              let typeNum = String(str).split("-");
              if (isNaN(typeNum[0])) {
                sourceId = str;
              } else {
                sourceId = typeNum[1] + "-" + typeNum[0];
              }
              return sourceId;
            })(edge.source),
            target: edge.target,
            weight: edge.weight
          });
        });
      }
      return edges;
    },
    options() {
      let categories = [{ name: "该作者" }, { name: "合作者" }];
      return {
        title: {
          text: "Significant Partnership",
          textStyle: {
            fontSize: 20
          },
          top: 0,
          left: 0
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        tooltip: {
          formatter: function(params) {
            if (params.data.source) {
              return `共合作${Number(params.data.weight).toFixed(0)}篇论文`;
            } else {
              return params.data.des;
            }
          }
        },
        series: [
          {
            type: "graph",
            layout: "force",
            data: this.nodes,
            links: this.edges,
            categories: categories,
            // 聚焦点及其相邻边
            focusNodeAdjacency: true,
            roam: true,
            draggable: true,
            force: {
              repulsion: 1000,
              edgeLength: 100
            },
            lineStyle: {
              width: 4,
              color: "source"
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.3)"
            },
            emphasis: {
              label: {
                position: "inside",
                show: false
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