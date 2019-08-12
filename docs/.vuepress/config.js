module.exports = {
    base: '/web_blog/',
    title: '前端菜鸟的进阶之路',
    description: '编程不易，砥砺前行',
    markdown: {
        lineNumbers: true
    },
    head: [
        ['link', { rel: 'icon', href: '/favicon.png' }]
    ],
    themeConfig: {
        // 你的GitHub仓库，请正确填写
        repo: 'https://github.com/dancingTx/web_blog',
        // 自定义仓库链接文字。
        repoLabel: 'GitHub',
        // 导航栏
        nav: [
            { text: '首页', link: '/' },
            { text: '技术·博文', link: '/blog/' },
            { text: '经典·面试', link: '/question/' },
        ],
        // 侧边栏
        sidebar: {
            '/blog/': [
                {
                    title: 'JS知识汇总',
                    children: [
                        'JavaScript相关/JS知识概览',
                        'JavaScript相关/JS所有内置对象属性和方法汇总',
                        'JavaScript相关/由数组去重谈性能优化',
                        'JavaScript相关/深入理解javascript原型和闭包'
                    ]
                },
                {
                    title: 'JS框架-Vue篇',
                    children: [
                        'Vue相关/Vue组件间通信六种方式（完整版）',
                        'Vue相关/Vuex用法详解',
                        'Vue相关/Vue官方推荐的风格指南',
                        'Vue相关/Vue简易实现'
                    ]
                },
                {
                    title: 'JS框架-React篇',
                    children: [
                        'React相关/为什么会出现React_Hooks？.md'
                    ]
                },
                {
                    title: 'H5移动端',
                    children: [
                        'HTML5相关/H5移动端/基于淘宝弹性布局方案lib-flexible的问题研究',
                        'HTML5相关/H5移动端/使用Flexible实现手淘H5页面的终端适配'
                    ]
                },
                {
                    title: 'H5中的WebAPI',
                    children: [
                        'HTML5相关/H5中的WebAPI/[H5]FileReader'
                    ]
                },
                {
                    title: '前端自动化及工具',
                    children: [
                        '前端自动化/深入理解ESLint.md',
                    ]
                },
                {
                    title: '网络协议',
                    children: [
                        '网络相关/你真的了解Cookie和Session吗',
                        '网络相关/前端常见跨域解决方案',
                        '网络相关/TCP的三次握手和四次挥手',
                        '网络相关/HTTP缓存机制',
                        '网络相关/[译]五步理解JSONWebToken(JWT)'
                    ]
                },
                {
                    title: '软技能',
                    children: [
                        '软技能/如何处理技术债'
                    ]
                },
                '声明'
            ],

            '/question/': [
                {
                    title: '编程练习',
                    children: [
                        '面试相关/编程练习/[js]$1.用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值',
                        '面试相关/编程练习/[js]$2.写一个方法去掉字符串中的空格，要求传入不同的类型分别能去掉前、后、前后、中间的空格',
                        '面试相关/编程练习/[js]$3.去除字符串中最后一个指定的字符',
                        '面试相关/编程练习/[js]$4.写一个方法把下划线命名转成大驼峰命名',
                        '面试相关/编程练习/[js]$5.写一个把字符串大小写切换的方法',
                        '面试相关/编程练习/[js]$6.写一个去除制表符和换行符的方法',
                        '面试相关/编程练习/[js]$7.统计某一字符或字符串在另一个字符串中出现的次数',
                        '面试相关/编程练习/[js]$9.写一个判断数据类型的方法',
                        '面试相关/编程练习/[js]$10.两数之和',
                        '面试相关/编程练习/[js]$11.将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组'
                    ]
                },
                {
                    title: '解释问题-JavaScript篇',
                    children: [
                        '面试相关/解释问题/JavaScript面试题/[js]$1.为什么0.1+0.2！==0.3',
                    ]
                },
                {
                    title: '解释问题-Vue篇',
                    children: [
                        '面试相关/解释问题/Vue面试题/[vue]$1.你知道vue的模板语法用的是哪个web模板引擎的吗？说说你对这模板引擎的理解',
                        '面试相关/解释问题/Vue面试题/[vue]$2.谈谈你对MVVM开发模式的理解',
                        '面试相关/解释问题/Vue面试题/[vue]$3.生命周期钩子函数',
                        '面试相关/解释问题/Vue面试题/[vue]$4.组件通信',
                        '面试相关/解释问题/Vue面试题/[vue]$5.v-show与v-if区别',
                        '面试相关/解释问题/Vue面试题/[vue]$6.组件中data什么时候可以使用对象',
                        '面试相关/解释问题/Vue面试题/[vue]$7.vue中怎么重置data？',
                        '面试相关/解释问题/Vue面试题/[vue]$8.vue渲染模板时怎么保留模板中的HTML注释呢？',
                        '面试相关/解释问题/Vue面试题/[vue]$9.computed和watch有什么区别？'
                    ]
                },
                {
                    title: '解释问题-HTTP篇',
                    children: [
                        '面试相关/解释问题/HTTP相关面试题/[http]$1.HTTP中常用的请求方法有哪些？哪些请求方法是安全的？为什么？',
                        '面试相关/解释问题/HTTP相关面试题/[http]$2.HTTP中POST和GET方法有什么区别？',
                        '面试相关/解释问题/HTTP相关面试题/[http]$3.在浏览器中输入URL到页面进行渲染的过程中发生了什么？',
                        '面试相关/解释问题/HTTP相关面试题/[http]$4.HTTP中常见的状态码有哪些？分别表示什么意思？'
                    ]
                },
                {
                    title: '原理实现',
                    children: [
                        '面试相关/原理实现/[js]$1.实现一个instanceOf',
                        '面试相关/原理实现/[js]$2.深浅拷贝的实现',
                        '面试相关/原理实现/[js]$3.实现一个简易Promise',
                        '面试相关/原理实现/[js]$4.实现call，apply，bind',
                        '面试相关/原理实现/[js]$5.实现new',
                        '面试相关/原理实现/[js]$6.理解与实现函数节流与函数防抖'
                    ]
                },
                {
                    title: 'LeetCode',
                    children: [
                        'leetcode/[js]$20.有效的括号'
                    ]
                }
            ],
        },
        lastUpdated: '上次更新'
    }
}