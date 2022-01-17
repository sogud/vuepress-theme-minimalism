---
title: Axios 基础配置
date: 2018-01-13 16:07:32
tags:
  - Vue
  - Axios
category: 前端
---

# Axios 基础配置

### 全局的 axios 默认值

引入 axios 后

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

### 自定义实例默认值

```js
// 创建实例时设置配置的默认值
var instance = axios.create({
baseURL: 'https://api.example.com'
});

// 在实例已创建后修改默认值
instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

``` js
import axios from "axios";
import { Loading, Message } from "element-ui"; // 使用elementUI的组件来给提示
import router from "@/router";
import { removeCookies } from "./auth";
let loadingInstance = null; // 加载全局的loading

//创建axios实例，在这里可以设置请求的默认配置
const instance = axios.create({
  timeout: 10000,
  baseURL: process.env.VUE_APP_BASE_API, //根据自己配置的反向代理去设置不同环境的baeUrl
  headers: {
    token: sessionStorage.getItem("token") || ""
  },
  withCredentials: true
});
// 统一设置post请求头
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
//这里简单列出一些常见的http状态码信息，可以自己去调整配置
const httpCode = {
  400: "请求参数错误",
  401: "权限不足, 请重新登录",
  403: "服务器拒绝本次访问",
  404: "请求资源未找到",
  500: "内部服务器错误",
  501: "服务器不支持该请求中使用的方法",
  502: "网关错误",
  504: "网关超时"
};

/** 添加请求拦截器 **/
instance.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({
      // 发起请求时加载全局loading，请求失败或有响应时会关闭
      spinner: "fa fa-spinner fa-spin fa-3x fa-fw",
      text: "拼命加载中...",
      background: "rgba(0, 0, 0, 0.7)"
    });
    // 这里：可以根据业务需求可以在发送请求之前做些什么:例如我这个是导出文件的接口，因为返回的是二进制流，所以需要设置请求响应类型为blob，就可以在此处设置。
    if (config.url.includes("xx/xxxx")) {
      config.headers["responseType"] = "blob";
    }
    // 这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
    // if (config.url.includes('pur/contract/upload')) {
    //   config.headers['Content-Type'] = 'multipart/form-data'
    // }
    // if (config.url.includes('callback.htm')) {
    //   config.headers['Access-Control-Allow-Origin'] = 'xxxxxx'
    // }
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

/** 添加响应拦截器  **/
instance.interceptors.response.use(
  response => {
    loadingInstance.close();
    // console.log(response)
    // 响应结果里的status: 与后台的约定，可以根据实际情况去做对应的判断
    if (response.status == "200") {
      return Promise.resolve(response.data);
    } else {
      Message({
        // message: response.data.message,
        message: "出错了~",
        type: "error"
      });
      return Promise.reject(response);
    }
  },
  error => {
    loadingInstance.close();
    if (error.response) {
      // 根据请求失败的http状态码去给用户相应的提示
      let tips =
        error.response.status in httpCode
          ? httpCode[error.response.status]
          : error.response.data.message;
      Message({
        message: `${error.response.status} ${tips}`,
        type: "error"
      });
      // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
      if (error.response.status === 401) {
        setTimeout(() => {
          removeCookies();
          router.push({
            path: `/login`
          });
        }, 500);
      }
      return Promise.reject(error);
    } else {
      Message({
        message: "请求超时, 请刷新重试",
        type: "error"
      });
      return Promise.reject(new Error("请求超时, 请刷新重试"));
    }
  }
);

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: "get",
      url,
      params,
      ...config
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: "post",
      url,
      data,
      ...config
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/* 或者写成下面这样： Promise.resolve() 和 Promise.reject()返回的是promise对象，二者都是语法糖  */
// export const post = (url, data, config = {}) => {
//   return instance({
//     method: 'post',
//     url,
//     data,
//     ...config
//   }).then(response => {
//     return Promise.resolve(response)
//   }).catch(error => {
//     return Promise.reject(error)
//   })
// }

```
api 文件夹 使用 返回promise
```
import { get, post } from '@/utils/axios'

export const login = (params) => post('/login', params)

export const logout = (params) => post('/logout', params)
```