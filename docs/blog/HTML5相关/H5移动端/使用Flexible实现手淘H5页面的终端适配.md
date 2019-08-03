# 使用Flexible实现手淘H5页面的终端适配

曾几何时为了兼容IE低版本浏览器而头痛，以为到了Mobile时代，就可以和这些麻烦事说再见了。可没想到，到了移动时代，为了处理各个终端的适配而乱了手脚。那么，**手淘的H5是如何实现多终端适配的**

## 目标

哪一个双十一的Mobile页面作案例，比如你实现一个类似下图的一个H5的页面：

![](./images/flexible/687474703a2f2f7777772e773363706c75732e636f6d2f73697465732f64656661756c742f66696c65732f626c6f67732f323031352f313531312f72656d2d312e6a7067.jpg)

目的明确，就是做一个这样的H5页面。

## 痛点

虽然H5页面比之PC端的Web页面简单了不少，但是让我们头疼的时要想尽一切办法让页面能够适配众多不同的终端设备。看看下图，你就会知道，这是一件多么痛苦的事情了：

![](./images/flexible/687474703a2f2f7777772e773363706c75732e636f6d2f73697465732f64656661756c742f66696c65732f626c6f67732f323031352f313531312f72656d2d342e706e67.png)

再来看看手淘H5要适配的终端设备数据：

![](./images/flexible/687474703a2f2f7777772e773363706c75732e636f6d2f73697465732f64656661756c742f66696c65732f626c6f67732f323031352f313531312f72656d2d372e706e67.png)

看到这些数据，是否死的心都有了，或者为此捏了一把汗。

## 手淘团队适配协作模式

早期移动端开发，对于终端设备适配的问题只属于Android系列，只不过很多设计师常忽略Android适配问题，只出一套IOS平台的设计稿。但随着IPhone6，IPhone6+的出现，从此适配问题不再只属于Android系列了，也就是从这时候开始让移动端适配全面进入到了`杂屏`时代。

![](./images/flexible/687474703a2f2f7777772e773363706c75732e636f6d2f73697465732f64656661756c742f66696c65732f626c6f67732f323031352f313531312f72656d2d31312e706e67.png)

为了应对这么多的终端设备，设计师和前端开发之间又应该采用什么协作模式呢？

而整个手淘设计师和前端开发的适配协作基本思路是：

- 选择一种尺寸作为设计和开发基准
- 定义一套适配规则，自动适配剩下的两种尺寸(其实不仅两种)
- 特殊适配效果给出设计效果

一图胜千言，下图是手淘团队适配协作模式：

![](./images/flexible/687474703a2f2f7777772e773363706c75732e636f6d2f73697465732f64656661756c742f66696c65732f626c6f67732f323031352f313531312f72656d2d362e6a7067.jpg)

在手淘的设计师与前端开发协作过程中：**手淘设计师常选择IPhone6作为基准设计尺寸，交付给前端的设计尺寸是按750px * 1334px 为准(高度会随着内容多少而改变)。前端开发人员通过一套适配规则自动适配到其他的尺寸。

根据上面所说，设计师给我们的设计图是一个750px * 1600px 的页面：

![](./images/flexible/687474703a2f2f7777772e773363706c75732e636f6d2f73697465732f64656661756c742f66696c65732f626c6f67732f323031352f313531312f72656d2d332e6a7067.jpg)

## 前端开发完成终端适配方案

拿到设计师给的设计图后，剩下的事情就是前端开发人员的事了。而经过手淘多年的摸索与实战，总结了一套移动端适配的方案-flexible方案。

首先，先来了解一些基本概念。

**一些基本概念**

- **视窗 viewport**

  简单的理解，viewport是严格等于浏览器的窗口。在桌面浏览器中，viewport就是浏览器窗口的宽度与高度。但在移动终端设备上会有点复杂。

  移动端的viewport太窄，为了能够更好地为CSS布局服务，所以提供了两个viewport:虚拟的viewport-**visualviewport**和布局的viewport-**layoutviewport**。

  而事实上，viewport 是一个很复杂的知识点。

- **物理像素(physical pixel)**

  物理像素又被称为设备像素，他是显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。正是这些设备像素的微小距离欺骗了我们肉眼看到的图像效果。

- **设备独立像素(density-independent pixel)**

  设备独立像素也称为密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如CSS像素)，然后由相关系统转换成物理像素。

