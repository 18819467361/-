import React, { Component } from 'react'
import './content.css'
import ListPage from './ListPage/ListPage'
import BookDetail from './BookDetail/BookDetail'
import MovieDetail from './MovieDetail/MovieDetail'
import MusicDetail from './MusicDetail/MusicDetail'
import Loading from './Loading/Loading'
import Tool from '../api'

class Contents extends Component {
  constructor () {
    super()
    this.state = {
      preContents: '',
      preCount: '',
      update: '',
      preReLoad: '',
      preShowType: 'book',
      preKeyword: '',
      hadDidMount:false,
      contents:{},
      preSituation:''
    }
  }

    setContents (value) {
        this.setState({
            contents: value
        })
    }

  render () {
    const count = this.props.count
    const showType = this.props.showType
    const reLoad = this.props.reLoad
    if (this.state.preContents !== this.state.contents || this.state.preCount < count || reLoad !== this.state.preReLoad || (this.state.preKeyword === this.props.keyword && this.state.preShowType === this.props.showType)) {
      this.state.preCount = count
      this.state.preContents = this.state.contents
      this.state.preReLoad = reLoad
      this.state.preKeyword = this.props.keyword
      this.state.preShowType = this.props.showType
      switch (showType) {
        case 'book':
        case 'movie':
        case 'music':
          return (
            <ListPage setReLoad={this.props.setReLoad.bind(this)} setCount={this.props.setCount.bind(this)} setIdANDShowType={this.props.setIdANDShowType.bind(this)} showType={this.props.showType} contents={this.state.contents} count={this.props.count} />
          )
        case 'bookDetail':
          return (
            <BookDetail datas={this.state.contents} />
          )
        case 'musicDetail':
          return (
            <MusicDetail datas={this.state.contents} />
          )
        case 'movieDetail':
          return (
            <MovieDetail datas={this.state.contents} />
          )
      }
    } else {
      return (
        <Loading />
      )
    }
  }

    // 挂载后抓取数据
    componentDidMount () {
        this.state.hadDidMount = true
        Tool.fetchData(this.props.showType, this.props.count, this.props.id, this.props.keyword, this.setContents.bind(this))
    }
    // 组件重新渲染后抓取数据
    componentDidUpdate () {
        if (this.state.hadDidMount !== true) {
            let showType =this.props.showType
            if (this.state.preSituation !== this.props.count + this.props.keyword + showType) {
                this.state.preSituation = this.props.count + this.props.keyword + showType
                Tool.fetchData(this.props.showType, this.props.count, this.props.id, this.props.keyword, this.setContents.bind(this))
            }
        } else {
            this.state.hadDidMount = false
        }
    }
}

module.exports = Contents
