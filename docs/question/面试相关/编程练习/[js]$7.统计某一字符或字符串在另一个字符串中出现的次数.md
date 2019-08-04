### 统计某一字符或字符串在另一个字符串中出现的次数

- 描述：

  ​	统计某一字符或字符串在另一个字符串中出现的次数

- 示例：

  ```js
  let char = 'ab'
  let str = 'ab cda baab'
  input: totalCount(str,char)
  
  output: 2
  ```

- 实现：

  > 利用正则表达式

  

  ```js
  function totalCount(str,chars) {
      let count = 0
      while(str.match(chars)){
          str = str.replace(chars, '')
          count++
      }
      return count
  }
  ```

  > ​	利用字符串方法indexOf和substring

  

  ```js
  function totalCount(str,chars) {
      let count = 0
      while (str.indexOf(chars) !== -1) {
          let index = str.indexOf(chars)
          count++
          str = str.substring(index+chars.length)
      }
      return count
  }
  ```