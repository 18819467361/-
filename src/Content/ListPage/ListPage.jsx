import React, { Component } from 'react';
import './ListPage.css';
import List from './List/List'

class ListPage extends Component {
    constructor(){
        super();
        this.state={
            lastLoadTime:''
        }
    }

//判断是否刷新或加载更多
    loadMore (e) {
        const self = this
        const contentsHeight = e.currentTarget.scrollHeight
        const scrollHeight = window.pageYOffset - 50
        const windowHeight = window.innerHeight
        //判断上拉到页底加载更多
        const loadData = function () {
            let now = Date.now()
            if (now - self.state.lastLoadTime > 2000) {
                self.state.lastLoadTime = now
                self.props.setCount(10)
                console.log('setCount')
            }
        }
        //判断下拉加载更多
        const update = function () {
            let now = Date.now()
            if (now - self.state.lastLoadTime > 2000) {
                self.state.lastLoadTime = now
                setTimeout(function () {
                    self.props.setReLoad()
                }, 1000)
            }
        }
        if (contentsHeight - scrollHeight < windowHeight) {
            loadData()
        } else if (scrollHeight + 39 < 0) {
            update()
        }
    }
//页面定位
    initShow (e) {
        if (this.props.count === 10) {
            setTimeout(function () {
                window.scrollTo(0, 30)
            }, 10)
        }
    }

    render() {
        const self=this;
        const contents=this.props.contents;
        const datas = contents.books || contents.subjects || contents.musics || []//
        console.log('listPAGE-datas',datas);
        return (
            <div id='contents' onClick={this.initShow()} onTouchMove={this.loadMore.bind(this)}>
                <div className='pullToUpdate'>
                    下拉刷新...
                </div >
                {datas.map((data, index) => {
                    return (
                        <List data={data} setIdANDShowType={this.props.setIdANDShowType.bind(this)} showType={this.props.showType} key={index} />
                    )
                })}
                <div className={'smallLoading_content'} >
                    上拉加载更多
                </div>
            </div>
        );
    }
}

module.exports = ListPage;


