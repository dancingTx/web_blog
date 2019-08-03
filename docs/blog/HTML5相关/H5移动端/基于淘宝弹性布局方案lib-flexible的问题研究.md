# 基于淘宝弹性布局方案lib-flexible的问题研究

`lib-flexible`从某种意义上解决了移动端多端适配的问题，但同时，这种适配方案也存在着无法改变的缺陷。

`lib-flexible`在做适配的时候会修改`viewport`的`initial-scale`，导致`viewport`的`width`不等于`device-width`，使得那些根据`width`编写的`media query`不一定如预期一般执行，还有移动端Web经典的`Retina`屏问题和`1px`边框问题在`lib-flexible`下也会于通常的做法有所差异，接下来就根据问题提供一些解决办法及思路。

## 1.lib-flexible不能与响应式布局兼容

先说说响应式布局的一些基本认识：

响应式布局的表现是：网页通过CSS媒介查询判断可视区域的宽度，在不同的范围应用不同的样式，以便在不同尺寸的设备上呈现最佳的界面效果。经典的例子是，有一个商品列表页，应用响应式布局后，可能在PC端采用4列布局展示，在平板上可能采用3列布局展示，在手机上只需要1列布局展示。这种布局的最大好处在于节省人力、资源和时间，因此很多公司都喜欢采用此种方案。而响应式布局有两个必要条件：

- 1.是`viewport`的设置，`width`跟`initial-scale`要采用如下配置，保证`viewport`的宽度和`device-width`一致：

  ```html
  <meta name='viewport' content='width=device-width,initial-scale=1' />
  ```

- 2.是要利用`media query`，针对不同的`width`范围，编写不同的CSS,比如`bootstrap`:

  ```css
  @media (max-width: @screen-xs-max) { ... }
  @media (min-width: @screen-sm-min) and (max-width: @screen-sm-max) { ... }
  @media (min-width: @screen-md-min) and (max-width: @screen-md-max) { ... }
  @media (min-width: @screen-lg-min) { ... }
  ```

需要注意的是，第1个要求提到的`device-width`与`media query`里面的`device-width`属性表达的意思有些区别：第1个要求提到的`device-width`在移动设备下指的是设备的宽度，但是在PC下指的是浏览器的可视区域宽度，比如下面的网页，我把浏览器窗口缩小，然后可以看到`viewport`里尽管已经把`width`设置成了`device-width`，但是网页大小却不是我的桌面分辨率宽度(设备宽度)：

![](./images/querstion/459873-20160109212430184-426453882.png)

`media query`里的`device-width`属性，始终指的是设备的宽度。所以响应式布局的媒介查询要用`width`属性，不用`device-width`属性，因为在桌面设备下，把浏览器窗口缩小的时候，`device-width`并不会发生变化，当调整浏览器窗口大小就看不到响应式的效果。

再来看看`lib-flexible`的特点：

`lib-flexible`在适配的时候会修改`viewport`的`initial-scale`,导致`viewport`的`width`不等于`device-width`。这是采用`lib-flexible`，在IPhone6+下适配后，自动添加的`viewport`设置代码：

```html
<meta name='viewport' content="initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no" />
```

在这个`viewport`的作用下，网页的缩放系数为`0.3333333333333333`，IPhone6+的`device-width`为`414`个不缩放的CSS像素，经过缩放后，`viewport`的`width`等于`device-width / 0.3333333333333333`，为`1241`个缩放后的CSS像素，远远大于`device-width`：

![](./images/querstion/459873-20160109212432325-1240238690.png)

假如你的网页想同时使用响应式布局和`lib-flexible`,然后你写了一个媒介查询，需要在`1024px`以上的分辨率(桌面设备)呈现某个特殊样式：

```css
@media only screen and (min-width: 1024px) {
    body {
        border: 10px solid #ccc;
    }
}
```

会发现这个页面在IPhone6+下也会应用到该媒介查询的样式：

![](./images/querstion/459873-20160109212433840-1706265521.png)

究其原因：IPhone6+下的网页由于`lib-flexible`的作用，导致页面的`width`与实际物理分辨率的宽相等，也就是`1241`个像素，完全达到了该媒介查询的范围。

所以，在使用`lib-flexible`的项目里很难再实现响应式布局，要是有人有这种综合两者一起使用的想法，可得注意了。实际上，这两种方案本质性的东西就不相同，使用场景也不相同。响应式布局的目的是一套代码，能够在手机平板和PC上都有良好的表现，适用于网站类项目，而`lib-flexible`解决的是手机端网页适配的问题，压根不会去关心平板和PC的表现，适用于`web app`类项目。

