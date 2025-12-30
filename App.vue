<template>
  <div id="app">
    <!-- 路由出口：展示页面内容 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
// 无需额外代码，只需路由出口
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>