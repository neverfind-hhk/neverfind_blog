/*
 * 站点配置
 * ---------
 * 修改站点信息（标题、作者、简介、社交链接）只需编辑本文件。
 * 新增文章：1. 在 posts/ 目录新建 <slug>.md 正文；2. 在下方 posts 数组中添加一条元数据。
 */
var SITE_CONFIG = {
  title: '无人发现的角落',
  description: '一个记录学习与生活的个人博客，分享生活随笔。',
  author: 'neverfind',
  bio: '一名热爱折腾的普通人，学习与生活中的思考与沉淀。',
  // baseUrl: 静态站点部署在子路径（如 GitHub Pages 的 https://user.github.io/repo/）时，
  // 相对路径已能自动适配，无需修改。仅特殊场景需覆盖时才填写，例如：baseUrl: '/blog/'
  baseUrl: '',
  socials: [
    { name: 'GitHub', url: 'https://github.com/neverfind-hhk' },
    { name: '邮箱', url: '1224901450@qq.com' }
  ],
  globalTags: ['生活','随笔'],
  posts: [
    {
      slug: 'tech-learning-roadmap',
      title: '我的技术学习路线：从入门到进阶',
      date: '2026-01-05',
      category: '技术',
      tags: ['技术', '学习路线'],
      excerpt: '分享一套适合自学的技术学习路线：从基础知识到项目实战，再走向深度进阶，帮你少走弯路。',
      published: true
    },
    {
      slug: 'frontend-notes',
      title: '前端开发入门笔记：从 HTML 到构建工具',
      date: '2026-02-10',
      category: '前端',
      tags: ['前端', 'HTML', 'CSS', 'JavaScript'],
      excerpt: '整理前端入门需要掌握的核心知识点：HTML 语义化、CSS 布局、JavaScript 基础，以及常用构建工具。',
      published: true
    },
    {
      slug: 'study-notes-method',
      title: '如何高效做学习笔记：我的方法论',
      date: '2026-03-15',
      category: '学习笔记',
      tags: ['学习笔记', '学习方法', '效率'],
      excerpt: '从「记录」到「内化」，分享一套可落地的笔记方法论：用什么工具、记什么内容、如何定期回顾。',
      published: true
    },
    {
      slug: 'writing-blog-year',
      title: '写博客这一年：记录、沉淀与成长',
      date: '2026-04-20',
      category: '随笔',
      tags: ['随笔', '写作'],
      excerpt: '写博客满一年，聊聊写作带给我的改变：为什么坚持、踩过哪些坑，以及写作对学习与思考的帮助。',
      published: true
    },
    {
      slug: 'git-learning',
      title: 'Git版本管理学习',
      date: '2026-08-19',
      category: '学习笔记',
      tags: ['学习笔记','git'],
      excerpt: 'Ai时代开发必备的版本管理',
      published: true
    }
  ]
};
