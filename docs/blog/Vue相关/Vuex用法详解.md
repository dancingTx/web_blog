# Vuex用法详解

在SPA单页面组件的开发中Vue的Vuex和React的Redux统称为状态管理机制，个人理解是全局状态管理更合适；简单的理解就是你在state中定义了一个数据后，你可以在所在项目中的任何一个组件中进行获取、进行修改，并且你的修改可以得到全局的响应变更。

下面一步步剖析Vuex的使用。

## 安装vuex

首先在vue 2.0+ 你的vue-cli项目中安装vuex：

```js
npm install vuex --save
```

然后 在src文件目录下新建一个名为store的文件夹，为方便引入并在store文件夹里新建一个index.js，里面的内容如下：

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store()
```

## state的使用

接下来，在main.js里面引入store，然后再全局注入，这样一来就可以在任何组件中使用this.$store了

```js
import store from './store'
new Vue({
    router,
    store,
    render:h=>h('<App/>')
}).$mount('#app')
```

说了上面的前奏后，接下来纳入正题，就是开篇所说的state的玩法。回到store文件的index.js中，我们先声明一个state变量，并赋值一个空对象给它，里面随便定义两个初始属性值；然后再在实例化的Vuex.Store里面传入一个空对象，并把刚声明的变量state放在里面。

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = { // 要设置的全局访问的state对象
    showFooter:true,
    changableNum:0
    // 要设置的初始属性值
}
export default new Vuex.Store({
    state
})
```

## getters的使用

实际上做完上面的三个步骤后，你已经可以用this.$store.state.showFooter或this.$store.state.changableNum在任何一个组件里面获取showFooter和changableNum定义的值了，但这不是理想的获取方式；Vuex官方API提供了一个getters，和Vue计算属性computed一样，来实时监听state值的变化（最新状态），并把它也放进Vuex.Store里面。

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = { // 要设置的全局访问的state对象
    showFooter:true,
    changableNum:0
    // 要设置的初始属性值
}
const getters = { // 实时监听state值的变化(最新状态)
    isShow(state) {
        return state.showFooter
    },
    getChangedNum(state) {
        return state.changableNum
    }
}
export default new Vuex.Store({
    state,
    getters
})
```

## mutations的使用

光有定义的state的初始值，不改变它不是我们想要的需求，接下来说说mutations，mutations也是一个对象，这个对象里面可以放改变state的初始值的方法，具体的用法就是给里面的方法传入参数state或额外的参数，然后利用Vue的双向绑定数据驱动进行值的改变，同样的定义好之后将mutations放入Vuex.Store中。

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = { // 要设置的全局访问的state对象
    showFooter:true,
    changableNum:0
    // 要设置的初始属性值
}
const getters = { // 实时监听state值的变化(最新状态)
    isShow(state) {
        return state.showFooter
    },
    getChangedNum(state) {
        return state.changableNum
    }
}
const mutations = { 
    //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    show(state) {
        return show.showFooter = true
    },
    hide(state) {
        return show.showFooter = false
    },
    newNum(state,num) {
        return state.changableNum += num
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations
})
```

## actions的使用

这时候你完全可以用this.$store.commit('show')或this.$store.commit('hide')以及this.$store.commit('newNum',1)在其他组件中修改showFooter和changableNum的值了，但这并不是理想的改变值的方式；因为在Vuex中，mutations内部的方法都是同步事务，意思就是说：比如这里的一个this.$store.commit('newNum',sum)方法，两个组件执行后得到的值，每次都是相同的，这样肯定不是理想的需求。

