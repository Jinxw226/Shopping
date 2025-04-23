export default {
  // 此处可以编写的就是 vue组件实例的配置项， 通过一定语法，可以直接混入组件内部
  // data，methods，computed 生命周期函数...
  // 注意点：
  // 1.如果此处和组件内，提供了同名的 data 和 methods 则组件内优先级更高
  // 2.如果编写了生命周期函数 则mixins中的 生命周期函数 和 页面的生命周期函数 会用数组管理 统一执行
  data () {
    return {
      title: '标题'
    }
  },
  methods: {
    sayHi () {
      // console.log('你好')
    },
    loginConfirm () {
      // 判断 token 是否存在
      // 如果不存在，弹确认框
      // 如果存在，继续请求操作
      if (!this.$store.getters.token) {
        // 弹确认框
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时需要登录才能继续操作哦',
          confirmButtonText: '去登陆',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // 如果希望跳转到登录 => 登陆后能回跳回来，需要在跳转去携带参数（当前路径地址）
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {})
        return true
      }
      return false
    }
  }
}
