<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100, 200, 500]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="artList.length"
        ></el-pagination>
      </el-col>
      <!-- <el-col :span="18">
      </el-col>-->
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%" size="small" @row-click="jump2file">
      <!-- <el-table-column type="selection" width="50" align="center" @selection-change="handleSelectionChange"></el-table-column> -->
      <el-table-column prop="title" label="题名" width align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="authors" label="作者" width align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="affiliations" label="来源" width align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="date" label="发表时间" width="90" align="center"></el-table-column>
      <el-table-column prop="ref" label="被引" width="90" align="center"></el-table-column>
      <el-table-column label="操作" width="180" align="center" v-if="isAdmin">
        <template slot-scope="scope">
          <el-button size="mini" @click="showEditView(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100, 200, 500]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="artList.length"
        ></el-pagination>
      </el-col>
      <!-- <el-col :span="18">
      </el-col>-->
    </el-row>
  </div>
</template>

<script>
/**
  1. vue中pros数据流是单向的，比如说这里传入的artList不能再赋值
  2. computed的值默认没有setter
 */
export default {
  name: 'ResLiter',
  data: function () {
    return {
      currentPage: 1,
      size: 10
    };
  },
  computed: {
    // totalRecords: this.artList.length,
    tableData: {
      get: function () {
        // const tableList = JSON.parse(JSON.stringify(this.artlist));
        console.log(this.artList);
        const tablePush = [];
        this.artList.forEach((item, index) => {
          if (
            this.size * (this.currentPage - 1) <= index &&
            index <= this.size * this.currentPage - 1
          ) {
            tablePush.push(item);
          }
        });
        return tablePush;
      },
      set: function () {}
    }
  },
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
        return true;
      }
    }
  },
  methods: {
    jump2file (row) {
      console.log(row);
    },
    showEditView (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
    },
    // 页数改变事件
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.tableData = this.paging(val, this.index);
    },
    // 页码改变事件
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.tableData = this.paging(this.size, val);
    },
    // 本地分页的方法
    paging (size, current) {
      const tableList = Array(this.artlist);
      const tablePush = [];
      tableList.forEach((item, index) => {
        if (size * (current - 1) <= index && index <= size * current - 1) {
          tablePush.push(item);
        }
      });
      return tablePush;
    }
  }
};
</script>

<style>
.el-table__row:hover {
  cursor: pointer;
}
.el-pagination__total{
  color:cornsilk;
}
</style>
