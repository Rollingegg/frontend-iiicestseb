<template>
  <div style="margin-top:20px">
    <a-button type="primary" @click="showDrawer">
      高级搜索
    </a-button>
    <a-drawer
      title="输入检索条件"
      width=520
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
    <ps />
      <!-- <div
        :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }"
      >
        <a-button
          style="marginRight: 8px"
          @click="onClose"
        >
          Cancel
        </a-button>
        <a-button @click="onClose" type="primary">
          Submit
        </a-button>
      </div> -->
    </a-drawer>
  </div>
</template>
<script>
import ps from '@/components/ProSearch';
export default {
    name: 'AdSearchBox',
  data () {
    return {
      visible: false
    };
  },
  methods: {
    showDrawer () {
      this.visible = true;
    },
    onClose () {
      this.visible = false;
    }
  },
  components: {
      ps
  }
};
</script>
