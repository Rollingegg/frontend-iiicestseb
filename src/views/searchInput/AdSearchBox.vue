<template>
    <div>
        <a-button type="primary" @click="showDrawer">
            高级搜索
        </a-button>
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
