<template>
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item v-for="(item, index) in items" :key="index" :title="item.type" :name="index+1">
      <div >{{item.cont}}</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: 'ArtDetail',
  data () {
    return {
      activeNames: ['1']
    };
  },
  props: {
    items: {
      type: Array,
      default () {
        return [
          {
            type: '论文标题',
            cont: '基于北斗定位系统的危化品大数据安全监管创新应用'
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
            cont: '基于北斗定位系统的危化品大数据安全监管创新应用'
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
      }
    }
  },
  methods: {
    handleChange (val) {
      console.log(val);
    }
  }
};
</script>

<style>
</style>