## 2.1px边框在`lib-flexible`下如何处理

`web app`有时候会设计出一些特别细的线条或者边框，如果我们直接通过CSS设置边框为`1px`:

```css
border:1px solid #ccc;
```

结果会发现这种边框在手机中看起来的效果，会显得特别粗，之所以会出现这种结果，原因也很简单，因为目前市场大部分手机的分辨率较高，一个CSS像素，比如，上述代码为`1px`，可能相当于`2`个甚至是`3`个物理分辨率像素，而不像PC端，一个CSS像素，始终等于 `1`个物理分辨率像素，所以手机里看到的`1px`会比实际的粗。

为了解决这个问题，你可能会想到用`0.5px`来代替`1px`，不过这个解决不了问题，而且带小数的像素在不同的浏览器下表现不尽相同，要尽量避免。

那么通常来说在`web app`下显示`1px`的做法是怎么样的呢？在`weui`源码中有一个较好的办法，值得分享：

```css
//这是一个mixin，用来设置顶部的边框，其它方向的代码没有贴出
.setTopLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid @c;
    transform-origin: 0 0;
    transform: scaleY(0.5);
}

//应用举例
.weui_cell {
    // onepx
    position: relative;
    &:before {
        .setTopLine(@weuiCellBorderColor);
    }
}
```

这个办法并不是利用`border`属性来显示边框，而是利用了伪类和`transform`，最妙的是这个`transform`，`0.5px`办不到的事情，它却可以办到。

由于`lib-flexible`在适配的时候，会缩放网页，导致CSS代码中的`1px`等于物理分辨率的`1px`，这样子这个`1px`边框的问题在经过`lib-flexible`适配的设备下就很好解决了，直接应用`border:1px solid xxx`即可。但是**lib-flexible目前只适配了iPhone设备，安卓设备压根没做适配**。

![](./images/querstion/459873-20160109212435231-1310836847.png)

通过源码可以看出，Android设备的`dpr`全部设置为`1`，因此也导致了在Android设备下，`1px`的边框问题依然存在。所以为了`lib-flexible`的项目里解决掉`1px`问题，就需要综合上述两种做法：

```css
.setTopLine(@c: #C7C7C7) {
  & {
    position: relative;
  }

  &:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid @c;
  }

  [data-dpr="1"] &:before {
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
}
/*照着这个可以再写setBottomLine等相关mixin*/
```

通过两种方案的混合，经过测试，在`devicePixelRatio`为`3`的`meilan note`上，显示出的线条非常细腻，看起来比较舒服，IPhone上的表现也很不错，以下是`meilan note`测试截图：

![](./images/querstion/459873-20160109212436075-1504512633.jpg)

第一根线是上面的`mixin`效果；第二根线是直接使用`border:1px solid xxx;`的效果。

以上提到的`1px`边框的做法有三个缺陷，在使用时需要注意：

- 他会占用掉`before`伪类
- 没办法做圆角
- 很难实现多条边框，除非嵌套，或者再利用上`after`伪类

尽管如此，以上做法还算是比较有用的做法，因为这种细线边框属于比较特殊的设计要求，并不是每处边框都需要做成这样，在开发`web app`的时候用这个方法保证特殊线条的设计要求，其它的边线，我觉得直接用`border`并没有关系，你可以直接用你的手机打开`bootstrap`的官方页面，看它里面的按钮边框，效果都还不错。

## 3. lib-flexible如何处理retina屏下的background-image

几年之前，`Retina`屏，也就是所谓的高清屏，还不像现在这么普遍，12年我买的第一个安卓机是华为u8825d，分辨率只有`480*800`，而且当时市面上大部分安卓机基本上都是这个分辨率，像IPhone4那种`640*960`级别的机子很少，为了解决普通背景图片在IPhone4下显示模糊的问题，基本都是采用这种做法：

```css
.css{/* 普通显示屏(设备像素比例小于等于1.3)使用1倍的图 */ 
    background-image: url(img_1x.png);
}
@media only screen and (-webkit-min-device-pixel-ratio:1.5){
.css{/* 高清显示屏(设备像素比例大于等于1.5)使用2倍图  */
    background-image: url(img_2x.png);
  }
}
```

估计当时应该是`320`的设计稿，`img_1x.png`是在`320`设计稿下切出的图，然后`img_2x.png`是在`320`设计稿矢量放大`2`倍后切出的图，高清屏显示`img_2x.png`，这样就能解决当时IPhone4背景图片模糊的问题。

