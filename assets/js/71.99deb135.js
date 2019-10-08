(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{458:function(s,a,t){"use strict";t.r(a);var e=t(0),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h3",{attrs:{id:"为什么-0-1-0-2-0-3"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#为什么-0-1-0-2-0-3","aria-hidden":"true"}},[s._v("#")]),s._v(" 为什么 0.1+0.2 !== 0.3")]),s._v(" "),t("blockquote",[t("p",[s._v("涉及面试题：为什么0.1+0.2 !== 0.3?如何解决该问题？")])]),s._v(" "),t("p",[s._v("先说原因，由于JS采用 IEEE754双精度版本（64位），并且只要采用IEEE754的语言都有该问题。")]),s._v(" "),t("p",[s._v("我们知道计算机是通过二进制来储存东西的，那么"),t("code",[s._v("0.1")]),s._v("在二进制中会表示为")]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//(0011) 表示循环")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.10011")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0011")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("我们可以发现，"),t("code",[s._v("0.1")]),s._v("在二进制中是无限循环的一些数字，其实不只是"),t("code",[s._v("0.1")]),s._v(",其实很多十进制小数用二进制表示都是无限循环的。这样其实没什么问题，但是JS采用的浮点数标准却会裁掉我们的数字。")]),s._v(" "),t("p",[s._v("IEEE754双精度版本（64位）将64位分为了三段")]),s._v(" "),t("ul",[t("li",[s._v("第一位用来表示符号")]),s._v(" "),t("li",[s._v("接下来的11位用来表示指数")]),s._v(" "),t("li",[s._v("其他的位数用来表示有效位，也就是用二进制表示"),t("code",[s._v("0.1")]),s._v("中的"),t("code",[s._v("10011(0011)")])])]),s._v(" "),t("p",[s._v("那么这些循环的数字被裁减了，就会出现精度丢失的问题，也就造成了"),t("code",[s._v("0.1")]),s._v("不再是"),t("code",[s._v("0.1")]),s._v("了，而是编程了"),t("code",[s._v("0.100000000000000002")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.100000000000000002")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("===")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// true")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("那么同样的，"),t("code",[s._v("0.2")]),s._v("在二进制中也是无限循环的，被裁剪后也失去了精度变成了"),t("code",[s._v("0.200000000000000002")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.200000000000000002")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("===")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.2")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// true")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("所以两者相加不等于"),t("code",[s._v("0.3")]),s._v("而是"),t("code",[s._v("0.300000000000000004")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.2")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("===")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.30000000000000004")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// true")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("那么可能又会有疑问，既然"),t("code",[s._v("0.1")]),s._v("不是"),t("code",[s._v("0.1")]),s._v(",那为什么"),t("code",[s._v("console.log(0.1)")]),s._v("却是正确的呢？")]),s._v(" "),t("p",[s._v("因为在输入内容的时候，二进制被转化成了十进制，十进制又被转化成了字符串，在这个转换的过程中，发生了近似取值的过程，所以打印出来其实是一个近似值，你也可以通过以下代码来验证")]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("console"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.100000000000000002")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 0.1")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("说完了为什么，来说说如何解决该问题。解决的办法有很多，这里选用原生提供的方式来最简单的解决该问题")]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("parseFloat")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("toFixed")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("===")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.3")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// true")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])])])}),[],!1,null,null,null);a.default=n.exports}}]);