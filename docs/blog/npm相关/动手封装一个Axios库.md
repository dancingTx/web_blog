# 动手封装一个Axios库

## 前言

考虑到日常业务需求以及数据通信的重要性，决定动手在`Axios`的基础之上封装一个通用的库。

## 需求分析及实现

- 统一捕获接口的报错信息
- 对报错信息进行友好提示
- 报错后的重定向问题
- 基础的鉴权功能
- 表单序列化

## 相关用法以及封装

```js
// 服务层，import 会 优先查找对应名字的文件，如未查找到，则会查找该对应名字的文件夹下的index.js文件
import AxiosInstance from './request'
Vue.use(AxiosInstance)
```

### 封装Axios库

```js
// request/index.js

import Axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import router from '../../router'
const AxiosInstance = Axios.create({
    baseURL: '', // 用来设置公共url
    timeout: 3000,// 请求时间
    response: 'json',
    withCredentials: true, // 是否允许携带 Cookie
    headers: {
        'Content-Type': 'application/json;charset=utf8'
    }
})
// 请求状态拦截器
AxiosInstance.interceptors.request.use(config => {
    // 请求数据前进行相关操作
    if (config.method === 'POST') {
        // 序列化数据，如后端可接受json数据格式，可省略这一步
        config.data = qs.stringify(config.data)
    }

    // 如果需要做鉴权 token ，就添加头部token
    // token 最好不放入 vuex中，当浏览器刷新后，token就会被重置
    // 一般通过将数据存入浏览器cookie，localStorage中

    if (localStorage.token) {
        config.headers.Authorization = localStorage.token
    }

    return config
}, error => {
    // error 回调信息，规定错误信息的返回形式
    // 有关Message使用方法，建议查看element官网
    Message({
        showClose: true,
        message: error && error.data.error.message,
        type: 'error'
    })
    return Promise.reject(error.data.error.message)
})
// 响应状态拦截器
AxiosInstance.interceptors.response.use(res => {
    if (res.data && !res.data.succes) {
        Message({
            showClose: true,
            message: res.data.error.message.message
                ? res.data.error.message.message
                : res.data.error.message,
            type: 'error'
        })
        return Promise.reject(res.data.error.message)
    }
    return res
}, error => {
    // 用户登录时会获取基本信息，如用户名，token，过期时间等
    // token 一般存入storage或cookie中
    // 这里的 token 名字随意
    if (!localStorage.getItem('login_info')) {
        // 判断localstorage中是否存在该 token
        // 若不存在，回退到登录页面
        router.push({
            path: '/login'
        })
    } else {
        // 如token信息存在，继续判断服务器过期时间是否小于当前日期
        // 如已经过期重新登录
        const expires_time = JSON.parse(localStorage.getItem('login_info')).expires_time * 1000
        const current_time = Date.now()
        if (current_time > expires_time) {
            Message({
                showClose: true,
                message: '登陆状态信息过期，请重新登录',
                type: 'error'
            })
            router.push({
                path: '/login'
            })
        } else {
            // 下面是一些状态码错误处理
            switch (error.response.status) {
                case 403:
                    router.push({
                        path: '/error/page403'
                    })
                    break
                case 404:
                    router.push({
                        path: '/error/page404'
                    })
                    break
                case 500:
                    router.push({
                        path: '/error/page500'
                    })
                    break
                default:
                    break
            }
        }
        const error_info = error.data.error
            ? error.data.error.message
            : error.data
        return Promise.reject(error_info)
    }
})

export default {
    install: function(Vue,options) {
        Object.defineProperty(Vue, $axios, AxiosInstance)
    }
}
```

### 调整路由

配置路由表中相关信息，请忽视路由内容

```js
// router/index.js

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})

// 路由拦截
// 通过给路由设置meta信息判断是否需要鉴权
// 类似于登录，注册等页面是不需要鉴权就可以直接访问的
// meta信息中添加一个 requireLogin 字段用于判断鉴权
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireLogin)) {
    // 如果需要登录权限
    if (localStorage.getItem('login_info')) {
      //判断是否已经登录
      const expires_time =
        JSON.parse(localStorage.getItem('login_info')).expires_time * 1000
      const current_time = Date.now()
      if(current_time < expires_time) {
        next()
      } else {
        Message({
          showClose: true,
          message: '登录状态信息过期，请重新登录',
          type:'error'
        })
        next({
          path:'/login'
        })
      }
    } else {
      // 不需要登录权限 直接操作即可
      next()
    }
  }
})

export default router
```

**axios中可配置的选项，具体信息可查看[npm-axios](https://www.npmjs.com/package/axios/v/0.18.0)**

```js
export default {
  // 请求地址
  url: "/user",
  // 请求类型
  method: "get",
  // 请根路径
  baseURL: "http://www.mt.com/api",
  // 请求前的数据处理
  transformRequest: [function(data) {}],
  // 请求后的数据处理
  transformResponse: [function(data) {}],
  // 自定义的请求头
  headers: { "x-Requested-With": "XMLHttpRequest" },
  // URL查询对象
  params: { id: 12 },
  // 查询对象序列化函数
  paramsSerializer: function(params) {},
  // request body
  data: { key: "aa" },
  // 超时设置s
  timeout: 1000,
  // 跨域是否带Token
  withCredentials: false,
  // 自定义请求处理
  adapter: function(resolve, reject, config) {},
  // 身份验证信息
  auth: { uname: "", pwd: "12" },
  // 响应的数据格式 json / blob /document /arraybuffer / text / stream
  responseType: "json",
  // xsrf 设置
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",

  // 下传和下载进度回调
  onUploadProgress: function(progressEvent) {
    Math.round(progressEvent.loaded * 100 / progressEvent.total);
  },
  onDownloadProgress: function(progressEvent) {},

  // 最多转发数，用于node.js
  maxRedirects: 5,
  // 最大响应数据大小
  maxContentLength: 2000,
  // 自定义错误状态码范围
  validateStatus: function(status) {
    return status >= 200 && status < 300;
  },
  // 用于node.js
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 用于设置跨域请求代理
  proxy: {
    host: "127.0.0.1",
    port: 8080,
    auth: {
      username: "aa",
      password: "2123"
    }
  },
  // 用于取消请求
  cancelToken: new CancelToken(function(cancel) {})
};
```

## 总结

通过简单的封装Axios库，实现了上述所列基本功能，实际情况可按照公司要求另行配置。

比如：鉴权系统，token 遵循 JWT 规范，以及对Node中间层数据请求的拦截封装等。

## 参考链接

[Vue 2.x折腾记 - (10) 给axios做个挺靠谱的封装(报错,鉴权,跳转,拦截,提示)](https://juejin.im/post/59a22e71518825242c422604)