时至今日，手机都是走高配置，低价格的发展路线，`480*800`这种级别的机子，市面上越来越少，大部分手机的分辨率级别都达到了IPhone4的标准，比iphone4的清晰级别更高的手机也越来越多，一个800块的魅蓝note，它的`devicePixelRatio`都已经达到了3，原先解决`background-image`问题的方法，需要调整一下才能适用于现在：

```css
.css{/* 普通显示屏(设备像素比例小于等于2)使用2倍的图 */ 
    background-image: url(img_2x.png);
}
@media only screen and (-webkit-min-device-pixel-ratio:2.1){
.css{/* 高清显示屏(设备像素比例大于等于2.1)使用3倍图  */
    background-image: url(img_3x.png);
  }
}
```

代码中的`2x`和`3x`是相当于`320`的设计稿而言的，`2x`代替了原先的`1x`，`3x`代替了原先的`2x`。现在的设计稿也不再是`320`，而是`640`，`2x`就是在`640`下切出的图，`3x`是在`640`基础上矢量放大`1.5`切出的图。在这个代码的作用下，分辨率在`640`以下的设备都会显示`2x`的图，由于`2x`的图本身是在`640`的设计稿切出的，所以这些设备下不会有模糊的现象，在`640`以上的分辨率，会显示`3x`的图，由于`3x`的图是在`960`的分辨率下切出的，所以这种图在分辨率小于`960`的设备下都不会模糊。以前`1x`的情况根本不用再考虑了，以后不会再有需要`1x`图的设备，说不定过几年，市面上的手机全是`devicePixelRatio`在`2.5`以上的标准时，连`2x`的情况也不用考虑了。

`lib-flexible`在IPhone6推出之后，把设计稿的尺寸提高到了`750`，切图时还是按`2x`和`3x`的方法来切，这样的话，经过`lib-flexible`适配的设备，分辨率在`750`以下都会显示`2x`的图，肯定不会模糊；分辨率在`750`以上的设备，会显示`3x`的图，也不会出现模糊。不过由于`lib-flexible`只适配了IPhone的问题，所以我上篇博客中提到的用`data-dpr`来显示不同的图片的做法是错误的，因为有些安卓机，比如我的魅族note，`devicePixelRatio`是`3`，打开`app`页面，看到的图片却仍然还是`2x`的，显然达不到适配的要求，所以不能用`data-dpr`去适配，而应该采用下面这个做法：

```css
.retina-image(@background-image) {
  background-image: url("../img/@2x/@{background-image}?v=@@version");
  background-size: 100% 100%;
  background-position:left top;

  @media only screen and (-webkit-min-device-pixel-ratio: 2.5),
  only screen and (min--moz-device-pixel-ratio: 2.5), /* 注意这里的写法比较特殊 */
  only screen and (-o-min-device-pixel-ratio: 5/2),
  only screen and (min-device-pixel-ratio: 2.5),
  only screen and (min-resolution: 240dpi),
  only screen and (min-resolution: 2.5dppx) {
    & {
      background-image: url("../img/@3x/@{background-image}?v=@@version") !important;
    }
  }
  //1dppx = 1devicePixelRatio, 1dppx = 96dpi.
}
```

这个代码的最终效果是：

- `devicePixelRatio`大于等于2.5的设备都会应用到`3x`图

- 其它设备都会应用到`2x`的图。

这个方法，在`chrome`的模拟器里测试过很多机型，效果不错，**不过它只适用于不使用雪碧图的背景图片**，如果要在`lib-flexible`的项目里使用雪碧图作背景图片，同时又要考虑`retina`屏的话，需要将上面这个方法稍微改动一下。

