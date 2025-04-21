import { getCartList, upDateGoodsNum, delGoods } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  getters: {
    // 求所有商品累加总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品项
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => item.goods_num + sum, 0)
    },
    // 选中的总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return item.goods_num * item.goods.goods_price_min + sum
      }, 0).toFixed(2)
    },
    // 是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 后台返回的数据中,不包含复选框的选中状态,为了实现将来的功能
      // 需要手动维护 给每一项都添加一个 isChecked 状态(标记当前商品是否选中)
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 先本地修改
      context.commit('changeCount', { goodsId, goodsNum })
      // 再同步到后台
      await upDateGoodsNum(goodsId, goodsNum, goodsSkuId)
      // console.log(res)
    },
    // 删除购物车数据
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      await delGoods(cartIds)
      Toast('删除成功')
      // 重新拉取最新的购物车数据
      context.dispatch('getCartAction')
    }
  },
  mutations: {
    // 提供一个设置 cartList 的 mutation
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      // 让对应的 id 的项 状态取反
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllChecked (state, flag) {
      state.cartList.forEach(item => { item.isChecked = flag })
    },
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  }
}
