import Vue from "vue"
import BasePage from './base-page'; //页面组件

let MyPlugin = {};

MyPlugin.install = function(Vue) {

	if (this.installed) return;

	Vue.component(BasePage.name, BasePage)

};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
	MyPlugin.install(window.Vue);
}

Vue.use(MyPlugin)

export default MyPlugin

/**
 * 使用方法：
 * 1：将modules文件夹复制到项目的src文件夹中
 * 2：在mainjs里引入 
 *    import "./components/base";
 * 3：各组件使用方法请查看各组件的.vue文件的注释
 */