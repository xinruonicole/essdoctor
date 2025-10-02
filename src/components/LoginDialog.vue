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
          <a href="#" class="text-electric-green hover:underline" @click.prevent="showAgreement">用户协议</a>
          和
          <a href="#" class="text-electric-green hover:underline" @click.prevent="showAgreement">隐私政策</a>
        </span>
      </div>
    </div>
  </el-dialog>

  <!-- 用户协议和隐私政策弹窗 -->
  <el-dialog
    v-model="agreementVisible"
    title="用户协议与隐私政策"
    width="600px"
    center>
    
    <div class="agreement-content">
      <!-- 用户协议部分 -->
      <section class="agreement-section">
        <h3 class="section-title">用户协议</h3>
        <div class="section-content">
          <p><strong>1. 服务内容</strong></p>
          <p>储能医生平台为用户提供储能柜断连救援服务，包括DTU硬件设备接入、云平台监控、运维托管和技术咨询等服务。</p>
          
          <p><strong>2. 用户权利与义务</strong></p>
          <p>用户有权使用平台提供的各项服务，同时需保证提供的信息真实有效，不得利用平台从事任何违法活动。</p>
          
          <p><strong>3. 服务费用</strong></p>
          <p>平台服务费用根据具体服务内容确定，用户需按时支付相关费用。</p>
          
          <p><strong>4. 责任限制</strong></p>
          <p>平台在法律法规允许的范围内提供服务，不对因不可抗力造成的服务中断承担责任。</p>
        </div>
      </section>

      <!-- 隐私政策部分 -->
      <section class="agreement-section">
        <h3 class="section-title">隐私政策</h3>
        <div class="section-content">
          <p><strong>1. 信息收集</strong></p>
          <p>我们收集用户的基本信息、设备信息和使用数据，用于提供和改进服务。</p>
          
          <p><strong>2. 信息使用</strong></p>
          <p>收集的信息仅用于服务提供、用户支持和平台优化，不会向第三方出售或泄露。</p>
          
          <p><strong>3. 信息安全</strong></p>
          <p>我们采取严格的安全措施保护用户信息，防止未经授权的访问和使用。</p>
          
          <p><strong>4. 用户权利</strong></p>
          <p>用户有权查询、更正和删除个人信息，可通过客服渠道行使相关权利。</p>
        </div>
      </section>

      <div class="agreement-footer">
        <el-button type="primary" @click="closeAgreement" class="agree-btn">我已阅读并同意</el-button>
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
const agreementVisible = ref(false)

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

// 显示用户协议弹窗
const showAgreement = () => {
  agreementVisible.value = true
}

// 关闭用户协议弹窗
const closeAgreement = () => {
  agreementVisible.value = false
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

/* 用户协议弹窗样式 */
.agreement-content {
  @apply max-h-96 overflow-y-auto;
}

.agreement-section {
  @apply mb-6;
}

.section-title {
  @apply text-lg font-semibold text-electric-green mb-3;
}

.section-content {
  @apply text-sm text-gray-700 leading-relaxed;
}

.section-content p {
  @apply mb-2;
}

.agreement-footer {
  @apply text-center pt-4 border-t border-gray-200 mt-6;
}

.agree-btn {
  @apply bg-electric-green hover:bg-teal-600 border-0;
}
</style>