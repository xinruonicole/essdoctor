<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container-custom">
      <div class="nav-content">
        <!-- Logo -->
        <router-link to="/" class="logo">
          <span class="logo-text">储能医生</span>
          <span class="logo-slogan">让沉默储能柜重新跑起来</span>
        </router-link>

        <!-- 导航菜单 -->
        <div class="nav-menu" :class="{ 'active': isMenuOpen }">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path" 
            class="nav-link"
            @click="closeMenu">
            {{ item.name }}
          </router-link>
        </div>

        <!-- 右侧操作区 -->
        <div class="nav-actions">
          <!-- 登录/用户信息 -->
          <div v-if="userStore.isLoggedIn" class="user-info">
            <span class="user-phone">{{ userStore.userPhone }}</span>
            <el-button type="text" @click="handleLogout">退出</el-button>
          </div>
          <el-button 
            v-else 
            type="primary" 
            class="login-btn"
            @click="openLoginDialog">
            登录
          </el-button>

          <!-- 移动端菜单按钮 -->
          <button class="menu-toggle" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const isScrolled = ref(false)
const isMenuOpen = ref(false)

// 注入全局方法
const openLoginDialog = inject('openLoginDialog') as () => void

const navItems = [
  { path: '/', name: '首页' },
  { path: '/products', name: '产品中心' },
  { path: '/case', name: '成功案例' }
]

// 滚动监听
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// 菜单控制
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// 退出登录
const handleLogout = () => {
  userStore.logout()
  // 跳转到首页
  window.location.href = '/'
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始化用户认证状态
  userStore.initAuth()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  @apply fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-40 transition-all duration-300;
  border-bottom: 1px solid transparent;
}

.navbar.scrolled {
  @apply shadow-lg;
  border-bottom-color: #e5e7eb;
}

.nav-content {
  @apply flex items-center justify-between h-16;
}

.logo {
  @apply flex flex-col items-start;
}

.logo-text {
  @apply text-2xl font-bold text-electric-blue;
}

.logo-slogan {
  @apply text-xs text-electric-gray;
}

.nav-menu {
  @apply hidden md:flex items-center space-x-8;
}

.nav-link {
  @apply text-gray-700 hover:text-electric-green font-medium transition-colors duration-200;
}

.nav-link.router-link-active {
  @apply text-electric-green;
}

.nav-actions {
  @apply flex items-center space-x-4;
}

.user-info {
  @apply flex items-center space-x-3;
}

.user-phone {
  @apply text-sm text-gray-600;
}

.login-btn {
  @apply bg-electric-green hover:bg-teal-600 border-0;
}

.menu-toggle {
  @apply md:hidden flex flex-col space-y-1 w-6 h-6;
}

.menu-toggle span {
  @apply block w-full h-0.5 bg-gray-600 transition-all duration-300;
}

.menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* 移动端菜单 */
@media (max-width: 768px) {
  .nav-menu {
    @apply absolute top-full left-0 right-0 bg-white shadow-lg flex-col space-y-4 p-6;
    display: none;
  }

  .nav-menu.active {
    display: flex;
  }
}
</style>