- **CSS像素**

  CSS像素是一个抽象的单位，主要用在浏览器端，用来精确度量Web页面上的内容。一般情况下，CSS像素称为与设备无关的像素(device-independent pixel)，简称DIPs。

- **屏幕密度**

  屏幕密度是指一个设备表面上存在的像素数量，它通常以每英寸有多少像素来计算(PPI)。

- **设备像素比(device pixel ratio)**

  设备像素比简称为dpr，其定义了物理像素和设备独立像素的对应关系。它的值可以按下面的公式计算得到:

  ```js
  设备像素比 = 物理像素/设备独立像素
  ```

  在JavaScript中，可以通过window.devicePixelRatio获取当前设备的dpr。而在CSS中，可以通过-webkit-device-pixel-ratio，-webkit-min-device-pixel-ratio 和 -webkit-max-device-pixel-ratio 进行媒体查询，对不同dpr的设备，做一些样式适配(这里只针对webkit内核的浏览器和webview)。

  dip或dp(device independent pixels,设备独立像素)与屏幕密度有关。dip可以用来辅助区分视网膜设备还是非视网膜设备。

  综合上述概念，用一张图来解释：

  ![](./images/flexible/687474703a2f2f7777772e773363706c75732e636f6d2f73697465732f64656661756c742f66696c65732f626c6f67732f3230313231322f726574696e612d7765622d332e6a7067.jpg)

  众所周知，IPhone6的设备宽度和高度为375pt * 667pt，可以理解为设备的独立像素；而其dpr为`2`，根据上面公式，我们可以很轻松的获取设备的物理像素为750pt * 1334pt。

  如下所示，某元素的CSS样式:

  ```css
  width:2px;
  height:2px;
  ```

  在不同的屏幕上，CSS像素所呈现的物理尺寸是一致的，而不同的是CSS像素所对应的物理像素具数是不一致的。在普通屏幕下，`1`个CSS像素对应`1`个物理像素，而在Retina屏幕下，`1`个CSS像素对应的却是`4`个物理像素。

  看到这里，你能感觉到，在移动端时代屏幕适配除了Layout之外，还要考虑到图片的适配，因为其直接影响到页面显示的质量，对于如何实现图片的适配，如下图所示:

  ![](./images/flexible/687474703a2f2f7777772e773363706c75732e636f6d2f73697465732f64656661756c742f66696c65732f626c6f67732f3230313231322f726574696e612d7765622d31302e6a7067.jpg)

- **meta标签**

  < meta >标签有很多种，而这里要着重说的是viewport的`meta`标签，其主要用来告诉浏览器如何规范的渲染Web页面，而你则需要告诉它视窗有多大。在开发移动端页面时，我们需要设`meta`标签如下：

  ```html
  <meta name='viewport' content='width=device-width,initial-scale=1,maximum-scale=1'>
  ```

  代码以显示网页的屏幕宽度定义了视窗宽度。网页的比例和最大比例被设置为`100%`。

  留个悬念，因为后面的解决方案中需要重度依赖`meta`标签。

- **CSS单位rem**

  在W3C规范中是这样描述`rem`的：

  > font size of the root element.

  简单的理解，`rem`就是相对于根元素<html>的`font-size`来做计算的。而我们的方案中使用`rem`单位，是能够轻易地根据<html>的`font-size`计算出元素的盒模型大小。而这个特色对我们来说相当有益处。

**前端实现方案**

了解了前面的一些相关概念后，接下来看一看实际解决方案。在整个手淘团队中，有一个名为`lib-flexible`的库，而这个库就是用来解决H5页面终端适配的。

**lib-flexible是什么？**

