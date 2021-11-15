import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    BASE_URL: string
  }
}
