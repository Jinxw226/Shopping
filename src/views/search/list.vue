<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch || '搜索商品' "
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item" @click="sort('all')">综合</div>
      <div class="sort-item" @click="sort('sales')">销量</div>
      <div class="sort-item" @click="sort('price')">价格 </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import { getProList } from '@/api/product'
import GoodsItem from '@/components/GoodsItem.vue'

export default {
  name: 'SearchIndex',
  data () {
    return {
      page: 1,
      proList: []
    }
  },
  components: {
    GoodsItem
  },
  computed: {
    // 获取地址栏的搜索关键字
    querySearch () {
      return this.$route.query.search
    },
    queryCategoryId () {
      return this.$route.query.categoryId
    }
  },
  async created () {
    const { data: { list } } = await getProList({
      categoryId: this.queryCategoryId,
      goodsName: this.querySearch,
      page: this.page
    })
    this.proList = list.data
  },
  methods: {
    async sort (str) {
      const { data: { list } } = await getProList({
        sortType: str,
        sortPrice: 1,
        categoryId: this.queryCategoryId,
        goodsName: this.querySearch,
        page: this.page
      })
      this.proList = list.data
      console.log(this.num)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
