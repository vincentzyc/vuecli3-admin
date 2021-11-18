import { ApiModule } from "./types"
import { Common, ApiModuleCommon } from './common';
import Axios from '@/plugins/axios'
import { ElMessageBox } from 'element-plus'
import { closeLoading } from "@/utils/loading";

const createInterface = (arr: ApiModule[]) => {
  const Interface: Record<string, any> = {};
  arr.forEach(v => {
    Interface[v.name] = (param: unknown, config: Record<string, any>) => {
      return new Promise((resolve, reject) => {
        if (v.type === 'get') {
          axiosGet({
            url: v.url + param,
            getAllData: v.getAllData,
            ...config
          }).then(res => resolve(res))
        } else {
          axiosPost({
            url: v.url,
            data: param,
            getAllData: v.getAllData,
            getError: v.getError,
            ...config
          }).then(res => resolve(res)).catch(error => reject(error))
        }
      })
    }
  })
  return Interface
}

export const CommonApi = createInterface(Common) as ApiModuleCommon

export function env() {
  if (process.env.NODE_ENV === "development") return "development";
  if (window.location.href.includes('test-')) return 'test';
  return "production";
}

export function axiosPost(config: Record<string, any>) {
  return new Promise((resolve, reject) => {
    Axios.post(config.url, config.data, config).then(res => {
      if (res.status !== 200) {
        console.log(res);
        closeLoading();
        ElMessageBox.alert(res.statusText || '网络繁忙');
        return
      }
      const result = res.data;
      if (config.getAllData) return resolve(result);
      switch (result.code) {
        case "0": //  成功
          return resolve(result.data || "success");
        case "0000": //  成功
          return resolve(result.data || "success");
        default: // 失败
          if (config.getError) return reject('fail')
          closeLoading();
          ElMessageBox.alert(result.message || result.msg || '服务器繁忙');
      }
    }).catch(error => {
      console.log(error);
      if (config.getError) {
        reject(error)
        return
      }
      closeLoading();
      ElMessageBox.alert('网络繁忙');
    });
  })
}

export function axiosGet(config: Record<string, any>) {
  return new Promise((resolve, reject) => {
    Axios.get(config.url).then(res => {
      if (res.status !== 200) {
        console.log(res);
        closeLoading();
        ElMessageBox.alert(res.statusText || '网络繁忙');
        return
      }
      const result = res.data;
      if (config.getAllData) return resolve(result);
      switch (result.code) {
        case "0": //  成功
          return resolve(result.data || "success");
        case "0000": //  成功
          return resolve(result.data || "success");
        default: // 失败
          if (config.getError) return reject('fail')
          closeLoading();
          ElMessageBox.alert(result.message || result.msg || '服务器繁忙');
      }
    }).catch(error => {
      console.log(error);
      if (config.getError) {
        reject(error)
        return
      }
      closeLoading();
      ElMessageBox.alert('网络繁忙');
    });
  })
}