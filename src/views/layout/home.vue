<template>
  <div class="home">
    <!-- 导航条 -->
    <van-nav-bar title="智慧商城"></van-nav-bar>
    <!-- 搜索栏 -->
    <van-search placeholder="请输入搜索内容"></van-search>
    <!-- 轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <!-- <van-swipe-item v-for="(item ,index) in images" :key="index">
        <img v-lazy="image">
      </van-swipe-item> -->
      <van-swipe-item>
        <img src="@/assets/banner1.jpg" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/banner2.jpg" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/banner3.jpg" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.home {
  // 导航条
  .van-nav-bar {
    z-index: 999;
    background-color: #c21401;
  }
  ::v-deep .van-nav-bar__title {
    color: #fff;
    font-weight: 700;
  }
  .van-search {
    z-index: 999;
  }
// 轮播图
  .my-swipe .van-swipe-item {
    height: 185px;
    color: #fff;
    font-size: 20px;
    text-align: center;
    background-color: #39a9ed;
  }
  .my-swipe .van-swipe-item img {
    width: 100%;
    height: 185px;
  }
}
</style>
