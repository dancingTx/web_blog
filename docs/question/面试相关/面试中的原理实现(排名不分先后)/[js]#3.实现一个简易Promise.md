### 实现一个简易Promise

首先搭建函数的大体框架

```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
function MyPromise(fn){
    let self = this
    self.value = null
    self.state = PENDING
    self.resolvedCallBacks = []
    self.rejectedCallBacks = []
}
```

- 首先我们创建了三个常量用来表示promise的三个状态，对于经常使用的一些值都应该通过常量来管理，便于开发以及后期维护。
- 在函数体内部首先创建了常量`self`,因为代码可能会异步执行，用于获取正确的`this`对象
- `Promise`起始状态应该为`pending`
- `value`变量用于保存`resolve`或者`reject`中传入的值
- `value`变量用于保存`resolve`或者`reject`中传入的值
- `resolvedCallBacks`和`rejectedCallBacks`用于保存`then`中的回调，因为当执行完`Promise`时状态可能还是等待中，这时候应该把`then`中的回调保存起来用于状态改变时使用

接下来完善`resolve`和`reject`函数，添加在`MyPromise`函数体内部

```js
// success
function resolve(value) {
    self.state = RESOLVED
    self.value = value
    self.resolvedCallBacks.map(cb=>cb(self.value))
}
// fail
function reject(value) {
    self.state = REJECTED
    self.value = value
    self.rejectedCallBacks.map(cb=>cb(self.value))
}
```

- 首先两个函数都需要判断当前状态是否在等待，因为规范规定只有等待态才可以改变状态
- 将当前状态更改为对应状态，并且将传入的值赋值给`value`
- 遍历回调函数并执行

接下来实现如何执行`Promise`中传入的函数

```js
try{
    fn(resolve,reject)
}catch(e) {
    reject(e)
}
```

- 实现很简单，执行传入的参数并且将之前两个函数当作参数传进去
- 要注意，可能执行函数过程中会发生错误，需要捕获错误并执行`reject`函数

最后，实现较为复杂的`then`函数

```js
MyPromise.prototype.then = function(onFulFilled,onRejected) {
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }
    
    if(this.state === PENDING) {
        this.resolvedCallBacks.push(onFulFilled)
        this.rejectedCallBacks.push(onRejected)
    }
    if(this.state === RESOLVED) onFulFilled(this.value)
    if(this.state === REJECTED) onRejected(this.value)
}
```

- 首先判断两个参数是否为函数类型，因为两个参数是可选参数
- 当参数不是函数类型时，需要创建一个函数赋值给对应的参数，同时也实现了透传，比如下面代码：

```js
Promise.resolve(4).then().then(values=>{console.log(value)})
```

- 接下来就是一系列的判断状态的逻辑，当状态不为等待态时，就会执行相对应的函数。如果状态为等待态，就向回调函数中`push`函数，比如如下代码就会进入等待态的逻辑

```js
new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(1)
    })
}).then(value=>{
    console.log(value)
})
```

