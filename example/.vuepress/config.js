const path = require("path")

module.exports = {
  base: "/",
  title: "sogud'blog",
  // theme: "vuepress-theme-minimalism",
  theme: require.resolve("../../"),
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
    ],
    footer: {
      contact: "联系",
      links: [
        {
          text: "GitHub",
          link: "github.com"
        },
        {
          text: "Twitter",
          link: "github.com"
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
