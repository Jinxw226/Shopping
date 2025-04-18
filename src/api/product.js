import request from '@/utils/request'

// 获取搜索商品列表的数据
export const getProList = (obj) => {
  const { sortType, sortPrice, categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      sortType,
      sortPrice,
      categoryId,
      goodsName,
      page
    }
  })
}

// 获取商品详情数据
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}
