import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const userInfo = ref({
    phone: '',
    company: '',
    token: ''
  })

  // 从localStorage初始化登录状态
  const initAuth = () => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('userInfo')
    
    if (token) {
      isLoggedIn.value = true
      userInfo.value.token = token
      if (userData) {
        userInfo.value = { ...userInfo.value, ...JSON.parse(userData) }
      }
    }
  }

  // 登录方法
  const login = (phone: string, token: string) => {
    isLoggedIn.value = true
    userInfo.value.phone = phone
    userInfo.value.token = token
    
    // 存储到localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('userInfo', JSON.stringify({
      phone: phone,
      token: token
    }))
  }

  // 登出方法
  const logout = () => {
    isLoggedIn.value = false
    userInfo.value = {
      phone: '',
      company: '',
      token: ''
    }
    
    // 清除localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }

  // 设置公司信息
  const setCompany = (company: string) => {
    userInfo.value.company = company
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  }

  // 计算属性
  const userPhone = computed(() => userInfo.value.phone)
  const userCompany = computed(() => userInfo.value.company)

  return {
    isLoggedIn,
    userInfo,
    userPhone,
    userCompany,
    initAuth,
    login,
    logout,
    setCompany
  }
})