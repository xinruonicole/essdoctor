<template>
  <footer class="footer">
    <div class="container-custom">
      <div class="footer-content">
        <!-- 公司信息 -->
        <div class="footer-section">
          <h3 class="footer-title">储能医生</h3>
          <p class="footer-desc">专业解决储能柜断连问题，让沉默储能柜重新跑起来</p>
          <div class="contact-info">
            <p>📞 400-888-8888</p>
            <p>📧 service@essdoctor.com</p>
          </div>
        </div>

        <!-- 快速链接 -->
        <div class="footer-section">
          <h4 class="footer-subtitle">快速导航</h4>
          <div class="footer-links">
            <router-link to="/" class="footer-link">首页</router-link>
            <router-link to="/products" class="footer-link">产品中心</router-link>
            <router-link to="/case" class="footer-link">成功案例</router-link>
          </div>
        </div>

        <!-- 产品服务 -->
        <div class="footer-section">
          <h4 class="footer-subtitle">产品服务</h4>
          <div class="footer-links">
            <router-link to="/products" class="footer-link">DTU硬件设备</router-link>
            <router-link to="/products" class="footer-link">云平台服务</router-link>
            <router-link to="/products" class="footer-link">运维托管</router-link>
            <router-link to="/products" class="footer-link">技术咨询</router-link>
          </div>
        </div>

        <!-- 回到顶部 -->
        <div class="footer-section">
          <button class="back-to-top" @click="scrollToTop">
            <span>↑</span>
            <span>回到顶部</span>
          </button>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="footer-bottom">
        <p>&copy; 2024 储能医生. 版权所有.</p>
        <p>备案号：京ICP备12345678号</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.footer {
  @apply bg-gray-900 text-white py-12 mt-auto;
}

.footer-content {
  @apply grid grid-cols-1 md:grid-cols-4 gap-8 mb-8;
}

.footer-section {
  @apply space-y-4;
}

.footer-title {
  @apply text-2xl font-bold text-electric-green;
}

.footer-subtitle {
  @apply text-lg font-semibold mb-4;
}

.footer-desc {
  @apply text-gray-300 leading-relaxed;
}

.contact-info {
  @apply space-y-2 text-gray-400;
}

.footer-links {
  @apply space-y-2;
}

.footer-link {
  @apply text-gray-300 hover:text-electric-green transition-colors duration-200 block;
}

.back-to-top {
  @apply flex items-center space-x-2 bg-electric-green hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-all duration-300;
}

.footer-bottom {
  @apply border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm;
}

@media (max-width: 768px) {
  .footer-content {
    @apply grid-cols-2 gap-6;
  }
  
  .footer-bottom {
    @apply text-center space-y-2;
  }
}
</style>