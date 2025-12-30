<template>
  <div class="team-page">
    <!-- 返回按钮 -->
    <el-button @click="$router.push('/')" icon="el-icon-back">返回首页</el-button>
    <!-- 队伍标签 -->
    <el-tabs v-model="activeTeam" class="team-tabs" style="margin-top: 20px;">
      <el-tab-pane label="乌野高校" name="乌野高校"></el-tab-pane>
      <el-tab-pane label="青城高校" name="青城高校"></el-tab-pane>
      <el-tab-pane label="音驹高校" name="音驹高校"></el-tab-pane>
      <el-tab-pane label="枭谷学园" name="枭谷学园"></el-tab-pane>
      <el-tab-pane label="稻荷崎高校" name="稻荷崎高校"></el-tab-pane>
      <el-tab-pane label="白鸟泽" name="王者校白鸟泽"></el-tab-pane>
    </el-tabs>
    <!-- 对应队伍的角色列表 -->
    <div class="team-character-list">
      <CharacterCard
        v-for="item in filteredTeamCharacters"
        :key="item.id"
        :character="item"
      ></CharacterCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
// 导入组件和数据
import CharacterCard from '../components/CharacterCard.vue'
import characterList from '../data/characterList.json'

// 激活的队伍标签
const activeTeam = ref('乌野高校')
// 所有角色
const allCharacters = ref([])
// 筛选后的队伍角色
const filteredTeamCharacters = ref([])

// 初始化
onMounted(() => {
  allCharacters.value = characterList
  filterCharactersByTeam()
})

// 监听队伍标签变化，重新筛选
watch(activeTeam, () => {
  filterCharactersByTeam()
})

// 按队伍筛选角色
const filterCharactersByTeam = () => {
  filteredTeamCharacters.value = allCharacters.value.filter(item => 
    item.team === activeTeam.value
  )
}
</script>

<style scoped>
.team-page {
  padding: 20px;
}
.team-tabs {
  width: 80%;
  margin: 0 auto;
}
.team-character-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
</style>