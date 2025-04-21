import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
// 创建 axios 实例 ， 将来对创建出来的实例，进行自定义配置
// 好处： 不会污染原始的axios实例
const instance = axios.create({
  // 基地址
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: 'H5' }
})

// 自定义配置

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启loading，禁止背景点击(节流处理，防止多次无效触发)
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    // 展示时长：默认是2s 0代表不会消失
    duration: 0
  })

  // 只要有token,就在请求时携带,便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么(默认axios会多包装一层data,需要响应拦截器中处理一下)
  const res = response.data
  if (res.status !== 200) {
    // 给错误提示 不能用 this.$toast 因为不是组件内
    Toast(res.message)
    // 抛出一个错误的promise
    return Promise.reject(res.message)
  } else {
    // toast默认单例模式，后面的toast调用了，会将前一个toast效果覆盖
    // 同一时间只能存在一个
    Toast.clear()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置好的实例
export default instance
