<template>
  <div class="case-list-page">
    <div class="container-custom py-12">
      <!-- 页面头部 -->
      <div class="page-header">
        <h1 class="page-title">成功案例</h1>
        <p class="page-desc">储能医生已成功救援数百个沉默储能柜，让客户重获收益</p>
        
        <!-- 筛选器 -->
        <div class="filters">
          <el-select v-model="filter.industry" placeholder="选择行业" class="filter-select">
            <el-option label="全部行业" value="" />
            <el-option label="工业园区" value="industrial" />
            <el-option label="商业综合体" value="commercial" />
            <el-option label="数据中心" value="datacenter" />
            <el-option label="新能源电站" value="powerplant" />
          </el-select>
          
          <el-select v-model="filter.capacity" placeholder="选择容量" class="filter-select">
            <el-option label="全部容量" value="" />
            <el-option label="小型 (<100kWh)" value="small" />
            <el-option label="中型 (100-500kWh)" value="medium" />
            <el-option label="大型 (>500kWh)" value="large" />
          </el-select>
          
          <el-select v-model="filter.offlineTime" placeholder="离线时长" class="filter-select">
            <el-option label="全部时长" value="" />
            <el-option label="短期 (<30天)" value="short" />
            <el-option label="中期 (30-180天)" value="medium" />
            <el-option label="长期 (>180天)" value="long" />
          </el-select>
        </div>
      </div>

      <!-- 案例统计 -->
      <div class="case-stats">
        <div class="stat-card">
          <div class="stat-number">{{ totalCases }}</div>
          <div class="stat-label">累计救援案例</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ totalRevenue }}万</div>
          <div class="stat-label">累计恢复收益</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ avgRescueTime }}分钟</div>
          <div class="stat-label">平均救援时长</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ successRate }}%</div>
          <div class="stat-label">救援成功率</div>
        </div>
      </div>

      <!-- 案例网格 -->
      <div class="cases-grid">
        <div 
          v-for="caseItem in filteredCases" 
          :key="caseItem.id"
          class="case-card"
          @click="viewCaseDetail(caseItem.id)">
          
          <!-- 案例图片 -->
          <div class="case-image">
            <img :src="caseItem.image" :alt="caseItem.title" />
            <div class="case-badge" :class="getBadgeClass(caseItem.offlineTime)">
              {{ getOfflineText(caseItem.offlineTime) }}
            </div>
          </div>

          <!-- 案例内容 -->
          <div class="case-content">
            <div class="case-header">
              <h3 class="case-title">{{ caseItem.title }}</h3>
              <span class="case-industry">{{ caseItem.industry }}</span>
            </div>
            
            <p class="case-desc">{{ caseItem.desc }}</p>
            
            <div class="case-meta">
              <div class="meta-item">
                <span class="meta-icon">⚡</span>
                <span class="meta-text">{{ caseItem.capacity }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">⏱️</span>
                <span class="meta-text">{{ caseItem.rescueTime }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">💰</span>
                <span class="meta-text">{{ caseItem.revenue }}</span>
              </div>
            </div>

            <!-- 关键指标 -->
            <div class="case-metrics">
              <div class="metric">
                <span class="metric-label">离线前收益</span>
                <span class="metric-value">{{ caseItem.beforeRevenue }}</span>
              </div>
              <div class="metric">
                <span class="metric-label">恢复后收益</span>
                <span class="metric-value success">{{ caseItem.afterRevenue }}</span>
              </div>
            </div>

            <div class="case-actions">
              <el-button type="primary" size="small" class="view-btn">
                查看详情
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页器 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="filteredCases.length"
          layout="prev, pager, next"
          background />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 筛选条件
const filter = ref({
  industry: '',
  capacity: '',
  offlineTime: ''
})

const currentPage = ref(1)
const pageSize = ref(9)

// 案例数据
const cases = [
  {
    id: 1,
    title: '某工业园区储能系统断连救援',
    industry: '工业园区',
    capacity: '200kWh',
    offlineTime: 210,
    rescueTime: '25分钟',
    revenue: '月增3.6万元',
    beforeRevenue: '0元/天',
    afterRevenue: '1200元/天',
    desc: '该园区储能柜因通信模块故障导致离线210天，通过储能医生DTU设备快速恢复连接，实现收益最大化。',
    image: '/images/case-industrial.jpg'
  },
  {
    id: 2,
    title: '商业综合体储能集群救援',
    industry: '商业综合体',
    capacity: '500kWh',
    offlineTime: 150,
    rescueTime: '35分钟',
    revenue: '年避免损失50万',
    beforeRevenue: '0元/天',
    afterRevenue: '1800元/天',
    desc: '多柜体集群同时断连，采用集中式救援方案，一次性恢复全部柜体运行。',
    image: '/images/case-commercial.jpg'
  },
  {
    id: 3,
    title: '数据中心备用电源救援',
    industry: '数据中心',
    capacity: '1000kWh',
    offlineTime: 90,
    rescueTime: '20分钟',
    revenue: '保障业务连续性',
    beforeRevenue: '风险无法评估',
    afterRevenue: '安全运行',
    desc: '数据中心备用储能系统通信中断，快速恢复监控确保业务连续性。',
    image: '/images/case-datacenter.jpg'
  },
  {
    id: 4,
    title: '新能源电站储能优化',
    industry: '新能源电站',
    capacity: '2000kWh',
    offlineTime: 180,
    rescueTime: '40分钟',
    revenue: '提升发电效率15%',
    beforeRevenue: '效率低下',
    afterRevenue: '优化运行',
    desc: '电站储能系统长期离线，恢复后实现智能充放电策略优化。',
    image: '/images/case-powerplant.jpg'
  },
  {
    id: 5,
    title: '工业园区二期扩容救援',
    industry: '工业园区',
    capacity: '300kWh',
    offlineTime: 120,
    rescueTime: '28分钟',
    revenue: '月收益提升2.8万',
    beforeRevenue: '0元/天',
    afterRevenue: '930元/天',
    desc: '新增储能柜通信配置问题，快速诊断并完成接入。',
    image: '/images/case-industrial2.jpg'
  },
  {
    id: 6,
    title: '商业楼宇储能系统',
    industry: '商业综合体',
    capacity: '150kWh',
    offlineTime: 60,
    rescueTime: '18分钟',
    revenue: '峰谷差价收益',
    beforeRevenue: '0元/天',
    afterRevenue: '800元/天',
    desc: '楼宇储能系统断连，快速恢复参与电力市场交易。',
    image: '/images/case-building.jpg'
  }
]

// 统计信息
const totalCases = computed(() => cases.length)
const totalRevenue = computed(() => Math.round(cases.reduce((sum, item) => {
  const revenue = parseInt(item.revenue) || 0
  return sum + revenue
}, 0) / 10000))
const avgRescueTime = computed(() => {
  const total = cases.reduce((sum, item) => {
    const time = parseInt(item.rescueTime) || 0
    return sum + time
  }, 0)
  return Math.round(total / cases.length)
})
const successRate = computed(() => 98) // 固定成功率

// 筛选后的案例
const filteredCases = computed(() => {
  let result = cases
  
  if (filter.value.industry) {
    result = result.filter(item => item.industry.includes(filter.value.industry))
  }
  
  if (filter.value.capacity) {
    // 根据容量筛选逻辑
    result = result.filter(item => {
      const capacity = parseInt(item.capacity)
      switch (filter.value.capacity) {
        case 'small': return capacity < 100
        case 'medium': return capacity >= 100 && capacity <= 500
        case 'large': return capacity > 500
        default: return true
      }
    })
  }
  
  if (filter.value.offlineTime) {
    result = result.filter(item => {
      switch (filter.value.offlineTime) {
        case 'short': return item.offlineTime < 30
        case 'medium': return item.offlineTime >= 30 && item.offlineTime <= 180
        case 'long': return item.offlineTime > 180
        default: return true
      }
    })
  }
  
  return result
})

// 分页后的案例
const paginatedCases = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredCases.value.slice(start, start + pageSize.value)
})

