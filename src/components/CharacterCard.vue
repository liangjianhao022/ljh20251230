<template>
  <!-- 卡片仅负责点击跳转到详情页 -->
  <div class="character-card" @click="handleCardClick">
    <img :src="imgUrl" :alt="character.name" class="card-img" />
    <div class="card-info">
      <h3>{{ character.name }}</h3>
      <p>{{ character.team }} | {{ character.position }} ({{ character.number }})</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
});

const router = useRouter();

// 点击卡片跳转到详情页（下一级页面）
const handleCardClick = () => {
  router.push({
    name: 'CharacterDetail',
    params: { id: props.character.id }
  });
};

const imgUrl = new URL(props.character.img, import.meta.url).href;
</script>

<style scoped>
.character-card {
  width: 200px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  transition: transform 0.2s;
}
.character-card:hover {
  transform: scale(1.05);
}
.card-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 4px;
}
.card-info {
  margin-top: 8px;
}
.card-info h3 {
  margin: 0;
  font-size: 16px;
}
.card-info p {
  margin: 4px 0 0;
  font-size: 12px;
  color: #666;
}
</style>