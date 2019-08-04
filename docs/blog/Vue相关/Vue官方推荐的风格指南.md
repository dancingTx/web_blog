# Vue官方推荐的风格指南

![](./images/3534079505-5b3b32c4aacc3_articlex.png)

> 一共按照优先级分4类：

- **优先级A：必要的** 为了规避错误，这种代码风格是必须的
- **优先级B：强烈推荐** 增加项目的可读性和开发体验
- **优先级C：推荐** 有时可能同时有几种不错的选择。需要注意：前后一致、理由充分
- **优先级D：谨慎使用** 为了该有潜在风险的代码敲个警钟。

## 优先级A的code style

这些推荐，必须遵守。如果不这么做，基本要造成性能低或可维护性差的问题

- vue组件名称推荐由多个单词构成
- 组件data数据推荐用函数return
- props推荐更加详细的定义type/default/require等
- v-for推荐有配套的:key
- v-for和v-if避免同在一起
- vue组件样式推荐设置作用域
- 自定义的私有属性，推荐$_ + 命名空间作为前缀

下面是每一条风格指南的推荐理由，我觉得需要在意的，用**粗体标注**

> vue组件名称推荐由多个单词构成

```
为了避免vue组件名和未来html元素的名称重复。因为html的标签都是单个单词
```

> 组件data数据推荐用函数return

```
除了根组件之外，其他的vue组件很可能被复用，如果data是{},那么这些组件的数据会互相影响。
但是我们希望每一个组件，即便是被复用的组件，每个组件的data都应该是独立的状态
```

> props推荐用更加详细的定义

```js
//很好理解，详细的约定肯定比简写的约定更可靠。
props: {                     // 推荐
    name : {
        type: String,
        default: 'ziwei',
        required: true
    }
}
props: ['name']              // 不推荐
```

> v-for推荐配套的:key

```
为了更加高效的渲染dom。vue有“就地复用”的策略。
比如一个列表的数据没变，只是顺序发生了改变。如果所有列表的dom重新渲染就很“浪费”
但是通过唯一的:key复用之前的dom的话，性能就好很多。
```

> v-for和v-if避免使用在同一个组件里

```
这里推荐看文档，例子和解释都很清晰。v-for和v-if同时出现的话，先v-for，后v-if
有v-for和v-if同时写到li上的情况有2种：
- 如果是希望控制ul的显示/隐藏，推荐放到ul上，而不是li上。这样“节省”了li的渲染
- 如果是因为根据条件控制部分li的显示/隐藏，建议用把ul数据对象改成计算属性。
```

> vue组件样式推荐设置作用域

```
可以使用scoped和css module。但是两者还是有一些区别的。
scoped被设计的初衷是不能让当前组件的样式，影响其他组件的样式。所以你写组件库，不要用scoped
css moudle是利用命名空间和hash来保证作用域
```

关于两者区别的链接