// 查看案例详情
const viewCaseDetail = (id: number) => {
  router.push(`/case/${id}`)
}

// 获取徽章样式
const getBadgeClass = (offlineTime: number) => {
  if (offlineTime < 30) return 'badge-short'
  if (offlineTime <= 180) return 'badge-medium'
  return 'badge-long'
}

// 获取离线时间文本
const getOfflineText = (offlineTime: number) => {
  if (offlineTime < 30) return '短期离线'
  if (offlineTime <= 180) return '中期离线'
  return '长期离线'
}
</script>

<style scoped>
.case-list-page {
  @apply min-h-screen bg-gray-50 pt-20; /* 增加顶部内边距 */
}

.page-header {
  @apply text-center mb-12 pt-8; /* 增加页面标题顶部内边距 */
}

.page-title {
  @apply text-4xl font-bold text-gray-900 mb-4;
}

.page-desc {
  @apply text-xl text-gray-600 mb-8;
}

.filters {
  @apply flex justify-center gap-4 flex-wrap;
}

.filter-select {
  @apply w-40;
}

.case-stats {
  @apply grid grid-cols-2 md:grid-cols-4 gap-6 mb-12;
}

.stat-card {
  @apply bg-white rounded-lg p-6 text-center shadow-sm;
}

.stat-number {
  @apply text-3xl font-bold text-electric-green mb-2;
}

.stat-label {
  @apply text-gray-600 text-sm;
}

.cases-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12;
}

.case-card {
  @apply bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1;
}

.case-image {
  @apply relative h-48 overflow-hidden;
}

.case-image img {
  @apply w-full h-full object-cover transition-transform duration-300;
}

.case-card:hover .case-image img {
  @apply scale-110;
}

.case-badge {
  @apply absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold text-white;
}

.badge-short {
  @apply bg-green-500;
}

.badge-medium {
  @apply bg-yellow-500;
}

.badge-long {
  @apply bg-red-500;
}

.case-content {
  @apply p-6;
}

.case-header {
  @apply flex justify-between items-start mb-3;
}

.case-title {
  @apply text-lg font-semibold text-gray-900 mb-1;
}

.case-industry {
  @apply bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs;
}

.case-desc {
  @apply text-gray-600 text-sm mb-4 line-clamp-2;
}

.case-meta {
  @apply flex justify-between mb-4;
}

.meta-item {
  @apply flex items-center gap-1;
}

.meta-icon {
  @apply text-sm;
}

.meta-text {
  @apply text-xs text-gray-600;
}

.case-metrics {
  @apply grid grid-cols-2 gap-2 mb-4;
}

.metric {
  @apply text-center p-2 bg-gray-50 rounded;
}

.metric-label {
  @apply block text-xs text-gray-500 mb-1;
}

.metric-value {
  @apply block text-sm font-semibold;
}

.metric-value.success {
  @apply text-green-600;
}

.case-actions {
  @apply text-center;
}

.view-btn {
  @apply bg-electric-green hover:bg-teal-600 border-0;
}

.pagination-container {
  @apply flex justify-center;
}

@media (max-width: 768px) {
  .cases-grid {
    @apply grid-cols-1;
  }
  
  .filters {
    @apply flex-col items-center;
  }
  
  .filter-select {
    @apply w-full max-w-xs;
  }
}
</style>