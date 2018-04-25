import React, {Component} from 'react';
import './contents.css';
import List from '../list/list'
import DetailPage from '../detailPage/detailPage'
import Load from '../loading/loading'

class Contents extends Component {
    constructor() {
        super();
        this.state = {
            preContents: {},
            preCount: 0,
            lastLoadTime:0
        }
    }

    returnDetailId(value) {
        this.props.setDetailId(value);
    }

//页末加载更多
    loadMore(e) {
        let self = this;
        let contentsHeight = e.currentTarget.scrollHeight;
        let scrollHeight = window.pageYOffset - 50;
        let windowHeight = window.innerHeight;
        let loadData = function () {
                let now = Date.now();
                console.log('now', now);
                console.log("到底了");
                if (now - self.state.lastLoadTime > 2000) {
                    self.state.lastLoadTime = now;
                    self.props.setCount(10);
                    console.log('setCount');
                }
            };

        if (contentsHeight - scrollHeight < windowHeight) {
            loadData();
        }
        // console.log('DOMTarget',e.currentTarget.scrollHeight);
        // console.log(e.nativeEvent);
        // console.log('tall');

    }

    render() {
        let contents = this.props.contents || {};
        let self = this;
        let count = this.props.count;//渲染项数
        let mode = this.props.showPage;
        if (this.props.detailId !== '') {//显示详情页面
            if (!contents.count) {
                let detailData = contents;//对象
                // console.log('对象',detailData);
                return (
                    <DetailPage mode={mode} detailData={detailData}/>
                )
            } else {
                return (
                    <Load/>
                )
            }

        } else {
            if ((contents !== {} && contents !== this.state.preContents) || this.state.preCount < count) {
                this.state.preCount = count;
                // console.log('contents', contents);
                this.state.preContents = contents;
                let datas = contents.books || contents.subjects || contents.musics || [];//chucuo
                // console.log('datas', datas);
                // console.log('settimeout');
                return (
                    <div id='contents' onTouchMove={this.loadMore.bind(this)}>
                        {datas.map((data, index) => {
                            return (
                                <List data={data} dataType={self.props.showPage}
                                      returnDetailId={this.returnDetailId.bind(this)} key={index}/>
                            )
                        })}
                        <div className={'smallLoading'}>
                            加载中...
                        </div>
                    </div>
                )
            } else {
                return (
                    <Load/>
                );
            }
        }

    }
}

module.exports = Contents;
