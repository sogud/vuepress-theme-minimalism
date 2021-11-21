const path = require("path")
const fs = require("fs")
const moment = require("moment")

module.exports = (themeConfig, ctx) => {
  const siteConfig = ctx.siteConfig
  /**
   * Default theme configuration
   */
  themeConfig = Object.assign(themeConfig, {
    nav: themeConfig.nav || [
      {
        text: "Blog",
        link: "/"
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
    // comment: {
    //   // Which service you'd like to use
    //   service: "vssue",
    //   // The owner's name of repository to store the issues and comments.
    //   owner: "You",
    //   // The name of repository to store the issues and comments.
    //   repo: "Your repo",
    //   // The clientId & clientSecret introduced in OAuth2 spec.
    //   clientId: "Your clientId",
    //   clientSecret: "Your clientSecret"
    // }
    comment: {
      service: "disqus",
      shortname: "1net-1"
    }
  }
  return {
    plugins: [
      ["@vuepress/blog", defaultBlogPluginOptions],
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
            const moment = require("moment")
            moment.locale("zh-CN")
            return moment(timestamp).format("YYYY-MM-DD HH:mm:ss")
          }
        }
      ]
      // [
      //   "vuepress-plugin-live2d",
      //   {
      //     modelName: "izumi",
      //     mobileShow: false
      //   }
      // ]
    ],
    enhanceAppFiles: path.resolve(__dirname, "enhanceApp.js"),
    alias: {
      "@": path.resolve(__dirname)
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
            moment(val.frontmatter.date).format("YYYY-MM-DD HH:mm:ss") ||
            moment(lastUpdated).format("YYYY-MM-DD HH:mm:ss")
        }

        archived.push(page)

        const tagMap = {
          id: index,
          tags,
          title,
          path,
          lastUpdated:
            moment(val.frontmatter.date).format("YYYY-MM-DD HH:mm:ss") ||
            moment(lastUpdated).format("YYYY-MM-DD HH:mm:ss")
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
        const time = moment(val.lastUpdated).format("YYYY-MM").toString()
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
