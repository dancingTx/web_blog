module.exports = {
    base: '/web_blog/',
    title: '前端相关技术博客',
    description: '一个专门写技术的博客',
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
            { text: '博客', link: '/blog/FirstBlog' },
            {
                text: '选择语言',
                items:
                    [
                        { text: '简体中文', link: '/language/simple-chinese' },
                        { text: 'English', link: '/language/english' }
                    ]
            }
        ],
        // 侧边栏
        sidebar: [
            ['/', '首页'],
            [
                {
                    title: '软技能',
                    collapsable: false,
                    children: [
                        '/blog/软技能/如何处理技术债'
                    ]
                },
                {
                    title: 'Group 2',
                    children: [ /* ... */]
                }
            ]
        ],
        lastUpdated: 'Last Updated', // string | boolean
    }
}