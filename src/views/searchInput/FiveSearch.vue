<template>
  <div>
    <el-input clearable placeholder="请输入内容" v-for="(item, index) in items" :key="index" v-model="item.val" v-show="item.shown">
      <template slot="prepend">{{item.label}}</template>
      <el-button slot="append" icon="el-icon-remove" @click="remove(index)"></el-button>
    </el-input>
    <el-row type="flex" justify="center" style="margin-top:50px">
        <el-col :span="12">
    <el-button round type="primary" @click="reset" >重置</el-button>
    <el-button :loading="loading" round type="warning" @click="search" style="margin-top:50px">高级检索</el-button>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import db from '../../utils/localstorage';
export default {
  name: 'fsearch',
  data () {
    return {
      loading: false,
      items: [
        {
          label: '篇名',
          val: '',
          shown: true
        },
        {
          label: '作者',
          val: '',
          shown: true
        },
        {
          label: '作者单位',
          val: '',
          shown: true
        },
        {
          label: '摘要',
          val: '',
          shown: true
        },
        {
          label: 'DOI',
          val: '',
          shown: true
        }
      ]
    };
  },
  methods: {
    search () {
      console.log(this.items);
      if (this.items[0].val !== '' || this.items[1].val !== '' || this.items[2].val !== '' || this.items[3].val !== '' || this.items[4].val !== '') {
        this.loading = true;
        this.$get('search/advanced', {
            paper_title: this.items[0].val,
            author_name: this.items[1].val,
            affiliation_name: this.items[2].val,
            paper_abstract: this.items[3].val,
            doi: this.items[4].val
        }).then((r) => {
            if (r.data.status) {
                db.save('RESULT', r.data.result);
                setTimeout(() => {
                    this.loading = false;
                }, 500);
                this.$router.push('/searchRes');
            } else {
                this.$message({
                    showClose: true,
                    message: r.data.result,
                    type: 'warning'
                });
            }
        }).catch((e) => {
            this.$message({
                showClose: true,
                message: e,
                type: 'warning'
            });
        });
    } else {
        this.$message({
            showClose: true,
            message: '警告：您尚未输入有效搜索信息',
            type: 'warning'
        });
    }
    },
    reset () {
        this.items.forEach(item => {
            item.shown = true;
        });
    },
    remove (index) {
        this.items[index].shown = false;
    }
  }
};
</script>

<style>
.el-input-group__prepend{
    width: 100px;
}
</style>
