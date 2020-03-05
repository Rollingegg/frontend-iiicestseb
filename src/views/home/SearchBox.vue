<template>
    <div style="margin-top: 15px;padding:0 15%">
      <el-autocomplete
        style="width:100%"
        popper-class="my-autocomplete"
        v-model="state"
        :fetch-suggestions="querySearch"
        placeholder="开始您的学术探索之旅"
        @select="handleSelect"
      >
        <el-select v-model="select" slot="prepend" placeholder="全选" style="width: 90px">
          <el-option label="作者" value="1"></el-option>
          <el-option label="标题" value="2"></el-option>
          <el-option label="关键词" value="3"></el-option>
          <el-option label="摘要" value="4"></el-option>
          <el-option label="DOI" value="5"></el-option>
          <el-option label="出版机构" value="6"></el-option>
        </el-select>
        <el-button slot="append" type="primary" icon="el-icon-search">搜索</el-button>
        <template slot-scope="{ item }">

          <div class="name"><i class="el-icon-caret-right icon"></i>{{ item.value }}</div>
        </template>
      </el-autocomplete>
      <ad-search-box />
    </div>
</template>

<style>
.my-autocomplete {
  width: 70%;
}
.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}
.my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.my-autocomplete li .icon {
  color: #b4b4b4;
  margin-right: 5px;
}

</style>

<script>
import AdSearchBox from './AdSearchBox';
export default {
  name: 'SearchBox',
  data () {
    return {
      recommends: [],
      state: '',
      select: ''
    };
  },
  methods: {
    querySearch (queryString, cb) {
      var recommends = this.recommends;
      var results = queryString
        ? recommends.filter(this.createFilter(queryString))
        : recommends;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return recommend => {
        return (
          recommend.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll () {
      return [
        {id: 1, value: '新型冠状病毒'},
        {id: 2, value: '新冠肺炎'},
        {id: 3, value: '文献综述'},
        {id: 4, value: '外文文献'},
        {id: 5, value: '人工智能'},
        {id: 6, value: '大数据'},
        {id: 7, value: '区块链'},
        {id: 8, value: '自动化测试'}
      ];
    },
    handleSelect (item) {
      console.log(item);
    },
    handleIconClick (ev) {
      console.log(ev);
    }
  },
  mounted () {
    this.recommends = this.loadAll();
  },
  components: {
      AdSearchBox
  }
};
</script>
