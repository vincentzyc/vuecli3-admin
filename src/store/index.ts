import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import common from './modules/common'
import StateType from './types'

export const key: InjectionKey<Store<StateType>> = Symbol()

export const store = createStore({
  modules: {
    common
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}