[https://juejin.im/post/5a1c06...](https://juejin.im/post/5a1c0640f265da4335627c6a)
[https://www.jb51.net/article/...](https://www.jb51.net/article/140373.htm)

关于css选择器对渲染性能的影响

[https://www.jianshu.com/p/268...](https://www.jianshu.com/p/268c7f3dd7a6)

> 自定义的私有属性，推荐$_ + 命名空间作为前缀

```
我理解这里，就是如果你要第三方插件或者，要自定义vue属性时。
vue给你推荐了一种命名空间，比如这样定义 $_myUtils_sayHi
```

## 优先级B的code style

- 能用.vue写的组件，尽量不同vue.component
- vue组件命名，用PascalCase或者短横线，风格保持统一。
- 基础组件命名，以Base前缀开头，以显示其通用性
- 单例组件命名，以The前缀开头，以显示其独特性
- 紧密耦合的组件命名。比如紧密耦合的父子组件，子组件以父组件名称为前缀
- 组件命名单词的顺序。先名词后形容词
- 自闭合组件的写法。如果有编译器的vue用自闭合写法，以显示没有传入属性
- 不同模板中vue命名大小写。如果有编译器的话PascalCase,否则用短横线命名
- JS/JSX中始终用PascalCase组件命名
- 组件命名单词应该是完整的单词
- props的命名方式，最自然的方法。JS里用驼峰命名，html里用短横线
- vue组件有多个属性，分多行来写更加清晰易读
- 模板里复杂逻辑用计算属性或者method
- 复杂的计算属性或者method，拆分成多个
- html模板的属性推荐用双引号的
- 指令缩写要么不写，要么都用缩写

下面是每一条风格指南的推荐理由,我觉得需要在意的，用**粗体标注**

> 能用.vue写的组件，尽量不同vue.component

```
好理解，vue单文件组织代码，是官方推荐的最佳实践，基本都是这样用
```

> vue组件名称，用PascalCase或者短横线，风格保持统一

```js
这个可以注意下，PascalCase是类似OrderSku.vue这种命名风格
我之前经常用驼峰命名vue组件
```

> 基础组件命名，以Base前缀开头，以显示其通用性

```js
BaseHeader.vue
BaseContent.vue
BaseFooter.vue
// 这类风格，通过名字，可以理解它是通用基础组件
```

> 单例组件命名，以The前缀开头，以显示其独特性

```js
类似设计模式里的单例模式，就是这个vue组件只在一个页面出现一次。

TheSideBar.vue这种名字，可以表示它是独一无二的不可复用的组件

如果某个组件只是在每个页面最多用了一次，并且没有props。就是不可复用组件，用The前缀命名。
```

> 紧密耦合的组件命名。比如紧密耦合的父子组件，子组件以父组件名称为前缀

```js
MainOrder.vue
MainOrderItem.vue

// 类似这种紧密耦合的父子组件，子组件把父组件的名字作为前缀。
// 这样这样可以通过名称，显示他们的耦合关系，并且在编辑器里也很好找到
```

> 组件命名单词的顺序。先名词后形容词

```js
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue

|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputExcludeGlob.vue
|- SearchInputQuery.vue
|- SettingsCheckboxLaunchOnStartup.vue
|- SettingsCheckboxTerms.vue

// 大概可以感受到吧，我理解是因为编辑器的默认排序是按照字母排序。这样方便我们找到相似的文件
```

> 自闭合组件的写法。

```js
<App />
自闭合组件是vue推荐的写法。自闭合可以表示组件没有任何属性
但是如果你用的是没有编译器的vue版本，也就是不用.vue的话，那么html里不支持自定义属性的自闭合写法。
所以这种情况下，只能用短横线写法
```

> 不同模板中vue命名大小写。如果有编译器的话PascalCase,否则用短横线命名

```
类似的，SkuOrder.vue这类PascalCase命名规则是vue推荐的
但是如果是没有编译器的vue版本，在html里大小写不敏感，你只能用短横线命名。
```

> JS/JSX中始终用PascalCase组件命名

```js
因为官方推荐PascalCase风格命名，所以能用就用
```

> 组件命名单词应该是完整的单词

```js
完整单词带易读性的好处，和书写麻烦的缺点。
但是编辑器的智能提示已经解决了写长单词的麻烦了,所以还是推荐用完整单词
```

> props的命名方式

```js
props: {
  greetingText: String
}
<WelcomeMessage greeting-text="hi"/>

最自然的方法。JS里用驼峰命名，html里用短横线。这个要注意，我之前很随意
```

> vue组件有多个属性，分多行来写更加清晰易读

```js
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
好理解，分多行写的话易读性更强，这个我之前没注意
```

> 模板里复杂逻辑用计算属性或者method (很好理解，就不解释了)
>
> 复杂的计算属性或者method，拆分成多个 (很好理解，就不解释了)
>
> html模板的属性推荐用双引号的

```
这个注意下，我之前很不喜欢在html里写“”，因为我觉得双引号容易让人误以为是string

但是官方推荐用引号，说是在有空格的情况下，可能缩进不正常，影响易读性。所以乖乖听话就完事了
```

> 指令缩写要么不写，要么都用缩写

```
注意保持风格统一，要么不写，要么都写
```

## 优先级C的code style （推荐看文档）

推荐看文档，因为文档推荐了顺序，但是大部分选型我都不常用，所以我只给自己常用的的选项排序

- 组件实例选项的顺序
- 元素特性的顺序
- 组件实例选项，之间添加一个空行
- 单文件组件的顶级元素的组织顺序

> 组件实例选项的顺序

```
- components
- filters
- data
- compouted
- watch
- 所有的生命周期钩子
- methods
```

> 元素特性的顺序

```j&#39;s
- v-for
- v-if / v-show
- id
- ref / key / slot
- v-model
- v-on
```

> 组件实例选项之间，建议加一个空格
>
> 单文件组件，顶级元素的顺序

```js
<template>
<script>
<style>

按照这个顺序组织代码就可以。注意style只能在最下面，script和template至少要有一个
```

**优先级D的，需要慎用code style （推荐看文档）**

- 如果一组 v-if + v-else 的元素类型相同，最好使用 key (比如两个 <div> 元素)。

```
默认情况下，Vue 会尽可能高效的更新 DOM。这意味着其在相同类型的元素之间切换时，会修补已存在的元素，而不是将旧的元素移除然后在同一位置添加一个新元素。如果本不相同的元素被识别为相同，则会出现意料之外的副作用。
```

- scoped 中的元素选择器

```
大量使用scoped里的元素 + 自定义属性选择器，性能会慢一些。

所以尽量用class
```

- 隐性的父子组件通信

```
应该优先通过 prop 和事件进行父子组件之间的通信，而不是 this.$parent 或改变 prop。
```

- 非 Flux 的全局状态管理

```
没什么好说的，就是推荐用vuex，而不是eventbus,我觉得还是看具体情况
```

## 原文链接

[Vue官方推荐的风格指南](https://segmentfault.com/a/1190000015465173)