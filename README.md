# vuepress-theme-minimalism

![NPM](https://img.shields.io/npm/l/vuepress-theme-minimalism) ![npm](https://img.shields.io/npm/v/vuepress-theme-minimalism) ![npm](https://img.shields.io/npm/dt/vuepress-theme-minimalism)

## 介绍

一款简洁的 vuepress 主题，兼容 hexo YAML front matter 语法。

预览地址：https://1net.world

## 快速上手

#### 安装

```
npm i -S vuepress-theme-minimalism
or
yarn add vuepress-theme-minimalism
```

- 在 config.js 使用 theme。

```js
module.exports = {
  theme: 'vuepress-theme-minimalism',
  base: '/',
  ...
}
```

- 新建 posts 文件夹，文章写在 posts 目录,因为该主题根据 posts 文件夹下内容进行编译。注：文件夹名称区分大小写。

#### 目录结构

```
.
├── docs
│   ├── .vuepress #vuepress配置文件夹
│   ├── posts #文章存放文件夹
├── package.json
└── yarn.lock
```

#### 书写

开始写一篇博客，书写正确的格式如下：

```markdown
---
title: vuepress主题配置
tags:
  - vuepress
  - markdown
---

# vuepress-theme-minimalism

## 介绍

一款简洁的 vuepress 主题，兼容 hexo YAML front matter 语法。
```

## 主题配置

#### 主题颜色配置

.vuepress 目录下新建 styles 文件夹，新建 palette.styl 配置 css 变量。

目前支持以下几个颜色配置：

``` stylus
$accentColor = #31837c //主题色
$textColor = #2c3e50 //文字颜色
$nprogressColor = #399c9c //nprogress颜色
```

#### config.js 配置

```js
module.exports = {
  // theme: 'vuepress-theme-minimalism',
  base: '/',
  title: '记录',
  description: 'description...',
  themeConfig: {
    headerText: {
      //deader 文字
      index: 'ホーム',
      all: '一覧',
      tags: 'カテゴリー',
      timeline: 'タイムライン',
      seacrh: '探す'
    },
    //footer 文字
    footerText:
      '©2020 Power by <a href="https://vuepress.vuejs.org">VuePress</a> <a href="https://github.com/onnezezt/vuepress-theme-minimalism">Theme minimalism</a>',
    homeBackground: {
      //首页背景颜色
      //设置主页背景颜色，false title为默认颜色
      show: true,
      fileName: '/65231299_p0.jpg' // 背景图片名称，存放在public目录下
    },
    PostsListPopover: false, //是否显示文章内容提示
    darkMode: {
      //暗模式配置
      switch: true, //开关
      auto: true, //自动开启
      on: '18', //时间
      off: '6'
    },
    vssue: {
      //评论组件
      use: false,
      option: {
        owner: 'onnezezt',
        repo: 'onnezezt.github.io',
        clientId: 'xxxx',
        clientSecret: 'xxxx' // 只有在使用某些平台时需要
      }
    }，
    disqus: {
      //开启disqus评论
      use: false,
      option: {
        name: '1net-1' // Replace PAGE_URL with your page's canonical URL variable
      }
    }
  },
  markdown: {
    lineNumbers: true
  }
}
```
