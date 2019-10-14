module.exports = {
	publicPath: "./",
	outputDir: "docs",
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
	devServer: {
		port: 3010
	}
};