<template>
  <div class="login">
    <!-- 头部 NavBar -->
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登陆后将自动注册</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input v-model="mobile" type="text" class="inp" maxlength="11" placeholder="请输入手机号码">
        </div>
        <div class="form-item">
          <input v-model="picCode" type="text" class="inp" maxlength="5" placeholder="请输入图形验证码">
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
          <!-- 只有图片存在的时候才显示 -->
        </div>
        <div class="form-item">
          <input v-model="msgCode" type="text" class="inp" placeholder="请输入短信验证码">
          <button @click="getCode">
            {{ totalSecond === second ? '获取验证码' : second + '秒后重新发送' }}
          </button>
        </div>
      </div>
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { codeLogin, getMsgCode, getPicCode } from '@/api/login'

export default {
  name: 'LoginIndex',
  data () {
    return {
      picCode: '', // 用户输入的图形验证码
      picKey: '', // 将来请求传递的图形验证码唯一标识
      picUrl: '', // 储存请求渲染的图片地址
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数,开定时器对 second
      timer: null, // 定时器id
      mobile: '', // 手机号码
      msgCode: ''
    }
  },
  created () {
    this.getPicCode()
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64 // 存储地址
      this.picKey = key // 存储唯一标识
    },
    // 获取短信验证码
    async getCode () {
      if (!this.validFn()) {
        // 没通过校验的话没比较继续进行
        return
      }
      // 当前目前没有定时器开着，并且 totalSecond 和 second 一致 （秒数归位
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求
        // 预期： 希望如果相应的status并非200，最好抛出一个promise错误， await只会等待成功的promise
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('短信发送成功，注意查收')
        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second < 1) {
            clearInterval(this.timer)
            this.timer = null // 重置定时器 id
            this.second = this.totalSecond // 归位
          }
        }, 1000)
      }
    },
    // 校验 手机号 和 图形验证码 是否合法
    // 通过校验则返回true 不通过则返回false
    validFn () {
      // 电话号码的正则表达式 ^$代表开头和结尾 d是数字 w是字符
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 登录
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      console.log('发送请求')
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      console.log(res)
      this.$toast('登陆成功')
      this.$router.push('/')
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less">
.container {
  padding: 49px 20px;
  .title {
  h3 {
    font-size: 26px;
    font-weight: normal;
  }
  p {
    line-height: 40px;
    font-size: 14px;
    color: #b8b8b8;
  }
}
  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    display: flex;
    margin: 14px 0;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      color: #cea26a;
      font-size: 13px;
      background-color: transparent;
      padding-right: 9px;
    }
  }
  .login-btn {
    display: block;
    height: 45px;
    line-height: 45px;
    margin: 40px 0;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    text-align: center;
    border-radius: 20px;
    letter-spacing: 2px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }
}

</style>
