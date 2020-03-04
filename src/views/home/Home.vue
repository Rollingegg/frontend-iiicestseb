<template>
  <div class="container">
    <global-nav />
    <search-box style="margin-top:60px" />
    <!-- <res-lister /> -->
    <a-row type="flex" justify="center" align="middle">
      <a-col :span="12">
        <Card style="margin: 10% 20%" />
      </a-col>
      <a-col :span="12">
        <Card style="margin: 10% 20%" />
      </a-col>
    </a-row>
    <global-footer :copyright="copyright" style="margin-bottom:0" />
  </div>
</template>

<script>
import GlobalFooter from '../common/GlobalFooter';
import ResLister from '@/components/ResLiter';
import GlobalNav from '../common/GlobalNavigator';
import SearchBox from './SearchBox';
import Card from '@/components/ArtCard';
export default {
  name: 'Home',
  components: {
    ResLister,
    GlobalFooter,
    GlobalNav,
    SearchBox,
    Card
  },
  data () {
    return {
      copyright: 'OASIS/2020'
    };
  },
  props: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: #f0f2f5 url("../../../static/img/Large-Triangles.svg") no-repeat
    center 110px;
  background-size: 100%;
}
</style>
