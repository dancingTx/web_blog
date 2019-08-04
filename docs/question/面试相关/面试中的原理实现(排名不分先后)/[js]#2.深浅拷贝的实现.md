### 深浅拷贝的实现

**浅拷贝**

- 利用扩展运算符进行浅层拷贝

```js
function easyCopy(obj) {
    return {...obj}
}
```

- 利用Object.assign()进行浅层拷贝

```js
function easyCopy(obj) {
    return Object.assign({},obj)
}
```

- 小结：浅拷贝只能进行第一层数据的拷贝，如果对象存在嵌套情况，则浅拷贝失效。

**深拷贝**

- 利用JSON.parse和JSON.stringify进行深层拷贝

```js
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
}
// 上述方式确实能够实现深层拷贝，但是当深层的对象值为函数，undefined，null时，则无法解析。
```

- 通过循环对数据进行逐一拷贝，如果子属性仍未对象，则可通过递归的方式向下传递。

```js
function deepCopy(obj) {
   if(typeof obj !== 'object' || obj === null) return
   let newObj = Array.isArray(obj) ? [] : {}

    for (const key in obj) {
        if(typeof obj[key] === 'object'){
            newObj[key] = deepCopy(obj[key])
        }else {
            newObj[key] = obj[key]
        }
    }
    return newObj
}
```

```js
function deepCopy(obj) {
    // 判断对象类型
   function isObject(value) {
       return (typeof value === 'object' || typeof value === 'function') && value !== null
   }
   // 判断数组类型
   function isArray(arr) {
       return Array.isArray(arr)
   }
   if(!isObject(obj)) throw new Error('not a object')
   let newObj = isArray(obj) ? [...obj]:{...obj}
   
   Reflect.ownKeys(newObj).forEach(key=>{
       newObj[key] = isObject(obj[key]) ? deepCopy(obj[key]) : obj[key]
   })
   return newObj
}
```

