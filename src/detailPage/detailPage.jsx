import React, {Component} from 'react';
import './detailPage.css';


class DetailPage extends Component {
    constructor() {
        super();
    }


    analysisData(data,mode) {
        let analyData={};
        analyData.tags=[];
        analyData.cast=[];
        analyData.movie_type=[];
        analyData.singer=[];
        // console.log('mode',mode);
        switch (mode){
            case 'book':
                // console.log('in book');
                analyData.img=data.image?data.image:'';
                // console.log('img',analyData.img);
                analyData.title=data.title?data.title:'';
                if(data.author){
                    analyData.author=data.author.join(' ');
                }else {
                    author='佚名'
                }
                analyData.publisher=data.publisher?data.publisher:'';
                analyData.pubdate=data.pubdate?data.pubdate:'';
                analyData.rating=data.rating.average?data.rating.average:'';
                analyData.price=data.price?data.price:'';
                if(data.tags){
                    let len=data.tags.length;
                    for(let i=0;i<len;i++){
                        if(i>2){
                            break;
                        }
                        analyData.tags.push(data.tags[i].name);
                    }
                }
                analyData.catalog=data.catalog?data.catalog:'暂无';
                analyData.summary=data.summary?data.summary:'暂无';
                break;
            case 'movie':
                console.log('in movie');
                analyData.img=data.image?data.image:'';
                analyData.title=data.title?data.title:data.alt_title;
                analyData.director=data.attrs.director?data.attrs.director[0]:'';
                analyData.rating=data.rating.average?data.rating.average:'';
                if(data.attrs.cast){
                    let len=data.attrs.cast.length;
                    for(let i=0;i<len;i++){
                        analyData.cast.push(data.attrs.cast[i]);
                        if(i>3){
                            break;
                        }
                    }
                }
                analyData.duration=data.attrs.movie_duration?data.attrs.movie_duration[0]:'不详';
                if(data.attrs.movie_type){
                    let len=data.attrs.movie_type.length;
                    for(let i=0;i<len;i++){
                        analyData.movie_type.push(data.attrs.movie_type[i]);
                        if(i>2){
                            break;
                        }
                    }
                }
                analyData.pubdate=data.attrs.pubdate?data.attrs.pubdate[0]:'不详';
                analyData.summary=data.summary?data.summary:'暂无';
                break;
            case 'music':
                console.log('in music');
                analyData.img=data.image?data.image:'';
                analyData.title=data.title?data.title:'';
                if(data.attrs.singer){
                    analyData.singer=data.attrs.singer.join(' ');
                }else {
                    analyData.singer='佚名'
                }
                analyData.publisher=data.attrs.publisher?data.attrs.publisher[0]:'';
                analyData.pubdate=data.attrs.pubdate?data.attrs.pubdate[0]:'';
                analyData.rating=data.rating.average?data.rating.average:'';
                analyData.version=data.attrs.version?data.attrs.version[0]:'';
                if(data.tags){
                    let len=data.tags.length;
                    for(let i=0;i<len;i++){
                        if(i>2){
                            break;
                        }
                        analyData.tags.push(data.tags[i].name);
                    }
                }
                break;
            default:
                console.log('analy error');
        }
        return analyData;
    }

    render() {
        let mode = this.props.mode;
        let data = this.props.detailData;
        // console.log('mode', mode);
        let analyData=this.analysisData(data,mode);
        // console.log('data', data);
        // console.log('analyData',analyData);
        switch (mode){
            case 'book':
                return (
                    <div>
                        <div className='head'>
                            <img src={analyData.img}/>
                            <div className='headImfo' >
                                <p>名称：{analyData.title}</p>
                                <p>作者:{analyData.author}</p>
                                <p>出版社：{analyData.publisher}</p>
                                <p>日期：{analyData.pubdate}</p>
                                <p>评分：{analyData.rating}</p>
                                <p>售价：{analyData.price}</p>
                            </div>
                        </div>
                        <div className='content'>
                            <h3>序言</h3>
                            <p>{analyData.catalog}</p>
                            <h3>简介</h3>
                            <p>{analyData.summary}</p>
                        </div>
                    </div>
                );
                break;
            case 'movie':
                return(
                    <div>
                        <div className='head'>
                            <img src={analyData.img}/>
                            <div className='headImfo' >
                                <p>名称：{analyData.title}</p>
                                <p>导演:{analyData.director}</p>
                                <p>主演：<span>{analyData.cast[0]} </span><span>{analyData.cast[1]} </span><span>{analyData.cast[2]}</span></p>
                                <p>类型：<span>{analyData.movie_type[0]} </span><span>{analyData.movie_type[1]} </span><span>{analyData.movie_type[2]}</span></p>
                                <p>上映日期：{analyData.pubdate}</p>
                                <p>评分：{analyData.rating}</p>
                                <p>片长：{analyData.duration}</p>
                            </div>
                        </div>
                        <div className='content'>
                            <h3>简介</h3>
                            <p>{analyData.summary}</p>
                        </div>
                    </div>
                );
            break;
            case 'music':
                return(
                    <div>
                        <div className='head'>
                            <img src={analyData.img}/>
                            <div className='headImfo' >
                                <p>名称：{analyData.title}</p>
                                <p>表演者:{analyData.singer}</p>
                                <p>标签:<span>{analyData.tags[0]} </span><span>{analyData.tags[1]} </span><span>{analyData.tags[2]}</span></p>
                                <p>专辑类型：{analyData.version}</p>
                                <p>出版者：{analyData.publisher}</p>
                                <p>发行时间：{analyData.pubdate}</p>
                                <p>评分：{analyData.rating}</p>
                            </div>
                        </div>
                    </div>
                );
                break;
            default:
                console('err')
        }

    }
}

module.exports = DetailPage;
