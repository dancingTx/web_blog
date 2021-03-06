### v-show 与 v-if 区别

`v-show`只是在`display:none`和`display:block`之间切换。无论初始条件是什么都会被渲染出来，后面只需要切换CSS，DOM还是一致被保留着。所以总的来说，`v-show`在初始渲染时有更高的开销，但是切换开销小，更适合于频繁切换的场景。

`v-if`的话，就得说到Vue底层编译了。当属性初始值为`false`时，组建就不会被渲染，直到条件为`true`，并且切换条件时会触发销毁/挂载组件，所以总的来说在切换时开销更高，更适合于不经常切换的场景。

并且基于`v-if`的这种惰性渲染机制。可以在必要的时候才去渲染组件，减少整个页面的初始渲染开销。

