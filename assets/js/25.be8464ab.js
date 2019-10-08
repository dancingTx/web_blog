(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{214:function(e,t,v){e.exports=v.p+"assets/img/20190823112959.1bc0fbcf.png"},470:function(e,t,v){"use strict";v.r(t);var _=v(0),o=Object(_.a)({},(function(){var e=this,t=e.$createElement,_=e._self._c||t;return _("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[_("h1",{attrs:{id:"react-中的生命周期"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#react-中的生命周期","aria-hidden":"true"}},[e._v("#")]),e._v(" React 中的生命周期")]),e._v(" "),_("p",[e._v("React 16 之后，有三个生命周期将被废弃(但并未删除)")]),e._v(" "),_("ul",[_("li",[e._v("componentWillMount")]),e._v(" "),_("li",[e._v("componentWillReceiveProps")]),e._v(" "),_("li",[e._v("componentWillUpdate")])]),e._v(" "),_("p",[e._v("代替的，新增了两个新的生命周期函数")]),e._v(" "),_("ul",[_("li",[e._v("getDerivedStateFromProps")]),e._v(" "),_("li",[e._v("getSnapshotBeforeUpdate")])]),e._v(" "),_("p",[e._v("官方计划在 React 17 版本中完全删除上述三个函数，只保留 UNSAVE_前缀的三个函数，目的是为了向下兼容，但是对于开发者而言，应该尽量避免使用它们，而是使用新增的生命周期代替它们。")]),e._v(" "),_("p",[e._v("目前 React 16.8+ 的生命周期分为三个阶段，分别是挂载阶段、更新阶段、卸载阶段。")]),e._v(" "),_("h2",{attrs:{id:"挂载阶段"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#挂载阶段","aria-hidden":"true"}},[e._v("#")]),e._v(" 挂载阶段")]),e._v(" "),_("ul",[_("li",[_("strong",[e._v("constructor")]),e._v("：构造函数，最先被执行，我们通常在构造函数中进行初始化"),_("code",[e._v("state")]),e._v("对象或者给自定义方法绑定"),_("code",[e._v("this")]),e._v("。")]),e._v(" "),_("li",[_("strong",[e._v("getDerivedStateFromProps")]),e._v("："),_("code",[e._v("static getDerivedStateFromProps(nextProps,prevState)")]),e._v("，这是一个静态方法，当我们接收到新的属性想要修改"),_("code",[e._v("state")]),e._v("时，可以使用"),_("code",[e._v("getDerivedStateFromProps")])]),e._v(" "),_("li",[_("strong",[e._v("render")]),e._v("："),_("code",[e._v("render")]),e._v("函数是一个纯函数，只返回需要渲染的视图，不应该包含其他的业务逻辑，可以返回原生的"),_("code",[e._v("DOM")]),e._v("、"),_("code",[e._v("React")]),e._v("组件、"),_("code",[e._v("Fragment")]),e._v("、"),_("code",[e._v("Portals")]),e._v("、字符串和数字、"),_("code",[e._v("Boolean")]),e._v("和"),_("code",[e._v("null")]),e._v("等内容")]),e._v(" "),_("li",[_("strong",[e._v("componentDidMount")]),e._v("：组件装载之后调用，此时我们可以获取到"),_("code",[e._v("DOM")]),e._v("节点并操作，比如对"),_("code",[e._v("canvas")]),e._v("、"),_("code",[e._v("svg")]),e._v("的操作、服务器请求、订阅都可以写在该生命周期中，但要记得在"),_("code",[e._v("componentWillUnmount")]),e._v("中取消订阅。")])]),e._v(" "),_("h2",{attrs:{id:"更新阶段"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#更新阶段","aria-hidden":"true"}},[e._v("#")]),e._v(" 更新阶段")]),e._v(" "),_("ul",[_("li",[_("strong",[e._v("getDerivedStateFromProps")]),e._v("：此方法在整个更新挂载阶段都可以能会被调用。")]),e._v(" "),_("li",[_("strong",[e._v("shouldComponentUpdate")]),e._v("："),_("code",[e._v("shouldComponentUpdate(nextProps,nextState)")]),e._v("，有两个参数"),_("code",[e._v("nextProps")]),e._v("和"),_("code",[e._v("nextState")]),e._v("，表示新的属性和变化之后的"),_("code",[e._v("state")]),e._v("，返回一个布尔值，"),_("code",[e._v("true")]),e._v("表示会触发重新渲染，"),_("code",[e._v("false")]),e._v("表示不会触发重新渲染，默认返回"),_("code",[e._v("true")]),e._v("，通常我们利用该生命周期来优化"),_("code",[e._v("React")]),e._v("程序性能。")]),e._v(" "),_("li",[_("strong",[e._v("render")]),e._v("：更新阶段也会触发该生命周期。")]),e._v(" "),_("li",[_("strong",[e._v("getSnapshotBeforeUpdate")]),e._v("："),_("code",[e._v("getSnapshotBeforeUpdate(prevProps,prevState)")]),e._v("，这个方法在"),_("code",[e._v("render")]),e._v("之后，"),_("code",[e._v("componentDidUpdate")]),e._v("之前调用，有两个参数"),_("code",[e._v("prevProps")]),e._v("和"),_("code",[e._v("prevState")]),e._v("，表示之前的属性和之前的"),_("code",[e._v("state")]),e._v("，这个函数有一个返回值，会作为第三个参数传给"),_("code",[e._v("componentDidUpdate")]),e._v("，如果不想要返回值，可以返回"),_("code",[e._v("null")]),e._v("，该生命周期必须与"),_("code",[e._v("componentDidUpdate")]),e._v("搭配使用。")]),e._v(" "),_("li",[_("strong",[e._v("componentDidUpdate")]),e._v("："),_("code",[e._v("componentDidUpdate(prevProps,prevState,snapshot)")]),e._v("，该方法在"),_("code",[e._v("snapshot")]),e._v("，表示之前的"),_("code",[e._v("props")]),e._v("，之前的"),_("code",[e._v("state")]),e._v("和"),_("code",[e._v("snapshot")]),e._v("。第三个参数时"),_("code",[e._v("getSnapshotBeforeUpdate")]),e._v("返回的，如果触发某些回调函数时需要用到"),_("code",[e._v("DOM")]),e._v("元素的状态，则将对比或计算的过程迁移至"),_("code",[e._v("getSnapshotBeforeUpdate")]),e._v("，然后在"),_("code",[e._v("componentDidUpdate")]),e._v("中统一触发回调或更新状态。")])]),e._v(" "),_("h2",{attrs:{id:"卸载阶段"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#卸载阶段","aria-hidden":"true"}},[e._v("#")]),e._v(" 卸载阶段")]),e._v(" "),_("ul",[_("li",[_("strong",[e._v("componentWillUnmount")]),e._v("：当我们的组件被卸载或者销毁了就会被调用，我们可以在该函数中清除全局定时器，取消网络请求，清理无效"),_("code",[e._v("DOM")]),e._v("元素等垃圾清理工作。")])]),e._v(" "),_("p",[_("img",{attrs:{src:v(214),alt:""}})]),e._v(" "),_("blockquote",[_("p",[e._v("一个查看react生命周期的"),_("a",{attrs:{href:"https://link.juejin.im/?target=http%3A%2F%2Fprojects.wojtekmaj.pl%2Freact-lifecycle-methods-diagram%2F",target:"_blank",rel:"noopener noreferrer"}},[e._v("网站"),_("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=o.exports}}]);