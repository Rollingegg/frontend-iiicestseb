<template>
  <el-row class="card" @click="jump2file">
    <el-col :span="12" class="item">
      <h1>{{ Liter.title }}</h1>
      <p>{{ Liter.authors }}</p>
    </el-col>
    <el-col :span="6" class="item">
      <h2>
        引用次数
        <br />
        {{ Liter.ref }}
      </h2>
    </el-col>
    <el-col :span="6" class="item">
      <h2>
        发表时间
        <br />
        {{ Liter.date }}
      </h2>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "LiterCard",
  props: {
    Liter: {
      type: Object,
      default: function() {
        return {
          title: "机器学习导论",
          authors: ["Zhihua Zhou", "Yang Gao"],
          ref: 50000,
          date: "2017.01.01"
        };
      }
    }
  },
  methods: {
    jump2file() {
      console.log("hhh");
    }
  }
};
</script>

<style>
.card {
  border-radius: 5px;
  margin: 20px 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.card:hover {
  background-color: rgb(236, 233, 233);
  box-shadow: 0 4px 8px 0 rgba(163, 128, 128, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
}
.item {
  /* height: 100%; */
}
.el-col {
  text-align: center;
}
</style>
