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
            lastLoadTime:0,
            update:'true'
        }
    }

    returnDetailId(value) {
        this.props.setDetailId(value);
    }
    initShow(e){
        // console.log('fdf',window.scrollTo(100));
        // console.log('initShow');
        if(this.props.count===10){
            window.scrollTo(0,30);
        }
        // e.currentTarget.scrollTo(0,100)
    }
//页末加载更多
    loadMore(e) {
        let self = this;
        let contentsHeight = e.currentTarget.scrollHeight;
        let scrollHeight = window.pageYOffset - 50;
        let windowHeight = window.innerHeight;
        // console.log(scrollHeight,'scrollHE');
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
        let update=function () {
            let now = Date.now();
            // console.log('now', now);
            // console.log('last', self.state.lastLoadTime);

            // console.log("到顶了");
            if (now - self.state.lastLoadTime > 2000) {
                self.state.lastLoadTime = now;
                setTimeout(function () {
                    // console.log('稍后刷新');
                    self.props.setUpdate();
                },1000);
                // console.log('setUpdate');
            }

        };

        if (contentsHeight - scrollHeight < windowHeight) {
            loadData();
        }else if(scrollHeight+39<0){
            update();
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
            // console.log(this.props.update);
            // console.log(this.state.update);
            if ((contents !== {} && contents !== this.state.preContents) || this.state.preCount < count||this.props.update!==this.state.update||this.state.keyword) {
                this.state.update=this.props.update;
                this.state.preCount = count;
                // console.log('contents', contents);
                this.state.preContents = contents;
                let datas = contents.books || contents.subjects || contents.musics || [];//chucuo
                // console.log('datas', datas);
                // console.log('settimeout');
                return (
                    <div id='contents'  onClick={this.initShow()} onTouchMove={this.loadMore.bind(this)}>
                        <div className='pullToUpdate'>
                            正在刷新...
                        </div >
                        {datas.map((data, index) => {
                            return (
                                <List data={data} dataType={self.props.showPage}
                                      returnDetailId={this.returnDetailId.bind(this)} key={index}/>
                            )
                        })}
                        <div className={'smallLoading'} >
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
