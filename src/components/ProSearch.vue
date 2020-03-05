<template>
  <div class="sbox">
      <div id="sc1">
          <el-button size="small" circle icon="el-icon-plus" @click="addCondition1"></el-button>
          <el-button size="small" circle icon="el-icon-minus" @click="removeCondition1"></el-button>

              <el-input
                placeholder="请输入内容"
                v-model="input1"
                size="small"
                clearable>
                <el-select size="small" slot="prepend" v-model="value1" placeholder="主题" class="sele">
                  <el-option
                  v-for="(item, index) in themes" :key="index" :label="item.label" :value="item.label">
                  </el-option>
              </el-select>
                </el-input>

              <el-input
                placeholder="请输入内容"
                v-model="input2"
                size="small"
                clearable>
                <el-select size="small" slot="prepend" v-model="value2" placeholder="并含" class="sele">
                  <el-option
                  v-for="(item, index) in options" :key="index" :label="item.label" :value="item.label">
                  </el-option>
              </el-select>
                </el-input>

      </div>
    <div id="sc2" v-show="ok1">
        <el-select size="small" v-model="value3" placeholder="并且">
            <el-option
            v-for="(item, index) in relations" :key="index" :label="item.label" :value="item.label">
            </el-option>
        </el-select>

        <el-input
        placeholder="请输入内容"
        v-model="input3"
        size="small"
        clearable>
        <el-select v-model="value4" size="small" slot="prepend" placeholder="关键词" class="sele">
            <el-option
            v-for="(item, index) in themes" :key="index" :label="item.label" :value="item.label">
            </el-option>
        </el-select>
        </el-input>

        <el-input
        placeholder="请输入内容"
        v-model="input4"
        size="small"
        clearable>
        <el-select size="small" slot="prepend" v-model="value5" placeholder="并含" class="sele">
            <el-option
            v-for="(item, index) in options" :key="index" :label="item.label" :value="item.label">
            </el-option>
        </el-select>
        </el-input>

    </div>

    <div id="sc3" v-show="ok2">
        <el-select size="small" v-model="value6" placeholder="并且">
            <el-option
            v-for="(item, index) in relations" :key="index" :label="item.label" :value="item.label">
            </el-option>
        </el-select>

        <el-input
        placeholder="请输入内容"
        v-model="input5"
        size="small"
        clearable>
        <el-select v-model="value7" size="small" slot="prepend" placeholder="摘要" class="sele">
            <el-option
            v-for="(item, index) in themes" :key="index" :label="item.label" :value="item.label">
            </el-option>
        </el-select>
        </el-input>

        <el-input
        placeholder="请输入内容"
        v-model="input6"
        size="small"
        clearable>
        <el-select size="small" slot="prepend" v-model="value8" placeholder="并含" class="sele">
            <el-option
            v-for="(item, index) in options" :key="index" :label="item.label" :value="item.label">
            </el-option>
        </el-select>
        </el-input>

    </div>

    <div id="sc4" v-show="ok3">
        <el-select size="small" v-model="value9" placeholder="并且">
            <el-option
            v-for="(item, index) in relations" :key="index" :label="item.label" :value="item.label">
            </el-option>
        </el-select>

        <el-input
        placeholder="请输入内容"
        v-model="input7"
        size="small"
        clearable>
        <el-select v-model="value10" size="small" slot="prepend" placeholder="DOI" class="sele">
            <el-option
            v-for="(item, index) in themes" :key="index" :label="item.label" :value="item.label">
            </el-option>
        </el-select>
        </el-input>

        <el-input
        placeholder="请输入内容"
        v-model="input8"
        size="small"
        clearable>
        <el-select size="small" slot="prepend" v-model="value11" placeholder="并含" class="sele">
            <el-option
            v-for="(item, index) in options" :key="index" :label="item.label" :value="item.label">
            </el-option>
        </el-select>
        </el-input>

    </div>

      <div id="sc5" style="margin-top:20px">
          <!-- <el-button size="small" circle icon="el-icon-plus" @click="addCondition2"></el-button>
          <el-button size="small" circle icon="el-icon-minus" @click="removeCondition2"></el-button> -->

              <el-input
                placeholder="中文名/英文名/拼音"
                v-model="input9"
                size="small"
                clearable>
                <el-select size="small" slot="prepend" v-model="value12" placeholder="作者" class="sele">
                  <el-option
                  v-for="(item, index) in authors" :key="index" :label="item.label" :value="item.label">
                  </el-option>
              </el-select>
                </el-input>

              <el-input
                placeholder="全称/简称/曾用名"
                v-model="input10"
                size="small"
                clearable>
                <span slot="prepend">作者单位</span>
                </el-input>
          </div>
    <div id="sc6">
        <span style="font-size:16px">发表时间</span>
     <el-date-picker
      v-model="input11"
      type="daterange"
      value-format="yyyy-MM-dd"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      style="margin-left:26px">
    </el-date-picker>
          </div>
    <el-button round type="warning" @click="search" style="margin-top:50px">检索</el-button>
  </div>
