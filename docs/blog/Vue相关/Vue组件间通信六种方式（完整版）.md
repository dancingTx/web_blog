# vue组件间通信六种方式（完整版）

## 前言

组件是vue.js中最强大也是最具特色的功能之一，而组件实例的作用域也是相互独立的，这就意味着不同的组件之间数据是无法共享的。一般来说，组件间可以有以下几种关系：

![](./images/message/3174701-7a15ec352b4e7d84.png)

如上图所示，A和B、B和C、B和D都是父子关系，C和D是兄弟关系，A和C、D是隔代关系(可能隔多代)。

针对不同的使用场景，如何选择行之有效的通信方式?这是我们所要探讨的主题。本文总结了Vue组件间几种通信方式，如`props`、`$emit/$on`、`vuex`、`$parent/$children`、`$attrs/$listeners`和`provide/inject`，以通俗易懂的实例讲述这其中的差别及使用场景。

## 一、props/$emit

父组件A通过props的方式向子组件B传递，B to A 通过在 B 组件中 $emit，A 组件中 v-on 的方式实现。

**1.父组件向子组件传值**

接下来，通过一个实例，说明父组件如何向子组件传递值：在子组件Users.vue中如何获取父组件App.vue中的数据`users:['hery','bucky','emily']`

```vue
// App.vue 父组件
<template>
	<div id='app'>
        // 前者自定义名称便于子组件调用，后者要传递数据名
        <Users :users='users' />
    </div>
</template>
<script>
	import Users from './components/Users'
    export default {
        name:'App',
        data(){
            return {
                users:['hery','bucky','emily']
            }
        },
        components:{
            Users
        }
    }
</script>
```

```vue
// Users 子组件
<template>
	<div class='hello'>
        <ul>
            // 遍历父组件中传递过来的值，然后渲染到页面上
            <li v-for='user of users'>{{user}}</li>
    	</ul>
    </div>
</template>
<script>
	export default {
        name:'Users',
        props:{
            // 该名字为父组件中传递值所定义的名称
            // props 中的属性尽量写全，避免用数组直接接收名称
            users:{
                type:Array,
                require:true,
                default:[]
            }
        }
    }
</script>
```

__总结:父组件通过props向下传递数据给子组件。__

__注：组件中的数据一共有三种形式：data，props，computed__

**2.子组件向父组件传值(通过事件形式)**

接下来通过一个实例，说明子组件如何向父组件传递值：当我们点击`Vue.js Demo`后，子组件向父组件传递值，文字由原来的"传递的是一个值"变成“子向父组件传值”，实现子组件向父组件值得传递。

![](./images/message/3174701-8d31dfc061d39fad.png)

```vue
// 子组件
<template>
	<header>
        // 绑定点击事件
    	<h1 @click='changeTitle'>{{title}}</h1>
    </header>
</template>
<script>
	export default {
        name:'app-header',
        data(){
            return {
                title: 'Vue.js Demo'
            }
        },
        methods:{
            changeTitle(){
                // 自定义事件 第一个参数为传递名称，第二个参数为传递值，是一个参数列表
                this.$emit('titleChanged','子向父组件传值')
            }
        }
    }
</script>
```

```vue
// 父组件
// 如果两标签间无其余值，建议采用自闭合标签
<template>
	<div id='app'>
        // 此处的名称与子组件中自定义名称一致
        <Header @titleChanged='updateTitle' />
        // updateTitle($event)接受传递过来的文字
        <h2>{{title}}</h2>
    </div>
</template>
<script>
    // Header 可能与html自带标签冲突，建议加个前缀
	import Header from './components/Header'
    export default {
        name:'App',
        data(){
            return {
                title:'传递的是一个值'
            }
        },
        methods: {
            updateTitle(title) {
                this.title = title
            }
        },
        components:{
            Header
		}
    }
</script>
```

__总结：子组件通过events给父组件发送消息，实际上就是子组件把自己的数据发送给父组件。__

## 二、$emit/$on

__这种方法通过一个空的Vue实例作为中央时间总线(事件中心)，用它来触发事件以及监听事件，巧妙而又轻量的实现了任何组件间的通信，包括父子、兄弟、跨级。__当我们的项目较大时，可以选择更优解——状态管理机制vuex。

**具体实现方式**

```js
let Event = new Vue()
Event.$emit(eventName,[...args])
Event.$on(eventName,data=>{})
```

**具体实例**

假设兄弟组件有三个，分别是A、B、C组件，C组件如何获取A或者B组件的数据？