`lib-flexible`是一个制作H5适配的开源库，可以[点击这里](https://github.com/amfe/lib-flexible/archive/master.zip)下载相关文件，获取需要的JS和CSS文件。

当然也可以直接使用阿里CDN：

```html
<script src='http://g.tbcdn.cn/mtb/lib-flexible/{{version}}/??flexible_css.js,flexible.js'></script>
```

将代码中的{{version}}换成对应的版本号0.3.4。

**使用方法**

`lib-flexible`库的使用方法非常的简单，只需要在Web页面的<head></head>中添加对应的`flexible_css.js,flexible.js`文件:

第一种方法是将文件下载到自己的项目中，然后通过相对路径添加:

```html
<script src='build/flexible_css.debug.js'></script>
<script src='build/flexible.debug.js'></script>
```

或者直接加载阿里CDN的文件:

```html
<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>
```

另外强烈建议对JS做**内联处理**，尽可能早的执行该文件，以便于将后需用到的库做适配。执行这个JS后，会在<html>元素上增加一个`data-dpr`属性， 以及一个`font-size`样式。JS会根据不同的设备添加不同的`data-dpr`值，比如说是`2`或者`3`，同时会给`html`加上对应的`font-size`的值，比如说是`75px`。

如此一来，页面中的元素，都可以通过`rem`单位来设置。他们会根据`html`元素的`font-size`值做相应的计算，从而实现屏幕的适配效果。除此之外，在引入`lib-flexible`需要执行的JS之前，可以手动设置`meta`来控制`dpr`值，如：

```html
<meta name='flexible' content='inital-dpr=2'/>
```

其中`initial-dpr`会把`dpr`强制设置为给定的值。如果手动设置了`dpr`之后，不管设备是多少`dpr`，都会强制认为其`dpr`为你手动设置的值。因此不建议在引入`flexible`库后手动设置`dpr`，因为在`flexible`中，支队IOS设备进行了`dpr`的判断，对于Android系列，始终认为其`dpr`的值为`1`。

```js
if(!dpr && !scale) {
    let isAndroid = win.navigator.appVersion.match(/android/gi)
    let isIPhone = win.navigator.appVersion.match(/iphone/gi)
    let devicePixelRatio = win.devicePixelRatio
    if(isIPhone) {
        // IOS下，对于2或者3的屏，yong2倍的方案，其余情况用1倍方案
        if(devicePixelRatio >=3 && (!dpr || dpr >=3)) {
            dpr = 3
        } else if(devicePixelRatio >=2 && (!dpr || dpr >=2)) {
            dpr = 2
        } else {
            dpr = 1
        }
    }else {
        // 除IOS外的其他设备，全部使用1倍方案
        dpr =1 
    }
    scale = 1/dpr
}
```

**flexible的实质**

`flexible`实际上就是通过JS来动态更改`meta`标签，代码类似于这样：

```js
let metaEL = document.createElement('meta')
let scale = isRetina ?.5:1
metaEl.setAttribute('name','viewport')
metaEl.setAttribute('content',`initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`)
if(document.firstElementChild) {
    document.documentElement.firstElementChild.appendChild(metaEl)
} else {
    let wrap = document.createElement('div')
    wrap.appendChild(metaEl)
    document.write(wrap.innerHTML)
}
```

​	事实上，它做了如下几件事情:

- 动态修改<meta>标签
- 给<html>元素添加`data-dpr`属性，并且动态改写`data-dpr`的值
- 给<html>元素添加到`font-size`属性，并且动态改写`font-size`的值

## 案例实战

了解flexible相关知识后，回到文章开头，目标是实现一个适配各个终端的H5页面。

**创建HTML模板**

```html
<!DOCTYPE html>
<html lang='en'>
    <head>
        <meta charset='utf-8'/>
        <meta content='yes' name='apple-mobile-web-app-capable'/>
        <meta content='yes' name='apple-touch-fullscreen'/>
        <meta content='telephone=no,email=no' name='format-detection'/>
        <script src='http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js'></script>
        <link rel='apple-touch-icon' href='favicon.png' />
        <link rel='Shortcut Icon' href='favicon.png' type='image/x-icon' />
        <title>xx</title>
    </head>
    <body>
        <!-- 页面结构 -->
    </body>
</html>
```

正如之前所介绍的一样，优先加载flexible所需的配置：

```html
<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>
```

这个时候可以根据设计图的需求，在HTML文档中的<body></body>中添加对应的HTML结构，比如:

```html
<div class='item-section' data-repeat='sections'>
    <div class='item-section_header'> 
        <h2>
            <img src='{bannerImg}' alt='' />
        </h2>
    </div>
    <ul>
        <li data-repeat='items' class='flag' role='link' href='{itemLink}'>
        	<a class='figure flag-item' href='{itemLink}'>
            	<img src='{imgSrc}' alt='' />
            </a>
            <div class='figcaption flag-item'>
                <div class="flag-title">
                    <a href="{itemLink}" title="">{poductName}</a>
                </div>
                <div class="flag-price">
                    <span>双11价</span>
                    <strong>¥{price}</strong>
                    <small>({preferential})</small>
                </div>
                <div class="flag-type">{activityType}</div>
                <a class="flag-btn" href="{shopLink}">{activeName}</a>
            </div>
        </li>
    </ul>
</div>
```

这仅仅是一个示例文档，大家可以根据自己风格书写。

为了更好的测试页面，给其配置一些假数据：

```js
// define data 
let pageData = {
    sections:[{
        "brannerImag":"http://xxx.cdn.com/B1PNLZKXXXXXaTXXXXXXXXXXXX-750-481.jpg",
        items:[{
            "itemLink": "##",
            "imgSrc": "https://placeimg.com/350/350/people/grayscale",
            "poductName":"Carter's1年式灰色长袖连体衣包脚爬服全棉鲸鱼男婴儿童装115G093",
            "price": "299.06",
            "preferential": "满400减100",
            "activityType": "1小时内热卖5885件",
            "shopLink":"##",
            "activeName": "马上抢！"
        }
    }]
}
```

接下来就是美化工作了。在写具体样式之前，需要先了解几点。

**把视觉稿中的px转换成rem**

读到这里，大家应该都知道，我们接下来要做的事情，就是如何将视觉稿中的`px`转换成`rem`。

首先，目前日常工作中，视觉设计师给到前端开发人员手中的视觉稿尺寸一般是基于`640px、750px`以及`1125px`宽度为基准的。至于为什么，是为了考虑Retina屏。

正如文章开头的示例设计稿，它就是一张以`750px`为基准设计的。那么问题来了，我们如何将设计稿中的`px`转换成`rem`。

![](./images/flexible/687474703a2f2f7777772e773363706c75732e636f6d2f73697465732f64656661756c742f66696c65732f626c6f67732f323031352f313531312f72656d2d382e706e67.png)

目前，`flexible`会将视觉稿分成**100份**(主要是为了以后能够更好的兼容vh和vw)，而每一份被称为一个单位`a`。同时`1rem`单位被认定为`10a`。针对我们的这份视觉设计稿可以计算出:

```css
1a = 7.5px
1rem = 75px
```

那么我们这个示例的稿子就分成了`10a`，也就是整个宽度为`10rem`，<html>对应的`font-size`为`75px`:

![](./images/flexible/687474703a2f2f7777772e773363706c75732e636f6d2f73697465732f64656661756c742f66696c65732f626c6f67732f323031352f313531312f72656d2d322e6a7067.jpg)

这样一来，对于视觉稿上的元素尺寸换算，只需要原始的`px`值➗`rem基准值`即可。例如此例视觉稿中的图片，其尺寸是`176px * 176px`,转换之后称为`2.34667rem * 2.34667rem`。

**如何快速计算rem**

在实际生产过程中，如果每一次计算`px`转换成`rem`，或许会觉得比较麻烦，获取会直接影响到开发效率。为了使开发人员有更好的开发体验，人们各施所长，开发了许多`px`转`rem`的小工具。

**CSSREM**

CSSREM是一个CSS的`px`值转`rem`值的Sublime自动完成的插件。先来看看插件的效果：

![](./images/flexible/687474703a2f2f7777772e773363706c75732e636f6d2f73697465732f64656661756c742f66696c65732f626c6f67732f323031352f313531312f63737372656d2e676966.gif)

**CSS处理器**

除了使用编辑器插件外，还可以使用CSS的处理器来帮助开发人员处理。比如Sass，Less以及PostCss这样的处理器。如下是几个简单例子：

**Sass**

使用Sass的开发人员，可以使用Sass的函数、混合宏等功能来实现:

```css
@function px2rem($px,$base-font:16px) {
    @if (unitless($px)) {
        @warn 'Assuming #{$px} to be in pixels, attempting to convert it into pixels for you'
        @return px2rem($px+0px)
            } @else if (unit($px) == em) {
                @return $px
    } 
    @return ($px/$base-font)  *1em
}
```

除了使用Sass函数外，还可以使用Sass混合宏：

```css
@mixin px2rem($property,$px-values,$baseline-px:16px,$support-for-ie:false){
    //Conver the baseline into rems
    $baseline-rem: $baseline-px / 1rem * 1;
    //Print the first line in pixel values
    @if $support-for-ie {
        #{$property}: $px-values;
    }
    //if there is only one (numeric) value, return the property/value line for it.
    @if type-of($px-values) == "number"{
        #{$property}: $px-values / $baseline-rem;
    }
    @else {
        //Create an empty list that we can dump values into
        $rem-values:();
        @each $value in $px-values{
            // If the value is zero or not a number, return it
            @if $value == 0 or type-of($value) != "number"{
                $rem-values: append($rem-values, $value / $baseline-rem);
            }
        }
        // Return the property and its list of converted values
        #{$property}: $rem-values;
    }
}
```

**PostCSS(px2rem)**

除了Sass这样的CSS处理器以外，还有一款npm的工具px2rem。安装好px2rem后，可以在项目中直接使用。也可以使用PostCSS。使用PostCSS插件-postcss-px2rem:

```js
let gulp = require('gulp')
let postcss = require('gulp-postcss')
let px2rem = require('postcss-px2rem')

gulp.task('default',()=>{
    let processors = [px2rem({remUnit:75})]
    return gulp.src('./src/*.css')
    		  .pipe(postcss(processors))
    		  .pipe(gulp.dest('./dest'))
})
```

除了在Gulp中配置外，还可以使用其他的配置方式。

配置完成之后，在实际使用中，你只要像下面这样使用：

```css
.selector {
    width:150px;
    height:64px; /*px*/
    font-size:28px; /*px*/
    border:1px solid #ddd; /*no*/
}
```

px2rem处理后将会变成:

```css
.selector {
    width: 2rem;
    border: 1px solid #ddd;
}
[data-dpr="1"] .selector {
    height: 32px;
    font-size: 14px;
}
[data-dpr="2"] .selector {
    height: 64px;
    font-size: 28px;
}
[data-dpr="3"] .selector {
    height: 96px;
    font-size: 42px;
}
```

在整个开发中有了这些工具后，完全不用担心`px`值转`rem`影响开发效率。

**文本字号不建议使用rem**

前面大家都见证了如何使用`rem`来完成H5适配。那么文本又将如何处理适配？是不是也通过`rem`来自动完成适配？

显然，我们在IPhone3G和IPhone4的Retina屏下面，希望看到的文本字号是相同的。也就是说，**我们不希望文本在Retina屏幕下变小**,另外，我们**希望在大屏手机中看到更多的文本**，以及，现在绝大多数的字体文件都自带一些点阵尺寸，通常为`16px`和`24px`，所以我们**不希望出现13px和15px这样的奇葩尺寸**。

如此一来，就决定了在制作H5的页面中，`rem`并不适合用到段落文本上。所以在`flexible`整个适配方案中，考虑文本还是使用`px`做单位，只不过使用`[data-dpr]`属性来区分不同`dpr`下的文本字号大小。

```css
div {
    width:1rem;
    height:.4rem;
    font-size:12px; // 默认写dpr为1的fontSize
}
[data-dpr='2'] div {
    font-size:24px;
}
[data-dpr='3'] div {
    font-size:36px;
}
```

为了能更好的利于开发，在实际开发中，我们可以制定一个font-dpr()这样的Sass混合宏：

```css
@mixin font-dpr($font-size) {
    font-size :$font-size;
    [data-dpr='2'] & {
        font-size:$font-size * 2
    }
    [data-dpr='3'] & {
        font-size:$font-size * 3
    }
}
```

有了这样的混合宏后，在开发中就可以直接使用:

```css
@inclue font-dpr(16px)
```

当然这只是针对描述性文本，比如说段落文本。但有的时候文本的字号也需要分场景，比如在项目中有一个slogan，业务方面希望这个slogan能根据不同的终端适配。针对这样的场景，完全可以使用rem给slogan做计量单位。

**CSS**



## 效果

最后来看看真机中显示的效果。

**IPhone4**

![](./images/flexible/687474703a2f2f7777772e773363706c75732e636f6d2f73697465732f64656661756c742f66696c65732f626c6f67732f323031352f313531312f72656d2d392e6a7067.jpg)

**IPhone6+**

![](./images/flexible/687474703a2f2f7777772e773363706c75732e636f6d2f73697465732f64656661756c742f66696c65732f626c6f67732f323031352f313531312f72656d2d31302e706e67.png)

## 总结

其实H5适配的方案有很多种，网上有关于这方面的教程也非常的多。不管哪种方法，都有其自己的优势和劣势。而本文主要介绍的是如何使用Flexible这样的一库来完成H5页面的终端适配。为什么推荐使用Flexible库来做H5页面的终端设备适配呢？主要因为这个库在手淘已经使用了近一年，而且已达到了较为稳定的状态。除此之外，你不需要考虑如何对元素进行折算，可以根据对应的视觉稿，直接切入。

## 原文链接

[使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)