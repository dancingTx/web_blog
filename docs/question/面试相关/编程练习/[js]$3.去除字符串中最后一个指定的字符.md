### 去除字符串中最后一个指定的字符

- 描述：

  ​	去除字符串中最后一个指定的字符

  	- 利用字符串substring方法

  ```js
  let str = 'abcdefgacbd'
  function delChar(str,point) {
      let index = str.lastIndexOf(point)
      if(index !== -1) {
          return str.substring(0,index)+str.substring(index+1)
      } else {
          return null
      }
  }
  ```

  	- 利用数组splice方法

  ```js
  let str = 'abcdefgacbd'
  function delChar(str,point) {
      let index = str.lastIndexOf(point)
      if(index !== -1) {
          let arr = str.split('')
          arr.splice(index,1)
          return arr.join('')
      } else {
          return null
      }
  }
  ```

  

  