import { ApiModule } from "./types"

export interface ApiModuleCommon {
  submitForm<T>(param: unknown): Promise<T>,
  getPageId<T>(param: unknown): Promise<T>,
  getCityInfo<T>(param: unknown): Promise<T>,
  getAuthCode<T>(param: unknown): Promise<T>,
  collectData<T>(param: unknown): Promise<T>,
  disperOrder<T>(param: unknown): Promise<T>,
  getHandleNoItem<T>(param: unknown): Promise<T>,
  addJsInfo<T>(param: unknown): Promise<T>,
  getIpRegion<T>(param: unknown): Promise<T>,
  broadbandOrder<T>(param: unknown): Promise<T>,
  collectOrder<T>(param: unknown): Promise<T>,
  getPrettyNoItem<T>(param: unknown): Promise<T>,
  lockNumber<T>(param: unknown): Promise<T>,
  getJumpPage<T>(param: unknown): Promise<T>,
}

export const Common: ApiModule[] = [{
  name: "submitForm",
  url: "/service/onlineSaleCard/handleOrder"
}, {
  name: "getPageId",
  url: "/service/jimPenn/page_id"
}, {
  name: "getCityInfo",
  url: "/api/product/h5_city_info"
}, {
  name: "getAuthCode",
  url: "/service/onlineSaleCard/getAuthCode"
}, {
  name: "collectData",
  url: "/service/onlineSaleCard/collect"
}, {
  name: "disperOrder",
  url: "/service/onlineSaleCard/disperOrder"
}, {
  name: "getHandleNoItem",
  url: "/service/onlineSaleCard/getHandleNoItem",
  getError: true,
  getAllData: true
}, {
  name: "addJsInfo",
  url: "/service/onlineSaleCard/addJsInfo"
}, {
  name: "getIpRegion",
  url: "/service/onlineSaleCard/getIpRegion"
}, {
  name: "broadbandOrder",
  url: "/api/onlineSaleBroadband/handleOrder"
}, {
  name: "collectOrder",
  url: "/service/onlineSaleCard/collectOrder"
}, {
  name: "getPrettyNoItem",
  url: "/service/onlineSaleCard/getPrettyNoItem",
  getError: true,
  getAllData: true
}, {
  name: "lockNumber",
  url: "/service/onlineSaleCard/lockNumber"
}, {
  name: "getJumpPage",
  url: "/api/jumpPage/getJumpPage"
}]

export default Common