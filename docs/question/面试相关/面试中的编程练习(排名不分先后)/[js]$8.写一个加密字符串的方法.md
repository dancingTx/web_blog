### 写一个加密字符串的方法

- 描述：

  ​	写一个加密字符串的方法

```js
let str = 'hello,world'
// 加密
function encodeStr({str='',padding=1}){
    return !str ? str : str.split('').map(char=>String.fromCharCode(char.CharCodeAt()+padding)).join('')
}
// 解密
function decodeStr({str='',padding=1}){
    return !str ? str : 
    str.split('').map(char=>String.fromCharCode(char.CharCodeAt()-padding)).join('')
}
console.log(encodeStr({str,padding:3}),decodeStr({str:'khoor#zruog',padding:3}))
```

