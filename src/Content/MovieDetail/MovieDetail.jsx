import React, { Component } from 'react';
import './MovieDetail.css';


class MovieDetail extends Component {
    constructor(){
        super();
        this.state={

        }
    }
    render() {
        let data = this.props.datas
        let analyData = this.analysisData(data)
        return (
            <div>
                <div className='head'>
                    <img src={analyData.img} />
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
    }
}

module.exports = MovieDetail;


