# BFC 详解

随着 CSS 的更新与发展，各大公司对于前端工程师 CSS 基本功的考察也越来越重视，其中对于 BFC 知识点的考察可谓是重灾区，那么本文就来简单介绍一下，BFC 是什麽。

在解释 BFC 是什么之前，我们先来了解一下什么是 Box、Formatting Context。

**Box**：CSS 布局中的基本單位

Box 是 CSS 布局的对象和基本单位，直观点解释，就是一个页面是由许许多多的 Box 组成的。元素的类型和 display 属性，决定了这个 Box 的类型。 不同类型的 Box ，会参与不同的 Formatting Context （一个决定如何渲染文档的容器），因此 Box 内的元素会以不同的方式渲染。那都有哪些盒子呢：

- **block-level box**

  ```
  box:display 属性为 block，list-item，table 的元素，会生成 block-level box。并且参与 block formatting context；
  ```

- **inline-level box**

  ```
  box:display 属性为 inline，inline-block，inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context；
  ```

- **run-in**

  ```
  box:display 属性为 run-in 的元素，会生成 run-in-level box.
  run-in 框的行为如下:
  1. 如果 run-in 框包含一个块框，那么 run-in 框变成块框。
  2. 如果 run-in 框的后继兄弟元素为块框（非浮动，非绝对定位），那么 run-in 框变为该块框的第一个行内框。run-in 不能插入本身为 run-in 的块中，也不能插入块中已有 run-in 的块中。
  3. 否则，run-in 框变为块框。
  浏览器支持： IE8+，chrome（unsupport）
  ```

**Formatting Context**

Formatting Context 是 W3C CSS2.1规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting Context 有 Block Formatting Context（简称 BFC）和 Inline Formatting Context（简称 IFC）。

CSS2.1 中 只存在 `BFC`和`IFC`，CSS3 中还增加了`GFC`和`FFC`。

## 什么是 BFC

BFC 全称为块级格式化上下文（Block Formatting Context）。BFC 是 W3C CSS2.1 规范中的一个概念，它决定了元素如何对其内容进行定位以及与其他元素的关系和相互作用，当涉及到可视化布局的时候，Block Formatting Context 提供了一个环境，HTML 元素在这个环境中按照一定规则进行布局。一个环境中的元素不会影响到其他环境的布局。比如浮动元素会形成 BFC，浮动元素内部子元素主要受该浮动元素的影响，两个浮动元素之间是互不影响的。这有点类似于 BFC 就是一个独立的行政单位一般。可以说 BFC 就是一个作用范围，把它理解成是一个独立的容器，并且这个容器里的 Box 的布局与这个容器外部的 Box 毫不相干。

## BFC 布局规则

> 1. 内部的 Box 会在垂直方向上，一个接一个的放置。
> 2. Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠。
> 3. 每个盒子的左外边缘（margin-left），会与容器的左外边缘（border-left）相接触（这是对于从左到右的格式化，否则相反）。即使存在浮动也是如此。
> 4. BFC 的区域不会与 float box 重叠。
> 5. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也是如此。
> 6. 计算 BFC 的高度时，浮动元素也参与计算。

## 如何触发 BFC

- 根元素或包含根元素的元素
- 浮动元素（元素的`float`不是`none`）
- 绝对定位元素（元素的`position`为`absolute`或`fixed`）
- 行内块元素（元素的`display`为`inline-block`）
- 表格单元格（元素的`display`为`table-cell`，HTML 表格单元格默认为该值）
- 表格标题（元素的`display`为`table-caption`，HTML 表格标题默认为该值）
- 匿名表格单元格元素（元素的`display`为`table`、`table-row`、`table-row-group`、`table-header-group`、`table-footer-group`（分别为 HTML table、row、tbody、thead、tfoot的默认属性）或`inline-table`）
- `overflow`值不为`visible`的块元素
- `display`值为`flow-root`的元素
- `contain`值为`layout`、`content`或`strict`的元素
- 弹性元素（`display`为`flex`或`inline-flex`元素的直接子元素）
- 网格元素（`display`为`grid`或`inline-grid`元素的直接子元素）
- 多列容器（元素的`cloumn-count`或`cloumn-width`不为`auto`包括`column-count`为`1`）
- `cloumn-span`为`all`的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中

## BFC 使用场景

- 防止垂直 margin 重叠
- 自适应两栏布局
- 清除浮动

### 防止垂直 margin 重叠

