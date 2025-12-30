<template>
  <div class="search-container">
    <el-input
      v-model="searchValue"
      placeholder="请输入角色名搜索（如：日向翔阳、影山）"
      prefix-icon="el-icon-search"
      @input="handleSearch"
    ></el-input>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 定义搜索值
const searchValue = ref('')
// 定义自定义事件，把搜索值传给父组件
const emit = defineEmits(['search'])

// 搜索触发函数
const handleSearch = () => {
  emit('search', searchValue.value)
}
</script>

<style scoped>
.search-container {
  width: 500px;
  margin: 20px auto;
}
.el-input {
  width: 100%;
}
</style>