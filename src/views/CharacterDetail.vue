<template>
  <div 
    class="detail-page" 
    :style="{ backgroundImage: `url(${flagUrl})` }"
  >
    <button class="back-home-btn" @click="goBackHome">返回首页</button>

    <div class="detail-content" v-if="character">
      <h2 class="character-title">{{ character.name }}</h2>

      <div class="info-layout">
        <img :src="imgUrl" :alt="character.name" class="character-img" />
        <div class="info-text">
          <p class="info-item">队伍：<span>{{ character.team }}</span></p>
          <p class="info-item">位置：<span>{{ character.position }}</span></p>
          <p class="info-item">号码：<span>{{ character.number }}</span></p>
          <p class="info-item">简介：<span>{{ character.intro }}</span></p>
        </div>
      </div>

      <div class="radar-section">
        <h3 class="radar-title">综合能力图（5分满分）</h3>
        <div class="radar-container">
          <svg width="400" height="400" viewBox="0 0 200 200">
            <!-- 辅助网格：仅保留线条，删除数字标注 -->
            <circle cx="100" cy="100" r="16" fill="none" stroke="#eee" stroke-width="1" stroke-dasharray="2" />
            <circle cx="100" cy="100" r="32" fill="none" stroke="#eee" stroke-width="1" stroke-dasharray="2" />
            <circle cx="100" cy="100" r="48" fill="none" stroke="#ddd" stroke-width="1.2" />
            <circle cx="100" cy="100" r="64" fill="none" stroke="#ccc" stroke-width="1.2" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#999" stroke-width="1.5" />
            
            <!-- 轴线 -->
            <line x1="100" y1="20" x2="100" y2="180" stroke="#bbb" stroke-width="1.2" />
            <line x1="30" y1="150" x2="170" y2="50" stroke="#bbb" stroke-width="1.2" />
            <line x1="30" y1="50" x2="170" y2="150" stroke="#bbb" stroke-width="1.2" />

            <!-- 雷达图多边形 -->
            <polygon
              :points="radarPoints"
              fill="rgba(66, 185, 131, 0.3)"
              stroke="#42b983"
              stroke-width="1.5"
              class="radar-polygon"
              stroke-linejoin="round"
            ></polygon>

            <!-- 仅保留维度名称标签，无数字 -->
            <text x="100" y="18" class="radar-label">力量</text>
            <text x="182" y="72" class="radar-label">速度</text>
            <text x="182" y="142" class="radar-label">跳跃</text>
            <text x="100" y="192" class="radar-label">体力</text>
            <text x="18" y="142" class="radar-label">技术</text>
            <text x="18" y="72" class="radar-label">头脑</text>
          </svg>
        </div>
      </div>
    </div>
    <div class="empty-tip" v-else>角色信息不存在</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import characterList from '../data/characterList.json';

const route = useRoute();
const router = useRouter();
const character = ref(null);
const imgUrl = ref('');
const flagUrl = ref('');
const radarPoints = ref('');

const goBackHome = () => {
  router.push('/');
};

const calcRadarPoints = (dims) => {
  const centerX = 100;
  const centerY = 100;
  const maxR = 80;
  const angles = [0, 60, 120, 180, 240, 300];
  const values = [
    dims.strength,
    dims.speed,
    dims.jump,
    dims.stamina,
    dims.skill,
    dims.intellect
  ];

  return values.map((val, idx) => {
    const angleRad = (angles[idx] * Math.PI) / 180;
    const r = (val / 5) * maxR;
    const x = centerX + r * Math.sin(angleRad);
    const y = centerY - r * Math.cos(angleRad);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
};

onMounted(() => {
  const target = characterList.find(item => item.id === Number(route.params.id));
  character.value = target;
  
  if (target) {
    imgUrl.value = new URL(target.img, import.meta.url).href;
    flagUrl.value = new URL(target.flagImg, import.meta.url).href;
    
    radarPoints.value = '100,100 100,100 100,100 100,100 100,100 100,100';
    setTimeout(() => {
      radarPoints.value = calcRadarPoints(target.sixDims);
    }, 300);
  }
});
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  padding: 30px 20px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  box-sizing: border-box;
  overflow-x: hidden;
  margin: 0;
}

.back-home-btn {
  padding: 10px 20px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
  z-index: 10;
  position: relative;
}
.back-home-btn:hover {
  background: #34495e;
}

.detail-content {
  max-width: 1200px;
  width: 100%;
  margin: 20px auto;
  padding: 30px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 5;
  box-sizing: border-box;
}

.character-title {
  margin: 0 0 20px;
  font-size: 2.5rem;
  font-family: "Microsoft YaHei", "Noto Sans SC", sans-serif;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.info-layout {
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
}
.character-img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.info-text {
  font-family: "Microsoft YaHei", "Noto Sans SC", sans-serif;
  font-size: 1.1rem;
  line-height: 2;
  color: #34495e;
}
.info-item span {
  font-weight: 600;
  color: #2980b9;
}

.radar-section {
  margin-top: 40px;
  text-align: center;
}
.radar-title {
  font-size: 1.5rem;
  font-family: "Microsoft YaHei", "Noto Sans SC", sans-serif;
  color: #2c3e50;
  margin-bottom: 20px;
}
.radar-container {
  display: flex;
  justify-content: center;
}

.radar-polygon {
  transition: all 2.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-origin: center center;
}

.radar-label {
  font-family: "Microsoft YaHei", "Noto Sans SC", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #2c3e50;
  text-anchor: middle;
  fill: #2c3e50;
}

.empty-tip {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 50px;
  position: relative;
  z-index: 5;
}
</style>