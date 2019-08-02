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
            // {
            //     text: '选择语言',
            //     items:
            //         [
            //             { text: '简体中文', link: '/language/simple-chinese' },
            //             { text: 'English', link: '/language/english' }
            //         ]
            // }
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