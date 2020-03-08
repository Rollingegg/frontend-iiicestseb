<template>
    <div>
        <el-button type="primary" round size="large" @click="showDrawer">
            高级检索
        </el-button>
        <a-drawer
            title="输入检索条件"
            width=520
            :closable="false"
            @close="onClose"
            :visible="visible">
            <ps/>
        </a-drawer>
    </div>
</template>
<script>
    // import ps from '@/components/ProSearch';
    import ps from './FiveSearch';

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
