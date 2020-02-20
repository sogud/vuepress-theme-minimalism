# vuepress-theme-minimalism

## 介绍

一款简洁的 vuepress 主题，兼容 hexo YAML front matter 语法。

## 快速上手

- 安装

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

- 文章写在 Posts 目录，新建 Posts 文件夹 注：区分大小写。

```
.
├─ docs
│  ├─ Posts
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
└─ package.json
```

- 新建 index.md 文件,填写以下配置：

```yml
---
home: true #代表首页
actionText: 开始Start reading... #首页文字
actionLink: /list #首页跳转链接
# footer: ©2020 Power by VuePress Theme minimalism
---

```
- 新建 list.md 文件,空内容即可。
```yml
├── docs
│   ├── List.md #列表页
```
- 开始写一篇博客吧！书写正确的格式如下：

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

## 目录结构

```yml
.
├── docs
│   ├── .vuepress #vuepress配置文件夹
│   ├── List.md #列表
│   ├── Posts #文章存放文件夹
│   ├── Tags.md #标签页
│   ├── TimeLine.md #时间线
│   └── index.md #首页
├── package.json
└── yarn.lock

```

## 主题配置

``` json
themeConfig: {
    home: true,
    homeBackground: { //设置主页背景颜色，false title为默认颜色
      show: true,
      fileName: '/GetImage.jpeg'
    },
    PostsListPopover: false, //是否显示文章内容提示
    darkMode: {
      //暗模式配置
      switch: true, //开关
      auto: false, //自动开启
      on: '', //时间
      off: ''
    },
    vssue: { //评论插件配置
      option: {
        owner: '你的github账户名',
        repo: '你的仓库名',
        clientId: '你的clientId',
        clientSecret: '你的clientSecret' // 只有在使用某些平台时需要
      }
    }
  }
```
