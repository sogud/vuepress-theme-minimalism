const path = require('path')
const moment = require('moment')
const fs = require('fs')
module.exports = (options, ctx) => ({
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ],
    ['@vuepress/nprogress'],
    [
      '@vuepress/last-updated',
      {
        transformer: timestamp => {
          const moment = require('moment')
          moment.locale('zh-CN')
          return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    ]
    // [
    //   'vuepress-plugin-live2d',
    //   {
    //     modelName: 'izumi',
    //     mobileShow: false
    //   }
    // ]
  ],
  enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js'),
  alias: {
    '@': path.resolve(__dirname)
  },
  async ready() {
    // path.resolve(__dirname)
    // const postsFilter = val => val.path.slice(1, 4) === 'doc'
    const postsFilter = val => val.path.slice(1, 6) === 'Posts'
    // const postsFilter = val => console.log(val.path.slice(1, 6))
    // console.log("TCL: ready -> postsFilter", postsFilter)

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
    const { pages } = ctx
    // console.log("TCL: ready -> pages", pages)

    function changeDate(dateStr) {
      if (dateStr.length === undefined) {
        let str = JSON.stringify(dateStr, null, 2)
        return str.slice(1, 11) + ' ' + str.slice(12, -6)
      } else {
        return dateStr
      }
    }

    function changeTime(dateStr) {
      let str = ''
      str = dateStr.slice(0, 7)
      const arr = str.split('-')
      let result = [arr[0] + '-' + arr[1], Number(arr[0]) + Number(arr[1])]
      return result
    }
    // function lastDataGetMonth(dateStr) {
    //   let str = ''
    //   str = dateStr.slice(0, 7)
    //   const arr = str.split('-')
    //   let result = [arr[0] + '-' + arr[1], Number(arr[0]) + Number(arr[1])]
    //   return str
    // }
    const posts = pages.filter(postsFilter)
    // const posts = pages.forEach(postsFilter)
    // const posts = pages
    posts.sort(postsSorter)

    let archived = [] //全部文章
    let tagsList = {} //分类标签列表
    let timeLine = [] //时间归档列表
    let search = [] //搜索列表

    posts.forEach((val, index) => {
      let page = {}
      let sear = {}
      let { excerpt, lastUpdated, path, _strippedContent } = val
      let { tags, title } = val.frontmatter
      if (_strippedContent) {
        _strippedContent = _strippedContent
          .replace(/[\n\r]/g, ' ')
          .replace(/\s+/, ' ')
      }
      if (_strippedContent) {
        excerpt =
          excerpt ||
          (_strippedContent.slice(0, 200)
            ? _strippedContent.slice(0, 200) + '......'
            : false) ||
          ''
        excerpt = excerpt.replace(/#/g, '')
      } else {
        excerpt = ''
      }

      lastUpdated =
        val.frontmatter.date ||
        lastUpdated ||
        moment().format('YYYY-MM-DD HH:mm:ss')
      lastUpdated = changeDate(lastUpdated)
      tags = tags || ''
      title = title || '你忘记写title字段了'

      page.excerpt = excerpt
      page.tags = tags
      page.id = index
      page.title = title
      page.lastUpdated = lastUpdated
      page.path = path

      sear.value = title
      sear.path = path
      sear.strippedContent = _strippedContent

      archived.push(page)
      search.push(sear)

      const t = {}
      t.lastUpdated = lastUpdated
      t.tags = tags
      t.id = index
      t.title = title
      t.path = path
      if (!tags) {
        // 没有tags标签
        if (!tagsList['未分类']) {
          tagsList['未分类'] = [{ name: '未分类' }]
        }
        tagsList['未分类'].push(t)
      } else {
        // tags是数组
        if (tags instanceof Array) {
          tags.forEach(tag => {
            if (tag === undefined) {
              if (!tagsList['未分类']) {
                tagsList['未分类'] = [{ name: '未分类' }]
              }
              tagsList['未分类'].push(t)
            }
            if (!tagsList[tag]) {
              tagsList[tag] = [{ name: tag }]
            }
            tagsList[tag].push(t)
          })
        } else {
          // tags是字符串
          tagsList[tags] = [{ name: tags }]
          tagsList[tags].push(t)
        }
      }
    })

    let index = 0
    archived.forEach((val, i) => {
      let result1 = changeTime(val.lastUpdated)
      if (archived.length === 1) {
        timeLine[0] = { time: result1[0], data: [] }
        return timeLine[0].data.push(val)
      }
      if (i + 1 !== archived.length) {
        var result2 = changeTime(archived[i + 1].lastUpdated)
      } else {
        var result2 = changeTime(archived[i - 1].lastUpdated)
      }
      if (!timeLine[index]) {
        timeLine[index] = { time: result1[0], data: [] }
      }
      timeLine[index].data.push(val)
      if (result1[1] !== result2[1]) {
        index++
      }
    })

    const dataPath = path.resolve(__dirname, 'data')
    console.log('正在写入本地数据,加快在客户端的速度~~')

    fs.writeFile(
      `${dataPath}/content.js`,
      `export default ${JSON.stringify(archived, null, 2)};`,
      error => {
        if (error)
          return console.log('写入首页content文件失败,原因是' + error.message)
        console.log('写入首页content文件成功')
      }
    )

    fs.writeFile(
      `${dataPath}/tagsList.js`,
      `export default ${JSON.stringify(tagsList, null, 2)};`,
      error => {
        if (error)
          return console.log(
            '写入标签页tagsList文件失败,原因是' + error.message
          )
        console.log('写入标签页tagsList文件成功')
      }
    )

    fs.writeFile(
      `${dataPath}/search.js`,
      `export default ${JSON.stringify(search, null, 2)};`,
      error => {
        if (error)
          return console.log('写入搜索search文件失败,原因是' + error.message)
        console.log('写入搜索search文件成功')
      }
    )

    fs.writeFile(
      `${dataPath}/timeLine.js`,
      `export default ${JSON.stringify(timeLine, null, 2)};`,
      error => {
        if (error)
          return console.log('写入时间线timeLinet文件失败,原因是' + error.message)
        console.log('写入时间线timeLine文件成功')
      }
    )
  }
})
