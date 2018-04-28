import React, { Component } from 'react'
import './DetailBar.css'
// import Tool from '../../api';

class DetailBar extends Component {
  constructor () {
    super()
    this.state = {

    }
  }
  // 设置showType,返回搜索列表页
  returnList () {
    const preShowType = this.props.showType.match(/book|music|movie/)
    this.props.setShowType(preShowType[0])
  }

  render () {
    return (
      <div className='returnBar'>
        <div className='returnButton' onClick={this.returnList.bind(this)}><i className='detail-iconfont'>&#xe624;</i></div>
        <div className='title'><p>详细信息</p></div>
      </div>
    )
  }
}

module.exports = DetailBar
