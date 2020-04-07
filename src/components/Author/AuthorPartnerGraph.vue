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
          let symbolSize = isCenterAuthor
            ? maxSize
            : node.size <= 10
            ? (node.size * maxSize) / 5
            : maxSize;
          let authorName = node.name;
          nodes.push({
            name: node.id,
            symbolSize: symbolSize,
            category: isCenterAuthor ? 0 : 1,
            title: authorName,
            des: `<div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px">${
              node.name
            }</div>所在机构：${node.content.affiliationName}<br/>发表文章数：${
              node.content.paperCount ? node.content.paperCount : 0
            }<br/>评分：${node.content.score}`,
            label: {
              show: symbolSize > 30,
              formatter: function(x) {
                return x.data.title;
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
          subtext: "注：图中点大小代表合作关系紧密程度",
          textStyle: {
            fontSize: 20
          },
          top: 0,
          left: 0
        },
        chartId: 'author-partner-graph',
        backgroundColor: 'white',
        toolbox: {
          feature: {
            myFull: {
              show: true,
              title: "全屏查看",
              icon:
                "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
              onclick: function(e) {
                console.log(e.option.value);
                const element = document.getElementById(e.option.chartId);
                if (element.requestFullScreen) {
                  // HTML W3C 提议
                  element.requestFullScreen();
                } else if (element.msRequestFullscreen) {
                  // IE11
                  element.msRequestFullScreen();
                } else if (element.webkitRequestFullScreen) {
                  // Webkit (works in Safari5.1 and Chrome 15)
                  element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                  // Firefox (works in nightly)
                  element.mozRequestFullScreen();
                }
                // 退出全屏
                if (element.requestFullScreen) {
                  document.exitFullscreen();
                } else if (element.msRequestFullScreen) {
                  document.msExitFullscreen();
                } else if (element.webkitRequestFullScreen) {
                  document.webkitCancelFullScreen();
                } else if (element.mozRequestFullScreen) {
                  document.mozCancelFullScreen();
                }
              }
            }
          }
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
              color: "source",
              curveness: 0.2
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