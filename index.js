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
      },
      {
        id: "timeline",
        keys: ["timeline"],
        path: "/timeline/",
        layout: "Timeline"
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
    async clientDynamicModules() {
      const { pages } = ctx
      const postsFilter = val => val.path.slice(1, 6) === "posts"

      const postsSorter = (prev, next) => {
        const prevTime =
          new Date(prev.frontmatter.date).getTime() ||
          new Date(prev.lastUpdated).getTime() ||
          new Date().getTime()
        const nextTime =
          new Date(next.frontmatter.date).getTime() ||
          new Date(next.lastUpdated).getTime() ||
          new Date().getTime()
        return prevTime - nextTime > 0 ? -1 : 1
      }

      const posts = pages.filter(postsFilter).sort(postsSorter)

      const archived = []
      const timeLine = []
      const tagsList = {}

      posts.forEach((val, index) => {
        let { excerpt, lastUpdated, path, _strippedContent } = val
        const { tags, title } = val.frontmatter

        let sear = {}

        if (_strippedContent) {
          _strippedContent = _strippedContent.replace(/[\n\r]/g, " ").replace(/\s+/, " ")
        }
        if (_strippedContent) {
          excerpt =
            excerpt ||
            (_strippedContent.slice(0, 200) ? _strippedContent.slice(0, 200) + "..." : false) ||
            ""
          excerpt = excerpt.replace(/#/g, "")
        } else {
          excerpt = ""
        }
        const page = {
          id: index,
          path,
          excerpt,
          tags: tags || "",
          title: title || "你忘记写标题了",
          lastUpdated:
            dayjs(val.frontmatter.date).format("YYYY-MM-DD HH:mm:ss") ||
            dayjs(lastUpdated).format("YYYY-MM-DD HH:mm:ss")
        }

        archived.push(page)

        const tagMap = {
          id: index,
          tags,
          title,
          path,
          lastUpdated:
            dayjs(val.frontmatter.date).format("YYYY-MM-DD HH:mm:ss") ||
            dayjs(lastUpdated).format("YYYY-MM-DD HH:mm:ss")
        }

        if (!tags) {
          // 没有tags标签
          if (!tagsList["未分类"]) {
            tagsList["未分类"] = [{ name: "未分类" }]
          }
          tagsList["未分类"].push(tagMap)
        } else {
          // tags是数组
          if (tags instanceof Array) {
            tags.forEach(tag => {
              if (!tag) {
                if (!tagsList["未分类"]) {
                  tagsList["未分类"] = [{ name: "未分类" }]
                }
                tagsList["未分类"].push(tagMap)
              }
              if (!tagsList[tag]) {
                tagsList[tag] = [{ name: tag }]
              }
              tagsList[tag].push(tagMap)
            })
          } else {
            // tags是字符串
            tagsList[tags] = [{ name: tags }]
            tagsList[tags].push(tagMap)
          }
        }
      })

      archived.forEach((val, i) => {
        const time = dayjs(val.lastUpdated).format("YYYY-MM").toString()
        const hasIndex = timeLine.findIndex(item => item.time === time)
        if (hasIndex !== -1) {
          timeLine[hasIndex].data.push(val)
        } else {
          const item = {
            time,
            data: [val]
          }
          timeLine.push(item)
        }
      })
      // export const search = ${JSON.stringify(search, null, 2)}
      return [
        {
          name: "metadata.js",
          content: `export const content = ${JSON.stringify(archived, null, 2)}
                    export const tagsList = ${JSON.stringify(tagsList, null, 2)}
                    export const timeLine = ${JSON.stringify(timeLine, null, 2)}`
        }
      ]
    },
    async ready() {}
  }
}
