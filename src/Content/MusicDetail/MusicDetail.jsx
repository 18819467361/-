import React, {Component} from 'react'
import './MusicDetail.css'
import Tool from '../../api'

class MusicDetail extends Component {
  constructor () {
    super()
    this.state = {}
  }

  //整理抓取到的数据
  analysisData (data) {
    let analyData = {}
    analyData.tag = []
    analyData.singer = []
    analyData.img = data.image ? data.image : ''
    analyData.title = data.title ? data.title : ''
    if (data.attrs.singer) {
      analyData.singer = data.attrs.singer.join(' ')
    } else {
      analyData.singer = '佚名'
    }
    analyData.publisher = data.attrs.publisher ? data.attrs.publisher[0] : ''
    analyData.pubdate = data.attrs.pubdate ? data.attrs.pubdate[0] : ''
    analyData.rating = data.rating.average ? data.rating.average : ''
    analyData.version = data.attrs.version ? data.attrs.version[0] : ''
    if (data.tags) {
      let len = data.tags.length
      for (let i = 0; i < len; i++) {
        if (i > 2) {
          break
        }
        analyData.tag.push(data.tags[i].name)
      }
    }
    return analyData
  }

  render () {
    let data = this.props.datas
    let analyData = this.analysisData(data)
    return (
      <div onClick={Tool.initPosition.apply(this)}>
        <div className='head'>
          <img src={analyData.img} />
          <div className='headImfo'>
            <p>名称：{analyData.title}</p>
            <p>表演者:{analyData.singer}</p>
            <p>
                            标签:<span>{analyData.tag[0]} </span><span>{analyData.tag[1]} </span><span>{analyData.tag[2]}</span>
            </p>
            <p>专辑类型：{analyData.version}</p>
            <p>出版者：{analyData.publisher}</p>
            <p>发行时间：{analyData.pubdate}</p>
            <p>评分：{analyData.rating}</p>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = MusicDetail
