### 写一个判断数据类型的方法

- 描述：

  ​	写一个判断数据类型的方法

```js
function typeOf(obj){
    return {}.toString.call(obj).slice(8,-1).toLowerCase()
}
```

