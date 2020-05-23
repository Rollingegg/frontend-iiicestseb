<template>
    <el-tooltip placement="top"
                effect="light"
                popper-class="single-tooltip"
                :disabled="flag">
        <div class="text-wrapper" slot="content">
            {{content}}
        </div>
        <div class="multiple-wrap" :ref="`multiple-wrap${index}`">
            <div class="multiple-content" :ref="`multiple-content${index}`">
                {{content}}
            </div>
            <i class="more" v-if="!flag">...</i>
        </div>
    </el-tooltip>
</template>
<script>
    /**
     * 对多文本的封装，悬浮查看更多文本
     *
     * @version 1.0
     * @author dwxh
     * @param {Number} [index] - 序号
     * @param {String} [content] - 内容
     * @example 调用示例
     *
     * <mul-wrapper :index=1 content="content"/>
     */
    export default {
        name: 'MultipleComponent',
        data () {
            return {
                flag: false
            };
        },
        props: {
            index: Number,
            content: String
        },
        methods: {
            overHeight: function (index) {
                this.$nextTick(() => {
                    const wrapheight = this.$refs[`multiple-wrap${index}`];
                    const contentheight = this.$refs[`multiple-content${index}`];
                    if (contentheight.offsetHeight > wrapheight.offsetHeight) {
                        this.flag = false;
                    } else if (contentheight.offsetHeight <= wrapheight.offsetHeight) {
                        this.flag = true;
                    }
                });
            }
        },
        created () {
            this.overHeight(this.index);
        }
    };
</script>

<style lang="less">
    .el-tooltip__popper {
        max-width: 600px;
        line-height: 150%;
    }

    .multiple-wrap {
        position: relative;
        cursor: pointer;
        font-size: 14px;
        line-height: 18px; // 行高很重要，一定要设置
        max-height: 54px; // 最大高度是行高的倍数
        overflow: hidden;
        word-break: break-all;

        i.more {
            position: absolute;
            display: inline-block;
            width: 50px;
            height: 18px; // 此处高度应和行高一致
            bottom: 0;
            right: 0;
            text-align: right;
            font-size: 18px;
            background: -webkit-linear-gradient(left, transparent, #fff 55%);
            background: -o-linear-gradient(right, transparent, #fff 55%);
            background: -moz-linear-gradient(right, transparent, #fff 55%);
            background: linear-gradient(to right, transparent, #fff 55%);
        }
    }
</style>
