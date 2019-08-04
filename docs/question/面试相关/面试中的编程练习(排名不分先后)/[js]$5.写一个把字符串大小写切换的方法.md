### 写一个把字符串大小写切换的方法

- 描述：

  ​	写一个把字符串大小写切换的方法

```js
let str = 'tItLe'
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
console.log(toggleCase(str))
```

