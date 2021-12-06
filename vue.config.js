const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  publicPath: "./",
  outputDir: "docs",
  productionSourceMap: false,
  configureWebpack: {
    externals: process.env.NODE_ENV === 'production' ? {
      "vue": "Vue",
      "vuex": "Vuex",
      "vue-router": "VueRouter",
      "element-plus": "ElementPlus"
    } : {},
    plugins: [
      require('unplugin-auto-import/webpack')({
        resolvers: [ElementPlusResolver()],
      }),
      require('unplugin-vue-components/webpack')({
        resolvers: [ElementPlusResolver()],
      })
    ]
  },
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  devServer: {
    port: 3060,
    // proxy: 'http://xxx.com'
  }
}