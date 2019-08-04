### 写一个把字符串大小写切换的方法

- 描述：

  ​	写一个把字符串大小写切换的方法
  
- 示例：

  ```js
  let str = 'tItLe'
  input: toggleCase(str)
  
  output: 'TiTlE'
  ```

- 实现:

  ```js
  function toggleCase(str){
      let arr = str.split('')
      let newStr = ''
      arr.forEach(item => {
          if(item === item.toUpperCase()){
              newStr += item.toLowerCase()
          }else {
              newStr += item.toUpperCase()
          }
      })
      return newStr
  }
  ```

  

