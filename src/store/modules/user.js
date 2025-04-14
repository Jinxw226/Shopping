import { getInfo, setInfo } from '@/utils/storages'
export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },
  mutations: {
    // 所有mutations第一个参数都是 state
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {

  },
  getters: {

  }
}
