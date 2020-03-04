<template>
  <div class="sbox">
      <div id="sc1">
          <el-button size="small" circle icon="el-icon-plus" @click="addCondition1"></el-button>
          <el-button size="small" circle icon="el-icon-minus" @click="removeCondition1"></el-button>
              (
              <el-select size="small" v-model="value1" placeholder="主题">
                  <el-option
                  v-for="(item, index) in themes" :key="index" :label="item.label" :value="item.label">
                  </el-option>
              </el-select>
              <el-input
                placeholder="请输入内容"
                v-model="input1"
                size="small"
                clearable>
                </el-input>
                <el-select size="small" v-model="value2" placeholder="并含">
                  <el-option
                  v-for="(item, index) in options" :key="index" :label="item.label" :value="item.label">
                  </el-option>
              </el-select>
              <el-input
                placeholder="请输入内容"
                v-model="input2"
                size="small"
                clearable>
                </el-input>
              )
      </div>
    <div id="sc2">
        <el-select size="small" v-model="value3" placeholder="并且">
            <el-option
            v-for="(item, index) in relations" :key="index" :label="item.label" :value="item.label">
            </el-option>
        </el-select>
        (
        <el-select v-model="value4" size="small" placeholder="关键词">
            <el-option
            v-for="(item, index) in themes" :key="index" :label="item.label" value="item.label">
            </el-option>
        </el-select>
        <el-input
        placeholder="请输入内容"
        v-model="input3"
        size="small"
        clearable>
        </el-input>
        <el-select size="small" v-model="value5" placeholder="并含">
            <el-option
            v-for="(item, index) in options" :key="index" :label="item.label" :value="item.label">
            </el-option>
        </el-select>
        <el-input
        placeholder="请输入内容"
        v-model="input4"
        size="small"
        clearable>
        </el-input>
        )
    </div>
      <div id="sc3">
          <el-button size="small" circle icon="el-icon-plus" @click="addCondition2"></el-button>
          <el-button size="small" circle icon="el-icon-minus" @click="removeCondition2"></el-button>
              <el-select size="small" v-model="value6" placeholder="作者">
                  <el-option
                  v-for="(item, index) in authors" :key="index" :label="item.label" :value="item.label">
                  </el-option>
              </el-select>
              <el-input
                placeholder="中文名/英文名/拼音"
                v-model="input5"
                size="small"
                clearable>
                </el-input>
                作者单位：
              <el-input
                placeholder="全称/简称/曾用名"
                v-model="input6"
                size="small"
                clearable>
                </el-input>
          </div>
    <div id="sc4">
    发表时间：
        <!-- <el-date-picker
      v-model="value7"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
              到
              <el-date-picker
      v-model="value8"
      type="date"
      placeholder="选择日期">
    </el-date-picker> -->
     <el-date-picker
      v-model="value7"
      size="small"
      type="daterange"
      value-format="yyyy-MM-dd"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
          </div>
    <el-button round type="info" @click="search">检索</el-button>
  </div>
</template>

<script>
export default {
    name: 'ProSearch',
    data () {
        return {
            value1: '',
            value2: '并含',
            value3: '并且',
            value4: '关键词',
            value5: '并含',
            value6: '作者',
            value7: '',
            value8: '',
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: '',
            input6: '',
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
        },
        removeCondition1 () {
            console.log('-');
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

            searchInfo += this.value3; /* 并且/或者/不含 */

            searchInfo += '(';
            searchInfo += this.value4;
            searchInfo += ':';
            searchInfo += this.input3;
            searchInfo += this.value5; /* 并含/或含/不含 */
            searchInfo += this.input4;
            searchInfo += ')';

            searchInfo += '并且';

            searchInfo += '(';
            searchInfo += this.value6; /* 作者/第一作者/通讯作者 */
            searchInfo += ':';
            searchInfo += this.input5;
            searchInfo += ')';

            searchInfo += '并且';

            searchInfo += '(';
            searchInfo += '作者单位:';
            searchInfo += this.input6;
            searchInfo += ')';

            searchInfo += '并且';
            searchInfo += '(';
            // searchInfo += '开始日期';
            // searchInfo += ':';
            // searchInfo += this.value7;
            // searchInfo += '结束日期';
            // searchInfo += this.value8;
            searchInfo += this.value7;
            searchInfo += ')';

            console.log(searchInfo);
        }
    }
};
</script>

<style lang="less" scoped>
.sbox{

}
</style>
