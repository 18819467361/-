import fetchJsonp from 'fetch-jsonp'

const Tool = {
  // 根据keyword,showType,count,id设置请求数据的src
  lastLoadTime: '',
  setSrc: function (showType, count, id, keyword) {
    let src
    switch (showType) {
      case 'book':
        if (keyword === '') {
          src = `https://api.douban.com/v2/book/search?q=建筑&count=${count}&fields=author,images,summary,title,tags,rating,pubdate,id`
        } else {
          src = `https://api.douban.com/v2/book/search?q=${keyword}&count=${count}&fields=author,images,summary,title,tags,rating,pubdate,id`
        }
        break
      case 'bookDetail':
        src = `https://api.douban.com/v2/book/${id}`
        break

      case 'movie':
        if (keyword === '') {
          src = `https://api.douban.com/v2/movie/top250?count=${count}`
        } else {
          src = `https://api.douban.com/v2/movie/search?q=${keyword}&count=${count}&fields=author,images,summary,title,tags,rating,pubdate,id`
        }
        break
      case 'movieDetail':
        src = `https://api.douban.com/v2/movie/${id}`
        break
      case 'music':
        if (keyword === '') {
          src = `https://api.douban.com/v2/music/search?q=流行&count=${count}&fields=author,images,summary,title,tags,rating,pubdate,id`
        } else {
          src = `https://api.douban.com/v2/music/search?q=${keyword}&count=${count}&fields=author,images,summary,title,tags,rating,pubdate,id`
        }
        break
      case 'musicDetail':
        src = `https://api.douban.com/v2/music/${id}`
        break
      default:
        break
    }
    return src
  },
  getData: function (src, callback) {
    fetchJsonp(src)
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        callback(json)// 需要处理数据
      }).catch(function (ex) {
        console.log('parsing failed', ex)
      })
  },
  fetchData: function (showType, count, id, keyword, callback) {
    const src = this.setSrc(showType, count, id, keyword)
    this.getData(src, callback)
  },
  loadMore: function (callback, value) {
    let now = Date.now()
    if (now - this.lastLoadTime > 2000) {
      this.lastLoadTime = now
      callback(value)
    }
  },
  reLoad: function (callback) {
    let now = Date.now()
    if (now - this.lastLoadTime > 2000) {
      this.lastLoadTime = now
      setTimeout(function () {
        callback()
      }, 1000)
    }
  },
  initPosition: function (e) {
    setTimeout(function () {
      window.scrollTo(0, 0)
    }, 10)
  }
}
module.exports = Tool
