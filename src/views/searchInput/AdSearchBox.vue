<template>
    <div>
        <el-button plain size="large" @click="showDrawer">
            高级检索
        </el-button>
        <el-drawer
            size="40%"
            :closable="false"
            @close="onClose"
            :visible.sync="visible">
            <ps v-on:refresh="refresh"/>
        </el-drawer>
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
            },
            refresh () {
                this.$emit('refresh');
                this.visible = false;
            }
        },
        components: {
            ps
        }
    };
</script>
<style>
</style>
