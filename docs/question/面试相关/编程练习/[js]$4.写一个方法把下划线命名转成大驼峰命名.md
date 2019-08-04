### 写一个方法把下划线命名转成大驼峰命名

- 描述：

  写一个方法把下划线命名转成大驼峰命名

- 示例：

  ```js
  let str = 'sub_title'
  input: toggleCase(str)
  
  output: 'subTitle'
  ```

- 实现：

  ```js
  function toggleCase(str){
      let index = str.indexOf('_')
      if(index !== -1) {
          let arr = str.split('_')
          return arr.map(item => item.substring(0, 1).toUpperCase() + item.substring(1)).join('')
      }else {
          return false
      }
  }
  ```

  