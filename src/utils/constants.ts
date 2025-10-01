// 项目常量配置
export const APP_CONFIG = {
  APP_NAME: '储能医生',
  APP_SLOGAN: '让"沉默"储能柜重新跑起来',
  VERSION: '1.0.0',
  API_BASE_URL: '/api',
  UPLOAD_MAX_SIZE: 10 * 1024 * 1024, // 10MB
  PHONE_REGEX: /^1[3-9]\d{9}$/,
  SMS_CODE_LENGTH: 6,
  SMS_COOLDOWN: 60, // 60秒冷却
}

// 行业分类
export const INDUSTRY_TYPES = [
  { value: 'industrial', label: '工业园区' },
  { value: 'commercial', label: '商业综合体' },
  { value: 'datacenter', label: '数据中心' },
  { value: 'powerplant', label: '新能源电站' },
  { value: 'building', label: '商业楼宇' },
  { value: 'other', label: '其他' }
]

// 容量分类
export const CAPACITY_RANGES = [
  { value: 'small', label: '小型 (<100kWh)', min: 0, max: 100 },
  { value: 'medium', label: '中型 (100-500kWh)', min: 100, max: 500 },
  { value: 'large', label: '大型 (>500kWh)', min: 500, max: Infinity }
]

// 离线时长分类
export const OFFLINE_TIME_RANGES = [
  { value: 'short', label: '短期 (<30天)', min: 0, max: 30 },
  { value: 'medium', label: '中期 (30-180天)', min: 30, max: 180 },
  { value: 'long', label: '长期 (>180天)', min: 180, max: Infinity }
]

// 救援状态
export const RESCUE_STATUS = {
  PENDING: { value: 0, label: '待处理', color: 'orange' },
  IN_PROGRESS: { value: 1, label: '处理中', color: 'blue' },
  COMPLETED: { value: 2, label: '已完成', color: 'green' },
  FAILED: { value: 3, label: '已失败', color: 'red' }
}

// 设备状态
export const DEVICE_STATUS = {
  ONLINE: { value: 1, label: '在线', color: 'green' },
  OFFLINE: { value: 0, label: '离线', color: 'red' },
  WARNING: { value: 2, label: '警告', color: 'orange' },
  FAULT: { value: 3, label: '故障', color: 'red' }
}

// 颜色配置
export const COLORS = {
  PRIMARY: '#1e40af',
  ELECTRIC_GREEN: '#14B8A6',
  ELECTRIC_ORANGE: '#FDBA74',
  ELECTRIC_GRAY: '#6b7280',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6'
}

// 动画配置
export const ANIMATION_CONFIG = {
  DURATION: {
    FAST: 300,
    NORMAL: 500,
    SLOW: 1000
  },
  EASING: {
    EASE: 'cubic-bezier(0.4, 0, 0.2, 1)',
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
    EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)'
  }
}

// 响应式断点
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
  LARGE_DESKTOP: 1440
}

// 本地存储键名
export const STORAGE_KEYS = {
  TOKEN: 'essdoctor_token',
  USER_INFO: 'essdoctor_user_info',
  LANGUAGE: 'essdoctor_language',
  THEME: 'essdoctor_theme'
}

// API端点
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  SMS_CODE: '/auth/sms-code',
  USER_PROFILE: '/user/profile',
  RESCUE_APPLY: '/rescue/apply',
  RESCUE_LIST: '/rescue/list',
  RESCUE_DETAIL: '/rescue/detail',
  CASE_LIST: '/case/list',
  CASE_DETAIL: '/case/detail',
  PRODUCT_LIST: '/product/list',
  UPLOAD_FILE: '/upload/file'
}

// 错误码
export const ERROR_CODES = {
  NETWORK_ERROR: 1001,
  TIMEOUT: 1002,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  SMS_SEND_FAILED: 6001,
  SMS_CODE_INVALID: 6002,
  PHONE_EXISTS: 6003
}

// 成功消息
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: '登录成功',
  LOGOUT_SUCCESS: '退出成功',
  SMS_SENT: '验证码已发送',
  APPLY_SUBMITTED: '救援申请已提交',
  OPERATION_SUCCESS: '操作成功'
}

// 错误消息
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  TIMEOUT: '请求超时，请稍后重试',
  UNAUTHORIZED: '登录已过期，请重新登录',
  FORBIDDEN: '没有权限访问该资源',
  SERVER_ERROR: '服务器错误，请稍后重试',
  SMS_SEND_FAILED: '验证码发送失败',
  SMS_CODE_INVALID: '验证码错误',
  PHONE_INVALID: '手机号格式错误'
}