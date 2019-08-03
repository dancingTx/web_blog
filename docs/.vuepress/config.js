module.exports = {
    base: '/web_blog/',
    title: '前端菜鸟的进阶之路',
    description: '编程不易，砥砺前行',
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
                    title: '软技能',
                    children: [
                        '软技能/如何处理技术债'
                    ]
                },
                {
                    title: '网络协议',
                    children: [
                        '网络相关/你真的了解Cookie和Session吗',
                        '网络相关/前端常见跨域解决方案',
                        '网络相关/TCP的三次握手和四次挥手'
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
                      './HTML5相关/H5中的WebAPI/[H5]FileReader'
                  ]  
                },
                {
                    title: 'JS知识汇总',
                    children: [
                        './JavaScript相关/JS知识概览',
                        './JavaScript相关/JS所有内置对象属性和方法汇总',
                        './JavaScript相关/由数组去重谈性能优化',
                        './JavaScript相关/深入理解javascript原型和闭包'
                    ]
                },
                '声明'
            ],

            '/question/': [
                {
                    title: '面试题解',
                    children: [
                    ]
                }
            ],
        },
        lastUpdated: '上次更新'
    }
}