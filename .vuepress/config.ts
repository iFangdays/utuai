import { defineUserConfig } from 'vuepress';
import recoTheme from 'vuepress-theme-reco';
import katex from 'markdown-it-katex';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { seoPlugin } from 'vuepress-plugin-seo2';
import { sitemapPlugin } from 'vuepress-plugin-sitemap2';

export default defineUserConfig({
  title: '乌图AI-uTuAI',
  shouldPrefetch: false,
  head: [
    ['link', { rel: 'stylesheet', href: '/css/katex.min.css' }],
    ['link', { rel: 'stylesheet', href: '/css/github-markdown.min.css' }],
    [
      'meta',
      {
        name: 'description',
        content: '乌图AI,utuai.com',
      },
    ],
  ],
  lang: 'zh-CN',
  theme: recoTheme({
    catalogTitle: '目录',
    style: '@vuepress-reco/style-default',
    // logo: '/logo.png',
    author: 'Fang_冬',
    // authorAvatar: '/head.png',
    lastUpdatedText: '',
    series: {
      '/docs/vue/': ['vue'],
      // '/docs/genuine-oj/': [
      //   'introduction',
      //   {
      //     text: '部署',
      //     children: [
      //       'before_start',
      //       'frontend',
      //       '/docs/genuine-oj/backend.md',
      //       'judger',
      //       'docker',
      //     ],
      //     disableSort: true,
      //   },
      //   {
      //     text: '使用教程和说明',
      //     children: [
      //       'about_hidden',
      //       '/docs/genuine-oj/add_judge_language.md',
      //       'test_case',
      //       'end_relationship',
      //       'import_problem',
      //       'bug_and_feature',
      //     ],
      //   },
      // ],
    },
    navbar: [
      { text: '前端笔记', children:[
          { text: '《 Vue 》', link: '/docs/vue' },
          { text: '《 React 》', link: '/react' },
          { text: '《 UniApp 》', link: '/uniApp' },
          { text: '《 微信小程序 》', link: '/wxApp' },
        ] },
      { text: '面试题', link: '/posts' },
      { text: '关于', link: '/docs/yxzl/about' },
      { text: '友链', children:[
          { text: 'Chat', link: 'http://chat.utuai.com'},
          { text: '题海后台', link: 'http://admin.utuai.com'},
        ]}
    ],
    // commentConfig: {
    //   type: 'giscus',
    //   options: {
    //     repo: 'yxzlwz/blog',
    //     repoId: 'R_kgDOJq1RYg',
    //     category: 'Announcements',
    //     categoryId: 'DIC_kwDOJq1RYs4CW7t8',
    //   },
    // },
    // algolia: {
    //   appId: 'Z9UI06CZ8H',
    //   apiKey: 'cfe3ceb54cf1890c63aaa00df86130bd',
    //   indexName: 'docFang',
    //   inputSelector: '### REPLACE ME ####',
    //   algoliaOptions: { facetFilters: ['lang:$LANG'] },
    //   debug: false, // Set debug to true if you want to inspect the dropdown
    // },
    // bulletin: {
    //   body: [
    //     {
    //       type: 'text',
    //       content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
    //       style: 'font-size: 12px;',
    //     },
    //   ],
    // },
  }),
  plugins: [
    googleAnalyticsPlugin({
      id: '',
    }),
    seoPlugin({
      hostname: 'http://www.utuai.com',
      author: {
        name: 'Fang_冬',
        email: '752043344@qq.com',
      },
    }),
    sitemapPlugin({
      hostname: 'http://www.utuai.com',
      changefreq: 'weekly',
    }),
  ],
  extendsMarkdown: md => {
    md.set({ html: true });
    md.use(katex);
  },
});
