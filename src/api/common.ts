import { ApiModule } from "./types"

export interface ApiModuleCommon {
  checkToken<T>(param: unknown): Promise<T>,
  logout<T>(param?: unknown): Promise<T>,
  getSideBar<T>(param: unknown): Promise<T>,
  mediaNameList<T>(param: unknown): Promise<T>,
  getPrettyNoItem<T>(param: unknown): Promise<T>
}

export const Common: ApiModule[] = [{
  name: "checkToken",
  url: "/api/sso/login",
  type: 'get',
  getAllData: true
}, {
  name: "logout",  //退出登录
  url: "/api/user/logout",
  getAllData: true
}, {
  name: "getSideBar", //获取侧边栏菜单
  url: "/api/user/menu"
}, {
  name: "mediaNameList", //获取媒体列表
  url: "/api/creativity/mediaNameList"
}, {
  name: "tradeNameList",  //获取行业列表
  url: "/api/creativity/tradeNameList"
}, {
  name: "getPrettyNoItem",
  url: "/service/onlineSaleCard/getPrettyNoItem",
  getError: true,
  getAllData: true
}]

export default Common