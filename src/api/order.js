import request from '@/utils/request'

// 订单结算
// mode: cart     => obj { cartIds }
// mode: buyNow   => obj { goodsId goodsNum goodsSkuId }
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // cart buyNow
      delivery: 10, // 配送方式（10快递配送 20上门自提）
      couponId: 0, // 优惠券id 传0 不使用优惠券
      isUsePoints: 0, // 积分 是否使用积分抵扣（1使用 0不使用）
      ...obj // 将传递过来的参数对象 动态展开
    }
  })
}

// 提交订单
// mode: cart     => obj { cartIds, remark }
// mode: buyNow   => obj { goodsId, goodsNum, goodsSkuId, remark }
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 快递配送
    couponId: 0,
    isUsePoints: 0,
    payType: 10, // 余额支付
    ...obj
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}

// 取消订单
export const delOrder = (orderId) => {
  return request.post('/order/cancel', { orderId })
}
