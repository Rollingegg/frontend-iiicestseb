<template>
  <el-container>
    <el-header class="homeHeader">
      <div class="title">OASIS</div>
        <IMenu></IMenu>
      <div v-if="hasLogin">
        <el-button
          icon="el-icon-bell"
          type="text"
          style="margin-right: 8px;color: #000000;"
          size="normal"
        ></el-button>
        <el-dropdown class="userInfo" @command="commandHandler">
          <span class="el-dropdown-link">
            {{user.name}}
            <i>
              <img :src="user.userface" alt />
            </i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else>
        <el-button type="primary" @click="doLogin">登录</el-button>
        <el-button @click="doRegis">注册</el-button>
      </div>
    </el-header>

      <el-row style="margin-top:10px">
          <el-col :span="24" style="text-align:center">
              <div style="font-size: 20px;">{{welcomeMessage}}</div>
          </el-col>
      </el-row>
  </el-container>
</template>

<script>
import IMenu from '@/components/IMenu';
export default {
  name: 'GlobalNav',
  data () {
      return {
          welcomeMessage: ''
      };
  },
  props: {
    hasLogin: {
      type: Boolean,
      default () {
        return false;
      }
    },
    user: {
      type: Object,
      default () {
        return {
          name: '弟弟',
          userface: '@/assets/logo.png'
        };
      }
    }
  },
  methods: {
      welcome () {
      const date = new Date();
      const hour = date.getHours();
      let time = hour < 6 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour <= 18 ? '下午好' : '晚上好')));
      let welcomeArr = [
        '喝杯咖啡休息下吧☕',
        '要不要和朋友打局LOL',
        '要不要和朋友打局王者荣耀',
        '几天没见又更好看了呢😍',
        '今天又写了几个Bug🐞呢',
        '今天在群里吹水了吗',
        '今天吃了什么好吃的呢',
        '今天您微笑了吗😊',
        '今天帮助别人解决问题了吗',
        '准备吃些什么呢',
        '周末要不要去看电影？'
      ];
      let index = Math.floor((Math.random() * welcomeArr.length));
      return `${time}，${this.user.name}，${welcomeArr[index]}`;
    },
    commandHandler (cmd) {
      console.log(cmd);
    },
    doLogin () {
        console.log('event');
        this.$router.push('/login');
    },
    doRegis () {
        this.$router.push('/login');
    }
  },
  components: {
      IMenu
  },
  mounted () {
    this.welcomeMessage = this.welcome();
  }
};
</script>

<style>
.homeHeader {
  background-color: #145aa3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  box-sizing: border-box;
}

.homeHeader .title {
  text-align: center;
  border-radius: 4px;
  padding: 0 18px;
  font-size: 24px;
  color: #ffffff;
  background-color: #dcdfe6;
  cursor: pointer;
}

.homeHeader .userInfo {
  cursor: pointer;
}
.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}

.el-dropdown-link {
  color: #ffffff;
  display: flex;
  align-items: center;
}
</style>
