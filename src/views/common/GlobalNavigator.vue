<template>
<el-container>
      <el-header class="homeHeader">
        <div class="title">OASIS</div>

        <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#145AA3"
        text-color="#ffffff"
        active-text-color="#CDB737">
        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2">
            <template slot="title">文献数据库</template>
            <el-menu-item index="2-1">ASE会议</el-menu-item>
            <el-menu-item index="2-2">ICSE会议</el-menu-item>
        </el-submenu>
        <el-submenu index="3" v-if="isAdmin">
            <template slot="title">后台管理</template>
            <el-menu-item index="3-1">文献管理</el-menu-item>
        <el-menu-item index="3-2">用户管理</el-menu-item>
            </el-submenu>
        <el-menu-item index="4"><a href="https://www.cnki.net" target="_blank">帮助</a></el-menu-item>
        </el-menu>

        <div>
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
      </el-header>
</el-container>
</template>

<script>
export default {
    name: 'GlobalNav',
    data () {
        return {
            activeIndex: '1'
        };
    },
    props: {
        isAdmin: {
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
      handleSelect (key, keyPath) {
        console.log(key, keyPath);
      },
        commandHandler (cmd) {
            console.log(cmd);
        }
    }
};
</script>

<style>

.homeHeader {
  background-color: #145AA3;
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
  background-color: #DCDFE6;
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
