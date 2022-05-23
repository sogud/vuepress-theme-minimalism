const path = require("path")
const fs = require("fs")
const dayjs = require("dayjs")
const pick = require("lodash/pick")

module.exports = (themeConfig, ctx) => {
  const siteConfig = ctx.siteConfig
  /**
   * Default theme configuration
   */
  themeConfig = Object.assign(themeConfig, {
    nav: themeConfig.nav || [
      {
        text: "Blog",
        link: "/list/"
      }
    ],
    summary: themeConfig.summary === undefined ? true : themeConfig.summary,
    summaryLength: typeof themeConfig.summaryLength === "number" ? themeConfig.summaryLength : 200,
    pwa: !!themeConfig.pwa
  })
  /**
   * Configure blog plugin
   */
  const defaultBlogPluginOptions = {
    directories: [
      {
        // 当前分类的唯一 ID
        id: "post",
        // 目标文件夹
        dirname: "posts",
        // `entry page` (或者 `list page`) 的路径
        path: "/list/",
        layout: "List"
      }
    ],
    frontmatters: [
      {
        id: "tags",
        keys: ["tag", "tags"],
        path: "/tag/",
        layout: "Tags"
      }
    ],
    globalPagination: {
      lengthPerPage: 20
    }
  }
  let resolvedFeedOptions
  const isFeedEnabled = themeConfig.feed && themeConfig.feed.canonical_base
  if (isFeedEnabled) {
    const { rss = true, atom = false, json = false, ...feedOptions } = themeConfig.feed
    resolvedFeedOptions = Object.assign({}, feedOptions, {
      feeds: {
        rss2: { enable: rss },
        atom1: { enable: atom },
        json1: { enable: json }
      }
    })
  }

  const properties = [
    "directories",
    "frontmatters",
    "globalPagination",
    "sitemap",
    "comment",
    "newsletter"
  ]
  const themeConfigPluginOptions = {
    ...pick(themeConfig, properties),
    feed: resolvedFeedOptions
  }

  const blogPluginOptions = Object.assign({}, defaultBlogPluginOptions, themeConfigPluginOptions)

  return {
    plugins: [
      ["@vuepress/blog", blogPluginOptions],
      [
        "@vuepress/search",
        {
          searchMaxSuggestions: 10
        }
      ],
      [
        "@vuepress/pwa",
        {
          serviceWorker: true,
          updatePopup: true
        }
      ],
      ["@vuepress/nprogress"],
      [
        "@vuepress/last-updated",
        {
          transformer: timestamp => {
            const dayjs = require("dayjs")
            dayjs.locale("zh-CN")
            return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss")
          }
        }
      ]
    ],
    enhanceAppFiles: path.resolve(__dirname, "./enhanceApp.js"),
    define: {
      THEME_BLOG_PAGINATION_COMPONENT: themeConfig.paginationComponent
        ? themeConfig.paginationComponent
        : "Pagination"
    },
    alias: {
      "@": path.resolve(__dirname),
      fonts: path.resolve(__dirname, "fonts")
    },
    /**
     * Generate tag and category metadata.
     */

    async ready() {}
  }
}
