# Redux详解？

## 什么是Redux

> Redux is a predictable state container for JavaScript apps.

简单点说，Redux 就是一个用来管理数据状态以及 UI 状态的 JavaScript 应用工具，它提供了__可预测化__的状态管理机制。

什么是可预测化?

> 就是根据固定的输入值,必定会得到一个固定的结果。
>

## 为什么要用Redux

随着单页面应用的普 及，web app 内部需要管理的状态越来越多，这些状态可能来自服务器端，用户输入的数据，用户交互数据，当前UI状态，本地的缓存数据等等。如何能够有条理的管理这些数据，成为前端开发中一个难题。而 Redux 的出现就是为了降低管理这些数据的难度的。

**注: Redux 与 React 并没有直接的关系，React 支持 React、Angular、JQuery甚至纯 JavaScript**

可以通过一张图，看出 Redux 是如何简化状态管理的。

![](E:\code\web_blog\docs\blog\React相关\images\redux\redux001.jpg)

从图中可以看出，如果不使用 Redux，我们要传递 state 是非常繁琐的。Redux中，可以将数据预先存放在数据仓库(store-共用状态存储空间)中，可以通过 store 统一管理数据状态。当组件中有需要时，就可以通过 store 去查找自己所需状态。如果中途紫色组件想要改变组件的状态时，只需要改变 store 中的数据状态，其他组件内的状态也会相应地发生改变。

## 三大原则

### 单一数据源

在使用 Redux 的程序中，所有的 state 都存储在一个单一的数据源 store 内部，类似于一个巨大的状态树。

### state 是只读的

state 中的数据是只读的，能改变 state 的唯一方式是通过触发 action 行为类进行修改。

### 使用纯函数来执行修改

为了描述 action 如何改变 state tree ，你需要编写 reducers。

reducers 是一个纯函数，接受两个参数，state 和 action。只需要根据 action 行为返回对应的 state 即可。且必须要有返回值。

什么是纯函数？

> 一个函数的返回结果只依赖于它的参数，并且在执行过程中没有副作用，我们就把这个函数叫做纯函数。

**Redux 工作流程**

![](E:\code\web_blog\docs\blog\React相关\images\redux\redux_flow.png)

初学者看了这张图，可能会有点懵，接下来，咱一个一个说。

## Store

首先要明确一点：`store`与`state`的区别

`state`是应用的状态，一般本质上就是一个__普通对象__。

