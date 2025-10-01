<template>
  <div class="case-detail-page">
    <div class="container-custom py-8">
      <!-- 返回按钮 -->
      <div class="back-nav">
        <el-button type="text" @click="$router.back()" class="back-btn">
          <el-icon><ArrowLeft /></el-icon>
          返回案例列表
        </el-button>
      </div>

      <!-- 案例头部 -->
      <div class="case-header">
        <div class="case-basic-info">
          <h1 class="case-title">{{ caseData.title }}</h1>
          <div class="case-meta">
            <span class="meta-item">
              <el-icon><Location /></el-icon>
              {{ caseData.location }}
            </span>
            <span class="meta-item">
              <el-icon><Clock /></el-icon>
              {{ caseData.date }}
            </span>
            <span class="meta-item">
              <el-icon><User /></el-icon>
              {{ caseData.customer }}
            </span>
          </div>
        </div>
        
        <div class="case-stats">
          <div class="stat-item">
            <div class="stat-value">{{ caseData.rescueTime }}</div>
            <div class="stat-label">救援时长</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ caseData.capacity }}</div>
            <div class="stat-label">柜体容量</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ caseData.offlineTime }}</div>
            <div class="stat-label">离线时长</div>
          </div>
        </div>
      </div>

      <!-- 案例内容 -->
      <div class="case-content">
        <!-- 问题描述 -->
        <section class="case-section">
          <h2 class="section-title">问题背景</h2>
          <div class="problem-description">
            <p>{{ caseData.problem }}</p>
            <div class="problem-tags">
              <span v-for="tag in caseData.problemTags" :key="tag" class="problem-tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </section>

        <!-- 救援过程 -->
        <section class="case-section">
          <h2 class="section-title">救援过程</h2>
          <div class="rescue-process">
            <div v-for="step in caseData.rescueSteps" :key="step.step" class="process-step">
              <div class="step-header">
                <div class="step-number">{{ step.step }}</div>
                <h3 class="step-title">{{ step.title }}</h3>
                <span class="step-time">{{ step.time }}</span>
              </div>
              <p class="step-desc">{{ step.description }}</p>
              <div v-if="step.images" class="step-images">
                <img v-for="img in step.images" :key="img" :src="img" class="step-image" />
              </div>
            </div>
          </div>
        </section>

        <!-- 数据对比 -->
        <section class="case-section">
          <h2 class="section-title">救援效果对比</h2>
          <div class="comparison-charts">
            <div class="chart-container">
              <h3>收益对比 (元/天)</h3>
              <div class="chart-bar">
                <div class="bar-group">
                  <div class="bar-label">救援前</div>
                  <div class="bar before-bar" :style="{ height: caseData.beforeRevenue / 20 + 'px' }">
                    {{ caseData.beforeRevenue }}
                  </div>
                </div>
                <div class="bar-group">
                  <div class="bar-label">救援后</div>
                  <div class="bar after-bar" :style="{ height: caseData.afterRevenue / 20 + 'px' }">
                    {{ caseData.afterRevenue }}
                  </div>
                </div>
              </div>
            </div>
            
            <div class="chart-container">
              <h3>运行状态对比</h3>
              <div class="status-comparison">
                <div class="status-item before">
                  <div class="status-icon">🔴</div>
                  <div class="status-text">离线状态</div>
                </div>
                <div class="status-arrow">→</div>
                <div class="status-item after">
                  <div class="status-icon">🟢</div>
                  <div class="status-text">在线运行</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 客户证言 -->
        <section class="case-section" v-if="caseData.testimonial">
          <h2 class="section-title">客户评价</h2>
          <div class="testimonial">
            <div class="testimonial-content">
              <p>"{{ caseData.testimonial.content }}"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <img :src="caseData.testimonial.avatar" :alt="caseData.testimonial.name" />
              </div>
              <div class="author-info">
                <div class="author-name">{{ caseData.testimonial.name }}</div>
                <div class="author-position">{{ caseData.testimonial.position }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 技术参数 -->
        <section class="case-section">
          <h2 class="section-title">技术参数</h2>
          <div class="tech-specs">
            <div class="spec-grid">
              <div v-for="spec in caseData.techSpecs" :key="spec.name" class="spec-item">
                <span class="spec-name">{{ spec.name }}</span>
                <span class="spec-value">{{ spec.value }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 行动号召 -->
      <div class="cta-section">
        <div class="cta-content">
          <h3>您的储能柜也遇到类似问题？</h3>
          <p>立即联系储能医生，专业团队为您提供定制化解决方案</p>
          <div class="cta-actions">
            <el-button type="primary" size="large" @click="handleConsult">
              立即咨询
            </el-button>
            <el-button type="default" size="large" @click="$router.push('/products')">
              查看产品
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, Location, Clock, User } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'

const route = useRoute()
const userStore = useUserStore()
const caseId = ref(route.params.id)

// 案例数据（根据ID从API获取，这里使用模拟数据）
const caseData = ref({
  id: 1,
  title: '某工业园区储能系统断连救援案例',
  location: '江苏苏州工业园区',
  date: '2024-08-15',
  customer: '某制造企业',
  capacity: '200kWh',
  rescueTime: '25分钟',
  offlineTime: '210天',
  
  problem: '该园区储能柜因通信模块老化导致完全断连，无法上传运行数据，无法参与电力市场交易，造成每日约1200元的经济损失。现场排查多次未能解决问题，传统方案需要更换整个通信模块，成本高昂且周期长。',
  
  problemTags: ['通信模块故障', '数据断连', '收益损失', '排查困难'],
  
  rescueSteps: [
    {
      step: 1,
      title: '现场诊断与DTU部署',
      time: '5分钟',
      description: '技术人员现场确认通信故障，部署储能医生专用DTU设备，即插即用无需改造。',
      images: ['/images/step1-1.jpg', '/images/step1-2.jpg']
    },
    {
      step: 2,
      title: '设备接线与配置',
      time: '10分钟',
      description: '标准化接线方案，通过手机APP快速完成设备配置，4G网络自动连接。',
      images: ['/images/step2-1.jpg']
    },
    {
      step: 3,
      title: '数据上线与验证',
      time: '5分钟',
      description: '云平台实时接收数据，验证各项运行参数正常，系统恢复在线监控。',
      images: ['/images/step3-1.jpg']
    },
    {
      step: 4,
      title: '策略优化与收益恢复',
      time: '5分钟',
      description: '配置最优充放电策略，立即恢复参与电力交易，实现收益最大化。'
    }
  ],
  
  beforeRevenue: 0,
  afterRevenue: 1200,
  
  testimonial: {
    content: '储能医生的救援效率超出预期！210天离线的柜体在25分钟内恢复运行，避免了更大的经济损失。专业的技术团队和高效的解决方案让我们非常满意。',
    name: '张经理',
    position: '设备运维主管',
    avatar: '/images/avatar-customer.jpg'
  },
  
  techSpecs: [
    { name: 'DTU型号', value: 'ESS-DTU-200' },
    { name: '通信方式', value: '4G LTE Cat.4' },
    { name: '接入接口', value: 'RS485' },
    { name: '防护等级', value: 'IP65' },
    { name: '工作温度', value: '-40℃ ~ +85℃' },
    { name: '配置工具', value: '手机APP' }
  ]
})

// 咨询处理
const handleConsult = () => {
  if (!userStore.isLoggedIn) {
    const event = new CustomEvent('openLoginDialog')
    window.dispatchEvent(event)
    return
  }
  ElMessage.success('客服人员将尽快联系您')
}

onMounted(() => {
  // 根据caseId从API获取案例详情
  console.log('加载案例详情:', caseId.value)
})
</script>

<style scoped>
.case-detail-page {
  @apply min-h-screen bg-gray-50 pt-20; /* 增加顶部内边距 */
}

.back-nav {
  @apply mb-6 pt-4; /* 增加返回按钮顶部内边距 */
}

.back-btn {
  @apply text-electric-green hover:text-teal-600;
}

.case-header {
  @apply bg-white rounded-lg p-8 mb-8 shadow-sm;
  @apply grid grid-cols-1 lg:grid-cols-3 gap-8 items-center;
}

.case-basic-info {
  @apply lg:col-span-2;
}

.case-title {
  @apply text-3xl font-bold text-gray-900 mb-4;
}

.case-meta {
  @apply flex flex-wrap gap-6;
}

.meta-item {
  @apply flex items-center gap-2 text-gray-600;
}

.case-stats {
  @apply grid grid-cols-3 gap-4;
}

.stat-item {
  @apply text-center p-4 bg-blue-50 rounded-lg;
}

.stat-value {
  @apply text-2xl font-bold text-electric-green mb-1;
}

.stat-label {
  @apply text-sm text-gray-600;
}

.case-content {
  @apply space-y-8;
}

.case-section {
  @apply bg-white rounded-lg p-8 shadow-sm;
}

.section-title {
  @apply text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200;
}

.problem-description {
  @apply space-y-4;
}

.problem-tags {
  @apply flex flex-wrap gap-2;
}

.problem-tag {
  @apply bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm;
}

.rescue-process {
  @apply space-y-6;
}

.process-step {
  @apply border-l-4 border-electric-green pl-6 pb-6 relative;
}

.process-step:last-child {
  @apply pb-0;
}

.process-step::before {
  content: '';
  @apply absolute left-0 top-0 w-4 h-4 bg-electric-green rounded-full -left-2;
}

.step-header {
  @apply flex items-center gap-4 mb-3;
}

.step-number {
  @apply bg-electric-green text-white w-8 h-8 rounded-full flex items-center justify-center font-bold;
}

.step-title {
  @apply text-lg font-semibold text-gray-900 flex-1;
}

.step-time {
  @apply bg-green-100 text-green-800 px-2 py-1 rounded text-sm;
}

.step-desc {
  @apply text-gray-600 mb-3;
}

.step-images {
  @apply flex gap-2;
}

.step-image {
  @apply w-24 h-24 object-cover rounded border border-gray-200;
}

.comparison-charts {
  @apply grid grid-cols-1 md:grid-cols-2 gap-8;
}

.chart-container {
  @apply p-4 bg-gray-50 rounded-lg;
}

.chart-container h3 {
  @apply text-lg font-semibold mb-4 text-center;
}

.chart-bar {
  @apply flex justify-center items-end gap-8 h-40;
}

.bar-group {
  @apply text-center;
}

.bar-label {
  @apply text-sm text-gray-600 mb-2;
}

.bar {
  @apply w-16 rounded-t transition-all duration-500 flex items-center justify-center text-white font-bold;
}

.before-bar {
  @apply bg-red-500;
}

.after-bar {
  @apply bg-green-500;
}

.status-comparison {
  @apply flex items-center justify-center gap-8;
}

.status-item {
  @apply text-center p-4 rounded-lg;
}

.status-item.before {
  @apply bg-red-50 border border-red-200;
}

.status-item.after {
  @apply bg-green-50 border border-green-200;
}

.status-icon {
  @apply text-2xl mb-2;
}

.status-text {
  @apply text-sm font-semibold;
}

.status-arrow {
  @apply text-2xl text-gray-400;
}

.testimonial {
  @apply bg-blue-50 rounded-lg p-6;
}

.testimonial-content {
  @apply text-lg italic text-gray-700 mb-6;
}

.testimonial-author {
  @apply flex items-center gap-4;
}

.author-avatar {
  @apply w-12 h-12 rounded-full overflow-hidden;
}

.author-avatar img {
  @apply w-full h-full object-cover;
}

.author-name {
  @apply font-semibold text-gray-900;
}

.author-position {
  @apply text-sm text-gray-600;
}

.tech-specs {
  @apply bg-gray-50 rounded-lg p-4;
}

.spec-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
}

.spec-item {
  @apply flex justify-between items-center py-2 border-b border-gray-200;
}

.spec-name {
  @apply text-gray-600;
}

.spec-value {
  @apply font-semibold text-gray-900;
}

.cta-section {
  @apply bg-gradient-to-r from-electric-blue to-electric-green rounded-lg p-8 text-center text-white mt-8;
}

.cta-content h3 {
  @apply text-2xl font-bold mb-2;
}

.cta-content p {
  @apply text-lg mb-6 opacity-90;
}

.cta-actions {
  @apply flex justify-center gap-4;
}

@media (max-width: 768px) {
  .case-header {
    @apply grid-cols-1 gap-4;
  }
  
  .case-stats {
    @apply grid-cols-3 gap-2;
  }
  
  .comparison-charts {
    @apply grid-cols-1;
  }
  
  .spec-grid {
    @apply grid-cols-1;
  }
  
  .cta-actions {
    @apply flex-col;
  }
}
</style>