```vue
<div id='itany'>
    <my-a />
    <my-b />
    <my-c />
</div>
<template id='a'>
	<div>
        <h3>A组件:{{name}}</h3>
        <button @click='send'>将数据发送给C组件</button>
    </div>
</template>
<template id='b'>
	<div>
        <h3>B组件:{{age}}</h3>
        <button @click='send'>将数据发送给C组件</button>
    </div>
</template>
<template id='c'>
	<div>
        <h3>C组件:{{name}}|{{age}}</h3>
    </div>
</template>
<script>
	let Event = new Vue() //定义一个空的Vue实例
    let A = {
        template: '#a',
        data(){
            return {
                name:'tom'
            }
        },
        methods: {
            send(){
                Event.$emit('data-a',this.name)
            }
        }
    }
    let B = {
        template: '#b',
        data(){
            return {
                age: 10
            }
        },
        methods:{
            send(){
                Event.$emit('data-b',this.age)
            }
        }
    }
    let C = {
        template:'#c',
        data(){
            return {
                name:'',
                age:''
            }
        },
        // 在模板编译完成后执行
        mounted(){
            Event.$on('data-a',name=>this.name = name)
            Event.$on('data-b',age=>this.age=age)
        }
    }
    let vm = new Vue({
        el:'#itany',
        components:{
            'my-a':A,
            'my-b':B,
            'my-c':C
        }
    })
</script>
```

![](./images/message/3174701-6677501da9006ed2.gif)

$on 监听了自定义事件 data-a 和 data-b ，因为有时不确定何时会触发事件，一般会在 mounted 或 created 钩子中进行监听。

## 三、vuex

![](./images/message/3174701-e62ba449a0c2e7ac.png)

**1.简要介绍Vuex原理**

Vuex 实现了一个单项数据流，在全局中拥有一个 state 来存放数据源，当组件要更改 state 中的数据时，必须通过 Mutations 进行派发，Mutations 同时提供了订阅者模式供外部插件调用获取 state 数据的更新。而当存在异步操作(常见于调用后端接口异步获取更新数据)或批量的同步操作时，需要通过 Actions 调用，但是 Actions 无法直接修改 state ，所以还是需要 commit 给 Mutations 进行 state 数据的修改。最后，根据 state 的变化，动态的将数据渲染到视图中。

**2.简要介绍各模块在流程中的功能**

- Vue Components: Vue组件。HTML页面上，负责接收用户操作等交互行为，执行 dispatch 方法触发对应的 action 进行回应。
- dispatch： 操作行为触发方法，是唯一能执行 action 的方法。
- actions： __操作行为处理模块，由组件中的`$state.dispatch(actionName,[...args])`来进行派发。然后由 commit() 来触发 mutation 的调用，进而更新 state。__负责处理 Vue Components 接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。像后台 API 请求的操作就在该模块中进行，包括触发其他 action 以及提交 mutation 的操作。该模块提供了 Promise 的封装，以支持 action 的链式触发。
- commit： 状态改变提交操作方法。对 mutation 进行提交，是唯一能执行 mutation 的方法。
- mutations： __状态改变操作方法，由actions中的`commit(mutationName)`来触发__。是 Vuex 修改 state 的唯一推荐方法。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些 hook 暴露出来，以进行 state 的监控等。
- state：状态页面管理容器对象。 集中储存 Vue Components 中 data 对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取，利用 Vue 的细粒度数据响应机制来进行高效的状态更新。
- getters： state 对象读取方法。图中并没有单独列出该模块， 应该被包含在了 render 中， Vue Components 通过该方法读取全局 state 对象。

**3.Vuex与localStorage**

Vuex 是 Vue 的状态管理器，存储的数据是响应式的。但是并不会被保存起来，刷新后会回到初始状态，__具体做法应该是在 Vuex 里的数据改变的时候把数据拷贝一份保存在 localStorage 里面，刷新以后，如果 localStorage 中保存有数据，将其取出后替换 store 中的 state 。

```js
let defaultCity = '上海'
// 若用户关闭本地储存功能， 在此处增加错误处理
try {
    if(!defaultCity) {
        defaultCity = JSON.parse(window.localStorage.getItem('defaultCity'))
    }
} catch(e){}
export default new Vuex.store({
    state: {
        city:defaultCity
    },
    mutations: {
        changeCity(state,city) {
            state.city = city
            try {
                window.localStorage.setItem('defaultCity',JSON.stringify(state.city))
                // 数据改变是将数据拷贝一份存入localStorage里面
            } catch(e){}
        }
    }
})
```

