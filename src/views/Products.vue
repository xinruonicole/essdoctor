<template>
  <div class="products-page">
    <div class="container-custom py-12">
      <div class="page-header">
        <h1 class="page-title">产品中心</h1>
        <p class="page-desc">专业DTU硬件设备与智能云平台解决方案</p>
      </div>

      <!-- 产品Tab切换 -->
      <el-tabs v-model="activeTab" class="product-tabs">
        <el-tab-pane label="DTU硬件设备" name="hardware">
          <div class="tab-content">
            <!-- 产品亮点 -->
            <div class="product-highlights">
              <div v-for="highlight in hardwareHighlights" :key="highlight.id" class="highlight-card">
                <div class="highlight-icon">{{ highlight.icon }}</div>
                <h3 class="highlight-title">{{ highlight.title }}</h3>
                <p class="highlight-desc">{{ highlight.desc }}</p>
              </div>
            </div>

            <!-- 产品规格 -->
            <div class="product-specs">
              <h3 class="specs-title">技术规格</h3>
              <el-table :data="hardwareSpecs" class="specs-table">
                <el-table-column prop="item" label="项目" width="200" />
                <el-table-column prop="spec" label="规格" />
              </el-table>
            </div>

            <!-- 产品图片 -->
            <div class="product-images">
              <h3 class="images-title">产品实拍</h3>
              <div class="images-grid">
                <div v-for="img in hardwareImages" :key="img.id" class="image-item">
                  <img :src="img.url" :alt="img.alt" class="product-image" />
                  <p class="image-desc">{{ img.desc }}</p>
                </div>
              </div>
            </div>

            <!-- 行动按钮 -->
            <div class="action-buttons">
              <el-button type="primary" size="large" @click="handleConsult">
                立即咨询
              </el-button>
              <el-button type="default" size="large" @click="downloadSpec">
                📄 下载规格书
              </el-button>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="云平台服务" name="platform">
          <div class="tab-content">
            <!-- 平台功能 -->
            <div class="platform-features">
              <div v-for="feature in platformFeatures" :key="feature.id" class="feature-card">
                <div class="feature-header">
                  <div class="feature-icon">{{ feature.icon }}</div>
                  <h3 class="feature-title">{{ feature.title }}</h3>
                </div>
                <p class="feature-desc">{{ feature.desc }}</p>
                <div class="feature-chart">
                  <!-- 图表占位 -->
                  <div class="chart-placeholder">
                    {{ feature.chartText }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 平台优势 -->
            <div class="platform-advantages">
              <h3 class="advantages-title">平台核心优势</h3>
              <div class="advantages-grid">
                <div v-for="advantage in platformAdvantages" :key="advantage.id" class="advantage-item">
                  <span class="advantage-badge">{{ advantage.badge }}</span>
                  <h4 class="advantage-title">{{ advantage.title }}</h4>
                  <p class="advantage-desc">{{ advantage.desc }}</p>
                </div>
              </div>
            </div>

            <!-- 行动按钮 -->
            <div class="action-buttons">
              <el-button type="primary" size="large" @click="handleConsult">
                立即体验
              </el-button>
              <el-button type="default" size="large" @click="viewDemo">
                🎥 观看演示
              </el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const activeTab = ref('hardware')

// 注入全局方法
const openLoginDialog = inject('openLoginDialog') as () => void

// DTU硬件亮点
const hardwareHighlights = [
  {
    id: 1,
    icon: '🔌',
    title: '即插即用',
    desc: '无需改造现有柜体，标准接口即插即连'
  },
  {
    id: 2,
    icon: '📶',
    title: '4G全网通',
    desc: '支持移动/联通/电信4G网络，自动切换最优信号'
  },
  {
    id: 3,
    icon: '⚡',
    title: '工业级防护',
    desc: 'IP65防护等级，-40℃~85℃宽温工作'
  },
  {
    id: 4,
    icon: '🔒',
    title: '安全加密',
    desc: '国密算法加密传输，保障数据安全'
  }
]

// 硬件规格
const hardwareSpecs = [
  { item: '通信方式', spec: '4G LTE Cat.1/Cat.4，支持Fallback到2G' },
  { item: '接口类型', spec: 'RS485/RS232/以太网，DI/DO/AI/AO' },
  { item: '供电电压', spec: 'DC 9~36V宽电压输入' },
  { item: '工作温度', spec: '-40℃ ~ +85℃' },
  { item: '防护等级', spec: 'IP65，防尘防水' },
  { item: '尺寸重量', spec: '120×90×35mm，约300g' }
]

// 硬件图片
const hardwareImages = [
  {
    id: 1,
    url: '/images/dtu-front.jpg',
    alt: 'DTU正面图',
    desc: '产品正面外观'
  },
  {
    id: 2,
    url: '/images/dtu-side.jpg',
    alt: 'DTU侧面图',
    desc: '接口侧面展示'
  },
  {
    id: 3,
    url: '/images/dtu-install.jpg',
    alt: '安装示意图',
    desc: '现场安装示例'
  }
]

// 云平台功能
const platformFeatures = [
  {
    id: 1,
    icon: '📊',
    title: '实时大屏监控',
    desc: '多维度数据可视化，实时掌握储能柜运行状态',
    chartText: '实时功率曲线图'
  },
  {
    id: 2,
    icon: '🚨',
    title: '智能故障告警',
    desc: 'AI算法自动识别异常，多级告警推送',
    chartText: '告警统计图表'
  },
  {
    id: 3,
    icon: '🤖',
    title: 'AI智能诊断',
    desc: '基于大数据分析的故障预测与健康管理',
    chartText: '健康度评估图'
  },
  {
    id: 4,
    icon: '⚙️',
    title: '策略下发控制',
    desc: '远程充放电策略配置，优化收益模式',
    chartText: '策略执行效果'
  },
  {
    id: 5,
    icon: '📋',
    title: '运维工单闭环',
    desc: '全流程工单管理，确保问题及时解决',
    chartText: '工单处理统计'
  }
]

// 平台优势
const platformAdvantages = [
  {
    id: 1,
    badge: '99.9%',
    title: '高可用性',
    desc: '多机房容灾备份，确保服务持续稳定'
  },
  {
    id: 2,
    badge: '<100ms',
    title: '低延迟',
    desc: '边缘计算节点，数据响应毫秒级'
  },
  {
    id: 3,
    badge: '256位',
    title: '高安全性',
    desc: '金融级加密传输，多重安全防护'
  },
  {
    id: 4,
    badge: '7×24h',
    title: '全天候运维',
    desc: '专业团队7×24小时监控运维'
  }
]

// 咨询处理
const handleConsult = () => {
  if (!userStore.isLoggedIn) {
    const event = new CustomEvent('openLoginDialog')
    window.dispatchEvent(event)
    return
  }
  ElMessage.success('客服人员将尽快联系您')
}

// 下载规格书
const downloadSpec = () => {
  // 模拟下载
  ElMessage.info('开始下载产品规格书...')
}

// 观看演示
const viewDemo = () => {
  ElMessage.info('即将跳转演示视频...')
}
</script>

<style scoped>
.products-page {
  @apply min-h-screen bg-gray-50 pt-20; /* 增加顶部内边距 */
}

.page-header {
  @apply text-center mb-12 pt-8; /* 增加页面标题顶部内边距 */
}

.page-title {
  @apply text-4xl font-bold text-gray-900 mb-4;
}

.page-desc {
  @apply text-xl text-gray-600;
}

.product-tabs {
  @apply bg-white rounded-lg shadow-sm;
}

.tab-content {
  @apply p-8;
}

/* 硬件产品样式 */
.product-highlights {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12;
}

.highlight-card {
  @apply text-center p-6 bg-blue-50 rounded-lg transition-transform duration-300 hover:scale-105;
}

.highlight-icon {
  @apply text-4xl mb-4;
}

.highlight-title {
  @apply text-lg font-semibold text-gray-900 mb-2;
}

.highlight-desc {
  @apply text-gray-600 text-sm;
}

.product-specs {
  @apply mb-12;
}

.specs-title {
  @apply text-2xl font-bold text-gray-900 mb-6;
}

.specs-table {
  @apply w-full;
}

.product-images {
  @apply mb-8;
}

.images-title {
  @apply text-2xl font-bold text-gray-900 mb-6;
}

.images-grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-6;
}

