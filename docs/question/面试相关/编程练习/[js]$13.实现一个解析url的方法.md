### 实现一个解析 URL 的方法

- 描述：

  使用 js 编写程序，实现将 url 地址字符串解析成 json 格式的对象。

- 示例：

  ```js
  let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
  
  /* result
          { user: 'anonymous',
            // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
            id: [ 123, 456 ], 
            // 中文需解码
            city: '北京',
            // 未指定值得 key 约定为 true
            enabled: true, 
          }
  */
  ```

- 实现：

  ```js
  function parseParams(urlStr) {
      const reg = /.+\?(.+)/
      const parseUrl = reg.exec(urlStr)[1]
      let paramArr = parseUrl.split('&')
      let objParams = {}
      paramsArr.forEach(item => {
          if (/=/.test(item)) {
              let [key,val] = item.split('=')
              val = decodeURIComponent(val) 
              val = /\d+/.test(val) ? parseFloat(val) : val
              if (item.hasOwnProperty(val)) {
                  objParams[key] = [].concat(objParams[key],val)
              } else {
                  objParams[key] = val
              }
          } else {
              objParams[item] = true
          }
      })
  }
  ```

  