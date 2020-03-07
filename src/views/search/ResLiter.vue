<template>
  <div>
    <el-dialog :visible.sync="detailVisible" center distroy-on-close>
      <template slot="title">
        <h1>文献详情</h1>
      </template>
      <template slot="footer">
        <el-link target="_blank" icon="el-icon-download" v-bind:href="pdf_link">下载</el-link>
      </template>
      <art-detail :items="detailData"></art-detail>
    </el-dialog>
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
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%" size="small" @row-click="jump2file">
      <el-table-column
        prop="title"
        label="题名"
        width
        align="center"
        :show-overflow-tooltip="true"
        :formatter="setTitle"
      ></el-table-column>
      <el-table-column
        prop="authors"
        label="作者"
        width
        align="center"
        :show-overflow-tooltip="true"
        :formatter="setAuthor"
      ></el-table-column>
      <el-table-column
        prop="affiliations"
        label="来源"
        width
        align="center"
        :show-overflow-tooltip="true"
        :formatter="setAffiliations"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="发表时间"
        width="90"
        align="center"
        :show-overflow-tooltip="true"
        :formatter="setDate"
      ></el-table-column>
      <el-table-column
        prop="ref"
        label="被引"
        width="90"
        align="center"
        :show-overflow-tooltip="true"
        :formatter="setRef"
      ></el-table-column>
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
    </el-row>
  </div>
</template>

<script>
import db from '../../utils/localstorage';
import ArtDetail from '@/components/ArticleDetail';

export default {
  beforeCreate () {
    this.artList = db.get('RESULT');
    if (!this.artList || this.$isEmpty(this.artList)) {
      this.$message({
        showClose: true,
        message: '搜索结果为空！',
        type: 'warning'
      });
      this.$router.push('/searchInput');
    }
  },
  name: 'ResLiter',
  data: function () {
    return {
      currentPage: 1,
      size: 10,
      detailVisible: false,
      currentIndex: 0,
      pdf_link: ''
    };
  },
  computed: {
    tableData: {
      get: function () {
        const tablePush = [];
        if (!this.$isEmpty(this.artList)) {
          this.artList.forEach((item, index) => {
            if (
              this.size * (this.currentPage - 1) <= index &&
              index <= this.size * this.currentPage - 1
            ) {
              tablePush.push(item);
            }
          });
        }
        return tablePush;
      },
      set: function () {}
    },
    detailData: {
      get () {
        return [
          {
            type: '论文标题',
            cont: '基于北斗定位系统'
          },
          {
            type: '作者',
            cont: '班亚 袁静 刘洪静 王锐'
          },
          {
            type: '机构',
            cont: '重庆市计量质量检测研究院'
          },
          {
            type: '摘要',
            cont:
              '随着我国现代工业迅猛发展,大量危化品被投入到化工企业的生产和使用中,一定程度上增大了危化品事故发生的概率。危险化学品具有极大的危险性和破坏性,因此及时高效的危化品安全监管显得尤为重要。将我国北斗卫星导航系统应用于安全监管意义重大,其具有精度高、全天候等优点,相关技术及应用近年来快速发展,已经在桥梁、地灾、大坝等的安全监测领域得到了广泛的应用。本文基于危化品企业应急管理的调查分析,融合大数据思维,探'
          },
          {
            type: '关键词',
            cont: '北斗卫星导航系统 ; 危险化学品 ; 大数据 ; 安全监管 ; 应急管理'
          },
          {
            type: '出版刊物名称',
            cont: '第十一届中国卫星导航年会论文集——S01 卫星导航行业应用'
          },
          {
            type: '会议名称',
            cont: '第十一届中国卫星导航年会'
          },
          {
            type: 'DOI',
            cont: '10.26914/c.cnkihy.2020.001057'
          }
        ];
      },
      set () {

      }
    }
  },
  props: {
    isAdmin: {
      type: Boolean,
      default () {
        return true;
      }
    }
  },
  methods: {
    setTitle (row) {
      return row.paperTitle;
    },
    setAuthor (row) {
      let authorList = row.authorInfoList;
      let author = '';
      authorList.forEach(value => {
        author += value.name;
        author += '; ';
      });
      return author.substr(0, author.length - 2);
    },
    setAffiliations (row) {
      let authorList = row.authorInfoList;
      let author = '';
      authorList.forEach(value => {
        author += value.affiliationName;
        author += '; ';
      });
      return author.substr(0, author.length - 2);
    },
    setDate (row) {
      return row.publicationYear;
    },
    setRef (row) {
      return row.referenceCount;
    },
    /* 查看详情 */
    jump2file (row, event, col) {
      console.log(row);
      this.detailVisible = true;
      this.detailData[0].cont = row.paperTitle; // 标题
      let authorList = row.authorInfoList;
      let author = '';
      let affiliation = '';
      authorList.forEach(value => {
        author += value.name;
        author += '; ';
        affiliation += value.affiliationName;
        affiliation += '; ';
      });
      this.detailData[1].cont = author.substr(0, author.length - 2); // 作者
      this.detailData[2].cont = affiliation.substr(0, affiliation.length - 2); // 机构
      this.detailData[3].cont = row.paperAbstract; // 摘要
      this.detailData[4].cont = row.authorKeywords; // 关键词
      this.detailData[5].cont = row.publicationTitle; // 出版刊物名称
      this.detailData[6].cont = row.conferenceName; // 会议名称
      this.detailData[7].cont = row.doi; // DOI
      this.pdf_link = row.pdfLink;
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
  },
  components: {
    ArtDetail
  }
};
</script>

<style>
.el-table__row:hover {
  cursor: pointer;
}
.el-pagination__total {
  color: cornsilk;
}
.el-pagination__jump {
  color: cornsilk;
}
</style>
