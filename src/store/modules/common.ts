import CommonType from '../types/common'

const state: CommonType = {
  count: 0,
  breadcrumb: []
}

const mutations = {
  setCount(state: CommonType, payload = 1) {
    state.count += payload
  },
  setBreadcrumb(state: CommonType, payload: CommonType['breadcrumb']) {
    state.breadcrumb = payload
  }
}

export default {
  state,
  mutations
}