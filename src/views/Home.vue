<template>
  <div class="home-page">
    <!-- 引入搜索框组件 -->
    <SearchInput @search="handleSearch"></SearchInput>
    <!-- 角色卡片列表 -->
    <div class="character-list">
      <CharacterCard
        v-for="item in filteredCharacters"
        :key="item.id"
        :character="item"
      ></CharacterCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 导入组件（大驼峰命名）
import SearchInput from '../components/SearchInput.vue'
import CharacterCard from '../components/CharacterCard.vue'
// 导入角色数据（小驼峰命名）
import characterList from '../data/characterList.json'

// 定义原始角色列表和筛选后的列表
const allCharacters = ref([])
const filteredCharacters = ref([])

// 初始化加载所有角色
onMounted(() => {
  allCharacters.value = characterList
  filteredCharacters.value = characterList
})

// 处理搜索逻辑
const handleSearch = (keyword) => {
  if (!keyword) {
    filteredCharacters.value = allCharacters.value
    return
  }
  // 模糊匹配角色名
  filteredCharacters.value = allCharacters.value.filter(item => 
    item.name.includes(keyword)
  )
}
</script>

<style scoped>
.home-page {
  padding: 20px;
}
.character-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
</style>