<template>
  <el-dialog
    v-model="dialogVisible"
    title="登录储能医生平台"
    width="400px"
    :before-close="handleClose"
    center>
    
    <div class="login-form">
      <!-- 手机号输入 -->
      <el-form :model="form" :rules="rules" ref="loginFormRef">
        <el-form-item prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号"
            size="large"
            prefix-icon="User"
            maxlength="11"
            @input="validatePhone">
          </el-input>
        </el-form-item>

        <!-- 验证码输入 -->
        <el-form-item prop="smsCode">
          <div class="sms-code-input">
            <el-input
              v-model="form.smsCode"
              placeholder="请输入验证码"
              size="large"
              prefix-icon="Message"
              maxlength="6">
            </el-input>
            <el-button
              :disabled="!isPhoneValid || cooldown > 0"
              @click="getSmsCode"
              class="sms-btn">
              {{ cooldown > 0 ? `${cooldown}秒后重试` : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>

      <!-- 登录按钮 -->
      <el-button
        type="primary"
        size="large"
        :loading="loading"
        @click="handleLogin"
        class="login-btn">
        立即登录
      </el-button>

      <!-- 协议说明 -->
      <div class="agreement">
        <span class="text-sm text-gray-500">
          登录即代表同意
          <a href="#" class="text-electric-green hover:underline">用户协议</a>
          和
          <a href="#" class="text-electric-green hover:underline">隐私政策</a>
        </span>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useUserStore } from '../stores/user'

interface Props {
  modelValue: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const userStore = useUserStore()

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const cooldown = ref(0)
const isPhoneValid = ref(false)

const form = reactive({
  phone: '',
  smsCode: ''
})

// 表单验证规则
const rules: FormRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  smsCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '验证码为6位数字', trigger: 'blur' }
  ]
}

// 手机号验证
const validatePhone = () => {
  isPhoneValid.value = /^1[3-9]\d{9}$/.test(form.phone)
}

// 获取验证码
const getSmsCode = async () => {
  if (!isPhoneValid.value) return

  cooldown.value = 60
  const timer = setInterval(() => {
    cooldown.value--
    if (cooldown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)

  // 模拟发送验证码
  ElMessage.success('验证码已发送至您的手机')
}

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    await loginFormRef.value.validate()
    loading.value = true

    // 模拟登录API调用
    const mockLogin = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            token: 'mock-jwt-token-' + Date.now(),
            message: '登录成功'
          })
        }, 1000)
      })
    }

    const result = await mockLogin() as any

    if (result.success) {
      userStore.login(form.phone, result.token)
      ElMessage.success('登录成功')
      dialogVisible.value = false
      resetForm()
    }
  } catch (error) {
    ElMessage.error('验证码错误，请重新输入')
  } finally {
    loading.value = false
  }
}

// 关闭对话框
const handleClose = (done: () => void) => {
  resetForm()
  done()
}

// 重置表单
const resetForm = () => {
  form.phone = ''
  form.smsCode = ''
  cooldown.value = 0
  if (loginFormRef.value) {
    loginFormRef.value.clearValidate()
  }
}
</script>

<style scoped>
.login-form {
  @apply space-y-6;
}

.sms-code-input {
  @apply flex space-x-3;
}

.sms-btn {
  @apply whitespace-nowrap;
}

.sms-btn:disabled {
  @apply bg-gray-100 text-gray-400 cursor-not-allowed;
}

.login-btn {
  @apply w-full bg-electric-green hover:bg-teal-600 border-0;
}

.agreement {
  @apply text-center pt-4 border-t border-gray-200;
}
</style>