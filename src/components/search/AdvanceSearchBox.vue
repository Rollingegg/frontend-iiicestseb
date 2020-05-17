<template>
    <div>
        <el-button round size="large" @click="showDrawer">
            高级检索
        </el-button>
        <el-drawer size="40%"
                   :closable="false"
                   @close="onClose"
                   :visible.sync="visible">
            <div class="drawer-title">输入检索条件</div>

            <div class="search-condition">
                <el-input clearable
                          placeholder="请输入内容"
                          v-for="(option, index) in searchOptions"
                          :key="index"
                          v-model="option.val"
                          v-show="option.shown">
                    <div style="width:50px" slot="prepend">{{option.label}}</div>
                    <el-button slot="append" icon="el-icon-remove" @click="remove(index)"></el-button>
                </el-input>
            </div>

            <div class="content-bottom">
                <el-button type="primary" @click="reset">重置</el-button>
                <el-button :loading="loading" type="warning" @click="search">高级检索</el-button>
            </div>
        </el-drawer>
    </div>
</template>
<script>
    /**
     * @description 高级检索框
     * @event doAdvancedSearch 用户点击检索按钮<br/>- json: 检索条件
     * @version 1.0
     * @author dwxh
     * @example
     * <ad-search-box @doAdvancedSearch="doAdvancedSearchFunction"/>
     */
    export default {
        name: 'AdvanceSearchBox',
        data () {
            return {
                visible: false,
                loading: false,
                searchOptions: [
                    {
                        label: "篇名",
                        val: "",
                        shown: true
                    },
                    {
                        label: "作者",
                        val: "",
                        shown: true
                    },
                    {
                        label: "作者单位",
                        val: "",
                        shown: true
                    },
                    {
                        label: "摘要",
                        val: "",
                        shown: true
                    },
                    {
                        label: "DOI",
                        val: "",
                        shown: true
                    },
                    {
                        label: "关键词",
                        val: "",
                        shown: true
                    }
                ]
            };
        },
        methods: {
            showDrawer () {
                this.visible = true;
            },
            onClose () {
                this.visible = false;
            },
            search () {
                let isValid = false;
                for (let i = 0; i < this.searchOptions.length; i++) {
                    if (this.searchOptions[i].val !== "") {
                        isValid = true;
                        break;
                    }
                }
                if (isValid) {
                    this.loading = true;
                    this.$emit("doAdvancedSearch", {
                        title: this.searchOptions[0].val,
                        author_name: this.searchOptions[1].val,
                        affiliation_name: this.searchOptions[2].val,
                        paper_abstract: this.searchOptions[3].val,
                        doi: this.searchOptions[4].val,
                        term: this.searchOptions[5].val
                    });
                    this.loading = false;
                } else {
                    this.$message({
                        showClose: true,
                        message: "警告：您尚未输入有效搜索信息",
                        type: "warning"
                    });
                }
            },
            reset () {
                this.searchOptions.forEach(item => {
                    item.val = '';
                    item.shown = true;
                });
            },
            remove (index) {
                this.searchOptions[index].shown = false;
                this.searchOptions[index].val = '';
            }
        }
    };
</script>
