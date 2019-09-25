### 写一个判断数据类型的方法

- 描述：

  ​	写一个判断数据类型的方法

- 示例：

  ```js
  let arr = new Array()
  input: typeOf(arr)
  
  output: 'array'
  ```

- 实现：

  > 利用 slice 方法进行拼接

  

  ```js
  function typeOf(obj){
      return {}.toString.call(obj).slice(8,-1).toLowerCase()
  }
  ```

  > 利用正则表达是进行匹配

  ​	

  ```js
  function typeOf(obj) {
      return {}.toString.call(obj).replace(new RegExp('[object (.+)]', 'g'), RegExp.$1).toLowerCase()
  }
  ```

  