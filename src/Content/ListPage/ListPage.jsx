import React, { Component } from 'react'
import './ListPage.css'
import List from './List/List'
import Tool from '../../api'
class ListPage extends Component {
  constructor () {
    super()
    this.state = {
      lastLoadTime: ''
    }
  }

  // 判断是否刷新或加载更多
  reLoadOrLoadMore (e) {
    const contentsHeight = e.currentTarget.scrollHeight
    const scrollHeight = window.pageYOffset - 50
    const windowHeight = window.innerHeight
    if (contentsHeight - scrollHeight < windowHeight) {
      Tool.loadMore(this.props.setCount.bind(this), 10)
    } else if (scrollHeight + 39 < 0) {
      Tool.reLoad(this.props.setReLoad.bind(this))
    }
  }

  // 页面定位
  initShow (e) {
    if (this.props.count === 10) {
      setTimeout(function () {
        window.scrollTo(0, 30)
      }, 10)
    }
  }

  render () {
    const contents = this.props.contents
    const datas = contents.books || contents.subjects || contents.musics || []//
    const total = contents.total + 10
    let bottomNote = '上拉加载更多...'
    if (total === 10 || total < this.props.count) {
          bottomNote = '没有咯...'
     }
    return (
      <div id='contents' onClick={this.initShow()} onTouchMove={this.reLoadOrLoadMore.bind(this)}>
        <div className='pullToUpdate'>
                    下拉刷新...
        </div >
        {datas.map((data, index) => {
          return (
            <List data={data} setIdANDShowType={this.props.setIdANDShowType.bind(this)} showType={this.props.showType} key={index} />
          )
        })}
        <div className={'smallLoading_content'} >
            {bottomNote}
        </div>
      </div>
    )
  }
}

module.exports = ListPage
