<template>
    <div id="oasis">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'oasis'
    }
</script>

<style>
    /*elementui loading css 覆盖 开始自定义动画*/
    .el-loading-spinner .circular {
        width: 42px;
        height: 42px;
        animation: loading-rotate 2s linear infinite;
        display: none;
    }

    .el-loading-spinner {
        background: url(./assets/BeanEater.gif) no-repeat;
        background-size: 48px 48px;
        width: 100%;
        height: 100%;
        position: relative;
        top: 100px;
        left: 45%;
    }

    #oasis {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    body {
        margin: 0;
        padding: 0;
    }

    i {
        cursor: pointer;
        font-size: .97rem;
    }

    /*p {*/
    /*    overflow: hidden;*/
    /*    text-overflow: ellipsis;*/
    /*    word-break: break-all;*/
    /*    white-space: nowrap;*/
    /*}*/

    .copyright-link, :visited, :link {
        color: #409EFF;
        text-decoration: none;
    }

    .copyright-link:hover {
        color: #145aa3;
        text-decoration: underline;
    }
</style>
