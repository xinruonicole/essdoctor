<template>
  <div class="home-page">
    <!-- Hero区域 -->
    <section class="hero-section">
      <!-- 背景动画Canvas -->
      <canvas ref="backgroundCanvas" class="background-canvas"></canvas>
      <div class="container-custom">
        <div class="hero-content">
          <!-- 左侧3D模型区域 -->
          <div class="hero-model">
            <div class="battery-model offline" :class="{ online: isBatteryOnline }">
              <div class="battery-body">
                <div class="battery-fill" :style="{ height: batteryLevel + '%' }"></div>
                <!-- 正极 -->
                <div class="battery-terminal positive"></div>
                <!-- 负极 -->
                <div class="battery-terminal negative"></div>
              </div>
              <div class="dtu-device" :class="{ connected: isDTUConnected }">
                <span>DTU</span>
              </div>
            </div>
          </div>

          <!-- 右侧文案区域 -->
          <div class="hero-text">
            <h1 class="hero-title">
              储能医生
              <span class="title-sub">让"沉默"储能柜重新跑起来</span>
            </h1>
            <p class="hero-desc">
              <span class="highlight-text">30分钟</span>，专业解决储能柜断连问题
            </p>
            <div class="hero-features">
              <span class="feature-tag">断连救援</span>
              <span class="feature-tag">DTU即插即连</span>
              <span class="feature-tag">零改造</span>
              <span class="feature-tag">4G上云</span>
            </div>
            
            <!-- CTA按钮 -->
            <div class="hero-actions">
              <el-button 
                v-if="!userStore.isLoggedIn"
                type="primary" 
                size="large"
                @click="openLoginDialog"
                class="rescue-btn">
                立即救援
              </el-button>
              <el-button 
                v-else
                type="primary" 
                size="large"
                @click="$router.push('/case')"
                class="case-btn">
                查看案例
              </el-button>
              <el-button 
                type="default" 
                size="large"
                @click="$router.push('/products')"
                class="product-btn">
                产品介绍
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 痛点直击区域 -->
    <section class="pain-points-section">
      <div class="container-custom">
        <h2 class="section-title">储能柜常见痛点</h2>
        <div class="pain-points-grid">
          <div v-for="point in painPoints" :key="point.id" class="pain-point-card" :class="point.class">
            <div class="point-icon">{{ point.icon }}</div>
            <h3 class="point-title">{{ point.title }}</h3>
            <p class="point-desc">{{ point.desc }}</p>
            <div class="point-badge">{{ point.badge }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 救援方案区域 -->
    <section class="solution-section">
      <div class="container-custom">
        <h2 class="section-title">三步救援方案</h2>
        <div class="solution-steps">
          <div v-for="step in solutionSteps" :key="step.step" class="solution-step">
            <div class="step-number">{{ step.step }}</div>
            <div class="step-content">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 成功案例预览 -->
    <section class="cases-preview-section">
      <div class="container-custom">
        <div class="section-header">
          <h2 class="section-title">典型救援案例</h2>
          <el-button type="text" @click="$router.push('/case')" class="more-btn">
            查看更多 →
          </el-button>
        </div>
        <div class="cases-grid">
          <div v-for="caseItem in previewCases" :key="caseItem.id" class="case-card">
            <div class="case-image">
              <img :src="caseItem.image" :alt="caseItem.title" />
            </div>
            <div class="case-content">
              <h3 class="case-title">{{ caseItem.title }}</h3>
              <p class="case-desc">{{ caseItem.desc }}</p>
              <div class="case-stats">
                <span class="stat">救援时长: {{ caseItem.rescueTime }}</span>
                <span class="stat">恢复收益: {{ caseItem.revenue }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 救援通道 -->
    <section class="rescue-channel-section">
      <div class="container-custom">
        <h2 class="section-title">立即申请救援</h2>
        <div class="rescue-form">
          <el-form :model="rescueForm" :rules="rescueRules" ref="rescueFormRef">
            <div class="form-grid">
              <el-form-item prop="name" label="姓名">
                <el-input v-model="rescueForm.name" placeholder="请输入姓名" />
              </el-form-item>
              
              <el-form-item prop="company" label="公司">
                <el-input v-model="rescueForm.company" placeholder="请输入公司名称" />
              </el-form-item>
              
              <el-form-item prop="capacity" label="柜体容量">
                <el-input v-model="rescueForm.capacity" placeholder="请输入储能柜容量(kWh)" />
              </el-form-item>
              
              <el-form-item prop="offlineTime" label="离线时长">
                <el-input v-model="rescueForm.offlineTime" placeholder="请输入离线天数" />
              </el-form-item>
              
              <el-form-item prop="address" label="地址" class="full-width">
                <el-input v-model="rescueForm.address" placeholder="请输入详细地址" />
              </el-form-item>
              
              <el-form-item prop="photos" label="现场照片" class="full-width">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  :on-change="handlePhotoUpload">
                  <el-icon><Plus /></el-icon>
                </el-upload>
              </el-form-item>
            </div>
            
            <div class="form-actions">
              <el-button 
                type="primary" 
                size="large"
                @click="submitRescue"
                :disabled="!userStore.isLoggedIn">
                {{ userStore.isLoggedIn ? '一键提交救援申请' : '登录后可提交申请' }}
              </el-button>
              
              <div v-if="!userStore.isLoggedIn" class="login-tip">
                <span>登录后可查看救援进度</span>
                <el-button type="text" @click="openLoginDialog" class="login-link">立即登录</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, inject, onUnmounted } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useUserStore } from '../stores/user'
