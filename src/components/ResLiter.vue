<template>
  <el-table :data="artList" stripe style="width: 100%" size="small">
    <el-table-column type="selection" width="50" align="center"></el-table-column>
    <el-table-column prop="title" label="题名" width align="center"></el-table-column>
    <el-table-column prop="authors" label="作者" width align="center"></el-table-column>
    <el-table-column prop="affiliations" label="来源" width align="center"></el-table-column>
    <el-table-column prop="date" label="发表时间" width="90" align="center"></el-table-column>
    <el-table-column prop="ref" label="被引" width="90" align="center"></el-table-column>
    <el-table-column label="操作" v-if="isAdmin">
      <template slot-scope="scope">
        <el-button size="mini" @click="showEditView(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'ResLiter',
  props: {
    artList: {
      type: Array,
      default: function () {
        return [
          {
            title: '机器学习导论',
            authors: ['Zhihua Zhou', 'Yang Gao'],
            affiliations: 'Nanjing University',
            date: '2017.01.01',
            ref: 50000
          },
          {
            title: '机器学习导论',
            authors: ['Zhihua Zhou', 'Yang Gao'],
            affiliations: 'Nanjing University',
            date: '2017.01.01',
            ref: 50000
          }
        ];
      }
    },
    isAdmin: {
      type: Boolean,
      default () {
        return false;
      }
    }
  },
  methods: {
    jump2file () {
      console.log('hhh');
    }
  }
};
</script>

<style>
.el-table__column:hover {
  cursor: pointer;
}
</style>
