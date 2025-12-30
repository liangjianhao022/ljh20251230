<template>
  <!-- 路由出口：所有页面内容都会渲染到这个位置 -->
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
// 无需额外业务代码，仅保留路由出口即可
</script>

<style>
/* 全局样式重置，避免默认样式干扰 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 根容器样式 */
#app {
  font-family: "Microsoft YaHei", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 10px;
}
</style>