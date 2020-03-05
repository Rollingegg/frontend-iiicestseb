<template>
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

</template>

<script>
import IMenu from '@/components/IMenu';
export default {
  name: 'GlobalNav',
  data () {
      return {

      };
  },
  computed: {
    hasLogin () {
      return this.user.name === 'admin';
    }
  },
  props: {
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
