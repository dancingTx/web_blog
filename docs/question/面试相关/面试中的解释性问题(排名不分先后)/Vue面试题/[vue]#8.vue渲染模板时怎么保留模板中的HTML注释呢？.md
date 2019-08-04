### vue渲染模板时怎么保留模板中的HTML注释呢？

**设置comments**

官网上明确指出，当comments设置为true时，将会保留且渲染模板中的HTML注释。默认行为是舍弃它们。

![](https://github.com/ytx1150328467/web_preview/blob/master/面试相关/面试中的解释性问题(排名不分先后)/Vue面试题/images/GTL5FOQZ6IK3D3-788x335.png)

**如何设置**

首先设置comments为true，挂载到模板的template中，如图所示：

![](https://github.com/ytx1150328467/web_preview/blob/master/面试相关/面试中的解释性问题(排名不分先后)/Vue面试题/images/AP8FK2ZQ0NTOVC6BWL10R-768x498.png)

![](https://github.com/ytx1150328467/web_preview/blob/master/面试相关/面试中的解释性问题(排名不分先后)/Vue面试题/images/@KO@3M3I84R8225BUBF3F-300x98.png)