这里需要注意：由于 Vuex 里，我们保存的状态，都是数组，而 localStorage 只支持字符串，所以需要通过JSON转换：

```js
JSON.stringify(state.subscribeList) // array->string 
JSON.parse(window.localStorage.getItem('subscribeList')) // string -> array
```

## 四、$attrs/$listeners

**1.简介**

多级组件嵌套需要传递数据时，通常使用的方法就是通过 Vuex。但是如果仅仅是传递数据，而不做中间处理的情况，使用 Vuex 来处理，未免有点大材小用。为此 Vue2.4 版本中提供了另外一种方法——`$attrs/$listeners`

- `$attrs`：包含了父作用域中不被 props 所识别(且获取)的特性绑定(class和style除外)。当一个组件没有声明任何 props 时，这里会包含所有父作用域的绑定(class 和 style 除外)，并且可以通过 v-bind:'$attrs' 传入内部组件。通常配合 interitAttrs 选项一起使用。
- `$listeners`：包含了父作用域中的(不含.native 修饰器) v-on 事件监听器。它可以通过 v-on='$listeners' 传入内部组件。

接下来看一个跨级通信的实例：

```vue
// index.vue
<template>
  <div>
    <h2>浪里行舟</h2>
    <child-com1
      :foo="foo"
      :boo="boo"
      :coo="coo"
      :doo="doo"
      title="前端工匠"
    ></child-com1>
  </div>
</template>
<script>
const childCom1 = () => import("./childCom1.vue");
export default {
  components: { childCom1 },
  data() {
    return {
      foo: "Javascript",
      boo: "Html",
      coo: "CSS",
      doo: "Vue"
    };
  }
};
</script>
```

```vue
// childCom1.vue
<template class="border">
  <div>
    <p>foo: {{ foo }}</p>
    <p>childCom1的$attrs: {{ $attrs }}</p>
    <child-com2 v-bind="$attrs"></child-com2>
  </div>
</template>
<script>
const childCom2 = () => import("./childCom2.vue");
export default {
  components: {
    childCom2
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  props: {
    foo: String // foo作为props属性绑定
  },
  created() {
    console.log(this.$attrs); // { "boo": "Html", "coo": "CSS", "doo": "Vue", "title": "前端工匠" }
  }
};
</script>
```

```vue
// childCom2.vue
<template>
  <div class="border">
    <p>boo: {{ boo }}</p>
    <p>childCom2: {{ $attrs }}</p>
    <child-com3 v-bind="$attrs"></child-com3>
  </div>
</template>
<script>
const childCom3 = () => import("./childCom3.vue");
export default {
  components: {
    childCom3
  },
  inheritAttrs: false,
  props: {
    boo: String
  },
  created() {
    console.log(this.$attrs); // {"coo": "CSS", "doo": "Vue", "title": "前端工匠" }
  }
};
</script>
```



```vue
// childCom3.vue
<template>
  <div class="border">
    <p>childCom3: {{ $attrs }}</p>
  </div>
</template>
<script>
export default {
  props: {
    coo: String,
    title: String
  }
};
</script>
```

![](./images/message/3174701-db162929eb89cb7f.png)

如上图所示 `$attrs`表示没有继承数据的对象，格式为`{属性名：属性值}`。Vue2.4 中提供了`$attrs`，`$listeners`来传递数据与事件，跨级组件之间的通讯变得更加方便。

简单来说：`$attrs`与`$listeners`是两个对象，`$attrs`里存放的是父组件中绑定的非 props 属性，`$listeners`里存放的是父组件中绑定的非原生事件。

## 五、provide/inject

**1.简介**

Vue2.2.0 新增 API ，这对选项需要一起使用，__以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下文关系成立的时间里始终生效。__一言而蔽之：祖先组件中通过 provide 来提供变量，然后在子孙组件中通过 inject 来注入变量。

__provide/inject API 主要解决了跨级组件间的通信问题，但是它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建里了一种主动提供与依赖注入的关系。__

**2.举个例子**

假设有两个组件：A.vue 和 B.vue，B 是 A 的子组件

```vue
// A.vue
export default {
	provide: {
		name: 'xxx'
	}
}
```

```vue
// B.vue
export default {
	inject:['name'],
	mounted() {
		console.log(this.name) // xxx
	}
}
```

