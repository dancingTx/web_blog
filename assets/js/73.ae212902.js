(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{456:function(v,e,t){"use strict";t.r(e);var o=t(0),s=Object(o.a)({},(function(){var v=this,e=v.$createElement,t=v._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h3",{attrs:{id:"v-show-与-v-if-区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#v-show-与-v-if-区别","aria-hidden":"true"}},[v._v("#")]),v._v(" v-show 与 v-if 区别")]),v._v(" "),t("p",[t("code",[v._v("v-show")]),v._v("只是在"),t("code",[v._v("display:none")]),v._v("和"),t("code",[v._v("display:block")]),v._v("之间切换。无论初始条件是什么都会被渲染出来，后面只需要切换CSS，DOM还是一致被保留着。所以总的来说，"),t("code",[v._v("v-show")]),v._v("在初始渲染时有更高的开销，但是切换开销小，更适合于频繁切换的场景。")]),v._v(" "),t("p",[t("code",[v._v("v-if")]),v._v("的话，就得说到Vue底层编译了。当属性初始值为"),t("code",[v._v("false")]),v._v("时，组建就不会被渲染，直到条件为"),t("code",[v._v("true")]),v._v("，并且切换条件时会触发销毁/挂载组件，所以总的来说在切换时开销更高，更适合于不经常切换的场景。")]),v._v(" "),t("p",[v._v("并且基于"),t("code",[v._v("v-if")]),v._v("的这种惰性渲染机制。可以在必要的时候才去渲染组件，减少整个页面的初始渲染开销。")])])}),[],!1,null,null,null);e.default=s.exports}}]);