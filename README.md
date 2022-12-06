# vuepress-theme-minimalism

![NPM](https://img.shields.io/npm/l/vuepress-theme-minimalism) <a href="https://www.npmjs.com/package/vuepress-theme-minimalism"> <img src="https://img.shields.io/npm/v/vuepress-theme-minimalism" alt=""></a> <a href="https://www.npmjs.com/package/vuepress-theme-minimalism"> <img src="https://img.shields.io/npm/dt/vuepress-theme-minimalism" alt=""></a>

## introduction

A minimalist vuepress theme, compatible with hexo YAML front matter syntax.

example：https://github.com/sogud/vuepress-theme-minimalism

preview：https://sogud.github.io

## Quick Start

#### install

```
npm i -S vuepress-theme-minimalism
or
yarn add vuepress-theme-minimalism
```

- Use theme in config.js.

```js
module.exports = {
  theme: 'vuepress-theme-minimalism',
  base: '/',
  ...
}
```

- new posts folder, article written in posts directory, as the topic is compiled based on the content under the posts folder. Note: Folder names are case-sensitive.

#### Directory Structure

```
.
├── docs
│   ├── .vuepress #vuepress configuration folder
│   ├── posts #Article Storage Folder
├── package.json
└── yarn.lock
```

#### write

Start writing a blog that is written in the correct format as follows.：

```markdown
---
title: vuepress
tags:
  - vuepress
  - markdown
---

# vuepress-theme-minimalism

## introduction

A minimalist vuepress theme, compatible with hexo YAML front matter syntax.
```

## Theme configuration

#### Theme color configuration

New styles folder in .vuepress directory, new palette.styl Configure css variables.

The following color configurations are currently supported.

```stylus
$accentColor = #31837c
$textColor = #2c3e50
$nprogressColor = #399c9c
```

#### config.js configuration

```js
module.exports = {
  base: "/",
  title: "sogud'blog",
  theme: "vuepress-theme-minimalism",
  themeConfig: {
    nav: [
      {
        text: "文档",
        link: "/list/"
      },
      {
        text: "标签",
        link: "/tag/"
      },
      {
        text: "Github",
        link: "https://github.com/sogud"
      }
    ]
    footer: {
      contact: "联系",
      links: [
        {
          text: "GitHub",
          link: 'https://github.com/sogud'
        },
        {
          text: "Twitter",
          link: ""
        }
      ]
    },
    comment: {
      service: "disqus",
      shortname: "1net-1"
    },
  },
  markdown: {
    // lineNumbers: true
  }
}
```