可以看到，在 A.vue 里，我们设置了一个 `provide:name`， 值为 `xxx `，它的作用就是将 `name`这个变量提供给它的所有子组件。而在 B.vue 中，通过`inejct`注入了从 A 组件中提供的 `name`变量，那么在组件 B 中，就可以直接通过 `this.name`访问到这个变量了，它的值也是 `xxx`。这就是 `provide/iinject`最核心的用法。

需要注意的是：__provide 和 inject 绑定并不是可响应的。这是刻意为之。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的__——vue官方文档

所以，上面的 A.vue 的 `name`如果改变了，B.vue 中的 `this.name`并不会发生改变，依然是`xxx`。

**3.provide与inject怎么实现 数据响应式**

一般来说，有两种方法：

- provide 祖先组件的实例，然后再子孙组件中注入依赖，这样就可以在子孙组件中直接修改祖先组件的实例属性不过这种方法的缺点就是这个实例上挂载了很多没有必要的东西如props，methods。
- 使用vue2.6最新 API Vue.observable 优化响应式 provide(推荐)

我们来看一个实例：孙组件D、E和F获取 A 组件传递过来的 color 值，并能实现数据响应式变化，即 A 组件的 color 变化后，组件 D、E、F 不会跟着变(核心代码如下)

![](./images/message/3174701-38ef418e343f6b76.png)

```vue
// A 组件 
<div>
      <h1>A 组件</h1>
      <button @click="() => changeColor()">改变color</button>
      <ChildrenB />
      <ChildrenC />
</div>
......
  data() {
    return {
      color: "blue"
    };
  },
  // provide() {
  //   return {
  //     theme: {
  //       color: this.color //这种方式绑定的数据并不是可响应的
  //     } // 即A组件的color变化后，组件D、E、F不会跟着变
  //   };
  // },
  provide() {
    return {
      theme: this//方法一：提供祖先组件的实例
    };
  },
  methods: {
    changeColor(color) {
      if (color) {
        this.color = color;
      } else {
        this.color = this.color === "blue" ? "red" : "blue";
      }
    }
  }
  // 方法二:使用2.6最新API Vue.observable 优化响应式 provide
  // provide() {
  //   this.theme = Vue.observable({
  //     color: "blue"
  //   });
  //   return {
  //     theme: this.theme
  //   };
  // },
  // methods: {
  //   changeColor(color) {
  //     if (color) {
  //       this.theme.color = color;
  //     } else {
  //       this.theme.color = this.theme.color === "blue" ? "red" : "blue";
  //     }
  //   }
  // }
```



```vue
// F 组件 
<template functional>
  <div class="border2">
    <h3 :style="{ color: injections.theme.color }">F 组件</h3>
  </div>
</template>
<script>
export default {
  inject: {
    theme: {
      //函数式组件取值不一样
      default: () => ({})
    }
  }
};
</script>
```

虽说 provide 和 inject 主要为高阶插件/组件库提供用例，但如果你能在业务中熟练运用，可以达到事半功倍的效果！

## 六、$parent/$children与ref

- `ref`：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
- `$parent/$children`：访问父/子实例

需要注意的是：这两种都是直接得到组件实例，使用后可以直接调用组件的方法或访问数据。我们下那里看看用`ref`来访问组件的实例：

```js
// component-a 子组件
export default {
    data(){
		return {
			title:'vue.js'
	}
   },
    methods: {
        sayHello(){
            window.alert('hello')
        }
    }
}
```

```vue
// 父组件
<template>
	<component-a ref='comA' />
</template>
<script>
	export default {
        mounted(){
            const comA = this.$refs.comA
            console.log(comA.title) // vue.js
            comA.sayHellow() // alert('hello')
        }
    }
</script>
```

不过，__这两种方法的弊端是，无法在跨级或兄弟间通信。__

```vue
// parent
<component-a></component-a>
<component-b></component-b>
<component-c></component-c>
```

我们想在 component-a 中，访问到引用它的页面中(这里就是 parent.vue)的两个 component-b 组件，那这种情况下，就需要配置额外的插件或工具了，比如 Vuex 和 Bus 的解决方案。

## 总结

常见使用场景可以分为三类：

- 父子通信：父向子传递数据是通过 props ，子向父传递数据是通过 events($emit)；通过父链/子链也可以通信($parent/$children)；ref 也可以访问组件实例；provide/inject API；$attrs/$listeners
- 兄弟通信：Bus、Vuex
- 跨级通信：Bus、Vuex；provide/inject API、$attrs/$listeners

## 原文链接

[vue组件间通信六种方式（完整版）](https://segmentfault.com/a/1190000019208626)
