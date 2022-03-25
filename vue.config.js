const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  publicPath: "./",
  outputDir: "docs",
  productionSourceMap: false,
  configureWebpack: {
    // 配置了 ElementPlus 自动按需加载的话，打包使用cdn资源会失效，两者会有冲突
    // github issues: https://github.com/antfu/unplugin-vue-components/issues/211
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