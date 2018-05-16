import React, {Component} from 'react'
import './SearchBar.css'
class SearchBar extends Component {
  constructor () {
    super()
    this.state = {
      flag: ''
    }
  }

  // 根据showType设置placeHolder显示的内容
  setPlaceHolder () {
    let showType = this.props.showType
    let pageHolder
    switch (showType) {
      case 'book':
        pageHolder = '书名、作者、ISBN'
        break
      case 'movie':
        pageHolder = '电影、影人、导演'
        break
      case 'music':
        pageHolder = '歌手、唱片名、条码'
        break
      default:
        break
    }
    return pageHolder
  }

  // 点击搜索设置keyword触发渲染
  returnKeyword () {
    let keyword = ''
    let input = document.getElementsByTagName('input')[0]
    if (input) {
      keyword = input.value
    }
    if (keyword !== '') {
      this.props.setKeyword(keyword)
    }
  }

  render () {
    let containerClassName = 'searchBarContain'
    const testWord = /Detail/
    if (testWord.test(this.props.showType)) {
      containerClassName = 'hideBar'
    }
    const placeHolder = this.setPlaceHolder()
    return (
      <div className={containerClassName}>
        <div className='searchBar'>
          <i className='searchBar-iconfont' id='glass'>&#xe6d0;</i>
          <input type='search' ref={(input) => { this.input = input }}
            placeholder={placeHolder} />
          <a onClick={this.returnKeyword.bind(this)}>搜索</a>
        </div>
      </div>
    )
  }
  // // 挂载后抓取数据
  componentDidMount () {
    const input = this.input
    input.focus()
  }

}
module.exports = SearchBar
