const path = require("path")

module.exports = {
  base: "/",
  title: "sogud'blog",
  // theme: "vuepress-theme-minimalism",
  theme: require.resolve("../../"),
  themeConfig: {
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
    home: {
      background: {
        //设置主页背景颜色，false title为默认颜色
        show: false,
        fileName: "/bg.png"
      }
    },
    darkMode: {
      //暗模式配置
      switch: true, //开关
      auto: false, //自动开启
      on: "18:00", //时间
      off: "06:00" //时间
    },
    comment: {
      service: "disqus",
      shortname: "1net-1"
      // vssue: {
      //   //开启vssue评论
      //   use: false,
      //   option: {
      //     owner: "name",
      //     repo: "name.github.io",
      //     clientId: "clientId",
      //     clientSecret: "clientSecret" // 只有在使用某些平台时需要
      //   }
      // },
      // disqus: {
      //   //开启disqus评论
      //   use: true,
      //   option: {
      //     name: "1net-1" // Replace PAGE_URL with your page's canonical URL variable
      //   }
      // }
    },
    nav: [
      {
        text: "文档",
        link: "/list/"
      },
      {
        text: "标签",
        link: "/tag/"
      },
      // {
      //   text: "时间线",
      //   link: "/timeline/"
      // },
      {
        text: "Github",
        link: "https://github.com/sogud"
      }
    ]
  },
  markdown: {
    // lineNumbers: true
  }
}