.image-item {
  @apply text-center;
}

.product-image {
  @apply w-full h-48 object-cover rounded-lg mb-3;
}

.image-desc {
  @apply text-sm text-gray-600;
}

/* 云平台样式 */
.platform-features {
  @apply space-y-6 mb-12;
}

.feature-card {
  @apply p-6 bg-white border border-gray-200 rounded-lg;
}

.feature-header {
  @apply flex items-center mb-4;
}

.feature-icon {
  @apply text-3xl mr-4;
}

.feature-title {
  @apply text-xl font-semibold text-gray-900;
}

.feature-desc {
  @apply text-gray-600 mb-4;
}

.feature-chart {
  @apply bg-gray-100 rounded p-4 h-32 flex items-center justify-center;
}

.chart-placeholder {
  @apply text-gray-500 text-lg;
}

.platform-advantages {
  @apply mb-8;
}

.advantages-title {
  @apply text-2xl font-bold text-gray-900 mb-6;
}

.advantages-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

.advantage-item {
  @apply text-center p-4;
}

.advantage-badge {
  @apply inline-block bg-electric-green text-white px-3 py-1 rounded-full text-sm font-bold mb-3;
}

.advantage-title {
  @apply text-lg font-semibold text-gray-900 mb-2;
}

.advantage-desc {
  @apply text-gray-600 text-sm;
}

.action-buttons {
  @apply flex justify-center gap-4;
}
</style>