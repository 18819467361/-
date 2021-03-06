import React, { Component } from 'react'
import './style.css'
import Content from './Content/content'
import NavBar from './NavBar/NavBar'
import TopBar from './TopBar/TopBar'

class App extends Component {
  constructor () {
    super()
    this.state = {
      showType: 'book',
      count: 10, // 搜索条目
      id: '',
      keyword: '',
      reLoad: true
    }
  }

  setCount (value) {
    this.setState({
      count: this.state.count + value
    })
  }

  setKeyword (value) {
    this.setState({
      keyword: value
    })
  }

  initCount (value) {
    this.setState({
      count: 10,
      id: '',
      showType: value
    })
  }

  setShowType (value) {
    this.setState({
      showType: value
    })
  }

  setId (value) {
    this.setState({
      id: value
    })
  }
  setReLoad () {
    this.setState({
      reLoad: !this.state.reLoad,
      count: 10
    })
  }
  setIdANDShowType (id, showType) {
    this.setState({
      id: id,
      showType: showType
    })
  }

  render () {
    return (
      <div className='app'>
        <TopBar setShowType={this.setShowType.bind(this)} setKeyword={this.setKeyword.bind(this)} keyword={this.state.keyword} setId={this.setId.bind(this)} count={this.state.count} id={this.state.id} showType={this.state.showType} />

        <Content setReLoad={this.setReLoad.bind(this)} setIdANDShowType={this.setIdANDShowType.bind(this)} setId={this.setId.bind(this)} setCount={this.setCount.bind(this)} count={this.state.count} contents={this.state.contents} showType={this.state.showType} id={this.state.id} keyword={this.state.keyword} reLoad={this.state.reLoad} />

        <NavBar setShowType={this.setShowType.bind(this)} initCount={this.initCount.bind(this)} showType={this.state.showType} />
      </div>
    )
  }
}

module.exports = App
