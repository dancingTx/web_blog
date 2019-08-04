### Vue中如何重置data？

**Object.assign()**

Object.assign()方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象

> 目标对象有一个，后面可以有多个源对象参数。注意它只会拷贝源对象自身且是可枚举的属性到目标对象。该对象使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关getter和setter。

**复制对象**

```js
let obj = {a:1}
let copyObj = Object.assign({},obj)
console.log(copyObj) // {a:1}
```

注：Object.assign()是浅拷贝。

**合并对象**

```js
let o1 = { a: 1 };
let o2 = { b: 2 };
let o3 = { c: 3 };
let obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1); // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。
```

注：具有相同属性的对象，同名属性，后边会覆盖前边。

**Vue中的使用技巧**

```js
由于Object.assign()有上述特性，所以我们在Vue中可以这样使用：
Vue组件可能会有这样的需求：在某种情况下，需要重置Vue组件的data数据。此时，我们可以通过this.$data获取当前状态下的data，通过this.$options.data()获取该组件初始状态下的data。
然后只要使用Object.assign(this.$data, this.$options.data())就可以将当前状态的data重置为初始状态。
```

