### 写一个方法去掉字符串中的空格，要求传入不同的类型分别能去掉前、后、前后、中间的空格

- 描述：

  写一个方法去掉字符串中的空格，要求传入不同的类型分别能去掉前、后、前后、中间的空格

- 示例：

  ```js
  let str = ' s t r ' 
  input: trimSpace(str,POSITION.left)
  
  output: 's t r '
  ```

- 实现：

  ```js
  let POSITION = Object.freeze({
      left: Symbol(),// 前
      right: Symbol(),// 后
      both: Symbol(),// 前后
      center: Symbol(),// 中间
      all: Symbol() // 全部
  })
  
  function trimSpace(str,position=POSITION.both) {
      if(!!POSITION[position]) throw new Error('unexcept position value')
      if(typeof str !== 'string') throw new Error('not a string')
      switch(position) {
          case POSITION.left:
              let reg_left = /^\s+/
              str = str.replace(reg_left,'')
              break
          case POSITION.right:
              let reg_right = /\s+$/
              str = str.replace(reg_right,'')
              break
          case POSITION.both:
              str = str.trim()
              break
          case POSITION.center:
              let reg_center = /(\w+)(\s+)(\w+)/
              while(str.match(reg_center)) {
                  str = str.replace(reg_center,'$1$3')
              }
              break
          default:
              let reg_all = /\s+/g
              str = str.replace(reg_all,'')
      }
      return str
  }
  ```
  
