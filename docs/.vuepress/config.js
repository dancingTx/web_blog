const BASE_URL = './router'
const SideBar = {
    '/blog/': [
        require(`${BASE_URL}/blog/JS_Perview`),
        require(`${BASE_URL}/blog/JS_Vue`),
        require(`${BASE_URL}/blog/JS_React`),
        require(`${BASE_URL}/blog/JS_Node`),
        require(`${BASE_URL}/blog/JS_NPM`),
        require(`${BASE_URL}/blog/JS_Auto`),
        require(`${BASE_URL}/blog/JS_H5_Mobile`),
        require(`${BASE_URL}/blog/JS_H5_WebAPI`),
        require(`${BASE_URL}/blog/HTTP`),
        require(`${BASE_URL}/blog/Soft_Skill`),
        require(`${BASE_URL}/blog/DATA_Structure`),
        '声明'
    ],
    '/question/': [
        require(`${BASE_URL}/question/Coding_Training`),
        require(`${BASE_URL}/question/Explain_JS`),
        require(`${BASE_URL}/question/Explain_Vue.js`),
        require(`${BASE_URL}/question/Explain_Network.js`),
        require(`${BASE_URL}/question/Theory_JS.js`),
        require(`${BASE_URL}/question/LeetCode.js`)
    ]
}
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
        sidebar: SideBar,
        lastUpdated: '上次更新'
    }
}