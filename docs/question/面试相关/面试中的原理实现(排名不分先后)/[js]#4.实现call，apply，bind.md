### 实现call、apply、bind

> 涉及相关面试题：call、apply以及bind函数内部是如何实现的？

**Function.prototype.myCall()**

首先从如下几点考虑如何实现这几个函数

- 不传入第一个参数，那么上下文默认为`window`
- 改变了`this`指向，让新的对象执行该函数，并能接受参数

代码示例：

```js
Function.prototype.myCall = function(context=window){
    if(typeof this !== 'function') throw new Error('error:not a function')
    
    const args = [...arguments].slice(1)
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    retrun result
}
```

实现分析：

- 首先`context`为可选参数，如果不传则默认为`window`
- 接下来给`context`创建一个`fn`属性，并将值设置为需要调用的函数
- 因为`call`可以传入的多个参数作为调用函数的参数，所以需要将参数抽离出来
- 然后调用函数并将对象上的函数删除

**Function.prototype.myApply()**

`apply`与`call`类似，因为`apply`与`call`传递参数的方式不同，则只需要修改参数传递即可

代码示例：

```js
Function.prototype.myApply = function(context=window) {
    if(typeof this !== 'function') throw new Error('error:not a function')
    
    context.fn = this
    let result;
    if(arguments[1]) {
       result = context.fn(...arguments[1])
       } else {
       result = context.fn()
    }
    return result
}
```



**Function.prototype.myBind()**

`bind`需要返回一个函数，需要判断一些边界条件

代码示例：

```js
Function.prototype.myBind = function(context=window) {
    if(typeof this !== 'function') throw new Error('error:not a function')
    
    const self = this
    const args = [...arguments].slice(1)
    return function F(){
        if(self instanceof F) return new self(...args,...arguments)
        return self.apply(context,args.concat(...arguments))
    }
}
```

实现分析：

- 前几步与上述实现相同，不多赘述
- `bind`返回了一个函数，对于函数来说有两种调用方式，一种是直接调用，一种是构造函数式调用，首先来说直接调用方式
- 对于直接调用来说，这里选择`apply`的方式实现，但是对于参数需要注意以下情况：因为`bind`可以实现类似于这样的代码`f.bind(obj,1)(2)`,所以我们需要将两边的参数拼接起来，于是就有了这样的实现`args.concat(...arguments)`
- 最后来讲通过`new`的方式来实现，对于`new`的情况来说，不会被任何方式改变`this`，所以对于这种情况我们需要忽略传入的`this`