</template>

<script>
/**
 * valuex: 选择项（检索属性）
 * inputx: 输入项（检索内容）
 */
export default {
    name: 'ProSearch',
    data: function () {
        return {
            ok1: true,
            ok2: false,
            ok3: false,
            value1: '篇名',
            value2: '并含',
            value3: '并且',
            value4: '关键词',
            value5: '并含',
            value6: '并且',
            value7: '摘要',
            value8: '或含',
            value9: '或者',
            value10: 'DOI',
            value11: '或含',
            value12: '作者',
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: '',
            input6: '',
            input7: '',
            input8: '',
            input9: '',
            input10: '',
            input11: '',
            themes: [{
                label: '关键词'
            }, {
                label: '篇名'
            }, {
                label: '摘要'
            }, {
                label: 'DOI'
            }],
            options: [{
                label: '并含'
            }, {
                label: '或含'
            }, {
                label: '不含'
            }],
            relations: [{
                label: '并且'
            }, {
                label: '或者'
            }, {
                label: '不含'
            }],
            authors: [{
                label: '作者'
            }, {
                label: '第一作者'
            }, {
                label: '通讯作者'
            }]
        };
    },
    methods: {
        addCondition1 () {
            console.log('+');
            if (this.ok1) {
                if (this.ok2) {
                    if (!this.ok3) {
                        this.ok3 = true;
                    }
                } else {
                    this.ok2 = true;
                }
            } else {
                    this.ok1 = true;
            }
        },
        removeCondition1 () {
            console.log('-');
            if (!this.ok3) {
                if (!this.ok2) {
                    if (this.ok1) {
                        this.ok1 = false;
                    }
                } else {
                    this.ok2 = false;
                }
            } else {
                    this.ok3 = false;
            }
        },
        addCondition2 () {
            console.log('+');
        },
        removeCondition2 () {
            console.log('-');
        },
        search () {
            let searchInfo = '';

            searchInfo += '(';
            searchInfo += this.value1;
            searchInfo += ':';
            searchInfo += this.input1;
            searchInfo += this.value2; /* 并含/或含/不含 */
            searchInfo += this.input2;
            searchInfo += ')';

            if (this.ok1) {
                searchInfo += this.value3; /* 并且/或者/不含 */

                searchInfo += '(';
                searchInfo += this.value4;
                searchInfo += ':';
                searchInfo += this.input3;
                searchInfo += this.value5; /* 并含/或含/不含 */
                searchInfo += this.input4;
                searchInfo += ')';
            }
            if (this.ok2) {
                searchInfo += this.value6; /* 并且/或者/不含 */

                searchInfo += '(';
                searchInfo += this.value7;
                searchInfo += ':';
                searchInfo += this.input5;
                searchInfo += this.value8; /* 并含/或含/不含 */
                searchInfo += this.input6;
                searchInfo += ')';
            }
            if (this.ok3) {
                searchInfo += this.value9; /* 并且/或者/不含 */

                searchInfo += '(';
                searchInfo += this.value10;
                searchInfo += ':';
                searchInfo += this.input7;
                searchInfo += this.value11; /* 并含/或含/不含 */
                searchInfo += this.input8;
                searchInfo += ')';
            }
            searchInfo += '并且';

            searchInfo += '(';
            searchInfo += this.value12; /* 作者/第一作者/通讯作者 */
            searchInfo += ':';
            searchInfo += this.input9;
            searchInfo += ')';

            searchInfo += '并且';

            searchInfo += '(';
            searchInfo += '作者单位:';
            searchInfo += this.input10;
            searchInfo += ')';

            searchInfo += '并且';
            searchInfo += '(';
            searchInfo += '发表时间:';
            searchInfo += this.input11;
            searchInfo += ')';

            console.log(searchInfo);
        }
    }
};
</script>

<style lang="less" scoped>
.sele{
    width:92px;
}
// .el-select{
//     width:92px;
// }
</style>
