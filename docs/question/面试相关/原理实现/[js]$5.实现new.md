### 实现new

> 涉及面试题：`new`的原理是什么？通过`new`的方式创建对象和通过字面量的方式创建有什么区别？

再调用`new`的过程中会发生以下四件事情：

- 新生成了一个对象
- 链接到原型
- 绑定this
- 返回新对象

根据以上过程，来手动实现一个`new`

代码示例：

```js
function create(){
    const obj = {}
    const Constructor = [].shift.call(arguments)
    Object.setPrototypeOf(obj,Constructor.prototype)
    const result = Constructor.apply(obj,arguments)
    return typeof result === 'object' ? result : obj
}
```

实现分析：

- 创建一个空对象
- 获取构造函数
- 设置空对象的原型
- 绑定`this`并执行构造函数
- 确保返回值为对象

对于对象来说，其实都是通过new产生的，无论是`function Foo()`还是`let a = {b:1}`

对于创建一个对象来说，更推荐使用字面量的方式创建对象（无论是性能上还是可读性上）。

因为使用`new Object()`的方式创建对象需要通过作用域链一层层找到`Object`,但是使用字面量的方式就没有该问题。