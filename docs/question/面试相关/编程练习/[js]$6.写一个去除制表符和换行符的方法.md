### 写一个去除制表符和换行符的方法

- 描述：

  写一个去除制表符和换行符的方法

  ```js
  let str = '这是\n什么'
  function delChar(str) {
      let reg_del = /\s+/
      if (reg_del.test(str)) {
          return str.replace(reg_del, '')
      }else {
          return null
      }
  }
  console.log(delChar(str))
  ```

  