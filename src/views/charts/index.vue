<template>
  <div class="charts" id="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "charts-index",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var myChart = echarts.init(document.getElementById("charts"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "@/style/variables";
.charts {
  height: 100%;
}
</style>
