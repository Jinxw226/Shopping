import request from '@/utils/request'

// 加入购物车
// goodsId  商品id
// goodsSkuId  商品规格id 红色或者白色iphone
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}
// 更新购物车商品数量
export const upDateGoodsNum = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 删除购物车商品
export const delGoods = (cartIds) => {
  return request.post('/cart/clear', { cartIds })
}