```html
<style>
    p {
        width: 200px;
        height: 100px;
        margin: 100px;
        background-color: #f00;
        color: #000;
    }
</style>
<body>
    <p></p>
    <p></p>
</body>
```

![](E:\code\web_blog\docs\blog\CSS相关\bfc\20190902162612.png)

两个 p 之间的距离为 100px，发生了 margin 重叠。

根据 BFC 布局规则第二条：

> Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠

我们可以通过在 p 标签的外部包裹一层容器，触发容器生成 BFC 来解决这个问题。这样两个 p 就不属于 同一个BFC，也就不会发生 margin 重叠了。

```html
<style>
    p {
        width: 200px;
        height: 100px;
        margin: 100px;
        background-color: #f00;
        color: #000;
    }
    div {
        overflow: hidden;
    }
</style>
<body>
    <div>
        <p></p>
    </div>
    <p></p>
</body>
```

![](E:\code\web_blog\docs\blog\CSS相关\bfc\20190902163212.png)

### 自适应两栏布局

```html
<style>
    body {
        width: 300px;
        position: relative;
        top: 100px;
        left: 100px;
    }
    .aside {
        width: 100px;
        height: 150px;
        float: left;
        background-color: #f00;
    }
    .main {
        width: 200px;
        height: 200px;
        background-color: #f0f;
    }
</style>
<body>
<div class='aside'></div>
<div class='main'></div>
</body>
```

![](E:\code\web_blog\docs\blog\CSS相关\bfc\20190902163609.png)

根据 BFC 布局规则第3条：

> 每个盒子的左外边缘（margin-left），会与容器的左边缘（border-left）相接触（这是对于从左往右的格式化，否则相反）。即使存在浮动也是如此。

因此，虽然存在浮动的元素 aside，但是 main 的左边依然会与包含块的左边相接触。

根据 BFC 布局规则第 4 条：

> BFC 的区域不会与 float box 重叠

我们可以通过触发 main 的 BFC 来实现自适应两栏布局。

```html
<style>
    body {
        width: 300px;
        position: relative;
        top: 100px;
        left: 100px;
    }
    .aside {
        width: 100px;
        height: 150px;
        float: left;
        background-color: #f00;
    }
    .main {
        overflow: hidden;
        width: 200px;
        height: 200px;
        background-color: #f0f;
    }
</style>
<body>
<div class='aside'></div>
<div class='main'></div>
</body>
```

当触发 main 生成 BFC 后，这个新的 BFC 不会与浮动的 aside 重叠。因此会根据包含块的宽度，和 aside 的宽度，自动变窄。效果如下：

![](E:\code\web_blog\docs\blog\CSS相关\bfc\20190902164204.png)

### 清除浮动

```html
<style>
   .parent {
       margin: 100px;
       width: 300px;
       border: 5px solid #f00;
   }
   .child {
       float: left;
       width: 100px;
       height: 100px;
       border: 1px solid #ff0;
       background-color: #f0f;
   }
</style>
<body>

<div class="parent">
    <div class="child"></div>
    <div class="child"></div>
</div>
```

![](E:\code\web_blog\docs\blog\CSS相关\bfc\20190902164901.png)

我们在使用浮动时，父级元素高度坍塌

根据 BFC 布局规则第 6 条：

> 计算 BFC 的高度时，浮动元素也参与计算

为达到清除内部浮动的目的，我们可以触发 parent 生成 BFC，那么 parent 在计算高度时，parent 内部的浮动元素 child 也会参与计算。

```html
<style>
   .parent {
       overflow: hidden;
       margin: 100px;
       width: 300px;
       border: 5px solid #f00;
   }
   .child {
       float: left;
       width: 100px;
       height: 100px;
       border: 1px solid #ff0;
       background-color: #f0f;
   }
</style>
<body>

<div class="parent">
    <div class="child"></div>
    <div class="child"></div>
</div>
```

![](E:\code\web_blog\docs\blog\CSS相关\bfc\20190902165220.png)

### 总结

其实上述例子均体现了 BFC 布局规则第五条：

> BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之亦如此。

因为 BFC 内部的元素和外部的元素绝对不会相互影响，因此，当 BFC 外部存在浮动时，它不应该影响 BFC 内部 Box 的布局，BFC 会通过变窄，而不与浮动有重叠。同样的，当 BFC 内部有浮动时，为了不影响外部元素的布局，BFC 计算高度时会包括浮动的高度。避免 margin 重叠也是一样的道理。

## 参考链接

[什么是BFC？](https://segmentfault.com/a/1190000018599869)

