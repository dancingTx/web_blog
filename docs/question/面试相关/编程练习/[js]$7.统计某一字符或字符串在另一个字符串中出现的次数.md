### 统计某一字符或字符串在另一个字符串中出现的次数

- 描述：

  ​	统计某一字符或字符串在另一个字符串中出现的次数

  	- 利用正则表达式

  ```js
  let char = 'ab'
  let str = 'ab cda baab'
  function totalCount(str,chars) {
      let count = 0
      while(str.match(chars)){
          str = str.replace(chars, '')
          count++
      }
      return count
  }
  console.log(totalCount(str,char))
  ```

  ​	- 利用字符串方法indexOf和substring

  ```js
  let char = 'ab'
  let str = 'ab cda baab'
  function totalCount(str,chars) {
      let count = 0
      while (str.indexOf(chars) !== -1) {
          let index = str.indexOf(chars)
          count++
          str = str.substring(index+chars.length)
      }
      return count
  }
  console.log(totalCount(str,char))
  ```

  

  