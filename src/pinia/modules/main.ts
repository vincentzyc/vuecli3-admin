import { defineStore } from 'pinia'

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useMainStore = defineStore('main', {
  // a function that returns a fresh state
  state: () => ({
    counter: 0,
    name: 'Eduardo',
    configTab: 'page',
    selectWg: null as Record<string, any> | null,
    dragWg: null as Record<string, any> | null,
    breadcrumb: [] as string[]
  }),
  // optional getters
  getters: {
    // getters receive the state as first parameter
    doubleCount: (state) => state.counter * 2,
    // use getters in other getters
    doubleCountPlusOne(): number {
      return this.doubleCount * 2 + 1
    },
  },
  // optional actions
  actions: {
    setBreadcrumb(payload: string[]) {
      this.breadcrumb = payload
    },
    setDragWg(payload: Record<string, any> | null) {
      this.dragWg = payload;
    },
    setSelectWg(payload: Record<string, any> | null) {
      this.selectWg = payload;
    },
    setConfigTab(payload: string) {
      this.configTab = payload;
    },
    reset() {
      // `this` is the store instance
      this.counter = 0
    },
  },
})

export default useMainStore