首先看下不使用`lib-flexible`时，雪碧图背景在`retina`下是怎么做的，以腾讯的一个活动页面来说明[点击这里](http://qzs.qq.com/qzone/qzact/act/qzapp/qzone5.0/mobile/index.html)，这是它在使用`1x`的雪碧图时某个元素的`background`的样式：

![](./images/querstion/459873-20160109212437465-2044438147.png)

这是它在使用`2x`的雪碧图时某个元素的`background`的样式：

![](./images/querstion/459873-20160109212439371-1665206951.png)

总结下它这个做法：

- 先把设计稿切出的图，合并成一张雪碧图，腾讯这个例子的设计稿是`320`的，所以它的切图都是`1x`的，这张雪碧图也就是`1x`的，大小为`643 * 152`

- 设计稿放大`2`倍，切图合并成一张`2x`的雪碧图，大小为`1286 * 304`

- 普清屏下只应用`background-image`和`background-position属性，设置`1x`雪碧图作为背景，代码参考截图

- 高清屏下除了应用background-image和background-position属性，还要应用background-size属性，并且这个`background-size`的大小要设置为`1x`雪碧图的大小，`background-position`的值要与（3）里配置的值相同，代码参考截图。

如果把它做成一个`mixin`的话应该是类似这样的：

```css
.retina-image(@background-image,@background-pos-x,@background-pos-y,@background-size-x,@background-size-y) {
  background-image: url("../img/@1x/@{background-image}?v=@@version");
  background-position:@background-pos-x @background-pos-y;

  @media only screen and (-webkit-min-device-pixel-ratio: 1.25),
  only screen and (min-resolution: 120dpi),
  only screen and (min-resolution: 1.25dppx) {
    & {
      background-size: @background-size-x @background-size-y;
      background-image: url("../img/@2x/@{background-image}?v=@@version") !important;
    }
  }
  //1dppx = 1devicePixelRatio, 1dppx = 96dpi.
}
```

考虑到`1x`不会再有的情况，上面这个`mixin`可以再调整一下：

```css
.retina-image(@background-image,@background-size-x,@background-size-y,@background-pos-x,@background-pos-y) {
  background-image: url("../img/@2x/@{background-image}?v=@@version");
  background-size: @background-size-x @background-size-y;
  background-position:@background-pos-x @background-pos-y;

  @media only screen and (-webkit-min-device-pixel-ratio: 2.5),
  only screen and (min--moz-device-pixel-ratio: 2.5), /* 注意这里的写法比较特殊 */
  only screen and (-o-min-device-pixel-ratio: 5/2),
  only screen and (min-device-pixel-ratio: 2.5),
  only screen and (min-resolution: 240dpi),
  only screen and (min-resolution: 2.5dppx) {
    & {
      background-image: url("../img/@3x/@{background-image}?v=@@version") !important;
    }
  }
  //1dppx = 1devicePixelRatio, 1dppx = 96dpi.
}
```

默认用`2x`的图，`devicePixelRatio`大于等于`2.5`的设备用`3x`的图。这个调整后的`mixin`就是`lib-flexible`下，使用雪碧图背景的方法，应用举例：

```css
@font-size-base: 75;
.btn-android {
  .retina-image("sprite.png", 414rem/@font-size-base, 232rem/@font-size-base, 0, -64rem/@font-size-base);
}
```

`sprite.png`用`750`设计稿的切图合并后的大小是`414 * 232`，`.btn-android`这个按钮的`position`为`0 –64px`。

尽管这个方法看起来完美，但是不建议使用，因为它的适配效果不好，这是IPhone6下的效果：

![](./images/querstion/459873-20160109212440668-287688756.png)

看起来不错，那是当然的，因为这就是它默认没有任何缩放的效果。然后看IPhone6+的效果:

![](./images/querstion/459873-20160109212441762-1534848391.png)

有点差异，但好像还能接受。再看看nexus6的效果：

![](./images/querstion/459873-20160109212442606-1315306942.png)

这就不能忍了，样式差的离谱。造成这个差异的原因也很简单，就是`rem`的副作用，腾讯的页面里所有`position,size`都是不带小数的数值，而且`2x`跟`1x`之间是整数的翻倍，而不是`3x`跟`2x`之间的`1.5`倍，`lib-flexible`会导致大部分的设备下`position`和`size`都是小数数值，所以很难保证背景图片缩放后还能通过`position`显示到正确的位置：

![](./images/querstion/459873-20160109212443496-375628135.png)

从网页优化的角度来说，减少请求数，减少请求数据大小是两个基本的思路，雪碧图就是一个减少请求数但是不能减少请求数据量的方法。`lib-flexible`不能使用兼容`3x`屏的雪碧图的情况看起来是它一个大的缺陷，但实际上也并非如此：雪碧图如果用不了，就采用别的思路来优化，我能想到的更好的就是图片的延迟加载和懒加载，在`app`页面里控制好默认只加载首屏的图片，并且采用延迟和懒加载的方式，避免阻塞页面的加载，也能有极好的用户体验，打开手机淘宝的页面给人的感觉就是如此，而且你去看看手机淘宝的应用会发现它根本就没有用雪碧图，但是速度还是很快。

## 原文链接

[基于淘宝弹性布局方案lib-flexible的问题研究](https://www.cnblogs.com/lyzg/p/5117324.html)