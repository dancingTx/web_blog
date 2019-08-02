module.exports = {
    base: '/web_blog/',
    title: '技术博客',
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
            { text: 'Home', link: '/' },
            { text: 'Blog', link: '/blog/FirstBlog' },
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
            ['/blog/FirstBlog', '我的第一篇博客']
        ],
        lastUpdated: 'Last Updated', // string | boolean
    }
}