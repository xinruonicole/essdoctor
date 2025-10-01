<template>
  <div class="loading-container">
    <div class="battery-animation">
      <!-- SVG电池充电动画 -->
      <svg width="200" height="120" viewBox="0 0 200 120" class="battery-svg">
        <!-- 电池外壳 -->
        <rect x="50" y="30" width="100" height="60" rx="8" ry="8" 
              fill="#e5e7eb" stroke="#6b7280" stroke-width="2" class="battery-case"/>
        
        <!-- 电池正极 -->
        <rect x="145" y="45" width="8" height="30" rx="2" ry="2" fill="#6b7280"/>
        
        <!-- 电量填充（从灰到绿） -->
        <rect x="55" y="35" :width="fillWidth" height="50" rx="6" ry="6" 
              :fill="fillColor" class="battery-fill"/>
        
        <!-- 闪电图标 -->
        <path d="M100,50 L90,70 L100,65 L110,85 L100,80 L110,60 Z" 
              fill="#ffffff" opacity="0.8" class="lightning"/>
      </svg>
      
      <div class="loading-text">
        <span class="text-electric-blue font-bold text-xl">储能医生</span>
        <p class="text-electric-gray mt-2">正在启动救援系统...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const fillWidth = ref(0)
const fillColor = ref('#e5e7eb')

onMounted(() => {
  // 模拟充电动画：灰色→绿色渐变
  let progress = 0
  const interval = setInterval(() => {
    progress += 2
    fillWidth.value = progress
    
    // 颜色渐变：灰色(#e5e7eb) → 绿色(#14B8A6)
    if (progress < 50) {
      fillColor.value = '#e5e7eb'
    } else if (progress < 80) {
      fillColor.value = '#a7f3d0' // 浅绿
    } else {
      fillColor.value = '#14B8A6' // 主绿色
    }
    
    if (progress >= 90) {
      clearInterval(interval)
    }
  }, 50)
})
</script>

<style scoped>
.loading-container {
  @apply fixed inset-0 bg-white flex items-center justify-center z-50;
}

.battery-animation {
  @apply flex flex-col items-center;
}

.battery-svg {
  @apply mb-6;
}

.battery-case {
  transition: all 0.5s ease;
}

.battery-fill {
  transition: all 0.3s ease;
}

.lightning {
  animation: sparkle 1.5s infinite alternate;
}

@keyframes sparkle {
  0% {
    opacity: 0.3;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1.1);
  }
}

.loading-text {
  @apply text-center;
}
</style>