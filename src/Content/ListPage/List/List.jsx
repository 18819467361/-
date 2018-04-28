import React, { Component } from 'react'
import './List.css'

class List extends Component {
  constructor () {
    super()
    this.state = {

    }
  }
  // 处理返回的数据
  analysisData (datas, dataType) {
    let analyData = {}
    analyData.tag = []
    switch (dataType) {
      case 'book':
        analyData.spanName = 'book-span'
        analyData.authorLab = '作者'
        analyData.title = datas.title ? datas.title : ''

        for (let i = 0; i < 3; i++) {
          analyData.tag[i] = datas.tags[i] ? datas.tags[i].name : ''
        }

        analyData.author = datas.author ? datas.author : ''

        analyData.average = datas.rating.average ? datas.rating.average : '暂无'

        analyData.pubdate = datas.pubdate ? datas.pubdate : '暂无'

        analyData.imageSrc = datas.images ? datas.images.small : ''

        analyData.id = datas.id ? datas.id : ''
        break
      case 'movie':
        analyData.spanName = 'movie-span'
        analyData.authorLab = '导演'
        analyData.title = datas.title ? datas.title : ''
        if (datas.genres) {
          for (let i = 0; i < 3; i++) {
            analyData.tag[i] = datas.genres[i] ? datas.genres[i] : ''
          }
        } else {
          analyData.tag[0] = '暂无'
        }
        if (datas.directors[0]) {
          analyData.author = datas.directors[0].name ? datas.directors[0].name : ''
        } else {
          analyData.author = ''
        }

        analyData.average = datas.rating.average ? datas.rating.average : '暂无'

        analyData.pubdate = datas.year ? datas.year : '暂无'

        analyData.imageSrc = datas.images ? datas.images.small : ''

        analyData.id = datas.id ? datas.id : ''

        break
      case 'music':
        analyData.spanName = 'music-span'
        analyData.authorLab = '歌手'
        analyData.title = datas.title ? datas.title : ''
        if (datas.tag) {
          for (let i = 0; i < datas.tag.length; i++) {
            if (i > 2) {
              break
            }
            analyData.tag[i] = datas.tag[i].name ? datas.tag[i].name : ''
          }
        } else {
          analyData.tag[0] = '暂无'
        }
        analyData.author = datas.author ? datas.author[0].name : ''

        analyData.average = datas.rating.average ? datas.rating.average : '暂无'

        analyData.pubdate = datas.pubdate ? datas.pubdate : '暂无'

        analyData.imageSrc = datas.image ? datas.image : ''

        analyData.id = datas.id ? datas.id : ''
        break
      default:
        break
    }
    return analyData
  }
  // 设置id及showType，渲染detail页
  returnId (analyData) {
    const showType = this.props.showType + 'Detail'
    let id = analyData.id
    this.props.setIdANDShowType(id, showType)
  }
  render () {
    const dataType = this.props.showType
    const datas = this.props.data || {}
    let analyData
    if (datas !== {}) {
      analyData = this.analysisData(datas, dataType)
    }
    return (
      <div id='list' className='contentBox' onClick={this.returnId.bind(this, analyData)}>
        <div className='imgBox'>
          <img src={analyData.imageSrc} alt={analyData.title} />
        </div>
        <div className='description'>
          <h1>{analyData.title}</h1>
          <p className='lab-contain'>
            <span className={analyData.spanName}>{analyData.tag[0]}</span>
            <span className={analyData.spanName}>{analyData.tag[1]}</span>
            <span className={analyData.spanName}>{analyData.tag[2]}</span>
          </p>
          <p>{analyData.authorLab}：{analyData.author}</p>
          <p>评分：{analyData.average}</p>
          <p>时间：{analyData.pubdate}</p>
        </div>
      </div>
    )
  }
}

module.exports = List