好在Vuex官方API提供了actions，zhegeactions也是对象变量，最大的作用就是在Actions方法中可以包含任意异步操作，这里面的方法是用来异步触发mutations里面的方法，actions内部自定义的函数接收一个context参数和要改变的形参，context和store实例具有相同的方法和属性，所以它可以执行context.commit('')，然后将他放入Vuex.Store中。

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = { // 要设置的全局访问的state对象
    showFooter:true,
    changableNum:0
    // 要设置的初始属性值
}
const getters = { // 实时监听state值的变化(最新状态)
    isShow(state) {
        return state.showFooter
    },
    getChangedNum(state) {
        return state.changableNum
    }
}
const mutations = { 
    //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    show(state) {
        return show.showFooter = true
    },
    hide(state) {
        return show.showFooter = false
    },
    newNum(state,num) {
        return state.changableNum += num
    }
}
const actions = {
     //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    showFooter({commit}){
        commit('show')
    },
    hideFooter({commit}){
        commit('hide')
    },
    getNewNum({commit},num) {
        commit('newNum',num)
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
```

而在外部组件中进行全局执行actions里面的方法时，只需要执行this.$store.dispatch('hideFooter')或this.$store.dispatch('showFooter')以及this.$store.dispatch('getNewNum',6) // 参数位置随意

这样就可以全局改变showFooter或changableNum的值了，如下面的组件中，需求时跳转组件页面后，根据当前所在的路由页面进行隐藏或实现页面底部的tabs选项卡。

```js
<template>
  <div id="app">
    <router-view/>
    <FooterBar v-if="isShow" />
  </div>
</template>

<script>
import FooterBar from '@/components/common/FooterBar'
import config from './config/index'
export default {
  name: 'App',
  components:{
    FooterBar:FooterBar
  },
  data(){
    return {
    }
  },
  computed:{
     isShow(){
       return this.$store.getters.isShow;
     }
  },
  watch:{
      $route(to,from){ //跳转组件页面后，监听路由参数中对应的当前页面以及上一个页面
          console.log(to)
        if(to.name=='book'||to.name=='my'){ 
            // to.name来获取当前所显示的页面，从而控制该显示或隐藏footerBar组件
           this.$store.dispatch('showFooter') 
            // 利用派发全局state.showFooter的值来控制        
        }else{
           this.$store.dispatch('hideFooter')
        }
      }
  }
}
</script>
        }else{
           this.$store.dispatch('hideFooter')
        }
      }
  }
}
</script>
```

至此就可以做到全局响应状态改变了

## modules 模块化 以及 组件中引入mapGetters、mapActions和mapStates的使用

因为在大多数的项目中，我们对于全局状态的管理并不仅仅一种情况的需求，有时有多方面的需求，比如写一个商城项目，你所用到的全局state可能是关于购物车这一块儿的也有可能是关于商品价格这一块儿的；像这样的情况我们就要考虑使用vuex中的 modules 模块化了，具体怎么使用modules呢？咱们继续一步一步的走：

首先，在store文件夹下面新建一个modules文件夹，然后在modules文件里面建立需要管理状态的js文件，既然要把不同部分的状态分开管理，那就要把它们给分成独立的状态文件了，如下图：

![](./images/651356550-5b59c0b8969f4_articlex.png)

而对应的store文件夹下面的index.js 里面的内容就直接改写成：

```js
import Vue from 'vue';
import Vuex from 'vuex';
import footerStatus from './modules/footerStatus'
import collection from './modules/collection'
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
         footerStatus,
         collection
    }
});
```

相应的js，其中的 namespaced:true 表示当你需要在别的文件里面使用( mapGetters、mapActions 接下来会说 )时，里面的方法需要注明来自哪一个模块的方法:

```js
//collection.js

const state={
    collects:[],  //初始化一个colects数组
};
const getters={
  renderCollects(state){ //承载变化的collects
    return state.collects;
  }
};
const mutations={
     pushCollects(state,items){ //如何变化collects,插入items
        state.collects.push(items)
     }
 };
const actions={
    invokePushItems(context,item){ 
        //触发mutations里面的pushCollects ,传入数据形参item 对应到items
        context.commit('pushCollects',item);
    }
};
export default {
     namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
     state,
     getters,
     mutations,
     actions
}
//footerStatus.js
 
const state={   //要设置的全局访问的state对象
     showFooter: true,
     changableNum:0
     //要设置的初始属性值
   };
