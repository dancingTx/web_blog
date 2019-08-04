### 生命周期钩子函数

**生命周期是什么？**

举个例子，如同人的一生要经历生老病死，从出生到少年到成年到老年直至死亡，可以称为是人的生命周期，作为一个程序，也有着它自己的独特的生命周期。

Vue实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom->渲染、更新-> 渲染、卸载等一系列过程，我们称这是Vue的生命周期。

**各个生命周期的作用**

| 生命周期      | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| beforeCreate  | 组件实例被创建之初，组件的属性生效之前                       |
| created       | 组件实例已经完全创建，属性也绑定，但真实dom还没有生成，`$el`还不可用 |
| beforeMount   | 在挂载开始之前被调用：相关的 render 函数首次被调用           |
| mounted       | el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子    |
| beforeUpdate  | 组件数据更新之前调用，发生在虚拟 DOM 打补丁之前              |
| update        | 组件数据更新之后                                             |
| activited     | keep-alive专属，组件被激活时调用                             |
| deadctivated  | keep-alive专属，组件被销毁时调用                             |
| beforeDestory | 组件销毁前调用                                               |
| destoryed     | 组件销毁后调用                                               |

**beforeCreate/created**

在`beforeCreate`钩子函数调用的时候，是获取不到`props`或者`data`中的数据的，因为这些数据的初始化都在`initState`中。

然后会执行`created`钩子函数，在这一步的时候已经可以访问到之前不能访问到的数据，但是这时候组件还没有被挂载，所以是看不到的。

**beforeMount/mounted**

接下来会先执行`beforeMount`钩子函数，开始创建VDOM，最后执行`mounted`钩子，并将VDOM渲染为真实DOM并且渲染数据。组件中如果有子组件的话，会递归挂载子组件，只有当所有子组件全部挂载完毕，才会执行根组件的挂载钩子。

**beforeUpdate/updated**

接下俩是数据更新时会调用的钩子函数`beforeUpdate`和`updated`，这两个钩子函数没什么好说的，就是分别在数据更新前和更新后会调用。

**activated/deactivated**

另外还有`keep-alive`独有的生命周期，分别是`activated`和`deactivated`。用`keep-alive`包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行`deactivated`钩子函数，命中缓存渲染后会执行`activated`钩子函数。

**beforeDestroy/destroyed**

最后就是销毁组件的钩子函数`beforeDestroy`和`destroyed`。前者适合移除事件、定时器等，否则可能会引起内存泄漏的问题。然后进行一系列的销毁操作，如果有子组件的话，也会递归销毁子组件，所有子组件都销毁完毕后才会执行根组件的`destroyed`钩子函数。

**生命周期示意图**
![](./images/16c498ca0e16ac26.jpg)

**异步请求适合在那个生命周期调用？**

官方给出的异步请求示例实在mounted生命周期中调用，但实际上，数据在created阶段就已经初始化完成，因此完全可以在created阶段进行调用。

