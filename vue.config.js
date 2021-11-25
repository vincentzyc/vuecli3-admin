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
    } : {}
  },

  // configureWebpack: {
  //   plugins: [
  //     require('unplugin-vue-components/webpack')({ /* options */ }),
  //   ],
  // },

  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },

  devServer: {
    port: 3060,
    proxy: 'http://test-cms-admin.jetmobo.com'
  }
};