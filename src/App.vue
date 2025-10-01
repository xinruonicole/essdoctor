<template>
  <div id="app">
    <!-- Loading组件 -->
    <Loading v-if="showLoading" />
    
    <!-- 主应用内容 -->
    <div v-show="!showLoading">
      <NavBar />
      <main>
        <router-view />
      </main>
      <Footer />
      <LoginDialog v-model="loginDialogVisible" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'
import { useUserStore } from './stores/user'
import Loading from './components/Loading.vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import LoginDialog from './components/LoginDialog.vue'

const showLoading = ref(true)
const loginDialogVisible = ref(false)
const userStore = useUserStore()

// 模拟Loading动画，3秒后进入首页
onMounted(() => {
  setTimeout(() => {
    showLoading.value = false
  }, 3000)
})

// 全局登录弹窗控制
const openLoginDialog = () => {
  loginDialogVisible.value = true
}

// 通过provide提供全局方法
provide('openLoginDialog', openLoginDialog)
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>