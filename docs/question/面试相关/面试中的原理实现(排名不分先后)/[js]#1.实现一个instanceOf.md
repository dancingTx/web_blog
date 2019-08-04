### 实现一个instanceOf

**实现原理：**

- 利用while进行循环
- 通过原型链向上查找，如返回的值为null，则返回false，返回的值存在，则返回true

**代码实现：**

```js
function instanceOf(sub,sup) {
    let prototype = sup.prototype
    let proto = sub.__proto__
    while(1) {
        if(proto === null) return false
        if(proto === prototype) return true
        proto = proto.__proto__
    }
}
```

