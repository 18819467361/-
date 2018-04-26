import React, {Component} from 'react';
import './searchBar.css';
import fetchJsonp from 'fetch-jsonp';
import ReturnBar from '../returnBar/returnBar'

class SearchBar extends Component {
    // static defaultProps={
    //
    // };
    constructor() {
        super();
        this.state = {
            init: true,
            bookDefSrc: `https://api.douban.com/v2/book/search?q=建筑&count=10&fields=author,images,summary,title,tags,rating,pubdate,id`,
            movieDefSrc: `https://api.douban.com/v2/movie/top250?count=10`,
            musicDefSrc: `https://api.douban.com/v2/music/search?q=流行&count=10&fields=author,images,summary,title,tags,rating,pubdate,id`,
            preSrc: `https://api.douban.com/v2/book/search?q=建筑&count=10&fields=author,images,summary,title,tags,rating,pubdate,id`,
            preKeyword: ''
        }
    }

    clickOnSearch(){
        let keyword = '';
        let input = document.getElementsByTagName('input')[0];
        if (input) {
            keyword = input.value;
        }
        this.props.setKeyword(keyword);
        let showPage = this.props.showPage;
        let count = this.props.count;
        let id = this.props.detailId;
        let KeyWord=this.props.keyword;
        let src = this.setSrc(KeyWord, showPage, count, id);
        this.getData(src);
    }

    onSearch() {
        let keyword = '';
        let input = document.getElementsByTagName('input')[0];
        if (input) {
            keyword = input.value;
        }
        if(keyword!==''){
            this.props.setKeyword(keyword);
        }
        let showPage = this.props.showPage;
        let count = this.props.count;
        let id = this.props.detailId;
        let KeyWord=this.props.keyword;
        let src = this.setSrc(KeyWord, showPage, count, id);
        this.getData(src);
    }

    reSearch() {
        this.props.setDetailId('');
    }

    //通过SRC获取数据,并通过setdatas返回给app.jsx
    getData(src) {
        let self = this;
        fetchJsonp(src)
            .then(function (response) {
                return response.json()
            }).then(function (json) {
            // console.log('本次SRC', src);
            // console.log('parsed json', json);
            // let preSrc = self.state.preSrc;
            // let nowSrc = src;
            // let Regex = /book|movie|music/;
            // let Regex2=/search/;
            // let notDetailPage=Regex2.test(preSrc);
            // let preResult = preSrc.match(Regex);
            // let nowResult = nowSrc.match(Regex);
            // console.log('pre,now', preResult, nowResult);
            // console.log('notdetailpage',notDetailPage);
            // if(!notDetailPage){
            //     self.props.setContents(json);
            //     self.state.preSrc = src;
            // }
            // if (preResult && preResult[0] === nowResult[0] && preSrc !== nowSrc) {
            //     if (nowSrc !== self.state.bookDefSrc && nowSrc !== self.state.movieDefSrc && nowSrc !== self.state.musicDefSrc) {
            //         self.props.setContents(json);
            //         self.state.preSrc = src;
            //     }
            // } else {
                self.props.setContents(json);
                // self.state.preSrc = src;
            // }


        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    //根据输入的keyword、showPage、显示条目数参数确定src
    setSrc(keyword, showPage, count, id) {
        let src;
        // console.log('keyword', keyword);
        switch (showPage) {
            case 'book':
                if (id !== '') {
                    src = `https://api.douban.com/v2/book/${id}`;
                } else {
                    if (keyword === '') {
                        src = `https://api.douban.com/v2/book/search?q=建筑&count=${count}&fields=author,images,summary,title,tags,rating,pubdate,id`;
                    } else {
                        src = `https://api.douban.com/v2/book/search?q=${keyword}&count=${count}&fields=author,images,summary,title,tags,rating,pubdate,id`;
                    }
                }
                break;
            case 'movie':
                if (id !== '') {
                    src = `https://api.douban.com/v2/movie/${id}`;
                } else {
                    if (keyword === '') {
                        console.log(keyword);
                        src = `https://api.douban.com/v2/movie/top250?count=${count}`;
                    } else {
                        console.log(keyword);
                        src = `https://api.douban.com/v2/movie/search?q=${keyword}&count=${count}&fields=author,images,summary,title,tags,rating,pubdate,id`;
                    }
                }
                break;
            case 'music':
                if (id !== '') {
                    src = `https://api.douban.com/v2/music/${id}`;
                } else {
                    if (keyword === '') {
                        src = `https://api.douban.com/v2/music/search?q=流行&count=${count}&fields=author,images,summary,title,tags,rating,pubdate,id`;
                    } else {
                        src = `https://api.douban.com/v2/music/search?q=${keyword}&count=${count}&fields=author,images,summary,title,tags,rating,pubdate,id`;
                    }
                }
                break;
            default:
                break;
        }
        // console.log('src', src);
        return src;
    }

    setPlaceHolder() {
        let showPage = this.props.showPage;
        let pageHolder;
        switch (showPage) {
            case 'book':
                pageHolder = '书名、作者、ISBN';
                break;
            case 'movie':
                pageHolder = '电影、影人、导演';
                break;
            case'music':
                pageHolder = '歌手、唱片名、条码';
                break;
            default:
                break;
        }
        return pageHolder;
    }

    render() {
        let id = this.props.detailId;
        let keyword=this.props.keyword;
        let update=this.props.update;
        let placeHolder = this.setPlaceHolder();
        if (this.state.init !== this.props.showPage + this.props.count + id + keyword+update) {
            this.onSearch.apply(this);
            this.state.init = this.props.showPage + this.props.count + id + keyword+update;
        }
        if (id !== '') {
            return (
                <div>
                    <ReturnBar reSearch={this.reSearch.bind(this)}/>
                </div>


            )
        } else {
            return (
                <div className='searchBarContain'>
                    <div id='searchBar'>
                        <i className='searchBar-iconfont' id='glass'>&#xe6d0;</i>
                        <input type='search'   ref={(input) => this.input = input}
                               placeholder={this.state.preKeyword || placeHolder}/>
                        <a onClick={this.onSearch.bind(this)}>搜索</a>
                    </div>
                </div>
            )
        }
    }

    componentDidMount() {
        let aaa = this.input;
        // this.onSearch.apply(this);
        aaa.focus();

    }
}

module.exports = SearchBar;