import { Plus } from '@element-plus/icons-vue'

const userStore = useUserStore()
const rescueFormRef = ref<FormInstance>()
const backgroundCanvas = ref<HTMLCanvasElement>()





// 注入全局方法
const openLoginDialog = inject('openLoginDialog') as () => void

// Hero区域动画状态
const isBatteryOnline = ref(false)
const isDTUConnected = ref(false)
const batteryLevel = ref(0)

// 救援表单
const rescueForm = reactive({
  name: '',
  company: '',
  capacity: '',
  offlineTime: '',
  address: '',
  photos: []
})

const rescueRules: FormRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  company: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
  capacity: [{ required: true, message: '请输入柜体容量', trigger: 'blur' }],
  offlineTime: [{ required: true, message: '请输入离线时长', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
}

// 痛点数据
const painPoints = [
  {
    id: 1,
    icon: '🔴',
    title: '柜体离线≥180天',
    desc: '长期断连导致数据丢失，无法监控运行状态',
    badge: '高发问题',
    class: 'pulse-red'
  },
  {
    id: 2,
    icon: '💰',
    title: '无数据=无收益',
    desc: '无法参与电力交易，造成巨大经济损失',
    badge: '直接损失',
    class: 'pulse-orange'
  },
  {
    id: 3,
    icon: '🚗',
    title: '现场排查成本≥3000元/次',
    desc: '技术人员往返现场，耗时耗力成本高',
    badge: '隐性成本',
    class: 'pulse-blue'
  }
]

// 救援方案步骤
const solutionSteps = [
  {
    step: 1,
    title: '接入即插即用DTU',
    desc: '专用DTU设备，无需改造现有柜体，即插即用'
  },
  {
    step: 2,
    title: '10分钟接线',
    desc: '标准化接线方案，专业工程师远程指导'
  },
  {
    step: 3,
    title: '5分钟数据上线',
    desc: '4G网络自动上云，实时数据监控恢复'
  }
]

// 预览案例
const previewCases = [
  {
    id: 1,
    title: '某工业园区储能柜救援',
    desc: '离线210天后成功恢复，日均收益恢复至1200元',
    rescueTime: '25分钟',
    revenue: '月增3.6万元',
    image: '/images/case1.jpg'
  },
  {
    id: 2,
    title: '商业综合体储能系统',
    desc: '多柜体集群断连，一站式解决方案',
    rescueTime: '35分钟',
    revenue: '年避免损失50万',
    image: '/images/case2.jpg'
  }
]

// 照片上传处理
const handlePhotoUpload = (file: any) => {
  // 模拟上传处理
  console.log('上传文件:', file)
}

// 提交救援申请
const submitRescue = async () => {
  if (!rescueFormRef.value) return

  try {
    await rescueFormRef.value.validate()
    ElMessage.success('救援申请提交成功！我们将尽快联系您')
    // 重置表单
    rescueFormRef.value.resetFields()
  } catch (error) {
    ElMessage.error('请完善表单信息')
  }
}



// 初始化动画
onMounted(() => {
  console.log('页面加载完成，DTU初始状态:', isDTUConnected.value)
  console.log('DTU设备应该完全隐藏，位置在电池右侧外部')
  
  // 确保DTU初始状态为false
  isDTUConnected.value = false
  
  // 添加DOM检查，查看DTU元素的实际状态
  setTimeout(() => {
    const dtuElement = document.querySelector('.dtu-device')
    if (dtuElement) {
      console.log('DTU元素初始状态:', dtuElement)
      console.log('DTU元素类名:', dtuElement.className)
      console.log('DTU元素样式:', window.getComputedStyle(dtuElement))
    } else {
      console.log('未找到DTU元素')
    }
  }, 500)
  
  setTimeout(() => {
    console.log('开始DTU连接动画 - 从右侧滑入')
    // DTU连接动画 - 从右侧滑入
    isDTUConnected.value = true
    console.log('DTU连接状态已设置为true，应该开始滑入动画')
    
    // 检查DTU元素状态变化
    setTimeout(() => {
      const dtuElement = document.querySelector('.dtu-device')
      if (dtuElement) {
        console.log('动画开始后DTU元素类名:', dtuElement.className)
        console.log('动画开始后DTU元素样式:', window.getComputedStyle(dtuElement))
        console.log('DTU元素位置:', dtuElement.getBoundingClientRect())
      }
    }, 500)
    
    // 等待DTU动画完全播放后再开始电池充电
    setTimeout(() => {
      console.log('开始电池充电动画')
      isBatteryOnline.value = true
      // 模拟电量恢复动画
      let level = 0
      const interval = setInterval(() => {
        level += 3
        batteryLevel.value = level
        if (level >= 100) {
          clearInterval(interval)
          batteryLevel.value = 100
          console.log('电池充电完成')
        }
      }, 150)
    }, 2000)  // 延长DTU动画播放时间
  }, 1500)  // 延迟1.5秒开始动画
})
</script>

<style scoped>
.home-page {
  @apply pt-16;
}

/* Hero区域样式 */
.hero-section {
  @apply relative py-20 overflow-hidden;
  background: linear-gradient(90deg, 
    #1C365B 0%, 
    #254A6B 25%, 
    #2C5E73 50%, 
    #2F6C76 75%, 
    #306F75 100%);
}

.background-canvas {
  @apply absolute inset-0 w-full h-full pointer-events-none;
}

.hero-section::before {
  content: '';
  @apply absolute inset-0;
  background: radial-gradient(circle at 20% 80%, rgba(48, 111, 117, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(44, 94, 115, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(37, 74, 107, 0.1) 0%, transparent 50%);
}

.hero-section::after {
  content: '';
  @apply absolute inset-0;
  background: linear-gradient(45deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.04) 25%, 
    transparent 50%, 
    rgba(255, 255, 255, 0.03) 75%, 
    transparent 100%);
}

.hero-content {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-12 items-center;
}

.hero-model {
  @apply flex justify-center;
}

.battery-model {
  @apply relative w-64 h-64;
}

.battery-body {
  @apply absolute inset-0 bg-slate-700 rounded-xl border-4 border-slate-600;
  transition: all 0.5s ease;
}

.battery-model.online .battery-body {
  @apply border-slate-600; /* 保持离线状态的边框颜色 */
  box-shadow: none; /* 去掉发光效果 */
}

.battery-fill {
  @apply absolute bottom-0 left-0 right-0 bg-slate-600 transition-all duration-1000;
  border-radius: 8px 8px 8px 8px; /* 所有角都圆角，与外壳协调 */
}

.battery-model.online .battery-fill {
  background: linear-gradient(to top, #22c55e, #16a34a);
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3);
  border-radius: 8px 8px 8px 8px; /* 在线状态也保持圆角 */
}

/* 电池正负极样式 */
.battery-terminal {
  position: absolute;
  width: 25px;
  height: 30px; /* 增加高度，一半在内部一半凸出 */
  border-radius: 0; /* 矩形 */
  z-index: 100; /* 大幅提高层级 */
  top: -15px; /* 一半凸出电池外面 */
  background-color: #4b5563 !important; /* 与电池外壳相似的颜色 */
}

.battery-terminal.positive {
  left: 50px; /* 偏左位置 */
  background-color: #22c55e !important; /* 一直在线的绿色 */
}

.battery-terminal.negative {
  right: 50px; /* 偏右位置 */
  background-color: #22c55e !important; /* 一直在线的绿色 */
}

.battery-model.online .battery-terminal.positive {
  background-color: #22c55e !important; /* 在线状态的绿色 */
}

.battery-model.online .battery-terminal.negative {
  background-color: #22c55e !important; /* 在线状态的绿色 */
}

.dtu-device {
  position: absolute;
  bottom: 0;
  right: -70px; /* 移动到电池外部右下角 */
  background-color: rgb(100, 116, 139);
  color: white;
  padding: 8px;
  border-radius: 6px;
  font-size: 12px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.8s ease;
  z-index: 10;
}

.dtu-device.connected {
  opacity: 1;
  transform: scale(1);
  background-color: rgb(34, 197, 94);
  animation: dtu-pulse 2s ease-in-out infinite; /* 改为无限循环 */
  right: -50px; /* 连接后稍微靠近电池，但仍在外部 */
}

.hero-text {
  @apply space-y-6 relative z-10;
}

.hero-title {
  @apply text-5xl font-bold text-white mb-4;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.title-sub {
  @apply block text-2xl text-green-400 mt-2 font-light;
}

.hero-desc {
  @apply text-xl text-slate-200 mb-6;
}

.highlight-text {
  @apply text-3xl font-bold text-green-400;
}

.hero-features {
  @apply flex flex-wrap gap-3;
}

.feature-tag {
  @apply bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-400/30 backdrop-blur-sm;
}

.hero-actions {
  @apply flex gap-4 mt-8;
}

.rescue-btn {
  @apply bg-gradient-to-r from-green-500 to-green-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300;
}

.case-btn, .product-btn {
  @apply border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300;
}

/* 痛点直击区域样式 */
.pain-points-section {
  @apply py-16 bg-white;
}

.section-title {
  @apply text-3xl font-bold text-center mb-12 text-slate-800;
}

.pain-points-grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-8;
}

.pain-point-card {
  @apply bg-white p-8 rounded-xl shadow-lg border border-slate-200 transition-all duration-300 hover:shadow-xl;
}

.point-icon {
  @apply text-4xl mb-4;
}

.point-title {
  @apply text-xl font-bold text-slate-800 mb-3;
}

.point-desc {
  @apply text-slate-600 mb-4;
}

.point-badge {
  @apply inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium;
}

/* 救援方案区域样式 */
.solution-section {
  @apply py-16 bg-slate-100;
}

.solution-steps {
  @apply grid grid-cols-1 md:grid-cols-3 gap-8;
}

.solution-step {
  @apply text-center;
}

.step-number {
  @apply w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4;
}

.step-title {
  @apply text-xl font-bold text-slate-800 mb-2;
}

.step-desc {
  @apply text-slate-600;
}

/* 成功案例预览样式 */
.cases-preview-section {
  @apply py-16 bg-white;
}

.section-header {
  @apply flex justify-center items-center mb-8 relative;
}

.more-btn {
  @apply text-green-500 hover:text-green-600;
  position: absolute;
  right: 0;
}

.cases-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center;
}

.case-card {
  @apply bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 mx-auto max-w-md;
}

.case-image {
  @apply h-48 bg-slate-200 flex items-center justify-center;
}

.case-content {
  @apply p-6;
}

.case-title {
  @apply text-xl font-bold text-slate-800 mb-2;
}

.case-desc {
  @apply text-slate-600 mb-4;
}

.case-stats {
  @apply flex justify-between text-sm text-slate-500;
}

/* 救援通道样式 */
.rescue-channel-section {
  @apply py-16 bg-white;
}

.rescue-form {
  @apply max-w-4xl mx-auto;
}

.form-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}

.full-width {
  @apply md:col-span-2;
}

.form-actions {
  @apply text-center mt-8;
}

.login-tip {
  @apply mt-4 text-slate-600;
}

.login-link {
  @apply text-green-500 hover:text-green-600;
}

/* 容器样式 */
.container-custom {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* 动画效果 */
.pulse-red {
  animation: pulse-red 2s infinite;
}

.pulse-orange {
  animation: pulse-orange 2s infinite;
}

.pulse-blue {
  animation: pulse-blue 2s infinite;
}

@keyframes pulse-red {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(239, 68, 68, 0.3); }
}

@keyframes pulse-orange {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(249, 115, 22, 0.3); }
}

@keyframes pulse-blue {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
}

@keyframes dtu-pulse {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  50% { 
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(72, 187, 120, 0.5);
  }
}
</style>