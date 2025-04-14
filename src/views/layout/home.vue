<template>
  <div class="home">
    <!-- 导航条 -->
    <van-nav-bar title="智慧商城"></van-nav-bar>
    <!-- 搜索栏 -->
    <van-search placeholder="请输入搜索内容"></van-search>
    <h1>hi</h1>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex'
}
</script>

<style lang="less">
.home {
  .van-nav-bar__content {
    background-color: #cf2300;
  }
  .van-nav-bar__title {
    color: #fef7ed;
    font-weight: 700;
  }
  .van-search {
    z-index: 999;
  }
}
</style>
