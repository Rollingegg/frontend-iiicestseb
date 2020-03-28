<template>
    <div>
        <el-button round size="large" @click="showDrawer">
            高级检索
        </el-button>
        <a-drawer
                title="输入检索条件"
                width=520
                :closable="false"
                @close="onClose"
                :visible="visible">
            <ps v-on:refresh="refresh"/>
        </a-drawer>
    </div>
</template>
<script>
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
