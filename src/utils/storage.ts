import { decrypt, encrypt } from "./business/crypto";

export function setSessionStorage(key: string, value: any, encode: boolean): void {
  let str = window.JSON.stringify(value);
  if (encode) {
    str = encrypt(str);
  }
  window.sessionStorage.setItem(key, str);
}

export function getSessionStorage(key: string, decode: boolean): any {
  let str: string | null;
  str = window.sessionStorage.getItem(key);
  if (!str) return "";
  if (decode) {
    str = decrypt(str);
  }
  if (!str) return "";
  try {
    return window.JSON.parse(str);
  } catch (error) {
    window.sessionStorage.removeItem(key);
    window.location.reload();
  }
}

export function setLocalStorage(key: string, value: any, encode: boolean): void {
  let str = window.JSON.stringify(value);
  if (encode) {
    str = encrypt(str);
  }
  window.localStorage.setItem(key, str);
}

export function getLocalStorage(key: string, decode: boolean): any {
  let str: string | null;
  str = window.localStorage.getItem(key);
  if (!str) return "";
  if (decode) {
    str = decrypt(str);
  }
  if (!str) return "";
  try {
    return window.JSON.parse(str);
  } catch (error) {
    window.localStorage.removeItem(key);
    window.location.reload();
  }
}