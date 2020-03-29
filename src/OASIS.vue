<template>
  <div id="oasis">
      <router-view />
  </div>
</template>

<script>
export default {
    name: 'oasis'
}
</script>

<style>
#oasis{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
body{
  margin:0;
  padding:0;
}
i{
    cursor: pointer;
    font-size: .97rem;
}
p {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
}
.copyright-link,:visited,:link {
    color: #409EFF;
    text-decoration: none;
}
.copyright-link:hover {
    color: #145aa3;
    text-decoration: underline;
}
</style>