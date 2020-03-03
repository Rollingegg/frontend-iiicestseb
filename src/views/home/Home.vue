<template>
  <div class="container">
      <global-nav />
      <search-box />
      <res-lister />
    <global-footer :copyright="copyright" style="margin-bottom:0"/>
  </div>
</template>

<script>
import GlobalFooter from '../common/GlobalFooter';
import ResLister from '@/components/ResLiter';
import GlobalNav from '../common/GlobalNavigator';
import SearchBox from './SearchBox';
export default {
    name: 'Home',
    components: {
        ResLister,
        GlobalFooter,
        GlobalNav,
        SearchBox
    },
    data () {
        return {
            copyright: 'OASIS/2020'
        };
    },
    props: {
    },
    methods: {
    }
};
</script>

<style>

</style>