const getters = {   //实时监听state值的变化(最新状态)
    isShow(state) {  //承载变化的showFooter的值
       return state.showFooter
    },
    getChangedNum(){  //承载变化的changebleNum的值
       return state.changableNum
    }
};
const mutations = {
    show(state) {   
  //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.showFooter = true;
    },
    hide(state) {  //同上
        state.showFooter = false;
    },
    newNum(state,sum){ //同上，这里面的参数除了state之外还传了需要增加的值sum
       state.changableNum+=sum;
    }
};
 const actions = {
    hideFooter(context) {  
        //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        context.commit('hide');
    },
    showFooter(context) {  //同上注释
        context.commit('show');
    },
    getNewNum(context,num){   //同上注释，num为要变化的形参
        context.commit('newNum',num)
     }
};
export default {
    namespaced: true, //用于在全局引用此文里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}
```

这样一改就有了关于两个模块的state管理文件了 footerStatus.js和collection.js，现在你要运行当前的代码话，项目会报错！因为我们把上面的代码模块化分开了，引用的地方还没有改。接下来咱们一起来看看 mapState,mapGetters,mapActions的使用，首先 在需要用的 组件里面先导入 import {mapState,mapGetters,mapActions} from 'vuex';咱们先修正一下隐藏或显示页面底部的tabs选项卡（就是上面举的临时例子）的组件代码

```js
<template>
  <div id="app">
    <router-view/>
    <FooterBar v-if="isShow" />
  </div>
</template>
 
<script>
import {mapState,mapGetters,mapActions} from 'vuex'; //先要引入
import FooterBar from '@/components/common/FooterBar'
import config from './config/index'
export default {
  name: 'App',
  components:{
    FooterBar:FooterBar
  },
  data(){
    return {
    }
  },
  computed:{
    ...mapState({ 
        //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
         isShow:state=>state.footerStatus.showFooter 
        //注意这些与上面的区别就是state.footerStatus,
                                                     
        //里面定义的showFooter是指footerStatus.js里state的showFooter
      }),
     //你也可以用下面的mapGetters来获取isShow的值，貌似下面的更简洁
    /*...mapGetters('footerStatus',{ 
    //footerStatus指的是modules文件夹下的footerStatus.js模块
         isShow:'isShow' 
         //第一个isShow是我自定义的只要对应template里v-if="isShow"就行，
         //第二个isShow是对应的footerStatus.js里的getters里的isShow
      })*/
  },
  watch:{
      $route(to,from){
        if(to.name=='book'||to.name=='my'){
           this.$store.dispatch('footerStatus/showFooter') 
            //这里改为'footerStatus/showFooter',                        
            //意思是指footerStatus.js里actions里的showFooter方法
        }else{
           this.$store.dispatch('footerStatus/hideFooter') //同上注释
        }
      }
  }
}
</script>
```

现在项目代码应该就不会报错了，好,最后咱们再来看一下mapActions的用法，实际上上面的this.$store.dispatch('footerStatus/showFooter')已经算是一种执行相应模块的action里的方法了，但有时会牵扯的事件的触发及传值，那就会有下面的mapActions用法了,还记得上面的另一个模块collection.js吗？来看一下里面的actions中的方法结构：

```js
const state={
    collects:[],  //初始化一个colects数组
};
const getters={
  renderCollects(state){ //承载变化的collects
    return state.collects;
  }
};
const mutations={
     pushCollects(state,items){ //如何变化collects,插入items
        state.collects.push(items)
     }
 };
const actions={
    invokePushItems(context,item){ //触发mutations里面的pushCollects ,传入数据形参item 对应到items
        context.commit('pushCollects',item);
    }
};
```

需要传值来实时变动state.collects里的数据，那肯定要在执行它的地方进行传值了，所以下面用到它的地方我们用了个@click来执行这个invokePushItems方法了，并且传入相应的对象数据item,如下：

```js
<template>
  <div>
      <section class="joinState">
           <div class="joinStateHead">
                <span class="h3">全国改性料通讯录</span>
                <span class="joinStatus" @click="invokePushItems(item)">
                    加入收藏列</span>
           </div>
      </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  components:{
     conditionFilter
  },
  name: 'bookDetail',
  data () {
    return {
      msg: '',
      item:{
         id:'01',
         productName: '苹果',
         price:'1.6元/斤'
       }
    }
  },
  mounted() {
    this.$store.dispatch('footerStatus/hideFooter')
  },
  methods:{
      ...mapActions('collection',[ //collection是指modules文件夹下的collection.js
          'invokePushItems'  //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
      ])
  }

}
</script>
```

这样一来，在这个组件里面操作的 collecttion.js 中的state的数据，在其他的任何的一个组件里面都会得到相应的更新变化了，获取状态的页面代码如下：

```js
<template>
  </div>
    <div>
        <ul>
            <li v-for="(val,index) in arrList" :key="index">
                <h5>{{val.productName}}</h5>
                 <p>{{val.price}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex';
    export default {
        name: 'book',
        computed:{
        // ...mapState({  //用mapState来获取collection.js里面的state的属性值
        //    arrList:state=>state.collection.collects
        // }),
        ...mapGetters('collection',{ //用mapGetters来获取collection.js里面的getters
            arrList:'renderCollects'
        })

    }
}
</script>
```

## 原文链接

[Vuex用法详解](https://segmentfault.com/a/1190000015782272)